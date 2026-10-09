import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function hashSha256(val) {
  if (!val) return undefined;
  const clean = String(val).trim().toLowerCase();
  if (!clean) return undefined;
  return crypto.createHash('sha256').update(clean).digest('hex');
}

function normalizePhone(phone) {
  if (!phone) return undefined;
  let digits = String(phone).replace(/\D/g, '');
  if (!digits) return undefined;
  // Chuẩn hoá số điện thoại Việt Nam (+84)
  if (digits.startsWith('0')) {
    digits = '84' + digits.slice(1);
  } else if (!digits.startsWith('84') && digits.length >= 9 && digits.length <= 10) {
    digits = '84' + digits;
  }
  return hashSha256(digits);
}

function normalizeName(name) {
  if (!name) return { fn: undefined, ln: undefined };
  const parts = String(name).trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { fn: undefined, ln: undefined };
  if (parts.length === 1) {
    return { fn: hashSha256(parts[0]), ln: undefined };
  }
  const fn = hashSha256(parts[parts.length - 1]); // Tên: Hưng
  const ln = hashSha256(parts[0]); // Họ: Nguyễn
  return { fn, ln };
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = (body.name || body.fullname || '').trim();
    const phone = (body.phone || '').trim();
    const email = (body.email || '').trim();
    const url = body.url || body.registration_url || 'https://mrhtoeic.com';
    const paymentStatus = body.payment_status || 'Chưa thanh toán';
    const eventId = body.event_id;
    const eventName = body.event_name || 'Purchase';
    const fbp = body.fbp;
    const fbc = body.fbc;

    // Format local Vietnam time: DD/MM/YYYY HH:mm:ss
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const vnDate = new Date(utc + (3600000 * 7));
    const pad = (n) => String(n).padStart(2, '0');
    const timeVN = `${pad(vnDate.getDate())}/${pad(vnDate.getMonth() + 1)}/${vnDate.getFullYear()} ${pad(vnDate.getHours())}:${pad(vnDate.getMinutes())}:${pad(vnDate.getSeconds())}`;

    const leadData = {
      timestamp: timeVN,
      name,
      phone,
      email,
      url,
      payment_status: paymentStatus
    };

    // 1. Local backup to leads.json (never lose a lead)
    try {
      const leadsFilePath = path.join(process.cwd(), 'leads.json');
      let leads = [];
      if (fs.existsSync(leadsFilePath)) {
        try {
          const content = fs.readFileSync(leadsFilePath, 'utf8');
          leads = JSON.parse(content) || [];
        } catch (e) {
          leads = [];
        }
      }
      leads.push(leadData);
      fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
    } catch (fsErr) {
      console.error('Error saving local lead backup:', fsErr);
    }

    // 2. Forward to Google Apps Script Webhook if configured
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            timestamp: timeVN,
            name,
            phone,
            email,
            registration_url: url,
            payment_status: paymentStatus,
            sheet_id: '1YDtuWN5FIWBJSrTDjFe7rfEKlsCGZrFQYNmqe3G0iVc'
          })
        });
      } catch (webhookErr) {
        console.error('Error forwarding to Google Sheet Webhook:', webhookErr);
      }
    }

    // 3. Meta Conversions API (CAPI) Server-side Event
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '1509215804565827';
    const capiAccessToken = process.env.FB_ACCESS_TOKEN || process.env.FACEBOOK_CONVERSIONS_API_TOKEN;

    if (capiAccessToken && pixelId && eventId) {
      try {
        const forwardedFor = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');
        const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || '');
        const userAgent = request.headers.get('user-agent') || '';

        const nameData = normalizeName(name);
        const hashedPhone = normalizePhone(phone);
        const hashedEmail = hashSha256(email);

        const userData = {};
        if (clientIp) userData.client_ip_address = clientIp;
        if (userAgent) userData.client_user_agent = userAgent;
        if (fbp) userData.fbp = fbp;
        if (fbc) userData.fbc = fbc;
        if (hashedPhone) userData.ph = [hashedPhone];
        if (hashedEmail) userData.em = [hashedEmail];
        if (nameData.fn) userData.fn = [nameData.fn];
        if (nameData.ln) userData.ln = [nameData.ln];

        const capiEvent = {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: url,
          action_source: 'website',
          user_data: userData,
          custom_data: {
            currency: 'VND',
            value: 5400000,
            content_name: 'Khóa học TOEIC ONLINE PRO 36 Buổi Live',
            content_type: 'product'
          }
        };

        const capiPayload = {
          data: [capiEvent],
          ...(process.env.FB_TEST_EVENT_CODE ? { test_event_code: process.env.FB_TEST_EVENT_CODE } : {})
        };

        const fbRes = await fetch(`https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${capiAccessToken}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(capiPayload)
        });

        const fbResData = await fbRes.json();
        if (!fbRes.ok || fbResData.error) {
          console.warn('Meta Conversions API warning:', fbResData);
        } else {
          console.log('Meta Conversions API success:', fbResData);
        }
      } catch (capiErr) {
        console.error('Meta Conversions API error:', capiErr);
      }
    } else if (!capiAccessToken && eventId) {
      console.info('Meta CAPI note: FB_ACCESS_TOKEN is not configured yet. Server-side event skipped.');
    }

    return NextResponse.json({
      success: true,
      message: 'Lead recorded successfully',
      data: leadData
    });
  } catch (error) {
    console.error('API /api/lead error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simple check endpoint
  return NextResponse.json({
    status: 'ok',
    sheet_id: '1YDtuWN5FIWBJSrTDjFe7rfEKlsCGZrFQYNmqe3G0iVc',
    has_webhook: !!process.env.GOOGLE_SHEET_WEBHOOK_URL,
    has_capi_token: !!(process.env.FB_ACCESS_TOKEN || process.env.FACEBOOK_CONVERSIONS_API_TOKEN)
  });
}

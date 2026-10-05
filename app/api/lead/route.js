import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();

    const name = (body.name || body.fullname || '').trim();
    const phone = (body.phone || '').trim();
    const email = (body.email || '').trim();
    const url = body.url || body.registration_url || 'https://mrhtoeic.com';
    const paymentStatus = body.payment_status || 'Chưa thanh toán';

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
        // Fire request to Google Apps Script
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
    has_webhook: !!process.env.GOOGLE_SHEET_WEBHOOK_URL
  });
}

import Script from 'next/script';
import './globals.css';

const FB_PIXEL_ID = '1509215804565827';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata = {
  metadataBase: new URL('https://mrhtoeic.com'),
  title: 'Khóa Học TOEIC ONLINE — Live Zoom Thực Chiến Cùng Thầy Hưng 985/990',
  description: 'Khóa học TOEIC ONLINE dạy Live 100% qua Zoom cùng Thầy Hưng 985/990 TOEIC. Đảm bảo chuẩn đầu ra 600+ sau khóa học, tự tin bứt phá 800+ thực chiến.',
  keywords: 'khóa học toeic online, học toeic live qua zoom, luyện thi toeic cấp tốc, thầy hưng 985 toeic, đảm bảo đầu ra toeic 600+',
  openGraph: {
    type: 'website',
    title: 'Khóa Học TOEIC ONLINE — Dạy Trực Tiếp Qua Zoom Live',
    description: 'Không bán video thu sẵn. Lớp học Live tương tác 2 chiều, gọi từng học viên đọc dịch & sửa phát âm 1-1, đảm bảo đầu ra 600+, bứt phá 800+.',
    images: ['/image/4-nobg-web.webp'],
  },
  icons: {
    icon: '/image/logo-accent.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Meta Pixel Code (Next.js deduplicated script) */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              if (!window.__fb_pixel_initialized) {
                window.__fb_pixel_initialized = true;
                fbq('init', '1509215804565827');
                fbq('track', 'PageView');
              }
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1509215804565827&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}

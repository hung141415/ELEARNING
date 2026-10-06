import './globals.css';

export const metadata = {
  metadataBase: new URL('https://mrhtoeic.com'),
  title: 'TOEIC ONLINE PRO — Khóa Học Live Zoom Thực Chiến 36 Buổi Cùng Thầy Hưng 985/990',
  description: 'Khóa học TOEIC ONLINE PRO dạy Live 100% qua Zoom cùng Thầy Hưng 985/990 TOEIC. Đảm bảo chuẩn đầu ra 600+ sau khóa học, tự tin bứt phá 800+ thực chiến.',
  keywords: 'TOEIC ONLINE PRO, học toeic live qua zoom, luyện thi toeic kèm 1-1, thầy hưng 985 toeic, đảm bảo đầu ra toeic 600+',
  openGraph: {
    type: 'website',
    title: 'TOEIC ONLINE PRO — Dạy Trực Tiếp Qua Zoom Live 36 Buổi',
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
        {/* Meta Pixel Code */}
        <script
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
              fbq('init', '1509215804565827');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body>
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

import './globals.css';
import { Inter } from 'next/font/google';

const fontSans = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata = {
  title: 'TOEIC ALL-IN-ONE | Khóa Học Bứt Phá 650+ Đến 800+ TOEIC Cùng Thầy Phạm Việt Hưng (985 TOEIC)',
  description: 'Hệ thống luyện thi TOEIC All-in-One tinh gọn, thực chiến dành cho Sinh viên và Người đi làm. Chấm dứt tình trạng mất gốc, sợ tiếng Anh trong 60 ngày cùng Thầy Phạm Việt Hưng.',
  icons: {
    icon: '/image/Logo_navy.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={fontSans.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

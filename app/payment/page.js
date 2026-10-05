import { Suspense } from 'react';
import PaymentContent from './PaymentContent';

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0b1838',
          color: '#c4a07c',
          fontFamily: 'sans-serif'
        }}>
          Đang tải cổng thanh toán VietQR...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import * as THREE from 'three';
import './checkout.css';
import {
  ShieldCheck,
  CheckCircle2,
  CheckCircle,
  Check,
  QrCode,
  Sparkles,
  MessageCircle,
  MessageSquare,
  Video,
  BookOpen,
  Crown,
  UserCheck,
  Flame,
  ShoppingCart,
  Edit3,
  Mic,
  Award,
  Gift,
  ZoomIn,
  Lock,
  Download,
  Copy,
  AlertCircle,
  ArrowRight,
  Zap,
  Clock,
  HelpCircle,
  Calendar,
  DollarSign,
  Shield,
  ArrowLeft,
  X
} from 'lucide-react';

const OFFERS = {
  course: {
    id: 'course',
    name: 'Khóa học TOEIC ONLINE PRO (36 Buổi Live Zoom)',
    shortName: 'Khóa Live Zoom 36 Buổi',
    tag: '🔥 Lớp Live Zoom 100%',
    price: 5400000,
    originalPrice: 10800000,
    saving: '5.400.000₫ (50%)',
    memoPrefix: 'TOEIC',
    description: 'Lộ trình 36 buổi Live Zoom thực chiến chuẩn 600+ và bứt phá 800+ cùng Thầy Hưng 985 ETS.'
  },
  ebook: {
    id: 'ebook',
    name: 'Bộ Ebook 1.000 Từ Vựng Sát Đề ETS & Cẩm Nang Part 5-7',
    shortName: 'Ebook 1000 Từ Vựng',
    tag: '📚 Ebook Kèm Audio Bản Xứ',
    price: 299000,
    originalPrice: 800000,
    saving: '501.000₫ (63%)',
    memoPrefix: 'EBOOK',
    description: 'Tài liệu độc quyền cô đọng 1.000 từ vựng xuất hiện nhiều nhất trong đề thi ETS mới nhất.'
  },
  bundle: {
    id: 'bundle',
    name: 'Bundle Siêu Cấp: TOEIC PRO VIP (Live Zoom + Ebook + App 1 Năm + Kèm 1-1)',
    shortName: 'Bundle VIP Toàn Diện',
    tag: '👑 Gói Cao Cấp Nhất (Chỉ 5 Suất)',
    price: 6900000,
    originalPrice: 15000000,
    saving: '8.100.000₫ (54%)',
    memoPrefix: 'BUNDLE',
    description: 'Trọn gói học Live 36 buổi, Ebook chuyên sâu, 1 năm App đề thi và gửi bài Thầy Hưng sửa mỗi ngày.'
  }
};

const BANK_INFO = {
  bankName: 'Vietcombank',
  bankFullName: 'Ngoại thương Việt Nam (Vietcombank)',
  accountNumber: '9904244824',
  accountName: 'PHAM VIET HUNG',
  branch: 'PGD Lê Chân'
};

const FAQ_LIST = [
  {
    q: '1. Cách thanh toán bằng mã QR như thế nào?',
    a: 'Rất đơn giản! Bạn chỉ cần mở bất kỳ ứng dụng ngân hàng nào trên điện thoại (Vietcombank, MB Bank, Techcombank, VPBank, ACB, BIDV...), chọn tính năng "Quét mã QR" và hướng camera vào mã QR trên trang này. Hệ thống sẽ tự động điền đúng Số tài khoản (9904244824), Tên người nhận (PHAM VIET HUNG) và Số tiền tương ứng. Bạn chỉ cần kiểm tra nội dung chuyển khoản là SĐT của bạn và nhấn Xác nhận.'
  },
  {
    q: '2. Sau khi chuyển khoản bao lâu tôi sẽ nhận được sản phẩm / xác nhận?',
    a: 'Hệ thống đối soát giao dịch hoạt động liên tục 24/7. Thông thường trong vòng 5 đến 15 phút sau khi chuyển khoản thành công, Thầy Hưng hoặc trợ giảng sẽ liên hệ qua Zalo/Điện thoại theo số bạn đã đăng ký để gửi thông tin phòng học Zoom, tài liệu khai giảng và link nhóm lớp VIP.'
  },
  {
    q: '3. Cách nhận lớp học và tài liệu diễn ra như thế nào?',
    a: 'Bạn sẽ được mời vào nhóm Zalo kín của lớp học. Tại đây, link phòng Zoom kèm mật khẩu cho 36 buổi học sẽ được ghim cố định. Toàn bộ tài liệu học tập, file PDF 1.000 từ vựng và tài khoản app luyện thi sẽ được gửi trực tiếp vào email và nhóm Zalo của bạn trước ngày khai giảng.'
  },
  {
    q: '4. Thời gian truy cập video xem lại và app luyện thi là bao lâu?',
    a: '- Video Record các buổi học Live: Được lưu trữ trên hệ thống trong 1 tuần kể từ ngày buổi học diễn ra để bạn linh hoạt xem lại khi bận hoặc muốn ôn tập kỹ.\n- Tài khoản App luyện thi & Bộ tài liệu PDF: Bạn được sử dụng trọn vẹn trong suốt khóa học và ôn thi đến khi thi đạt chứng chỉ.'
  },
  {
    q: '5. Sau giờ học nếu làm bài tập không hiểu tôi có được hỗ trợ không?',
    a: 'Có! Đây là đặc quyền kèm cặp 1-1 của khóa học: Bạn được nhắn tin Zalo trực tiếp cho Thầy Hưng 24/7. Bất cứ bài đọc Part 7 nào dịch chưa thoát ý, câu ngữ pháp Part 5 nào bị lừa bẫy, thầy sẽ trực tiếp phân tích nguyên nhân và giải thích cặn kẽ cho bạn.'
  },
  {
    q: '6. Chính sách cam kết chuẩn đầu ra và học lại hoạt động ra sao?',
    a: 'Chỉ cần bạn tham gia đầy đủ các buổi học Live qua Zoom và hoàn thành bài tập theo hướng dẫn của Thầy Hưng, bạn được ĐẢM BẢO CHUẨN ĐẦU RA 600+ TOEIC. Nếu đi thi không đạt chuẩn, bạn được học lại 100% HOÀN TOÀN MIỄN PHÍ ở khóa tiếp theo, không phải đóng thêm bất kỳ khoản phí nào!'
  },
  {
    q: '7. Tôi mất gốc tiếng Anh hoàn toàn, không biết gì thì có theo được không?',
    a: 'Khóa học được thiết kế đặc thù cho người mất gốc từ con số 0. Buổi 1 đến buổi 6 sẽ bắt đầu bằng việc chuẩn hóa khẩu hình 44 âm IPA và nghe ngắt nhịp Part 1 - Part 2. Thầy Hưng sẽ gọi mic từng bạn để nắn chỉnh phát âm, đảm bảo không ai bị bỏ lại phía sau.'
  },
  {
    q: '8. Mua xong thì tôi cần bắt đầu từ đâu?',
    a: 'Sau khi hoàn tất thanh toán và được xác nhận qua Zalo, bạn sẽ nhận được một bản hướng dẫn chuẩn bị: Cài đặt Zoom, tải bộ tài liệu khai giảng chặng 1, làm một bài test đầu vào nhanh để Thầy Hưng nắm rõ điểm yếu của bạn và sẵn sàng cho buổi học Live đầu tiên.'
  },
  {
    q: '9. Thanh toán chuyển khoản trực tiếp có an toàn không?',
    a: 'Tuyệt đối an toàn. Tài khoản nhận thanh toán là tài khoản chính chủ của Thầy Hưng tại Ngân hàng Ngoại thương Việt Nam (Vietcombank) — PGD Lê Chân. Mọi giao dịch chuyển khoản đều có lịch sử sao kê điện tử minh bạch theo quy định của Ngân hàng Nhà nước.'
  },
  {
    q: '10. Tôi có thể tham gia học trên điện thoại hoặc máy tính bảng được không?',
    a: 'Có. Nền tảng Zoom hoạt động mượt mà trên cả Điện thoại (iOS/Android), iPad, Máy tính bảng và Laptop/PC. Tuy nhiên, để có trải nghiệm học tập và tương tác sửa bài tốt nhất, Thầy Hưng khuyến khích bạn nên sử dụng Laptop hoặc Máy tính để bàn có tai nghe và mic rõ ràng.'
  },
  {
    q: '11. Nếu sau khi chuyển khoản mà tôi không nhận được email/Zalo thì sao?',
    a: 'Đừng lo lắng! Bạn có thể chủ động liên hệ ngay tới Hotline/Zalo cá nhân của Thầy Hưng qua số 0904.244.824 kèm ảnh chụp màn hình chuyển khoản. Thầy Hưng sẽ trực tiếp kiểm tra và hỗ trợ kích hoạt suất học cho bạn trong vòng 60 giây.'
  },
  {
    q: '12. Tôi có được tải tài liệu về máy in ra học không? Có được cập nhật đề mới không?',
    a: 'Toàn bộ file PDF tài liệu 1.000 từ vựng và bài tập đều được thiết kế định dạng chuẩn in ấn (A4) để bạn có thể tải về in ra ghi chép thuận tiện. Ngân hàng đề thi trên App cũng liên tục được cập nhật các format câu hỏi mới nhất từ các kỳ thi thật của ETS tại IIG Việt Nam.'
  }
];

export default function PaymentContent() {
  const searchParams = useSearchParams();

  // Single Course Offer (Live Zoom 36 Buổi)
  const activeOffer = OFFERS.course;

  // Student State
  const initialPhone = (searchParams.get('phone') || '').replace(/\D/g, '') || '0904244824';
  const [student, setStudent] = useState({
    fullname: searchParams.get('name') || 'Nguyễn Thế Hưng',
    phone: initialPhone,
    email: searchParams.get('email') || 'hung.pham@example.com'
  });

  // Hydrate from URL query or localStorage
  useEffect(() => {
    const qName = searchParams.get('name');
    const qPhone = searchParams.get('phone');
    const qEmail = searchParams.get('email');

    if (qPhone || qName || qEmail) {
      const clean = (qPhone || '').replace(/\D/g, '') || '0904244824';
      const updated = {
        fullname: qName || 'Học viên TOEIC',
        phone: clean,
        email: qEmail || ''
      };
      setStudent(updated);
      setEditForm(updated);
    } else {
      try {
        const stored = localStorage.getItem('mrh_buyer_info');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && (parsed.fullname || parsed.phone)) {
            const clean = (parsed.phone || '').replace(/\D/g, '') || '0904244824';
            const updated = {
              fullname: parsed.fullname || 'Học viên TOEIC',
              phone: clean,
              email: parsed.email || ''
            };
            setStudent(updated);
            setEditForm(updated);
          }
        }
      } catch (e) {}
    }
  }, [searchParams]);

  // Edit Form Temporary State
  const [editForm, setEditForm] = useState({ ...student });

  // Modals State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Active FAQ index (0 by default)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Toast State
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: '23', minutes: '59', seconds: '59' });

  // Canvas container ref
  const canvasContainerRef = useRef(null);
  const paymentGatewayRef = useRef(null);

  // Dynamic transfer memo: TOEIC + [Student Phone Number]
  const cleanPhoneForMemo = (student.phone || '').replace(/\D/g, '') || '0904244824';
  const transferMemo = `TOEIC ${cleanPhoneForMemo}`;

  // Currency Formatter
  const formatMoney = (num) => {
    return num.toLocaleString('vi-VN') + '₫';
  };

  // VietQR URL Generator with dynamic memo
  const vietQrUrl = `https://api.vietqr.io/image/970436-${BANK_INFO.accountNumber}-compact2.jpg?amount=${activeOffer.price}&addInfo=${encodeURIComponent(transferMemo)}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

  // Scroll to top on arrival
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Show Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Clipboard Copy Helper
  const handleCopy = (text, displayLabel, key) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`✓ Đã sao chép: ${displayLabel}`);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      }).catch(() => fallbackCopy(text, displayLabel, key));
    } else {
      fallbackCopy(text, displayLabel, key);
    }
  };

  const fallbackCopy = (text, displayLabel, key) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast(`✓ Đã sao chép: ${displayLabel}`);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {
      showToast('Không thể sao chép, vui lòng nhập thủ công');
    }
  };

  // Countdown Timer Logic
  useEffect(() => {
    const timerDurationSec = 24 * 60 * 60;
    let storedEnd = localStorage.getItem('mrh_checkout_timer_end');
    let endTime = storedEnd ? parseInt(storedEnd, 10) : null;

    if (!endTime || isNaN(endTime)) {
      endTime = Date.now() + timerDurationSec * 1000;
      localStorage.setItem('mrh_checkout_timer_end', endTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      let diff = Math.max(0, Math.floor((endTime - now) / 1000));

      if (diff <= 0) {
        endTime = Date.now() + 6 * 3600 * 1000;
        localStorage.setItem('mrh_checkout_timer_end', endTime.toString());
        diff = 6 * 3600;
      }

      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;

      const pad = (n) => String(n).padStart(2, '0');
      setTimeLeft({ hours: pad(h), minutes: pad(m), seconds: pad(s) });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Three.js Particle Constellation Background
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b1838, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 700;
    camera.position.y = 120;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const particleCount = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color(0xc4a07c);
    const colorCyan = new THREE.Color(0x34d399);
    const colorNavy = new THREE.Color(0x2b5ea7);
    const initialPositions = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 1600;
      const y = (Math.random() - 0.5) * 800;
      const z = (Math.random() - 0.5) * 1000;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions.push({ x, y, z, speed: 0.2 + Math.random() * 0.4 });

      const mixedColor = new THREE.Color();
      const ratio = Math.random();
      if (ratio < 0.6) {
        mixedColor.copy(colorGold);
      } else if (ratio < 0.85) {
        mixedColor.copy(colorCyan);
      } else {
        mixedColor.copy(colorNavy);
      }

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    function createParticleTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(224,196,164,0.8)');
      grad.addColorStop(0.8, 'rgba(196,160,124,0.15)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    }

    const particleTexture = createParticleTexture();
    const particleMaterial = new THREE.PointsMaterial({
      size: 9,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onPointerMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.35;
      mouseY = (event.clientY - windowHalfY) * 0.25;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize, false);

    const clock = new THREE.Clock();
    let isVisible = true;
    let animId = null;

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 0.8;
      camera.position.y = 120 - targetY * 0.5;
      camera.lookAt(0, 0, 0);

      const pos = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const init = initialPositions[i];
        pos[i * 3 + 1] = init.y + Math.sin(elapsedTime * init.speed + init.x * 0.01) * 35;
        pos[i * 3] = init.x + Math.cos(elapsedTime * 0.3 + init.z * 0.005) * 15;
      }
      geometry.attributes.position.needsUpdate = true;
      particleSystem.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      geometry.dispose();
      particleTexture.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Smooth Scroll to QR Gateway
  const scrollToQrGateway = () => {
    if (paymentGatewayRef.current) {
      paymentGatewayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      paymentGatewayRef.current.classList.add('highlight-pulse');
      setTimeout(() => {
        paymentGatewayRef.current?.classList.remove('highlight-pulse');
      }, 1500);
    }
  };

  // Payment Confirmation Action
  const handleConfirmPayment = () => {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#c4a07c', '#10b981', '#ffffff', '#f59e0b']
      });
    }

    // Record payment confirmation to backend & Google Sheets
    try {
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: student.fullname,
          phone: student.phone,
          email: student.email,
          url: typeof window !== 'undefined' ? window.location.href : '',
          payment_status: 'Đã thanh toán (Chờ xác nhận)'
        }),
        keepalive: true
      }).catch(() => {});
    } catch (e) {}

    setIsSuccessModalOpen(true);
  };

  // Download QR Code
  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = vietQrUrl;
    link.download = `VietQR-Vietcombank-${cleanPhoneForMemo}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 Đang tải ảnh mã QR về máy của bạn...');
  };

  // Handle Edit Student Info Submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setStudent({ ...editForm });
    setIsEditModalOpen(false);
    showToast('✓ Đã cập nhật thông tin học viên & nội dung chuyển khoản!');
  };

  return (
    <div className="payment-page-root">
      {/* 3D Three.js Background Canvas Layer */}
      <div id="three-canvas-container" ref={canvasContainerRef} aria-hidden="true" />

      {/* Page Wrapper */}
      <div className="page-wrapper">

        {/* Top Announcement Strip */}
        <aside className="top-notice-bar" role="region" aria-label="Thông báo ưu đãi">
          <span className="pulse-indicator" />
          <span>
            <strong>Ưu đãi 50% có hạn:</strong> Giữ suất học Live Zoom 36 buổi cùng Thầy Hưng (Đảm bảo chuẩn đầu ra 600+ • Học lại 100% miễn phí).
          </span>
        </aside>

        {/* Header Navigation Bar */}
        <header className="checkout-header" id="checkout-nav">
          <div className="container checkout-header-inner">
            <Link href="/" className="brand-wrap" title="Quay lại Trang Chủ MrH TOEIC">
              <img src="/image/logo-white.png" alt="MrH TOEIC Logo" className="brand-logo" />
              <span className="brand-badge">
                <ShieldCheck style={{ width: '14px', height: '14px', color: 'var(--accent-green)' }} />
                Cổng Thanh Toán An Toàn
              </span>
            </Link>

            {/* Funnel Stepper Indicator */}
            <nav className="checkout-stepper" aria-label="Tiến trình đăng ký">
              <div className="step-item completed">
                <CheckCircle2 style={{ width: '16px', height: '16px' }} />
                <span>1. Điền thông tin</span>
              </div>
              <span className="step-divider" />
              <div className="step-item active">
                <QrCode style={{ width: '16px', height: '16px' }} />
                <span>2. Quét QR thanh toán</span>
              </div>
              <span className="step-divider" />
              <div className="step-item">
                <Sparkles style={{ width: '16px', height: '16px' }} />
                <span>3. Vào lớp Live Zoom</span>
              </div>
            </nav>

            {/* Direct Instructor Support & Back to Home */}
            <div className="header-support">
              <Link href="/" className="btn-edit-info" style={{ textDecoration: 'none', padding: '0.45rem 0.85rem' }}>
                <ArrowLeft style={{ width: '14px', height: '14px' }} />
                <span>Trang Chủ</span>
              </Link>
              <a
                href="https://zalo.me/0904244824"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat Zalo với Thầy Hưng"
              >
                <MessageCircle style={{ width: '16px', height: '16px', color: 'var(--color-accent)' }} />
                <span>Zalo Thầy Hưng (0904.244.824)</span>
              </a>
            </div>
          </div>
        </header>

        {/* Hero / Decision Confirmation Section (Section 1) */}
        <section className="checkout-hero">
          <div className="container">
            <div className="buyer-verified-pill">
              <UserCheck style={{ width: '15px', height: '15px' }} />
              <span id="hero-buyer-tag">Học viên: {student.fullname} ({student.phone})</span>
            </div>

            <h1 className="hero-main-title">
              HOÀN TẤT ĐĂNG KÝ — GIỮ SUẤT <span className="highlight-gold">ƯU ĐÃI 50%</span>
            </h1>

            <p className="hero-sub-text">
              Chỉ còn một bước quét mã chuyển khoản để chính thức đồng hành cùng Thầy Hưng (985/990 TOEIC ETS) trong 36 buổi Live Zoom và nhận trọn bộ 5 quà tặng độc quyền trị giá 5.400.000₫!
            </p>

            {/* Live Urgency Countdown Bar */}
            <div className="urgency-countdown-strip" role="timer" aria-live="polite">
              <div className="urgency-label">
                <Flame style={{ width: '18px', height: '18px', color: '#ef4444' }} />
                <span>Ưu đãi 50% kết thúc sau:</span>
              </div>
              <div className="countdown-timer-group">
                <div className="time-box">
                  <span className="time-number cd-hours">{timeLeft.hours}</span>
                  <span className="time-label">Giờ</span>
                </div>
                <span className="time-colon">:</span>
                <div className="time-box">
                  <span className="time-number cd-minutes">{timeLeft.minutes}</span>
                  <span className="time-label">Phút</span>
                </div>
                <span className="time-colon">:</span>
                <div className="time-box">
                  <span className="time-number cd-seconds">{timeLeft.seconds}</span>
                  <span className="time-label">Giây</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content 2-Column Grid */}
        <main className="container" id="checkout-main-area">
          <div className="checkout-main-grid">

            {/* LEFT COLUMN: Value Confirmation, Order Summary & Reassurance */}
            <div className="checkout-left-col">

              {/* Section 2: Order Summary Card */}
              <article className="glass-card" id="order-summary-card">
                <div className="card-title-row">
                  <h3>
                    <ShoppingCart style={{ width: '20px', height: '20px', color: 'var(--color-accent)' }} />
                    Tóm Tắt Đơn Hàng
                  </h3>
                  <span className="card-tag-pill">Đã Giữ Suất Thành Công</span>
                </div>

                {/* Prefilled Buyer Info Block */}
                <div className="buyer-info-box">
                  <div className="buyer-meta-list">
                    <span className="buyer-name" id="buyer-name-display">{student.fullname}</span>
                    <span className="buyer-sub">
                      SĐT Zalo: <strong style={{ color: '#fff' }}>{student.phone}</strong> • Email: <span>{student.email}</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn-edit-info"
                    onClick={() => {
                      setEditForm({ ...student });
                      setIsEditModalOpen(true);
                    }}
                    title="Sửa thông tin học viên"
                  >
                    <Edit3 style={{ width: '13px', height: '13px' }} /> Sửa
                  </button>
                </div>

                {/* Order Pricing Breakdown */}
                <div className="order-breakdown-list">
                  <div className="breakdown-item main-item">
                    <span id="order-item-title">{activeOffer.name}</span>
                    <span id="order-item-price-standard">{formatMoney(activeOffer.originalPrice)}</span>
                  </div>
                  <div className="breakdown-item" style={{ fontSize: '0.85rem' }}>
                    <span>Trọn bộ 5 Quà Tặng VIP (App luyện đề, Ebook, Record, Thi thử)</span>
                    <span style={{ color: 'var(--color-accent-light)' }}>Được Tặng Kèm (0₫)</span>
                  </div>
                  <div className="breakdown-item discount-item">
                    <span>
                      Mã ưu đãi giữ chỗ: <span className="coupon-applied-badge">TOEIC50</span>
                    </span>
                    <span id="order-discount-val">-{formatMoney(activeOffer.originalPrice - activeOffer.price)} ({activeOffer.saving})</span>
                  </div>
                </div>

                {/* Total Price Display Hero */}
                <div className="total-price-box">
                  <div className="total-label-wrap">
                    <span className="total-title">Số tiền cần thanh toán</span>
                    <span className="total-subtitle" id="order-saving-badge">Tiết kiệm {activeOffer.saving} hôm nay</span>
                  </div>
                  <div className="total-amount-wrap">
                    <span className="original-price-strike">{formatMoney(activeOffer.originalPrice)}</span>
                    <div className="final-price-hero">
                      {activeOffer.price.toLocaleString('vi-VN')} <span className="currency">₫</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Section 3: What You Get Today (Core Pillars) */}
              <article className="glass-card">
                <div className="card-title-row">
                  <h3>
                    <CheckCircle style={{ width: '20px', height: '20px', color: 'var(--accent-green)' }} />
                    Quyền Lợi Bạn Nhận Được Ngay Hôm Nay
                  </h3>
                </div>
                <div className="what-you-get-grid">
                  <div className="benefit-bullet-card">
                    <div className="benefit-icon-wrap">
                      <Video style={{ width: '18px', height: '18px' }} />
                    </div>
                    <div className="benefit-text-wrap">
                      <h4>Live Zoom 100% 36 Buổi</h4>
                      <p>Học trực tiếp 90 phút/buổi cùng Thầy Hưng. Hoàn toàn không bán video thu sẵn.</p>
                    </div>
                  </div>
                  <div className="benefit-bullet-card">
                    <div className="benefit-icon-wrap">
                      <Mic style={{ width: '18px', height: '18px' }} />
                    </div>
                    <div className="benefit-text-wrap">
                      <h4>Sửa Âm IPA & Lỗi Sai 1-1</h4>
                      <p>Bật mic đọc dịch câu hỏi, nắn khẩu hình chuẩn bản xứ và bẻ khóa bẫy ETS mới.</p>
                    </div>
                  </div>
                  <div className="benefit-bullet-card">
                    <div className="benefit-icon-wrap">
                      <Award style={{ width: '18px', height: '18px' }} />
                    </div>
                    <div className="benefit-text-wrap">
                      <h4>Đảm Bảo Chuẩn 600+ Đến 800+</h4>
                      <p>Học lại 100% hoàn toàn miễn phí nếu không đạt mục tiêu đầu ra cam kết.</p>
                    </div>
                  </div>
                  <div className="benefit-bullet-card">
                    <div className="benefit-icon-wrap">
                      <MessageSquare style={{ width: '18px', height: '18px' }} />
                    </div>
                    <div className="benefit-text-wrap">
                      <h4>Kèm Cặp Zalo 1-1 24/7</h4>
                      <p>Bất cứ bài đọc hay câu ngữ pháp nào chưa hiểu, Thầy Hưng trực tiếp giải đáp cặn kẽ.</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Section 4: Bonus Stack Section */}
              <article className="glass-card">
                <div className="card-title-row">
                  <h3>
                    <Gift style={{ width: '20px', height: '20px', color: 'var(--color-accent)' }} />
                    Trọn Bộ 5 Quà Tặng Độc Quyền Đi Kèm
                  </h3>
                  <span className="card-tag-pill" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)', borderColor: 'var(--color-accent-border)' }}>
                    Trị Giá 5.400.000₫
                  </span>
                </div>

                <div className="bonus-stack-list">
                  <div className="bonus-card-item">
                    <div className="bonus-thumb">
                      <img src="/images/quyen-loi-record.webp" alt="Video Record xem lại" loading="lazy" />
                    </div>
                    <div className="bonus-content">
                      <h4>🎁 Quà #01: Video Record Xem Lại Không Giới Hạn</h4>
                      <p>Lưu trữ sắc nét 1 tuần sau mỗi buổi học, xem lại bất cứ lúc nào khi có lịch bận đột xuất.</p>
                    </div>
                    <div className="bonus-val-tag">
                      <span className="val-badge">1.200.000₫</span>
                    </div>
                  </div>

                  <div className="bonus-card-item">
                    <div className="bonus-thumb">
                      <img src="/images/quyen-loi-tracking.webp" alt="App luyện thi sát đề 90%" loading="lazy" />
                    </div>
                    <div className="bonus-content">
                      <h4>🎁 Quà #02: Nền Tảng App Luyện Thi Sát Đề 90%</h4>
                      <p>Hệ thống tự động tracking tiến độ mỗi ngày, luyện tập ngân hàng câu hỏi chuẩn format ETS.</p>
                    </div>
                    <div className="bonus-val-tag">
                      <span className="val-badge">1.500.000₫</span>
                    </div>
                  </div>

                  <div className="bonus-card-item">
                    <div className="bonus-thumb">
                      <img src="/images/quyen-loi-tu-vung.webp" alt="File 1000 từ vựng ETS" loading="lazy" />
                    </div>
                    <div className="bonus-content">
                      <h4>🎁 Quà #03: File 1.000 Từ Vựng Sát Đề Thi Thật ETS</h4>
                      <p>Bộ tài liệu độc quyền lọc sát đề thi, học qua ngữ cảnh và ứng dụng tức thì vào Part 7.</p>
                    </div>
                    <div className="bonus-val-tag">
                      <span className="val-badge">800.000₫</span>
                    </div>
                  </div>

                  <div className="bonus-card-item">
                    <div className="bonus-thumb">
                      <img src="/images/quyen-loi-phong-thi.webp" alt="Phòng thi thử 120 phút" loading="lazy" />
                    </div>
                    <div className="bonus-content">
                      <h4>🎁 Quà #04: Phòng Luyện Thi & Thi Thử Định Kỳ 120 Phút</h4>
                      <p>Mô phỏng áp lực phòng thi thật, Thầy Hưng trực tiếp chấm chữa và bóc tách ma trận lỗi sai.</p>
                    </div>
                    <div className="bonus-val-tag">
                      <span className="val-badge">1.300.000₫</span>
                    </div>
                  </div>

                  <div className="bonus-card-item special-bonus">
                    <div className="bonus-thumb">
                      <img src="/images/quyen-loi-cam-ket.webp" alt="Cam kết chuẩn đầu ra 600+" loading="lazy" />
                    </div>
                    <div className="bonus-content">
                      <h4 style={{ color: 'var(--accent-green-light)' }}>🎁 Quà #05: Đặc Quyền Đảm Bảo Chuẩn Đầu Ra 600+</h4>
                      <p>Học lại 100% hoàn toàn MIỄN PHÍ nếu không đạt mục tiêu. Hỗ trợ giải đáp thắc mắc 1-1 qua Zalo 24/7.</p>
                    </div>
                    <div className="bonus-val-tag">
                      <span className="val-badge priceless">GIÁ TRỊ VÔ GIÁ</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Section 7: Instructor Reassurance & ETS Scorecard */}
              <article className="instructor-reassurance-box">
                <div className="instructor-avatar-wrap">
                  <img src="/images/teacher-hung.webp" alt="Thầy Hưng 985/990 TOEIC ETS" />
                </div>
                <div className="instructor-text">
                  <h4>Thầy Hưng (Mr. Hưng TOEIC) <span className="score-pill">985/990 ETS</span></h4>
                  <p>Trực tiếp đứng lớp 100% các buổi Zoom Live. 5 năm kinh nghiệm chuyên sâu, kèm cặp hơn 400+ học viên bứt phá từ con số 0 lên 600 - 895 TOEIC.</p>
                  <button
                    type="button"
                    className="cert-preview-trigger"
                    onClick={() => setIsCertModalOpen(true)}
                  >
                    <ZoomIn style={{ width: '14px', height: '14px' }} />
                    <span>Xem Bảng Điểm ETS 985 Chính Thức (IIG Việt Nam)</span>
                  </button>
                </div>
              </article>

            </div>

            {/* RIGHT COLUMN: The Sticky Central QR Payment Gateway (Section 5) */}
            <div className="checkout-right-col">
              <aside className="payment-gateway-card" id="payment-qr-gateway" ref={paymentGatewayRef} aria-label="Cổng thanh toán QR ngân hàng">
                <div className="gateway-header">
                  <span className="gateway-step-badge">
                    <Lock style={{ width: '13px', height: '13px' }} /> Bước 2/2: Quét Mã QR Thanh Toán
                  </span>
                  <h2 className="gateway-title">Thanh Toán Bằng VietQR</h2>
                  <p className="gateway-subtitle">Mở App Ngân hàng bất kỳ để quét mã — Tự động điền 100% thông tin</p>
                </div>

                {/* Prominent Pre-Scan Confirmation Notice */}
                <div className="payment-receipt-notice">
                  <div className="receipt-notice-header">
                    <AlertCircle className="receipt-notice-icon" />
                    <span>LƯU Ý QUAN TRỌNG TRƯỚC KHI QUÉT MÃ</span>
                  </div>
                  <p className="receipt-notice-desc">
                    Sau khi thanh toán thành công, bạn vui lòng <strong>chụp lại màn hình giao dịch (lệnh chuyển tiền)</strong> và gửi lại qua Zalo cho Thầy Hưng (<strong className="highlight-phone">0904.244.824</strong>) để được xác nhận và kích hoạt suất học ngay nhé!
                  </p>
                  <a
                    href="https://zalo.me/0904244824"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-send-receipt-zalo"
                  >
                    <MessageCircle style={{ width: '16px', height: '16px' }} />
                    <span>Gửi Bill Chuyển Khoản Qua Zalo Thầy Hưng (0904.244.824)</span>
                  </a>
                </div>

                {/* Central QR Display Box */}
                <div className="qr-display-container">
                  <div className="qr-bank-header">
                    <span className="vcb-logo-text">Vietcombank</span>
                    <span className="vietqr-badge-pair">
                      <span style={{ color: '#ef4444', fontWeight: 800 }}>VIET</span>
                      <span style={{ color: '#1e3a8a', fontWeight: 800 }}>QR</span> • NAPAS 247
                    </span>
                  </div>

                  <div className="qr-image-wrapper" id="qr-dynamic-view">
                    <img
                      id="dynamic-qr-img"
                      src={vietQrUrl}
                      alt="Mã QR Chuyển khoản Vietcombank"
                      width={250}
                      height={250}
                    />
                  </div>

                  <p className="qr-caption-note">
                    Quét mã để số tiền <strong style={{ color: '#0f172a' }}>{formatMoney(activeOffer.price)}</strong> và nội dung <strong style={{ color: '#1e3a8a' }}>{transferMemo}</strong> được tự động điền chính xác.
                  </p>

                  <button
                    type="button"
                    className="btn-download-qr"
                    onClick={handleDownloadQr}
                  >
                    <Download style={{ width: '14px', height: '14px' }} />
                    <span>Lưu ảnh QR vào thư viện điện thoại</span>
                  </button>
                </div>

                {/* Bank Transfer Details with 1-Click Copy */}
                <div className="bank-transfer-details">
                  <div className="detail-row">
                    <span className="detail-label">Ngân hàng:</span>
                    <div className="detail-value-wrap">
                      <span>{BANK_INFO.bankName}</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Số tài khoản:</span>
                    <div className="detail-value-wrap">
                      <span id="bank-acc-num">{BANK_INFO.accountNumber}</span>
                      <button
                        type="button"
                        className={`btn-copy-chip ${copiedKey === 'acc' ? 'copied' : ''}`}
                        onClick={() => handleCopy(BANK_INFO.accountNumber, BANK_INFO.accountNumber, 'acc')}
                        title="Sao chép số tài khoản"
                      >
                        <Copy style={{ width: '13px', height: '13px' }} />
                        <span>{copiedKey === 'acc' ? '✓ Đã chép' : 'Sao chép'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Chủ tài khoản:</span>
                    <div className="detail-value-wrap">
                      <span>{BANK_INFO.accountName}</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Chi nhánh:</span>
                    <div className="detail-value-wrap">
                      <span>{BANK_INFO.branch}</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Số tiền:</span>
                    <div className="detail-value-wrap highlight">
                      <span>{formatMoney(activeOffer.price)}</span>
                      <button
                        type="button"
                        className={`btn-copy-chip ${copiedKey === 'amount' ? 'copied' : ''}`}
                        onClick={() => handleCopy(activeOffer.price.toString(), formatMoney(activeOffer.price), 'amount')}
                        title="Sao chép số tiền"
                      >
                        <Copy style={{ width: '13px', height: '13px' }} />
                        <span>{copiedKey === 'amount' ? '✓ Đã chép' : 'Sao chép'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Nội dung CK:</span>
                    <div className="detail-value-wrap memo">
                      <span>{transferMemo}</span>
                      <button
                        type="button"
                        className={`btn-copy-chip ${copiedKey === 'memo' ? 'copied' : ''}`}
                        onClick={() => handleCopy(transferMemo, transferMemo, 'memo')}
                        title="Sao chép nội dung"
                      >
                        <Copy style={{ width: '13px', height: '13px' }} />
                        <span>{copiedKey === 'memo' ? '✓ Đã chép' : 'Sao chép'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Memo Notice Alert */}
                <div className="memo-warning-box">
                  <AlertCircle style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                  <span>
                    <strong>Lưu ý:</strong> Vui lòng giữ đúng nội dung chuyển khoản là <strong style={{ color: 'var(--color-accent-light)' }}>{transferMemo}</strong> để hệ thống tự động ghi nhận và kích hoạt tài khoản trong vòng 5–15 phút.
                  </span>
                </div>

                {/* Big Primary CTA Button (Section 7) */}
                <button
                  type="button"
                  className="btn-primary-payment trigger-payment-complete"
                  onClick={handleConfirmPayment}
                >
                  <span>TÔI ĐÃ CHUYỂN KHOẢN THÀNH CÔNG</span>
                  <ArrowRight style={{ width: '20px', height: '20px' }} />
                </button>

                {/* Post-Payment Step Notice */}
                <div className="post-pay-step-notice">
                  <Check style={{ width: '14px', height: '14px', color: 'var(--accent-green)' }} />
                  <span>Hỗ trợ xác nhận 24/7 qua Zalo Thầy Hưng (0904.244.824)</span>
                </div>

                {/* Trust Micro Strip */}
                <div className="gateway-trust-strip">
                  <div className="trust-micro-item">
                    <ShieldCheck style={{ width: '18px', height: '18px', color: 'var(--accent-green)' }} />
                    <span>Vietcombank Napas</span>
                  </div>
                  <div className="trust-micro-item">
                    <Zap style={{ width: '18px', height: '18px', color: 'var(--color-accent)' }} />
                    <span>Kích hoạt 5-15p</span>
                  </div>
                  <div className="trust-micro-item">
                    <Award style={{ width: '18px', height: '18px', color: '#f59e0b' }} />
                    <span>Cam kết 600+</span>
                  </div>
                </div>
              </aside>
            </div>

          </div>
        </main>

        {/* Section 8: Objection Handling Section */}
        <section className="section-wrapper" id="objection-handling-sec">
          <div className="container">
            <div className="section-head">
              <span className="section-badge-center">Giải Tỏa Băn Khoăn Phút Chót</span>
              <h2 className="section-heading-lg">Mọi Điều Bạn Cần Biết Trước Khi Chuyển Khoản</h2>
              <p className="section-desc">Chúng tôi muốn bạn hoàn toàn yên tâm 100% trước khi bắt đầu hành trình cùng Thầy Hưng:</p>
            </div>

            <div className="objections-grid">
              <div className="objection-card">
                <div className="objection-card-head">
                  <div className="objection-icon"><Clock style={{ width: '16px', height: '16px' }} /></div>
                  <h4>Chuyển tiền rồi bao lâu nhận được xác nhận?</h4>
                </div>
                <p>Hệ thống Napas của Vietcombank báo biến động số dư tức thì 24/7. Trong vòng <strong>5–15 phút</strong>, đội ngũ Thầy Hưng sẽ liên hệ qua Zalo theo đúng số điện thoại trong nội dung chuyển khoản để cấp link phòng Zoom và mời bạn vào nhóm VIP.</p>
              </div>

              <div className="objection-card">
                <div className="objection-card-head">
                  <div className="objection-icon"><HelpCircle style={{ width: '16px', height: '16px' }} /></div>
                  <h4>Mất gốc tiếng Anh hoàn toàn có theo kịp không?</h4>
                </div>
                <p>Khóa học thiết kế riêng cho người mất gốc từ số 0. Chặng 1 bắt đầu từ chuẩn hóa 44 âm IPA và nghe ngắt nhịp cơ bản. Thầy Hưng gọi mic từng người để sửa lỗi, cam kết không để bất kỳ bạn nào bị bỏ lại phía sau.</p>
              </div>

              <div className="objection-card">
                <div className="objection-card-head">
                  <div className="objection-icon"><Calendar style={{ width: '16px', height: '16px' }} /></div>
                  <h4>Lỡ bận việc đột xuất phải nghỉ có bị mất bài không?</h4>
                </div>
                <p>Hoàn toàn không. Toàn bộ 36 buổi học Live đều có <strong>Video Record chất lượng cao lưu trữ trong 1 tuần</strong> để bạn xem lại. Bạn làm bài tập trên app và nhắn tin Zalo cho Thầy Hưng bất cứ câu nào chưa hiểu.</p>
              </div>

              <div className="objection-card">
                <div className="objection-card-head">
                  <div className="objection-icon"><DollarSign style={{ width: '16px', height: '16px' }} /></div>
                  <h4>Học phí 5.400.000₫ có phát sinh thêm chi phí nào không?</h4>
                </div>
                <p>Cam kết <strong>5.400.000₫ là chi phí TRỌN GÓI 100%</strong> cho 36 buổi học Live và toàn bộ 5 phần quà tặng (App luyện thi, Ebook 1.000 từ vựng, Phòng thi thử, Video record). Tuyệt đối không phát sinh thêm bất cứ khoản tiền giáo trình hay tài liệu nào.</p>
              </div>

              <div className="objection-card">
                <div className="objection-card-head">
                  <div className="objection-icon"><Shield style={{ width: '16px', height: '16px' }} /></div>
                  <h4>Nếu học xong đi thi mà không đạt chuẩn 600+ thì sao?</h4>
                </div>
                <p>Bạn được <strong>HỌC LẠI 100% HOÀN TOÀN MIỄN PHÍ</strong> ở khóa tiếp theo. Thầy Hưng sẽ trực tiếp cùng bạn phân tích lại bài thi để vá đúng lỗ hổng cho đến khi bạn cầm chắc chứng chỉ mong muốn trên tay.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: 12 FAQ Accordion Section */}
        <section className="section-wrapper" id="faq-sec">
          <div className="container">
            <div className="section-head">
              <span className="section-badge-center">Câu Hỏi Thường Gặp</span>
              <h2 className="section-heading-lg">Giải Đáp 12 Thắc Mắc Trước Khi Hoàn Tất</h2>
              <p className="section-desc">Tất cả những thông tin chi tiết về hình thức học, bảo hành, tài liệu và thanh toán:</p>
            </div>

            <div className="faq-accordion-group">
              {FAQ_LIST.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className={`faq-checkout-item ${isOpen ? 'active' : ''}`}>
                    <div
                      className="faq-checkout-header"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    >
                      <h4>{faq.q}</h4>
                      <span className="faq-icon-pill">{isOpen ? '−' : '+'}</span>
                    </div>
                    {isOpen && (
                      <div className="faq-checkout-body" style={{ maxHeight: 'none' }}>
                        <div className="faq-body-inner" style={{ whiteSpace: 'pre-line' }}>
                          {faq.a}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 11: Final Payment CTA Section */}
        <section className="final-cta-section">
          <div className="container">
            <div className="final-cta-card">
              <h2>Sẵn Sàng Bứt Phá 600 – 800+ TOEIC?</h2>
              <p>Đừng để nỗi sợ tiếng Anh tiếp tục giữ chân bạn thêm một kỳ thi nào nữa. Hãy quét mã chuyển khoản {formatMoney(activeOffer.price)} ngay hôm nay để giữ trọn vẹn ưu đãi 50% và bước vào lớp học Live Zoom cùng Thầy Hưng.</p>
              <div className="final-cta-btn-wrap">
                <button
                  type="button"
                  className="btn-primary-payment scroll-to-qr-btn"
                  onClick={scrollToQrGateway}
                  style={{ maxWidth: '380px' }}
                >
                  <QrCode style={{ width: '20px', height: '20px' }} />
                  <span>QUÉT MÃ THANH TOÁN NGAY</span>
                </button>
                <a
                  href="https://zalo.me/0904244824"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-edit-info"
                  style={{ padding: '1.15rem 1.75rem', fontSize: '0.95rem', textDecoration: 'none' }}
                >
                  <MessageCircle style={{ width: '18px', height: '18px' }} />
                  <span>Nhắn Tin Trực Tiếp Thầy Hưng (0904.244.824)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="checkout-footer">
          <div className="container">
            <p>© 2026 MrH TOEIC. All rights reserved. Khóa học TOEIC ONLINE PRO — Giảng viên Thầy Hưng 985/990 TOEIC ETS.</p>
            <p>Bảo mật giao dịch điện tử theo tiêu chuẩn Ngân Hàng Nhà Nước Việt Nam • Cổng thanh toán VietQR & Napas 247.</p>
            <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.75rem' }}>
              Cam kết đảm bảo chuẩn đầu ra 600+ cho học viên tham gia học đầy đủ và làm bài tập theo lộ trình. Học lại 100% miễn phí nếu không đạt mục tiêu.
            </p>
          </div>
        </footer>

        {/* Sticky Mobile Bottom Bar */}
        <div className="mobile-sticky-bar" id="mobile-sticky-bar">
          <div className="mobile-bar-inner">
            <div className="mobile-price-col">
              <span className="mobile-price-cur">{formatMoney(activeOffer.price)}</span>
              <span className="mobile-price-timer">
                Ưu đãi còn: <strong>{timeLeft.hours}</strong>:<strong>{timeLeft.minutes}</strong>:<strong>{timeLeft.seconds}</strong>
              </span>
            </div>
            <button
              type="button"
              className="mobile-qr-jump-btn"
              onClick={scrollToQrGateway}
            >
              <QrCode style={{ width: '16px', height: '16px' }} />
              <span>Thanh Toán QR</span>
            </button>
          </div>
        </div>

      </div>

      {/* Modal 1: Edit Buyer Info Modal */}
      {isEditModalOpen && (
        <div
          className="modal-backdrop active"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target.classList.contains('modal-backdrop')) setIsEditModalOpen(false);
          }}
        >
          <div className="modal-dialog">
            <div className="modal-head">
              <h3>Chỉnh Sửa Thông Tin Học Viên</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setIsEditModalOpen(false)}
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Họ và tên học viên:
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.fullname}
                    onChange={(e) => setEditForm({ ...editForm, fullname: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-card)', color: '#fff', fontSize: '0.95rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Số điện thoại (Nhận tin nhắn Zalo):
                  </label>
                  <input
                    type="tel"
                    required
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-card)', color: '#fff', fontSize: '0.95rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Email nhận tài liệu:
                  </label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-card)', color: '#fff', fontSize: '0.95rem' }}
                  />
                </div>
                <button type="submit" className="btn-primary-payment" style={{ marginTop: '0.5rem' }}>
                  Lưu Thông Tin & Cập Nhật Mã QR
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Success Celebration & Zalo Confirm Modal */}
      {isSuccessModalOpen && (
        <div
          className="modal-backdrop active"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target.classList.contains('modal-backdrop')) setIsSuccessModalOpen(false);
          }}
        >
          <div className="modal-dialog">
            <div className="modal-head">
              <h3>Ghi Nhận Thanh Toán Thành Công</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setIsSuccessModalOpen(false)}
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="success-celebration-box">
                <div className="success-icon-ring">✓</div>
                <h3>Cảm Ơn Bạn Đã Đăng Ký!</h3>
                <p>
                  Yêu cầu kích hoạt suất học <strong style={{ color: 'var(--color-accent)' }}>{activeOffer.name}</strong> với số tiền <strong style={{ color: '#fff' }}>{formatMoney(activeOffer.price)}</strong> cho số điện thoại <strong style={{ color: '#fff' }}>{student.phone}</strong> đã được hệ thống ghi nhận.
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-green-light)' }}>
                  Đội ngũ Thầy Hưng sẽ đối soát biến động số dư Vietcombank và gửi link phòng Zoom kèm tài liệu qua Zalo trong vòng <strong>5–15 phút</strong>.
                </p>
                <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.85rem', fontSize: '0.825rem', color: '#fbbf24', margin: '0.75rem 0 1rem', textAlign: 'center' }}>
                  📸 <strong>Nhắc nhở:</strong> Vui lòng gửi kèm <strong>ảnh chụp màn hình chuyển khoản thành công</strong> khi nhắn Zalo để Thầy Hưng kích hoạt suất học cho bạn nhanh nhất nhé!
                </div>
                <a
                  href="https://zalo.me/0904244824"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-zalo-direct"
                >
                  <MessageCircle style={{ width: '20px', height: '20px' }} />
                  <span>Nhắn Tin Xác Nhận Ngay Qua Zalo Thầy Hưng</span>
                </a>
                <div style={{ marginTop: '1rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  Hotline / Zalo hỗ trợ trực tiếp 24/7: <strong>0904.244.824</strong> (Thầy Hưng)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Certificate Zoom Modal */}
      {isCertModalOpen && (
        <div
          className="modal-backdrop active"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target.classList.contains('modal-backdrop')) setIsCertModalOpen(false);
          }}
        >
          <div className="modal-dialog" style={{ maxWidth: '760px' }}>
            <div className="modal-head">
              <h3>Bảng Điểm ETS 985/990 Chính Thức — Thầy Hưng</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setIsCertModalOpen(false)}
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>
            <div className="modal-body" style={{ padding: '1rem', background: '#040912', textAlign: 'center' }}>
              <img
                src="/images/chung-chi.webp"
                alt="Chứng chỉ TOEIC Thầy Hưng 985/990"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius-md)', boxShadow: '0 8px 30px rgba(0,0,0,0.6)' }}
              />
              <p style={{ fontSize: '0.85rem', color: 'var(--color-accent-light)', marginTop: '0.85rem' }}>
                Chứng chỉ khảo thí quốc tế ETS do IIG Việt Nam cấp. Điểm số: <strong>Listening 495 / Reading 490</strong> (Tổng 985/990).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Component */}
      <div className={`toast-notice ${toastMessage ? 'show' : ''}`} role="status" aria-live="polite">
        <CheckCircle style={{ width: '18px', height: '18px', color: 'var(--accent-green)' }} />
        <span>{toastMessage}</span>
      </div>

    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  BookOpen,
  Headphones,
  FileText,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Star,
  Users,
  Calendar,
  MessageCircle,
  TrendingUp,
  Volume2,
  Lock,
  Menu,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  // =========================================================================
  // 1. 120 FPS SMOOTH SCROLL (LENIS ENGINE)
  // =========================================================================
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (e, targetId) => {
    if (e && e.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetId, {
        offset: -70,
        duration: 1.2,
      });
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // =========================================================================
  // 2. EXCLUSIVE BONUS COUNTDOWN TIMER (QUÀ TẶNG ĐỘC QUYỀN)
  // =========================================================================
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 48, seconds: 35 });

  useEffect(() => {
    const STORAGE_KEY = 'toeic_bonus_deadline';
    let endTimestamp = localStorage.getItem(STORAGE_KEY);

    if (!endTimestamp) {
      endTimestamp = Date.now() + (23 * 3600 + 48 * 60 + 35) * 1000;
      localStorage.setItem(STORAGE_KEY, endTimestamp.toString());
    } else {
      endTimestamp = parseInt(endTimestamp, 10);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      let diff = endTimestamp - now;

      if (diff <= 0) {
        endTimestamp = Date.now() + (23 * 3600 + 59 * 60) * 1000;
        localStorage.setItem(STORAGE_KEY, endTimestamp.toString());
        diff = endTimestamp - now;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDigits = (n) => String(n).padStart(2, '0');

  // =========================================================================
  // 3. FAQ ACCORDION STATE
  // =========================================================================
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // =========================================================================
  // 3. CHECKOUT FORM STATE
  // =========================================================================
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    target: '750'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.phone) {
      alert('Vui lòng điền đầy đủ Họ và tên cùng Số điện thoại để Thầy Hưng liên hệ tư vấn lộ trình nhé!');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      alert(`🎉 Cảm ơn ${formData.fullname}! Bạn đã đăng ký nhận tư vấn lộ trình bứt phá TOEIC kèm trọn bộ 5 Quà Tặng Độc Quyền. Thầy Hưng và ban đào tạo sẽ liên hệ qua SĐT ${formData.phone} trong ít phút.`);
    }, 700);
  };

  // =========================================================================
  // 4. LIVE ORDER TOAST STATE (Bottom Left)
  // =========================================================================
  const [toastData, setToastData] = useState({
    show: false,
    name: 'Nguyễn Hải Đăng',
    detail: 'Đã đăng ký nhận tư vấn lộ trình + 5 Quà tặng',
    time: 'Vừa xong'
  });

  useEffect(() => {
    const orders = [
      { name: 'Nguyễn Hải Đăng', detail: 'Đã đăng ký nhận tư vấn lộ trình + 5 Quà tặng', time: 'Vừa xong' },
      { name: 'Trần Thảo Linh', detail: 'Đăng ký mục tiêu 750+ TOEIC ra trường', time: '2 phút trước' },
      { name: 'Lê Minh Tuấn', detail: 'Kỹ sư FPT Software nhận lộ trình 60 ngày', time: '5 phút trước' },
      { name: 'Hoàng Yến Nhi', detail: 'Đã kích hoạt hỗ trợ 1-1 cùng Thầy Hưng', time: '8 phút trước' }
    ];

    let index = 0;
    const toastInterval = setInterval(() => {
      setToastData({ ...orders[index], show: true });
      setTimeout(() => {
        setToastData((prev) => ({ ...prev, show: false }));
      }, 4000);
      index = (index + 1) % orders.length;
    }, 12000);

    return () => clearInterval(toastInterval);
  }, []);

  // =========================================================================
  // 5. MOBILE NAVBAR DRAWER STATE
  // =========================================================================
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-navy-main)', color: 'var(--text-white)' }}>
      {/* =====================================================================
          NAVBAR: LOGO.WEBP ONLY, NO REDUNDANT TEXT, PRO GLASS, 120 FPS
          ===================================================================== */}
      <header className="pro-navbar">
        <div className="story-container-wide pro-navbar-inner">
          {/* Brand Logo: Logo.webp replaces the entire previous Academy Master Class cluster */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="brand-logo-link"
            title="Trang chủ"
          >
            <img
              src="/image/Logo.webp"
              alt="Logo"
              className="brand-logo-img"
            />
          </a>

          {/* Desktop Navigation Links with Generous Spacing & Light Brown Hover */}
          <nav className="pro-nav-links">
            <a href="#van-de" onClick={(e) => scrollToSection(e, '#van-de')} className="pro-nav-item">
              Vấn Đề
            </a>
            <a href="#giai-phap" onClick={(e) => scrollToSection(e, '#giai-phap')} className="pro-nav-item">
              Phương Pháp
            </a>
            <a href="#lo-trinh" onClick={(e) => scrollToSection(e, '#lo-trinh')} className="pro-nav-item">
              Lộ Trình 60 Ngày
            </a>
            <a href="#qua-tang" onClick={(e) => scrollToSection(e, '#qua-tang')} className="pro-nav-item">
              Quà Tặng (Bonus)
            </a>
            <a href="#giang-vien" onClick={(e) => scrollToSection(e, '#giang-vien')} className="pro-nav-item">
              Thầy Phạm Việt Hưng
            </a>
            <a href="#faq" onClick={(e) => scrollToSection(e, '#faq')} className="pro-nav-item">
              Hỏi Đáp
            </a>
          </nav>

          {/* Desktop Right CTA Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href="#dang-ky"
              onClick={(e) => scrollToSection(e, '#dang-ky')}
              className="btn-brown"
              style={{ padding: '0.65rem 1.6rem', fontSize: '0.88rem' }}
            >
              <span>ĐĂNG KÝ TƯ VẤN</span>
              <ArrowRight size={16} />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <a href="#van-de" onClick={(e) => scrollToSection(e, '#van-de')} className="pro-nav-item">
              Vấn Đề
            </a>
            <a href="#giai-phap" onClick={(e) => scrollToSection(e, '#giai-phap')} className="pro-nav-item">
              Phương Pháp
            </a>
            <a href="#lo-trinh" onClick={(e) => scrollToSection(e, '#lo-trinh')} className="pro-nav-item">
              Lộ Trình 60 Ngày
            </a>
            <a href="#qua-tang" onClick={(e) => scrollToSection(e, '#qua-tang')} className="pro-nav-item">
              Quà Tặng (Bonus)
            </a>
            <a href="#giang-vien" onClick={(e) => scrollToSection(e, '#giang-vien')} className="pro-nav-item">
              Thầy Phạm Việt Hưng
            </a>
            <a href="#faq" onClick={(e) => scrollToSection(e, '#faq')} className="pro-nav-item">
              Hỏi Đáp
            </a>
            <a
              href="#dang-ky"
              onClick={(e) => scrollToSection(e, '#dang-ky')}
              className="btn-brown"
              style={{ padding: '0.75rem 1.5rem', textAlign: 'center', marginTop: '0.5rem' }}
            >
              ĐĂNG KÝ TƯ VẤN NGAY
            </a>
          </div>
        )}
      </header>

      {/* =====================================================================
          SECTION 1: HERO SECTION (2 CỘT: TRÁI = GIỚI THIỆU, PHẢI = HÌNH ẢNH)
          ===================================================================== */}
      <section className="story-section story-section-main" style={{ paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
        <div className="story-container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Cột Trái: Giới thiệu & Giá cả liên hệ */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'left' }}
            >
              <div className="pill-badge pill-badge-brown" style={{ marginBottom: '1rem' }}>
                <Sparkles size={14} />
                <span>Hệ Thống Huấn Luyện TOEIC Thực Chiến 2025 - 2026</span>
              </div>

              <h1 style={{ marginBottom: '1rem', fontSize: 'clamp(1.95rem, 3.2vw, 2.9rem)', lineHeight: 1.22 }}>
                Bứt Phá <span className="text-brown-gradient">650+ Đến 800+ TOEIC</span> Trong 60 Ngày Dù Mất Gốc Hay Từng Thất Bại
              </h1>

              <p style={{ fontSize: '1.02rem', color: '#D5E0ED', marginBottom: '1.35rem', lineHeight: 1.7 }}>
                Hệ thống đào tạo số All-in-One hoàn chỉnh dành cho Sinh viên và Người đi làm: Xóa tan nỗi sợ tiếng Anh, làm chủ phản xạ âm học đề thi ETS cùng sự dẫn dắt trực tiếp từ <strong className="text-brown">Thầy Phạm Việt Hưng (985/990 TOEIC)</strong>.
              </p>

              {/* Price card - "Giá cả thì ghi liên hệ" */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.25rem',
                background: 'var(--bg-navy-card)',
                border: '1px solid rgba(212, 163, 115, 0.4)',
                borderRadius: '9999px',
                padding: '0.65rem 1.75rem',
                boxShadow: '0 8px 24px rgba(6, 14, 26, 0.35)',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#A3B8CC', fontWeight: 600 }}>Học phí ưu đãi:</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brown-400)', lineHeight: 1.1 }}>
                    LIÊN HỆ
                  </div>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)', paddingLeft: '1.25rem', textAlign: 'left' }}>
                  <div style={{ color: '#10B981', fontWeight: 700, fontSize: '0.82rem' }}>ƯU ĐÃI ĐẶC BIỆT HÔM NAY</div>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>Tặng kèm 5 quà tặng độc quyền</div>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <a
                  href="#dang-ky"
                  onClick={(e) => scrollToSection(e, '#dang-ky')}
                  className="btn-brown"
                  style={{ padding: '0.95rem 2.4rem', fontSize: '1.02rem' }}
                >
                  <span>ĐĂNG KÝ HỌC & GIỮ ƯU ĐÃI NGAY</span>
                  <ArrowRight size={18} />
                </a>
                <p style={{ fontSize: '0.85rem', color: '#A3B8CC', marginTop: '0.65rem' }}>
                  ⚡ Cam kết bảo lưu học phí & hoàn tiền 100% trong 14 ngày nếu không hài lòng
                </p>
              </div>
            </motion.div>

            {/* Cột Phải: Hình ảnh chân dung Thầy Phạm Việt Hưng */}
            <motion.div
              initial={{ opacity: 0, x: 32, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', position: 'relative' }}
            >
              <div style={{
                position: 'relative',
                maxWidth: '460px',
                margin: '0 auto'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '10%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '320px',
                  height: '320px',
                  background: 'radial-gradient(circle, rgba(212, 163, 115, 0.18) 0%, rgba(16, 35, 63, 0) 70%)',
                  zIndex: 1
                }} />
                <img
                  src="/image/cutout/NEW.png"
                  alt="Thầy Phạm Việt Hưng - 985/990 TOEIC"
                  style={{
                    width: '100%',
                    height: 'auto',
                    position: 'relative',
                    zIndex: 2,
                    filter: 'drop-shadow(0 20px 30px rgba(6, 14, 26, 0.6))',
                    display: 'block'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(20, 42, 76, 0.95)',
                  border: '1px solid rgba(212, 163, 115, 0.4)',
                  borderRadius: '9999px',
                  padding: '0.55rem 1.4rem',
                  whiteSpace: 'nowrap',
                  zIndex: 3,
                  boxShadow: '0 8px 24px rgba(6, 14, 26, 0.5)'
                }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>
                    Giảng viên <strong className="text-brown">Phạm Việt Hưng</strong> (985/990 TOEIC)
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          TRUST STATS STRIP
          ===================================================================== */}
      <section className="story-section-surface" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="story-container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              { num: '985/990', label: 'Điểm số TOEIC thực tế của Thầy Hưng' },
              { num: '5+ Năm', label: 'Kinh nghiệm luyện thi chứng chỉ ETS' },
              { num: '400+', label: 'Học viên bứt phá chuẩn đầu ra & thăng tiến' },
              { num: '60 Ngày', label: 'Lộ trình tối giản, bám sát bản chất đề thi' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--brown-400)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {stat.num}
                </div>
                <div style={{ fontSize: '0.88rem', color: '#A3B8CC', marginTop: '0.45rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: 5 PAIN POINTS & VÒNG XOÁY BẾ TẮC
          ===================================================================== */}
      <section id="van-de" className="story-section story-section-main">
        <div className="story-container">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pill-badge pill-badge-brown" style={{ marginBottom: '1rem' }}>
              NỖI ĐAU CỦA BẠN
            </div>
            <h2>
              <span className="text-golden-title">Có Phải Bạn Đang Rơi Vào “Vòng Xoáy Bế Tắc” Này?</span>
            </h2>
            <p style={{ marginTop: '0.75rem', color: '#D5E0ED' }}>
              Dù đã đầu tư tiền bạc mua sách vở, cày đề thâu đêm nhưng điểm số vẫn giậm chân tại chỗ ở mức 400 - 550 điểm:
            </p>

            {/* Story Quote Block */}
            <div className="story-quote">
              "Hơn 400 học viên đã vượt qua nỗi sợ mất gốc tiếng Anh để cầm tấm bằng 650+, 750+, 850+ ra trường và thăng tiến công việc. Phương pháp của tôi tập trung vào bản chất tư duy đề thi, không học vẹt, không bắt ép nhồi nhét."
            </div>
          </motion.div>

          <div style={{ display: 'grid', gap: '1.25rem', marginTop: '2.5rem' }}>
            {[
              {
                title: 'Nghe như vịt nghe sấm, không theo kịp tốc độ đài',
                desc: 'Băng đài đọc quá nhanh, các từ nối âm và nuốt âm dính chùm vào nhau. Khi não bạn vừa dịch xong câu trước thì băng đã chuyển sang câu hỏi tiếp theo.'
              },
              {
                title: 'Học vẹt từ vựng trước, vào phòng thi quên sạch',
                desc: 'Ghi chép hàng trăm từ vào sổ tay nhưng học chay thiếu ngữ cảnh. Đến khi gặp lại trong đoạn văn Part 7, bạn thấy từ rất quen nhưng không nhớ nghĩa chính xác.'
              },
              {
                title: 'Bị lạc vào ma trận ngữ pháp phức tạp',
                desc: 'Cố học thuộc toàn bộ ngữ pháp tiếng Anh khiến đầu óc quá tải. Làm Part 5 mất 1-2 phút mỗi câu, đến lúc sang Part 7 thì không còn đủ thời gian đọc hiểu.'
              },
              {
                title: 'Thiếu kỷ luật và người đồng hành giải đáp',
                desc: 'Khí thế mua sách về tự học được vài ngày rồi bỏ dở. Gặp những câu sai không hiểu lý do vì sao mình sai, sinh ra tâm lý chán nản và né tránh.'
              },
              {
                title: 'Áp lực ra trường và nguy cơ mất việc lương cao',
                desc: 'Hạn nộp chứng chỉ TOEIC chuẩn đầu ra của trường đại học đang đến gần. Những cơ hội phỏng vấn vào các tập đoàn lớn bị vụt mất chỉ vì thiếu tấm bằng TOEIC.'
              }
            ].map((item, index) => (
              <div key={index} className="story-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#F87171',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '0.2rem'
                }}>
                  <XCircle size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#D5E0ED', fontSize: '0.98rem' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: 5 CÁCH HỌC CŨ & LÝ DO THẤT BẠI
          ===================================================================== */}
      <section className="story-section story-section-surface">
        <div className="story-container">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pill-badge pill-badge-navy" style={{ marginBottom: '1rem' }}>
              ĐỐI CHIẾU THỰC TẾ
            </div>
            <h2>
              <span className="text-golden-title">5 Cách Học Cũ Bạn Từng Thử (Và Vì Sao Nó Thất Bại)</span>
            </h2>
            <p style={{ marginTop: '0.75rem', color: '#D5E0ED' }}>
              Thất bại không phải do bạn kém thông minh, mà vì bạn đang đi theo những lối mòn thiếu hiệu quả:
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
            {[
              {
                title: 'Cày đề tràn lan trên mạng',
                fail: 'Thất bại vì: Chưa có phương pháp mà cày đề chỉ làm bạn lặp lại lỗi sai cũ, điểm số giậm chân tại chỗ và tạo tâm lý hoang mang.'
              },
              {
                title: 'Học ngữ pháp hàn lâm từ sách cũ',
                fail: 'Thất bại vì: Quá nặng về lý thuyết học thuật, thiếu tính thực chiến với tư duy bẫy điểm của đề thi ETS hiện nay.'
              },
              {
                title: 'Đi học trung tâm lớp đông 30 - 40 người',
                fail: 'Thất bại vì: Giảng viên dạy theo giáo trình chung, không thể theo sát từng lỗi sai phát âm hay chỉnh sửa tư duy cho riêng bạn.'
              },
              {
                title: 'Học từ vựng qua danh sách dài ngoằng',
                fail: 'Thất bại vì: Từ vựng không gắn liền với ngữ cảnh bài thi, khi nghe đài đọc trong đề thi thật bạn vẫn không nhận diện được.'
              },
              {
                title: 'Dựa dẫm vào mẹo vặt và tips lụi',
                fail: 'Thất bại vì: Đề thi ETS liên tục cập nhật format và bẫy mới. Học mẹo mà không có nền tảng phản xạ thì vào phòng thi sẽ bị "tủ đè".'
              }
            ].map((item, index) => (
              <div key={index} className="story-card story-card-brown-accent">
                <span className="module-number">0{index + 1}</span>
                <h3 style={{ fontSize: '1.18rem', color: '#FFFFFF', marginBottom: '0.65rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--brown-300)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                  {item.fail}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="#giai-phap" onClick={(e) => scrollToSection(e, '#giai-phap')} className="btn-brown">
              <span>Khám Phá Hệ Thống Đột Phá Mới</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: SỰ THẬT CHẤN ĐỘNG & DELAY 3 GIÂY
          ===================================================================== */}
      <section className="story-section story-section-main">
        <div className="story-container">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--bg-navy-card)',
              border: '1px solid rgba(212, 163, 115, 0.4)',
              borderRadius: '24px',
              padding: '3.25rem 2.5rem',
              boxShadow: '0 12px 36px rgba(6, 14, 26, 0.45)'
            }}
          >
            <div className="pill-badge pill-badge-brown" style={{ marginBottom: '1.25rem' }}>
              BÍ MẬT KHOA HỌC NÃO BỘ
            </div>
            <h2 style={{ fontSize: '2.1rem', marginBottom: '1.25rem' }}>
              <span className="text-golden-title">Sự Thật Chấn Động: Lý Do Bạn Nghe Mãi Không Kịp Đề Thi</span>
            </h2>
            <p style={{ fontSize: '1.12rem', color: '#D5E0ED', lineHeight: 1.75, marginBottom: '2rem' }}>
              Theo nghiên cứu thực nghiệm trên 400 học viên, <strong className="text-brown">85% người học gặp hiện tượng “Delay 3 Giây”</strong>. Khi người bản xứ phát âm, não bạn cố gắng dịch từng từ sang tiếng Việt để hiểu nghĩa. Chính thao tác dịch nhẩm này làm bạn trễ nhịp với audio và bỏ lỡ hoàn toàn các câu tiếp theo.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {[
                {
                  title: 'Acoustic Decoding',
                  desc: 'Chuẩn hóa hiện tượng nuốt âm, nối từ để tai bạn nhận diện âm thanh tự nhiên của 4 giọng đọc ETS.'
                },
                {
                  title: 'Phản Xạ Trực Giác',
                  desc: 'Loại bỏ thói quen dịch nhẩm thô; nghe trực tiếp hiểu ngay từ khóa chính của đoạn hội thoại.'
                },
                {
                  title: 'Kháng Bẫy Paraphrasing',
                  desc: 'Bẻ khóa các cặp từ đồng nghĩa kinh điển mà đề thi ETS luôn dùng để đánh lừa thí sinh.'
                }
              ].map((pill, i) => (
                <div key={i} style={{
                  background: 'var(--bg-navy-surface-alt)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(212, 163, 115, 0.25)'
                }}>
                  <div style={{ color: 'var(--brown-400)', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.4rem' }}>
                    {pill.title}
                  </div>
                  <p style={{ color: '#A3B8CC', fontSize: '0.92rem' }}>{pill.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: HỆ THỐNG TOEIC ALL-IN-ONE (3 TRỤ CỘT)
          ===================================================================== */}
      <section id="giai-phap" className="story-section story-section-surface">
        <div className="story-container">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pill-badge pill-badge-brown" style={{ marginBottom: '1rem' }}>
              GIẢI PHÁP ĐỘT PHÁ
            </div>
            <h2>
              <span className="text-golden-title">Hệ Thống TOEIC ALL-IN-ONE</span>
            </h2>
            <p style={{ marginTop: '0.75rem', color: '#D5E0ED' }}>
              3 Trụ cột cốt lõi giúp học viên bứt phá điểm số trong vòng 60 ngày ôn luyện tập trung:
            </p>
          </motion.div>

          <div style={{ display: 'grid', gap: '2rem', marginTop: '2.5rem' }}>
            {[
              {
                num: '01',
                title: 'Acoustic Decoding (Chuẩn Hóa Âm Thanh)',
                desc: 'Huấn luyện thính giác bóc tách ngữ âm người bản xứ (Mỹ, Anh, Úc, Canada). Nắm bắt chính xác từ khóa trọng tâm của Part 1, 2, 3, 4 mà không cần nghe hiểu từng từ đơn lẻ.',
                points: [
                  'Kỹ thuật nghe bóc tách âm thanh nối và nuốt âm',
                  'Nhận diện các biến thể giọng đọc ETS mới nhất',
                  'Loại bỏ hoàn toàn thói quen dịch nhẩm gây trễ nhịp'
                ]
              },
              {
                num: '02',
                title: 'Pattern Recognition (Định Vị 5 Giây)',
                desc: 'Phương pháp quét cấu trúc ngữ pháp và từ loại giúp giải quyết 70% câu hỏi Part 5 trong vòng 15 - 30 giây, tiết kiệm thời gian quý giá cho phần đọc hiểu.',
                points: [
                  'Bản đồ 12 chủ điểm ngữ pháp trọng tâm đề thi thật',
                  'Công thức nhìn 4 đáp án phân loại câu hỏi ngay tức thì',
                  'Mẹo nhận diện bẫy từ loại và giới từ không cần dịch nghĩa'
                ]
              },
              {
                num: '03',
                title: 'Speed Reading (Quét Đề Đỉnh Cao)',
                desc: 'Chiến lược Skimming & Scanning định hướng câu hỏi trước khi đọc đoạn văn. Không bao giờ rơi vào tình trạng hết giờ mà phải đánh lụi 20-30 câu Part 7.',
                points: [
                  'Kỹ thuật quét câu hỏi và khoanh vùng dữ liệu trong đoạn văn',
                  'Phương pháp giải đoạn văn kép (Double/Triple passages) siêu tốc',
                  'Quản trị thời gian 120 phút khoa học, dư 5-10 phút soát bài'
                ]
              }
            ].map((pillar, index) => (
              <div key={index} className="story-card" style={{ padding: '2.75rem 2.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="module-number">{pillar.num}</span>
                  <span className="pill-badge pill-badge-brown">TRỤ CỘT CỐT LÕI</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', color: '#FFFFFF', marginBottom: '0.85rem' }}>
                  {pillar.title}
                </h3>
                <p style={{ color: '#D5E0ED', fontSize: '1.02rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                  {pillar.desc}
                </p>
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
                      <CheckCircle2 size={18} className="text-brown" />
                      <span style={{ color: '#FFFFFF', fontSize: '0.96rem' }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: 4 PHẨM CHẤT 800+ VS 450 TOEIC
          ===================================================================== */}
      <section className="story-section story-section-main">
        <div className="story-container">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pill-badge pill-badge-brown" style={{ marginBottom: '1rem' }}>
              TƯ DUY ĐỈNH CAO
            </div>
            <h2>
              <span className="text-golden-title">4 Kỹ Năng Quyết Định Người Đạt 800+ TOEIC</span>
            </h2>
            <p style={{ marginTop: '0.75rem', color: '#D5E0ED' }}>
              Những yếu tố sống còn mà các lớp học đại trà không trang bị cho bạn:
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
            {[
              {
                title: 'Bắt Âm Tự Động (Acoustic Reflex)',
                desc: 'Nhận diện ngay các cặp từ dính âm. Không có kỹ năng này, bạn sẽ liên tục bị hụt thông tin ở Part 2 & Part 3.'
              },
              {
                title: 'Quét Ngữ Pháp 15s (Grammar Scanning)',
                desc: 'Nhìn 4 đáp án biết ngay vị trí ngữ pháp cần điền mà không cần mất công dịch nghĩa cả câu dài dòng.'
              },
              {
                title: 'Kháng Bẫy Paraphrase (Synonym Master)',
                desc: 'Nhận diện từ đồng nghĩa giữa câu hỏi và đoạn văn. Đây là kỹ năng phân loại thí sinh 500 điểm và 800 điểm.'
              },
              {
                title: 'Tâm Lý Chiến & Phân Bổ Năng Lượng',
                desc: 'Phân bổ năng lượng 120 phút khoa học, biết bỏ câu khó để giữ trọn điểm câu dễ, không bị đuối sức về cuối.'
              }
            ].map((item, index) => (
              <div key={index} className="story-card">
                <div style={{ color: 'var(--brown-400)', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.65rem' }}>
                  KỸ NĂNG #{index + 1}
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#D5E0ED', fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: VALUE STACK & 5 QUÀ TẶNG BONUSES
          ===================================================================== */}
      <section id="qua-tang" className="story-section story-section-surface">
        <div className="story-container">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span className="pill-badge pill-badge-brown">QUÀ TẶNG ĐỘC QUYỀN</span>
              <div className="bonus-countdown-pill">
                <Clock size={15} style={{ color: '#F59E0B' }} />
                <span>Thời gian còn lại để nhận quà:</span>
                <span className="bonus-timer-box">
                  {formatDigits(timeLeft.hours)} : {formatDigits(timeLeft.minutes)} : {formatDigits(timeLeft.seconds)}
                </span>
              </div>
            </div>
            <h2>
              <span className="text-golden-title">Đăng Ký Khóa Học - Tặng Kèm 5 Bộ Quà Tặng Độc Quyền</span>
            </h2>
            <p style={{ marginTop: '0.75rem', color: '#D5E0ED' }}>
              Mỗi phần quà giải quyết một rào cản cụ thể giúp bạn đẩy nhanh tốc độ tiến bộ:
            </p>
          </motion.div>

          <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2.5rem' }}>
            {[
              {
                num: '01',
                title: 'Bộ 1.200 Từ Vựng Trọng Tâm Format ETS 2024 - 2026',
                val: 'Trị giá: 600.000 VNĐ',
                desc: 'File Flashcard Anki thông minh kèm audio phát âm chuẩn người bản ngữ, giúp bạn ghi nhớ sâu vào tiềm thức chỉ với 15 phút mỗi ngày.'
              },
              {
                num: '02',
                title: 'Bí Kíp Vượt Bẫy Part 1-2-3-4 Không Cần Dịch Thô',
                val: 'Trị giá: 500.000 VNĐ',
                desc: 'Sổ tay tổng hợp 18 bẫy âm thanh thường gặp nhất (từ đồng âm, câu hỏi gián tiếp, câu trả lời bẫy) giúp ăn chắc 80% điểm số Listening.'
              },
              {
                num: '03',
                title: 'Hack Tốc Độ Part 5-6 Trong 30s & Bản Đồ 12 Chủ Điểm',
                val: 'Trị giá: 500.000 VNĐ',
                desc: 'Bản đồ tư duy 12 chủ điểm ngữ pháp chắc chắn ra trong đề thi và công thức 3 bước nhìn đáp án loại trừ siêu tốc.'
              },
              {
                num: '04',
                title: 'Ngân Hàng 10 Đề Thi Thử Có Giải Thích Chi Tiết Từng Câu',
                val: 'Trị giá: 800.000 VNĐ',
                desc: '10 bộ đề sát sườn format thi thật, đi kèm bản transcript giải nghĩa chi tiết từng câu và bảng quy đổi điểm số chuẩn xác.'
              },
              {
                num: '05',
                title: 'Lịch Trình 60 Ngày + Group Zalo Kèm 1-1 Cùng Thầy Hưng',
                val: 'Trị giá: 800.000 VNĐ',
                desc: 'Lịch học chi tiết từng ngày và quyền tham gia nhóm hỗ trợ kín, được Thầy Hưng trực tiếp kiểm tra tiến độ và sửa lỗi giải đề mỗi ngày.'
              }
            ].map((bonus, index) => (
              <div key={index} className="story-card" style={{ display: 'flex', gap: '1.75rem', alignItems: 'flex-start' }}>
                <span className="module-number" style={{ fontSize: '2.5rem', flexShrink: 0 }}>
                  {bonus.num}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF' }}>{bonus.title}</h3>
                    <span className="pill-badge pill-badge-brown" style={{ fontSize: '0.78rem' }}>
                      {bonus.val}
                    </span>
                  </div>
                  <p style={{ color: '#D5E0ED', fontSize: '0.98rem' }}>{bonus.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Total Value Summary Card */}
          <div style={{
            background: 'var(--bg-navy-card)',
            borderRadius: '24px',
            border: '2px solid rgba(212, 163, 115, 0.45)',
            padding: '2.5rem',
            marginTop: '2.5rem',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(6, 14, 26, 0.4)'
          }}>
            <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Trọn Gói Khóa Học Kèm 5 Quà Tặng Độc Quyền
            </h3>
            <p style={{ color: '#D5E0ED', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              Sở hữu trọn đời tài khoản học tập, toàn bộ giáo trình số và quyền đồng hành cùng Thầy Phạm Việt Hưng đến khi đạt mục tiêu!
            </p>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--brown-400)', lineHeight: 1, marginBottom: '1.5rem' }}>
              HỌC PHÍ: LIÊN HỆ
            </div>
            <a
              href="#dang-ky"
              onClick={(e) => scrollToSection(e, '#dang-ky')}
              className="btn-brown"
              style={{ padding: '1.1rem 2.8rem', fontSize: '1.05rem' }}
            >
              ĐĂNG KÝ TƯ VẤN & NHẬN TOÀN BỘ QUÀ TẶNG
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: BẢNG SO SÁNH TRƯỚC & SAU (BEFORE & AFTER)
          ===================================================================== */}
      <section className="story-section story-section-main">
        <div className="story-container">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pill-badge pill-badge-brown" style={{ marginBottom: '1rem' }}>
              SỰ KHÁC BIỆT
            </div>
            <h2>
              <span className="text-golden-title">Bảng Đối Chiếu Trước & Sau Khi Sở Hữu Khóa Học</span>
            </h2>
            <p style={{ marginTop: '0.75rem', color: '#D5E0ED' }}>
              Sự khác biệt rõ rệt sau 60 ngày theo sát phương pháp cùng Thầy Hưng:
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem',
            marginTop: '2.5rem'
          }}>
            {/* Before Column */}
            <div style={{
              background: '#0E1F38',
              borderRadius: '20px',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              padding: '2.25rem 2rem'
            }}>
              <div style={{
                color: '#F87171',
                fontWeight: 800,
                fontSize: '1.15rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <XCircle size={22} />
                <span>Trước Khi Tham Gia</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
                {[
                  'Mất gốc, hoang mang không biết bắt đầu ôn từ đâu.',
                  'Nghe băng như vịt nghe sấm, liên tục bị chậm nhịp và đánh lụi.',
                  'Làm Part 5 mất 15-20 phút, sai những câu bẫy cơ bản.',
                  'Hết giờ làm bài Part 7 mà còn bỏ trống 20 câu.',
                  'Áp lực ra trường, tự ti trước bạn bè đã có chứng chỉ.',
                  'Tốn hàng triệu đồng học trung tâm đại trà không hiệu quả.'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#A3B8CC', fontSize: '0.95rem' }}>
                    <span style={{ color: '#F87171', fontWeight: 800 }}>✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After Column */}
            <div style={{
              background: 'var(--bg-navy-card)',
              borderRadius: '20px',
              border: '2px solid rgba(212, 163, 115, 0.5)',
              padding: '2.25rem 2rem',
              boxShadow: '0 8px 24px rgba(6, 14, 26, 0.35)'
            }}>
              <div style={{
                color: 'var(--brown-400)',
                fontWeight: 800,
                fontSize: '1.15rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle2 size={22} />
                <span>Sau 60 Ngày Cùng Thầy Hưng</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
                {[
                  'Có lộ trình chi tiết từng ngày, hiểu rõ phương pháp học đúng.',
                  'Nghe trực tiếp hiểu nghĩa, bắt trọn từ khóa Part 1-2-3-4.',
                  'Quét nhanh đáp án Part 5 chỉ trong 15 - 30 giây/câu.',
                  'Làm chủ tốc độ đọc Part 7, dư 5-10 phút soát lại bài.',
                  'Cầm chắc chứng chỉ 650+ / 800+ TOEIC, tự tin apply việc tốt.',
                  'Tiết kiệm hàng chục triệu đồng và tối ưu hóa thời gian.'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#FFFFFF', fontSize: '0.96rem' }}>
                    <span className="text-brown" style={{ fontWeight: 800 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: LỘ TRÌNH HUẤN LUYỆN 60 NGÀY STEP-BY-STEP
          ===================================================================== */}
      <section id="lo-trinh" className="story-section story-section-surface">
        <div className="story-container">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pill-badge pill-badge-brown" style={{ marginBottom: '1rem' }}>
              BẢN ĐỒ THỰC CHIẾN
            </div>
            <h2>
              <span className="text-golden-title">Lộ Trình Huấn Luyện 60 Ngày Step-by-Step</span>
            </h2>
            <p style={{ marginTop: '0.75rem', color: '#D5E0ED' }}>
              Từng tuần học được thiết kế cô đọng, dễ hiểu, bám sát cấu trúc đề thi mới nhất:
            </p>
          </motion.div>

          <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2.5rem' }}>
            {[
              {
                step: 'Chặng 1',
                time: 'Ngày 01 - 12',
                title: 'Xóa Mù & Phá Băng Phát Âm Chuẩn ETS',
                desc: 'Chuẩn hóa bảng ngữ âm IPA theo ngữ điệu đề thi; rèn luyện phản xạ bắt âm thanh nối, nuốt âm của người bản ngữ.'
              },
              {
                step: 'Chặng 2',
                time: 'Ngày 13 - 25',
                title: 'Giải Mã 12 Điểm Ngữ Pháp & 600 Từ Vựng Cốt Lõi',
                desc: 'Rút gọn toàn bộ ngữ pháp TOEIC chỉ vào 12 chủ điểm thực chiến; nạp nhanh 600 từ vựng công sở xuất hiện nhiều nhất.'
              },
              {
                step: 'Chặng 3',
                time: 'Ngày 26 - 38',
                title: 'Làm Chủ Kỹ Năng Nghe Listening Master (Part 3 & 4)',
                desc: 'Kỹ thuật đọc trước câu hỏi và dự đoán đáp án trong 15s chuyển tiếp; phương pháp theo dõi mạch hội thoại dài không bị lạc.'
              },
              {
                step: 'Chặng 4',
                time: 'Ngày 39 - 50',
                title: 'Tăng Tốc Kỹ Năng Đọc Reading Sniper (Part 6 & 7)',
                desc: 'Làm chủ kỹ thuật đọc lướt Skimming & Scanning, nhận diện bẫy đoạn văn kép/ba; xây dựng phản xạ từ đồng nghĩa (Paraphrasing).'
              },
              {
                step: 'Chặng 5',
                time: 'Ngày 51 - 60',
                title: 'Thực Chiến Đề Thi Mới Nhất & Tối Ưu Hóa Max Score',
                desc: 'Giải bộ 10 đề thi thử chuẩn áp lực phòng thi thật; Thầy Hưng trực tiếp sửa chi tiết từng câu và tư vấn chiến thuật làm bài.'
              }
            ].map((phase, index) => (
              <div key={index} className="story-card" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ minWidth: '90px', textAlign: 'center', borderRight: '1px solid rgba(255, 255, 255, 0.12)', paddingRight: '1.5rem' }}>
                  <div style={{ color: 'var(--brown-400)', fontWeight: 800, fontSize: '1.25rem' }}>{phase.step}</div>
                  <div style={{ fontSize: '0.78rem', color: '#A3B8CC' }}>{phase.time}</div>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.35rem' }}>
                    {phase.title}
                  </h3>
                  <p style={{ color: '#D5E0ED', fontSize: '0.96rem' }}>{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10: GIẢNG VIÊN THẦY PHẠM VIỆT HƯNG
          ===================================================================== */}
      <section id="giang-vien" className="story-section story-section-main">
        <div className="story-container">
          <motion.div
            className="story-card"
            style={{ padding: '3.5rem 2.5rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}>
              <div style={{ textAlign: 'center' }}>
                <img
                  src="/image/cutout/2.png"
                  alt="Thầy Phạm Việt Hưng - 985/990 TOEIC"
                  className="mentor-cutout-img"
                />
              </div>

              <div>
                <div className="pill-badge pill-badge-brown" style={{ marginBottom: '1rem' }}>
                  NGƯỜI ĐỒNG HÀNH CÙNG BẠN
                </div>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Thầy Phạm Việt Hưng</h2>
                <div style={{ fontSize: '1.1rem', color: 'var(--brown-400)', fontWeight: 700, marginBottom: '1.25rem' }}>
                  985/990 TOEIC • Chuyên Gia Luyện Thi ETS 5+ Năm Kinh Nghiệm
                </div>
                <p style={{ color: '#D5E0ED', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  Với hơn 5 năm gắn bó cùng các thế hệ sinh viên và người đi làm, Thầy Hưng đã đúc kết bộ giáo trình và phương pháp Acoustic Decoding giúp hơn 400 học viên đạt chuẩn đầu ra đại học và nâng tầm thu nhập.
                </p>

                <div style={{ display: 'grid', gap: '0.85rem' }}>
                  {[
                    '985/990 TOEIC Official Test',
                    '5+ Năm kinh nghiệm trực tiếp giảng dạy & biên soạn đề thi',
                    'Người sáng lập phương pháp Acoustic Decoding cho người mất gốc',
                    'Đồng hành & trực tiếp giải đáp 1-1 trong suốt 60 ngày'
                  ].map((highlight, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Award size={18} className="text-brown" />
                      <span style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 11: TESTIMONIALS & BẰNG CHỨNG THÀNH CÔNG
          ===================================================================== */}
      <section className="story-section story-section-surface">
        <div className="story-container">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pill-badge pill-badge-brown" style={{ marginBottom: '1rem' }}>
              KẾT QUẢ THỰC TẾ
            </div>
            <h2>
              <span className="text-golden-title">Học Viên Chia Sẻ Về Sự Chuyển Hóa Của Họ</span>
            </h2>
            <p style={{ marginTop: '0.75rem', color: '#D5E0ED' }}>
              Hàng trăm học viên đã bứt phá điểm số sau khóa học:
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
            {[
              {
                name: 'Nguyễn Thùy Trang',
                role: 'Sinh viên ĐH Kinh Tế Quốc Dân',
                score: '785 TOEIC (Tăng 320đ)',
                comment: 'Trước đây em sợ phần Nghe lắm, thi thử chỉ được tầm 180 điểm nghe. Sau 7 tuần học lộ trình của Thầy Hưng, em hiểu được cách nối âm và bẫy Part 2-3. Kết quả thi thật em đạt 785 TOEIC, kịp nộp bằng tốt nghiệp loại Giỏi!'
              },
              {
                name: 'Hoàng Quốc Việt',
                role: 'Kỹ sư Viettel Network',
                score: '820 TOEIC (Tăng 280đ)',
                comment: 'Mình đi làm bận rộn từ sáng đến tối, từng bỏ dở 2 khóa ở trung tâm. Khóa học số của Thầy Hưng cực kỳ linh hoạt, mỗi video chỉ 15-20 phút mà đọng lại kiến thức sâu. Thi lần đầu mình đạt 820 TOEIC, được công ty tăng 25% lương!'
              },
              {
                name: 'Đặng Minh Châu',
                role: 'Sinh viên ĐH Ngoại Thương',
                score: '740 TOEIC (Tăng 350đ)',
                comment: 'Bản thân em là đứa mất gốc hoàn toàn, nhìn vào đề thi là đau đầu. Phương pháp quét Part 5 trong 30s của Thầy Hưng như cứu rỗi em vậy. Em làm bài đọc không còn bị thiếu giờ nữa. Ngày nhận kết quả 740 TOEIC em mừng rơi nước mắt!'
              }
            ].map((review, i) => (
              <div key={i} className="story-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--brown-400)', marginBottom: '1rem' }}>
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p style={{ color: '#E2EBF5', fontStyle: 'italic', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    "{review.comment}"
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
                  <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '1rem' }}>{review.name}</div>
                  <div style={{ fontSize: '0.82rem', color: '#A3B8CC' }}>{review.role}</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--brown-400)', fontWeight: 700, marginTop: '0.25rem' }}>
                    {review.score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 12: 3 TẦNG CAM KẾT VÀNG
          ===================================================================== */}
      <section className="story-section story-section-main">
        <div className="story-container">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pill-badge pill-badge-brown" style={{ marginBottom: '1rem' }}>
              RỦI RO BẰNG 0
            </div>
            <h2>
              <span className="text-golden-title">3 Tầng Cam Kết Vàng Dành Cho Học Viên</span>
            </h2>
            <p style={{ marginTop: '0.75rem', color: '#D5E0ED' }}>
              Bạn không chịu bất kỳ rủi ro nào khi đăng ký tham gia khóa học:
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
            {[
              {
                icon: <Award size={28} className="text-brown" />,
                title: '1. Cam Kết Chuẩn Đầu Ra',
                desc: 'Đồng hành hỗ trợ đến khi bạn đạt mục tiêu điểm số. Được học lại hoàn toàn miễn phí nếu chưa đạt target.'
              },
              {
                icon: <ShieldCheck size={28} className="text-brown" />,
                title: '2. Hoàn Tiền 100% Trong 14 Ngày',
                desc: 'Nếu làm theo đúng bài tập mà cảm thấy phương pháp không hiệu quả, Thầy Hưng hoàn trả 100% học phí không hỏi thêm câu nào.'
              },
              {
                icon: <Lock size={28} className="text-brown" />,
                title: '3. Bảo Mật Thông Tin',
                desc: 'Thông tin và số điện thoại của bạn được mã hóa an toàn 100%, tuyệt đối không làm phiền hay chia sẻ ra ngoài.'
              }
            ].map((guarantee, i) => (
              <div key={i} className="story-card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(212, 163, 115, 0.12)',
                  border: '1px solid rgba(212, 163, 115, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}>
                  {guarantee.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.65rem' }}>
                  {guarantee.title}
                </h3>
                <p style={{ color: '#D5E0ED', fontSize: '0.95rem' }}>{guarantee.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 13: FORM ĐĂNG KÝ GIỮ CHỖ (NAVY CARD & LIGHT BROWN)
          ===================================================================== */}
      <section id="dang-ky" className="story-section story-section-surface">
        <div className="story-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--bg-navy-card)',
              border: '2px solid rgba(212, 163, 115, 0.45)',
              borderRadius: '24px',
              padding: '3.25rem 2.5rem',
              boxShadow: '0 16px 40px rgba(6, 14, 26, 0.45)'
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 2.5rem' }}>
              <div className="pill-badge pill-badge-brown" style={{ marginBottom: '1rem' }}>
                ĐĂNG KÝ TƯ VẤN
              </div>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>
                <span className="text-golden-title">Nhận Lộ Trình Huấn Luyện & 5 Quà Tặng</span>
              </h2>
              <p style={{ color: '#D5E0ED', fontSize: '1.05rem' }}>
                Để lại thông tin để Thầy Phạm Việt Hưng trực tiếp phân tích trình độ và tư vấn lộ trình:
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '520px', margin: '0 auto' }}>
              <div className="form-field">
                <label className="form-label">Họ và tên của bạn *</label>
                <input
                  type="text"
                  name="fullname"
                  required
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="story-input"
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Số điện thoại (Nhận tư vấn & tài liệu qua Zalo) *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Ví dụ: 0912 345 678"
                  className="story-input"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Địa chỉ Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Ví dụ: vanan@gmail.com"
                  className="story-input"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Mục tiêu điểm số bạn muốn đạt được</label>
                <select
                  name="target"
                  className="story-select"
                  value={formData.target}
                  onChange={handleInputChange}
                >
                  <option value="650">Bứt phá 650+ TOEIC (Chuẩn đầu ra ĐH)</option>
                  <option value="750">Chinh phục 750+ TOEIC (Apply việc tốt)</option>
                  <option value="850">Chạm mốc 850+ TOEIC (Thăng tiến lương)</option>
                </select>
              </div>

              {/* Order Summary Box */}
              <div style={{
                background: '#10233F',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', color: '#A3B8CC', fontSize: '0.92rem' }}>
                  <span>5 Bộ Quà tặng độc quyền:</span>
                  <span className="text-brown">MIỄN PHÍ KÈM THEO</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontWeight: 800, fontSize: '1.2rem', color: '#FFFFFF' }}>
                  <span>Học phí ưu đãi:</span>
                  <span style={{ color: 'var(--brown-400)', fontSize: '1.35rem' }}>LIÊN HỆ</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-brown"
                style={{ width: '100%', padding: '1.15rem', fontSize: '1.08rem' }}
              >
                {isSubmitting ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐĂNG KÝ TƯ VẤN LỘ TRÌNH'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.82rem', color: '#A3B8CC' }}>
                🔒 Thông tin được bảo mật 100% • Hỗ trợ kèm 1-1 cùng Thầy Hưng
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 14: FAQ ACCORDION
          ===================================================================== */}
      <section id="faq" className="story-section story-section-main">
        <div className="story-container">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pill-badge pill-badge-brown" style={{ marginBottom: '1rem' }}>
              GIẢI ĐÁP THẮC MẮC
            </div>
            <h2>Những Câu Hỏi Thường Gặp Về Khóa Học</h2>
            <p style={{ marginTop: '0.75rem', color: '#D5E0ED' }}>
              Mọi thắc mắc của bạn đều được giải đáp rõ ràng, minh bạch:
            </p>
          </motion.div>

          <div style={{ marginTop: '2.5rem' }}>
            {[
              {
                q: 'Em bị mất gốc hoàn toàn, nghe không hiểu gì có theo kịp không?',
                a: 'Khóa học được thiết kế đặc biệt cho người mất gốc hoặc bị bế tắc điểm số. Chặng 1 sẽ hướng dẫn bạn từ phát âm IPA, bóc tách nối âm đến cách nghe từ khóa dễ nhất. Hơn 400 học viên xuất phát từ con số 0 đã thành công.'
              },
              {
                q: 'Khóa học này hình thức học như thế nào?',
                a: 'Bạn học qua video bài giảng số chất lượng cao quay sẵn của Thầy Phạm Việt Hưng, học bất kỳ lúc nào trên điện thoại/máy tính. Đi kèm là tài liệu PDF, flashcard và nhóm Zalo kín để Thầy Hưng trực tiếp sửa bài mỗi ngày.'
              },
              {
                q: 'Khóa học có thời hạn sử dụng bao lâu?',
                a: 'Bạn sở hữu trọn đời tài khoản học tập và toàn bộ tài liệu giáo trình số. Bạn có thể xem lại bất cứ khi nào cần ôn thi lại mà không phát sinh thêm chi phí.'
              },
              {
                q: 'Nếu học không hiệu quả thì chính sách hoàn tiền ra sao?',
                a: 'Thầy Hưng cam kết hoàn tiền 100% trong 14 ngày đầu tiên nếu bạn làm theo bài tập mà cảm thấy phương pháp không phù hợp. Không cần lý do phức tạp.'
              },
              {
                q: 'Sau bao lâu kể từ khi đăng ký thì em nhận được tài khoản?',
                a: 'Ngay sau khi điền form đăng ký thành công, ban đào tạo sẽ liên hệ xác nhận và kích hoạt tài khoản học cho bạn trong vòng 15 - 30 phút qua Zalo.'
              },
              {
                q: 'Em có được Thầy Hưng hỗ trợ trực tiếp không?',
                a: 'Có. Mỗi ngày Thầy Hưng sẽ theo dõi tiến độ trong nhóm Zalo kín, giải đáp mọi câu hỏi và phân tích lỗi sai trong các đề thi thử của bạn.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="faq-row"
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-row-header">
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className="text-brown"
                    style={{
                      transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease'
                    }}
                  />
                </div>
                {openFaq === index && (
                  <div className="faq-row-content">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER (LOGO.WEBP WITH LEGAL NOTICES)
          ===================================================================== */}
      <footer className="story-footer">
        <div className="story-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}>
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <img
                  src="/image/Logo.webp"
                  alt="Logo"
                  style={{ height: '44px', width: 'auto' }}
                />
              </div>
              <p style={{ color: '#A3B8CC', fontSize: '0.92rem', lineHeight: 1.65 }}>
                Hệ thống đào tạo và luyện thi TOEIC chuẩn thực chiến. Đồng hành cùng sinh viên và người đi làm bứt phá mục tiêu điểm số trong 60 ngày.
              </p>
            </div>

            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1rem' }}>Liên Kết Nhanh</h4>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem', fontSize: '0.92rem', color: '#D5E0ED' }}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-300">Trang Chủ</a></li>
                <li><a href="#giai-phap" onClick={(e) => scrollToSection(e, '#giai-phap')} className="hover:text-amber-300">Phương Pháp Huấn Luyện</a></li>
                <li><a href="#lo-trinh" onClick={(e) => scrollToSection(e, '#lo-trinh')} className="hover:text-amber-300">Lộ Trình 60 Ngày</a></li>
                <li><a href="#giang-vien" onClick={(e) => scrollToSection(e, '#giang-vien')} className="hover:text-amber-300">Giảng Viên Phạm Việt Hưng</a></li>
                <li><a href="#dang-ky" onClick={(e) => scrollToSection(e, '#dang-ky')} className="hover:text-amber-300">Đăng Ký Tư Vấn</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1rem' }}>Thông Tin Hỗ Trợ</h4>
              <p style={{ color: '#D5E0ED', fontSize: '0.92rem', lineHeight: 1.7 }}>
                Hotline Tư Vấn: <strong className="text-brown">0904 244 824</strong><br />
                Email: support@mrhtoeic.com<br />
                Thời gian hỗ trợ: 08:00 - 22:00 (Tất cả các ngày trong tuần)
              </p>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            textAlign: 'center',
            fontSize: '0.82rem',
            color: '#7991A8',
            lineHeight: 1.7
          }}>
            <p style={{ marginBottom: '0.75rem' }}>
              © 2025 - 2026 TOEIC ALL-IN-ONE. All Rights Reserved. Bản quyền thuộc về Giảng viên Phạm Việt Hưng.
            </p>
            <p style={{ maxWidth: '780px', margin: '0 auto', fontSize: '0.76rem' }}>
              Lưu ý: ĐÂY KHÔNG PHẢI WEB ĐỘC QUYỀN CỦA TỔ CHỨC ETS
            </p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
              
            </p>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          STICKY FLOATING CTA BUTTON (BOTTOM RIGHT - 120 FPS OPTIMIZED)
          ===================================================================== */}
      <a
        href="#dang-ky"
        onClick={(e) => scrollToSection(e, '#dang-ky')}
        className="sticky-floating-cta"
        title="Cuộn xuống form đăng ký tư vấn"
      >
        <span>ĐĂNG KÝ TƯ VẤN</span>
        <ArrowRight size={16} />
      </a>

      {/* =====================================================================
          SOCIAL PROOF LIVE TOAST (BOTTOM LEFT)
          ===================================================================== */}
      {toastData.show && (
        <div className="story-toast">
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--brown-gradient)',
            color: '#0E1E38',
            fontWeight: 800,
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {toastData.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>
              {toastData.name}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--brown-400)' }}>
              {toastData.detail}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#A3B8CC' }}>
              {toastData.time}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

'use client';

import { useEffect } from 'react';
import { initAllInteractions } from './interactions';

export default function Home() {
  useEffect(() => {
    const cleanup = initAllInteractions();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <>




  {/*  NAVBAR  */}
  <header className="navbar" id="navbar">
    <div className="container navbar-inner">
      <a href="#" className="brand-logo-link" aria-label="Trang chủ MrH TOEIC">
        <img src="/image/logo-white.png" alt="MrH TOEIC Logo" className="brand-logo-img" />
      </a>

      <div className="nav-actions">
        <a href="#dang-ky" className="btn btn-accent nav-cta-btn">
          Tư Vấn 1-1
        </a>
      </div>
    </div>
  </header>

  {/*  HERO SECTION  */}
  <section className="hero-section" id="hero">
    {/*  Static refined background grid (no moving animations)  */}
    <div className="hero-noise-overlay"></div>

    <div className="container hero-container">
      {/*  1. TOP CENTER HEADER (Mạnh Vibe / VN Creative Style)  */}
      <div className="hero-center-header">
        <div className="hero-badge-row hero-badge-center">
          <span className="cohort-pill-limit">
            <i data-lucide="users" style={{ width: '15px', height: '15px' }}></i>
            DÀNH CHO SINH VIÊN VÀ NGƯỜI ĐI LÀM
          </span>
        </div>

        <h1 className="hero-headline-centered">
          <span className="hero-brand-name">TOEIC ONLINE PRO</span>
          <span className="hero-title-main">
            Hành trình lấy <span className="highlight-capsule">600 + TOEIC</span>
            <span className="hero-title-break">Sau 36 Buổi THỰC CHIẾN</span>
          </span>
          <span className="hero-title-sub">Học Trực Tuyến 100% Zoom Live — Đảm Bảo Chuẩn 600+ • Tự Tin Bứt Phá 800+!</span>
        </h1>

        <p className="hero-lead-text-center">
          Xóa bỏ nỗi sợ tiếng Anh với lộ trình 36 buổi bứt phá trọn vẹn CẤP TỐC trong 90 ngày. Trải nghiệm hệ thống cô đọng, tập trung 100% vào <strong className="text-light-brown">KĨ NĂNG THỰC CHIẾN PHÒNG THI</strong> thay vì cày cuốc lý thuyết rập khuôn. Khóa học đảm bảo chuẩn đầu ra 600+ sau khi học xong, đồng thời tối ưu hóa kỹ năng xử lý bài thi để bạn hoàn toàn có thể bứt phá 800+ bình thường.
        </p>
        <p className="hero-lead-zero-note">
          (Nếu như bạn MẤT GỐC thì KHÔNG SAO vì đây là lộ trình dạy CHI TIẾT TỪ CON SỐ 0)
        </p>
      </div>

      {/*  2. BOTTOM 2-COLUMN SPLIT (Left: CTA & 3 Key Specs; Right: 20% Larger Portrait)  */}
      <div className="hero-split-grid">
        {/*  Left Side: Registration CTA & 3 Core Specifications (To lên, tinh gọn)  */}
        <div className="hero-left-col">
          {/*  CTA Action Card  */}
          <div className="hero-cta-card">
            <div className="hero-urgency-timer">
              <span className="pulse-dot"></span>
              <span>Ưu đãi 50% kết thúc sau: <strong className="live-countdown">23:59:59</strong></span>
            </div>
            <a href="#dang-ky" className="btn btn-accent btn-lg btn-pulse hero-main-cta-btn">
              <span>ĐĂNG KÝ TƯ VẤN & GIỮ CHỖ</span>
              <i data-lucide="arrow-right" style={{ width: '20px', height: '20px' }}></i>
            </a>
            <div className="hero-price-tag-row">
              <span className="hero-price-badge">Học phí ưu đãi đặc biệt:</span>
              <strong className="hero-price-current">5.400.000₫</strong>
              <span className="hero-price-original">(Giá gốc: 10.800.000₫)</span>
            </div>
            <div className="hero-price-expire-note">
              *Hết thời gian đếm ngược sẽ quay về giá gốc 10.800.000₫
            </div>
          </div>

          {/*  3 Core Specs Kept & Made Larger (Dạy Live, Đảm bảo đầu ra 600, Kèm 1-1)  */}
          <div className="hero-specs-list hero-specs-prominent">
            {/*  1. Dạy Live 100%  */}
            <div className="spec-bullet-item spec-item-large">
              <div className="spec-icon-box spec-icon-large">
                <i data-lucide="video" style={{ width: '24px', height: '24px' }}></i>
              </div>
              <div className="spec-text-box">
                <div className="spec-title">Học Trực Tuyến: <strong>Dạy Live 100% tương tác 2 chiều</strong></div>
                <div className="spec-desc">Không bán video thu sẵn. Thầy Hưng trực tiếp gọi mic đọc dịch, sửa lỗi và bóc tách câu hỏi phòng thi liên tục trong 90 phút.</div>
              </div>
            </div>

            {/*  2. Đảm bảo đầu ra 600  */}
            <div className="spec-bullet-item spec-item-large">
              <div className="spec-icon-box spec-icon-large">
                <i data-lucide="shield-check" style={{ width: '24px', height: '24px' }}></i>
              </div>
              <div className="spec-text-box">
                <div className="spec-title">Đảm bảo đầu ra: <strong>Đảm bảo chuẩn 600+ • Tự tin đạt 800+</strong></div>
                <div className="spec-desc">Đảm bảo đạt tối thiểu 600+ sau khi học xong (học lại 100% miễn phí nếu không đạt MỤC TIÊU). Tối ưu hóa kỹ năng làm bài để bứt phá 800+ bình thường.</div>
              </div>
            </div>

            {/*  3. Kèm cặp 1-1  */}
            <div className="spec-bullet-item spec-item-large">
              <div className="spec-icon-box spec-icon-large">
                <i data-lucide="mic" style={{ width: '24px', height: '24px' }}></i>
              </div>
              <div className="spec-text-box">
                <div className="spec-title">Kèm cặp 1-1: <strong>Sửa phát âm IPA & bóc tách lỗi sai từng người</strong></div>
                <div className="spec-desc">Chỉnh khẩu hình chuẩn, nối âm, nuốt âm của đề thi thật ETS — bóc tách từng điểm yếu cá nhân để bứt tốc.</div>
              </div>
            </div>
          </div>
        </div>

        {/*  Right Side: Portrait Cutout of Thầy Hưng (Đẩy lùi lui xuống dưới)  */}
        <div className="hero-right-col">
          <div className="hero-lowered-portrait-wrap">
            <div className="portrait-ambient-glow"></div>
            
            <img src="/image/4-nobg-web.webp" alt="Thầy Hưng 985/990 TOEIC Giảng Viên ETS" className="teacher-lowered-cutout" width="939" height="1600" fetchPriority="high" />

            {/*  Elegant status badge positioned at the bottom waist/knees, completely clear of face  */}
            <div className="teacher-bottom-badge">
              <div className="badge-icon-wrap">
                <i data-lucide="video" style={{ width: '22px', height: '22px' }}></i>
              </div>
              <div className="badge-text-wrap">
                <div className="badge-headline">Thầy Hưng Dạy Live 100%</div>
                <div className="badge-subline">985 TOEIC • Tương tác 2 chiều • Đảm bảo 600+ • Bứt phá 800+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  STATS SUMMARY BAR (mrhtoeic.com LandingStats)  */}
  <section className="stats-summary-bar" aria-label="Thành tựu đào tạo">
    <div className="container stats-grid-row">
      <div className="stats-col-item">
        <div className="stats-num">985</div>
        <div className="stats-lbl">TOEIC</div>
      </div>
      <div className="stats-col-item">
        <div className="stats-num">500+</div>
        <div className="stats-lbl">Học Viên</div>
      </div>
      <div className="stats-col-item">
        <div className="stats-num">1K+</div>
        <div className="stats-lbl">Từ Vựng</div>
      </div>
      <div className="stats-col-item">
        <div className="stats-num">50+</div>
        <div className="stats-lbl">Đề Thi</div>
      </div>
    </div>
  </section>

    {/*  ==========================================================================
       SECTION 1: NỖI ĐAU HỌC VIÊN (6 NỖI ĐAU CỐT LÕI & CÂU DẪN GIẢI PHÁP)
       ==========================================================================  */}
  <section className="section-padding story-section section-light" id="noi-dau">
    <div className="container">
      
      {/*  Big Opening Emotional Quote Card  */}
      <div className="story-quote-card">
        <blockquote>
          “Tôi cày ngày cày đêm, mua cả đống sách, tải đủ thứ app về học từ vựng nhưng đi thi điểm vẫn giậm chân tại chỗ… <span className="quote-highlight">Phải chăng TOEIC không dành cho người mất gốc như tôi?”</span>
        </blockquote>
        <div className="story-quote-author">
          — TRĂN TRỞ CỦA HƠN 85% NGƯỜI TỰ HỌC TOEIC MÃI KHÔNG THỂ BỨT PHÁ 600 – 800+
        </div>
      </div>

      {/*  6 Core Struggles Narrative Box  */}
      <div className="story-narrative-container">
        <p className="story-lead-sentence">
          5 năm qua đồng hành cùng hàng nghìn học viên, mình nhận ra hầu hết những ai tự học TOEIC mãi không tiến bộ đều đang mắc kẹt trong <strong>6 nỗi đau cốt lõi</strong> này:
        </p>

        <div className="story-points-list">
          <div className="story-point-item point-struggle">
            <i data-lucide="x-circle" style={{ color: '#EF4444', width: '20px', height: '20px', flexShrink: '0' }}></i>
            <div>
              <strong>1. Cày từ vựng hùng hục nhưng hôm sau quên sạch:</strong> Mua sổ tay, flashcard học 30–50 từ mỗi ngày nhưng học rời rạc, không gắn vào ngữ cảnh đề thi thật ETS nên vào phòng thi hoàn toàn không nhận diện được từ vựng.
            </div>
          </div>

          <div className="story-point-item point-struggle">
            <i data-lucide="x-circle" style={{ color: '#EF4444', width: '20px', height: '20px', flexShrink: '0' }}></i>
            <div>
              <strong>2. Bật audio nghe như "vịt nghe sấm", phản xạ không kịp:</strong> Tốc độ người bản xứ quá nhanh, hiện tượng nuốt âm, nối âm lướt qua trong 0.5 giây — bạn nghe chữ được chữ mất, đành chọn đáp án theo linh cảm và đánh lụi.
            </div>
          </div>

          <div className="story-point-item point-struggle">
            <i data-lucide="x-circle" style={{ color: '#EF4444', width: '20px', height: '20px', flexShrink: '0' }}></i>
            <div>
              <strong>3. Part 5 mất cả phút một câu vì loay hoay dịch nghĩa:</strong> Cố gắng dịch nghĩa từng từ thay vì nhìn ra bản đồ cấu trúc ngữ pháp, bẫy từ loại và quy luật đề thi để chốt đáp án chính xác trong 10–15 giây.
            </div>
          </div>

          <div className="story-point-item point-struggle">
            <i data-lucide="x-circle" style={{ color: '#EF4444', width: '20px', height: '20px', flexShrink: '0' }}></i>
            <div>
              <strong>4. Part 7 là ác mộng kinh hoàng, đọc trước quên sau:</strong> Bài đọc dài dằng dặc, thiếu kỹ năng định vị thông tin, đồng hồ báo còn 15 phút mà còn 25–30 câu chưa làm — đành nhắm mắt khoanh bừa hàng loạt.
            </div>
          </div>

          <div className="story-point-item point-struggle">
            <i data-lucide="x-circle" style={{ color: '#EF4444', width: '20px', height: '20px', flexShrink: '0' }}></i>
            <div>
              <strong>5. Càng tự học càng hoang mang, mất phương hướng:</strong> Tải hàng chục GB tài liệu, mua video thu sẵn nhưng học được vài ngày là nản, phát âm sai không ai sửa, làm đề sai không ai chỉ ra nguyên nhân gốc rễ.
            </div>
          </div>

          <div className="story-point-item point-struggle">
            <i data-lucide="x-circle" style={{ color: '#EF4444', width: '20px', height: '20px', flexShrink: '0' }}></i>
            <div>
              <strong>6. Điểm số giậm chân tại chỗ 300–400, lỡ dở cơ hội tương lai:</strong> Thi đi thi lại tốn kém tiền bạc, trễ hạn nộp bằng tốt nghiệp ra trường và tuột mất các cơ hội ứng tuyển, thăng tiến công việc mơ ước.
            </div>
          </div>
        </div>

        {/*  1 Câu dẫn đến giải pháp theo đúng yêu cầu người dùng  */}
        <div className="story-truth-box" style={{ marginTop: '2rem' }}>
          <div className="story-truth-header">
            <span className="truth-header-badge">
              <i data-lucide="sparkles" style={{ width: '14px', height: '14px' }}></i>
              SỰ THẬT CỐT LÕI
            </span>
          </div>
          <div className="truth-single-thesis">
            <p className="truth-lead-text" style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0F172A', lineHeight: '1.6', margin: '0' }}>
              Vấn đề không phải bạn kém cỏi hay thiếu nỗ lực, mà là bạn chưa từng được tiếp cận với một phương pháp học thực chiến và người thầy kèm cặp bóc tách từng lỗi sai ngay trong phòng thi.
            </p>
          </div>
        </div>

        {/*  Transition Bridge: Dẫn dắt mượt mà vào Feedback học viên  */}
        <div className="story-bridge-transition" style={{ marginTop: '1.75rem' }}>
          <div className="bridge-tag-row">
            <span className="bridge-tag">KẾT QUẢ THỰC TẾ NÓI LÊN TẤT CẢ</span>
          </div>
          <p className="bridge-quote-text" style={{ marginTop: '0.5rem', fontSize: '1.05rem', lineHeight: '1.6', color: '#334155' }}>
            Hàng trăm học viên xuất phát điểm từ con số 0 đã chứng minh: Chỉ cần đúng lộ trình và được kèm cặp sát sao, bứt phá 600 – 800+ TOEIC hoàn toàn nằm trong tầm tay của bạn. Dưới đây là kết quả và cảm nhận thực tế từ họ:
          </p>
        </div>
      </div>
    </div>
  </section>

  {/*  ==========================================================================
       SECTION 2: FEEDBACK & BẢNG ĐIỂM HỌC VIÊN (CAROUSEL VUỐT NGANG NHƯ ẢNH 2)
       ==========================================================================  */}
  <section className="section-padding proof-feedback-section" id="feedback">
    <div className="container-fluid feedback-container-wide">
      <div className="text-center feedback-header-block">
        <span className="section-badge">Bằng Chứng Thực Tế • Chứng Chỉ ETS & Tin Nhắn Học Viên</span>
        <h2 className="section-title">Học Viên Lớp Live Bứt Phá<br /><span className="highlight">600+ Đến 895 TOEIC</span></h2>
        <p className="section-subtitle">
          Khóa học chỉ đảm bảo chuẩn đầu ra 600+ sau khi học xong để các bạn mất gốc yên tâm tuyệt đối, nhưng kinh nghiệm thực chiến và kỹ năng xử lý đề của Thầy Hưng đã giúp rất nhiều bạn hoàn toàn có thể bứt phá lên <strong>700, 800+, thậm chí 895 TOEIC</strong> bình thường sau 3 tháng:
        </p>
      </div>

      {/*  Controls & Swipe Hint  */}
      <div className="feedback-controls-bar">
        <div className="carousel-hint">
          <i data-lucide="hand" style={{ width: '18px', height: '18px', color: 'var(--color-accent)' }}></i>
          <span>Kéo chuột hoặc vuốt sang ngang để xem 26+ feedback học viên • Click vào thẻ để phóng to</span>
        </div>
        <div className="carousel-nav-btns">
          <button type="button" className="carousel-arrow prev" id="feedback-prev-btn" aria-label="Feedback trước">
            <i data-lucide="chevron-left" style={{ width: '22px', height: '22px' }}></i>
          </button>
          <button type="button" className="carousel-arrow next" id="feedback-next-btn" aria-label="Feedback tiếp theo">
            <i data-lucide="chevron-right" style={{ width: '22px', height: '22px' }}></i>
          </button>
        </div>
      </div>

      {/*  Carousel Viewport  */}
      <div className="feedback-carousel-viewport" id="feedback-carousel-viewport">
                <div className="feedback-carousel-track" id="feedback-carousel-track">
          {/*  Slide 1 (Pure Cert)  */}
          <div className="feedback-slide" data-index="1" data-name="Lê Thành Hưng" data-score="895 TOEIC (Nghe 475 • Đọc 420)" data-full="/image/fb-card-1.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">895 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-1.webp" alt="Feedback học viên Lê Thành Hưng 895 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Lê Thành Hưng</h4>
              <p className="feedback-student-sub">895 TOEIC (Nghe 475 • Đọc 420)</p>
            </div>
          </div>

          {/*  Slide 2 (Cert + Chat)  */}
          <div className="feedback-slide" data-index="2" data-name="Đinh Duy Anh" data-score="760 TOEIC (Nghe 445 • Đọc 315)" data-full="/image/fb-card-2.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">760 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-2.webp" alt="Feedback học viên Đinh Duy Anh 760 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Đinh Duy Anh</h4>
              <p className="feedback-student-sub">760 TOEIC (Nghe 445 • Đọc 315)</p>
            </div>
          </div>

          {/*  Slide 3 (Pure Cert)  */}
          <div className="feedback-slide" data-index="3" data-name="Đỗ Nhất Huy" data-score="815 TOEIC (Nghe 425 • Đọc 390)" data-full="/image/fb-card-3.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">815 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-3.webp" alt="Feedback học viên Đỗ Nhất Huy 815 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Đỗ Nhất Huy</h4>
              <p className="feedback-student-sub">815 TOEIC (Nghe 425 • Đọc 390)</p>
            </div>
          </div>

          {/*  Slide 4 (Cert + Chat)  */}
          <div className="feedback-slide" data-index="4" data-name="Nguyễn Kiều Tiên" data-score="695 TOEIC (Nghe 385 • Đọc 310)" data-full="/image/fb-card-4.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">695 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-4.webp" alt="Feedback học viên Nguyễn Kiều Tiên 695 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Nguyễn Kiều Tiên</h4>
              <p className="feedback-student-sub">695 TOEIC (Nghe 385 • Đọc 310)</p>
            </div>
          </div>

          {/*  Slide 5 (Pure Cert)  */}
          <div className="feedback-slide" data-index="5" data-name="Dương Tú Anh" data-score="865 TOEIC (Nghe 455 • Đọc 410)" data-full="/image/fb-card-5.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">865 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-5.webp" alt="Feedback học viên Dương Tú Anh 865 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Dương Tú Anh</h4>
              <p className="feedback-student-sub">865 TOEIC (Nghe 455 • Đọc 410)</p>
            </div>
          </div>

          {/*  Slide 6 (Cert + Chat)  */}
          <div className="feedback-slide" data-index="6" data-name="Nguyễn Tuấn Dũng" data-score="835 TOEIC (Nghe 445 • Đọc 390)" data-full="/image/fb-card-6.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">835 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-6.webp" alt="Feedback học viên Nguyễn Tuấn Dũng 835 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Nguyễn Tuấn Dũng</h4>
              <p className="feedback-student-sub">835 TOEIC (Nghe 445 • Đọc 390)</p>
            </div>
          </div>

          {/*  Slide 7 (Cert + Chat)  */}
          <div className="feedback-slide" data-index="7" data-name="Wu Yu Jung" data-score="680 TOEIC (Nghe 320 • Đọc 360)" data-full="/image/fb-card-7.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">680 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-7.webp" alt="Feedback học viên Wu Yu Jung 680 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Wu Yu Jung</h4>
              <p className="feedback-student-sub">680 TOEIC (Nghe 320 • Đọc 360)</p>
            </div>
          </div>

          {/*  Slide 8 (Cert + Chat)  */}
          <div className="feedback-slide" data-index="8" data-name="Đinh Trọng Huấn" data-score="670 TOEIC (Nghe 335 • Đọc 335)" data-full="/image/fb-card-8.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">670 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-8.webp" alt="Feedback học viên Đinh Trọng Huấn 670 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Đinh Trọng Huấn</h4>
              <p className="feedback-student-sub">670 TOEIC (Nghe 335 • Đọc 335)</p>
            </div>
          </div>

          {/*  Slide 9 (Cert + Chat)  */}
          <div className="feedback-slide" data-index="9" data-name="Lưu Thành Phước" data-score="760 TOEIC (Nghe 455 • Đọc 305)" data-full="/image/fb-card-9.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">760 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-9.webp" alt="Feedback học viên Lưu Thành Phước 760 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Lưu Thành Phước</h4>
              <p className="feedback-student-sub">760 TOEIC (Nghe 455 • Đọc 305)</p>
            </div>
          </div>

          {/*  Slide 10 (Cert + Chat)  */}
          <div className="feedback-slide" data-index="10" data-name="Trần Thị Thủy Tiên" data-score="695 TOEIC (Nghe 390 • Đọc 305)" data-full="/image/fb-card-10.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">695 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-10.webp" alt="Feedback học viên Trần Thị Thủy Tiên 695 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Trần Thị Thủy Tiên</h4>
              <p className="feedback-student-sub">695 TOEIC (Nghe 390 • Đọc 305)</p>
            </div>
          </div>

          {/*  Slide 11 (Pure Cert)  */}
          <div className="feedback-slide" data-index="11" data-name="Phạm Thúy Anh" data-score="745 TOEIC (Nghe 435 • Đọc 310)" data-full="/image/fb-card-11.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">745 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-11.webp" alt="Feedback học viên Phạm Thúy Anh 745 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Phạm Thúy Anh</h4>
              <p className="feedback-student-sub">745 TOEIC (Nghe 435 • Đọc 310)</p>
            </div>
          </div>

          {/*  Slide 12 (Cert + Chat)  */}
          <div className="feedback-slide" data-index="12" data-name="Phạm Quang Minh" data-score="765 TOEIC (Nghe 480 • Đọc 285)" data-full="/image/fb-card-12.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">765 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-12.webp" alt="Feedback học viên Phạm Quang Minh 765 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Phạm Quang Minh</h4>
              <p className="feedback-student-sub">765 TOEIC (Nghe 480 • Đọc 285)</p>
            </div>
          </div>

          {/*  Slide 13 (Cert + Chat)  */}
          <div className="feedback-slide" data-index="13" data-name="Lê Xuân Phúc" data-score="630 TOEIC (Nghe 335 • Đọc 295)" data-full="/image/fb-card-13.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">630 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-13.webp" alt="Feedback học viên Lê Xuân Phúc 630 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Lê Xuân Phúc</h4>
              <p className="feedback-student-sub">630 TOEIC (Nghe 335 • Đọc 295)</p>
            </div>
          </div>

          {/*  Slide 14 (Cert + Chat)  */}
          <div className="feedback-slide" data-index="14" data-name="Nguyễn Đoàn Duy Khang" data-score="685 TOEIC (Nghe 360 • Đọc 305)" data-full="/image/fb-card-14.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">685 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-14.webp" alt="Feedback học viên Nguyễn Đoàn Duy Khang 685 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Nguyễn Đoàn Duy Khang</h4>
              <p className="feedback-student-sub">685 TOEIC (Nghe 360 • Đọc 305)</p>
            </div>
          </div>

          {/*  Slide 15 (Pure Cert)  */}
          <div className="feedback-slide" data-index="15" data-name="Nguyễn Hùng Ngọc" data-score="685 TOEIC (Nghe 380 • Đọc 305)" data-full="/image/fb-card-15.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill">685 TOEIC</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-15.webp" alt="Feedback học viên Nguyễn Hùng Ngọc 685 TOEIC" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Nguyễn Hùng Ngọc</h4>
              <p className="feedback-student-sub">685 TOEIC (Nghe 380 • Đọc 305)</p>
            </div>
          </div>

          {/*  Slide 16 (Real Student Chat)  */}
          <div className="feedback-slide" data-index="16" data-name="Học Viên Lớp Live" data-score="Feedback Thực Tế • Dạy Cực Kỳ Dễ Hiểu" data-full="/image/fb-card-16.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' }}>⭐ ĐÁNH GIÁ 5 SAO</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-16.webp" alt="Feedback học viên lớp Live Thầy Hưng" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Học Viên Lớp Live</h4>
              <p className="feedback-student-sub">"Thầy dạy dễ hiểu, học buổi nào thấm buổi đó!"</p>
            </div>
          </div>

          {/*  Slide 17  */}
          <div className="feedback-slide" data-index="17" data-name="Học Viên Lớp Tối" data-score="Feedback Thực Tế • Phương Pháp Đỉnh Cao" data-full="/image/fb-card-17.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' }}>⭐ ĐÁNH GIÁ 5 SAO</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-17.webp" alt="Feedback học viên lớp Live Thầy Hưng" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Học Viên Lớp Tối</h4>
              <p className="feedback-student-sub">"Bóc tách đề quá đỉnh, tự tin hẳn khi làm bài"</p>
            </div>
          </div>

          {/*  Slide 18  */}
          <div className="feedback-slide" data-index="18" data-name="Học Viên Mất Gốc" data-score="Feedback Thực Tế • Tăng Vọt Điểm Nghe" data-full="/image/fb-card-18.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' }}>⭐ ĐÁNH GIÁ 5 SAO</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-18.webp" alt="Feedback học viên lớp Live Thầy Hưng" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Học Viên Mất Gốc</h4>
              <p className="feedback-student-sub">"Nghe theo thầy chỉnh âm IPA mà tai nghe tăng vọt"</p>
            </div>
          </div>

          {/*  Slide 19  */}
          <div className="feedback-slide" data-index="19" data-name="Học Viên Lớp Live" data-score="Feedback Thực Tế • Mẹo Quét Part 7 Đỉnh" data-full="/image/fb-card-19.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' }}>⭐ ĐÁNH GIÁ 5 SAO</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-19.webp" alt="Feedback học viên lớp Live Thầy Hưng" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Học Viên Lớp Live</h4>
              <p className="feedback-student-sub">"Học mẹo quét skimming của thầy làm bài nhanh gấp đôi"</p>
            </div>
          </div>

          {/*  Slide 20  */}
          <div className="feedback-slide" data-index="20" data-name="Học Viên Khóa Pro" data-score="Feedback Thực Tế • Chữa Bài Tận Tâm 1-1" data-full="/image/fb-card-20.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' }}>⭐ ĐÁNH GIÁ 5 SAO</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-20.webp" alt="Feedback học viên lớp Live Thầy Hưng" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Học Viên Khóa Pro</h4>
              <p className="feedback-student-sub">"Khóa học thực chiến nhất, thầy chữa bài cực kỳ tận tâm"</p>
            </div>
          </div>

          {/*  Slide 21  */}
          <div className="feedback-slide" data-index="21" data-name="Học Viên Zoom Live" data-score="Feedback Thực Tế • Tự Tin Bật Mic Tương Tác" data-full="/image/fb-card-21.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' }}>⭐ ĐÁNH GIÁ 5 SAO</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-21.webp" alt="Feedback học viên lớp Live Thầy Hưng" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Học Viên Zoom Live</h4>
              <p className="feedback-student-sub">"Nhờ thầy sửa phát âm 1-1 mà tự tin bật mic tương tác"</p>
            </div>
          </div>

          {/*  Slide 22  */}
          <div className="feedback-slide" data-index="22" data-name="Học Viên Lớp Tối" data-score="Feedback Thực Tế • Ngắt Cụm Part 5 Chắc Chắn" data-full="/image/fb-card-22.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' }}>⭐ ĐÁNH GIÁ 5 SAO</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-22.webp" alt="Feedback học viên lớp Live Thầy Hưng" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Học Viên Lớp Tối</h4>
              <p className="feedback-student-sub">"Ngắt cụm Part 5 theo thầy làm câu nào chắc chắn câu đó"</p>
            </div>
          </div>

          {/*  Slide 23  */}
          <div className="feedback-slide" data-index="23" data-name="Học Viên Khóa Pro" data-score="Feedback Thực Tế • Xóa Sổ Bẫy Gián Tiếp Part 2" data-full="/image/fb-card-23.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' }}>⭐ ĐÁNH GIÁ 5 SAO</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-23.webp" alt="Feedback học viên lớp Live Thầy Hưng" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Học Viên Khóa Pro</h4>
              <p className="feedback-student-sub">"Bắt đúng keyword Part 2 không còn sợ bẫy đề ETS"</p>
            </div>
          </div>

          {/*  Slide 24  */}
          <div className="feedback-slide" data-index="24" data-name="Học Viên Lớp Live" data-score="Feedback Thực Tế • 1000 Từ Vựng Sát Đề 90%" data-full="/image/fb-card-24.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' }}>⭐ ĐÁNH GIÁ 5 SAO</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-24.webp" alt="Feedback học viên lớp Live Thầy Hưng" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Học Viên Lớp Live</h4>
              <p className="feedback-student-sub">"Tài liệu 1000 từ vựng sát đề thật khủng khiếp, đi thi gặp liên tục"</p>
            </div>
          </div>

          {/*  Slide 25  */}
          <div className="feedback-slide" data-index="25" data-name="Học Viên Khóa Pro" data-score="Feedback Thực Tế • Kỷ Luật Live Zoom 100%" data-full="/image/fb-card-25.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' }}>⭐ ĐÁNH GIÁ 5 SAO</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-25.webp" alt="Feedback học viên lớp Live Thầy Hưng" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Học Viên Khóa Pro</h4>
              <p className="feedback-student-sub">"Thầy kèm sát sao từng buổi, học trực tiếp không lo lười"</p>
            </div>
          </div>

          {/*  Slide 26  */}
          <div className="feedback-slide" data-index="26" data-name="Học Viên Lớp Live" data-score="Feedback Thực Tế • Trải Nghiệm Học Tuyệt Vời" data-full="/image/fb-card-26.webp">
            <div className="feedback-poster-card">
              <div className="feedback-score-pill" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' }}>⭐ ĐÁNH GIÁ 5 SAO</div>
              <div className="feedback-img-wrapper">
                <img src="/image/fb-card-26.webp" alt="Feedback học viên lớp Live Thầy Hưng" loading="lazy" className="feedback-card-media" />
                <div className="feedback-zoom-badge">
                  <i data-lucide="zoom-in" style={{ width: '15px', height: '15px' }}></i>
                  <span>Phóng to</span>
                </div>
              </div>
            </div>
            <div className="feedback-student-meta">
              <h4 className="feedback-student-name">Học Viên Lớp Live</h4>
              <p className="feedback-student-sub">"Đúng là lựa chọn đúng đắn nhất, cảm ơn thầy Hưng rất nhiều!"</p>
            </div>
          </div>
        </div>
      </div>

      {/*  Image 2 Style Closing Statement  */}
      <div className="feedback-closing-statement text-center">
        <p>Dù xuất phát điểm mất gốc hoàn toàn hay đã có nền tảng muốn aim điểm cao — chỉ cần đúng lộ trình và được kèm cặp sửa bài 1-1, bạn đều có thể chạm tay tới mục tiêu của mình.</p>
      </div>
    </div>
  </section>

  {/*  ==========================================================================
       SECTION 3: LỘ TRÌNH HỌC LUÔN (5 - 6 GẠCH ĐẦU DÒNG CÔ ĐỌNG THỰC CHIẾN)
       ==========================================================================  */}
    <section className="section-padding curriculum-compact-section" id="lo-trinh">
    <div className="container">
      <div className="text-center">
        <span className="section-badge">• NỘI DUNG CHƯƠNG TRÌNH ĐÀO TẠO</span>
        <h2 className="section-title">Lộ Trình Bứt Phá <span className="highlight">600 + TOEIC Thực Chiến</span><br /><span className="title-sub-break">Trong 36 Buổi</span></h2>
        <p className="section-subtitle">
          Đảm bảo chuẩn 600+ sau khóa học cho người mất gốc — Đồng thời rèn luyện kỹ năng xử lý đề ETS để bạn hoàn toàn có thể bứt phá 800+ bình thường. Được thiết kế theo trục thời gian 6 chặng liên hoàn:
        </p>
      </div>

      {/*  Mạnh Vibe Hanoi Style 3-Column Timeline Roadmap  */}
      <div className="mv-roadmap-wrapper">
        <div className="mv-roadmap-timeline" id="mv-roadmap-timeline">
          {/*  Flowing Progress Beam Track (Mạnh Vibe style: Dòng chảy khi lướt xuống)  */}
          <div className="mv-roadmap-track">
            <div className="mv-roadmap-beam" id="mv-roadmap-beam"></div>
          </div>

          {/*  Chặng 01  */}
          <div className="mv-roadmap-row">
            <div className="mv-roadmap-left">
              <span className="mv-stage-pill">• GIAI ĐOẠN 01</span>
              <h3 className="mv-stage-left-title">Xây Nền & Phản Xạ Nghe</h3>
              <div className="mv-stage-sessions-tag">Buổi 01 – 06 • 2 tuần đầu</div>
              <div className="mv-stage-illustration-wrap">
                <img
                  src="/image/stage-1-illustration.jpg"
                  alt="Minh họa Giai đoạn 01: Chuẩn Hóa Ngữ Âm IPA & Xóa Mù Nghe Part 1 - Part 2"
                  className="mv-stage-illustration-img"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="mv-roadmap-center">
              <div className="mv-roadmap-node">01</div>
              <div className="mv-roadmap-spine"></div>
            </div>
            <div className="mv-roadmap-right">
              <div className="mv-roadmap-card">
                <div className="mv-mobile-stage-bar">
                  <span className="mv-stage-pill">• GIAI ĐOẠN 01</span>
                  <span className="mv-stage-sessions-tag">Buổi 01 – 06 • 2 tuần đầu</span>
                </div>
                <div className="mv-mobile-stage-illustration">
                  <img
                    src="/image/stage-1-illustration.jpg"
                    alt="Minh họa Giai đoạn 01: Chuẩn Hóa Ngữ Âm IPA & Xóa Mù Nghe Part 1 - Part 2"
                    className="mv-stage-illustration-img"
                    loading="lazy"
                  />
                </div>
                <h4 className="mv-card-headline">Chuẩn Hóa Ngữ Âm IPA & Xóa Mù Nghe Part 1 - Part 2</h4>
                <p className="mv-card-summary">
                  Sửa triệt để khẩu hình và phát âm từng nguyên âm, phụ âm, hiện tượng nối âm và nuốt âm của người bản xứ. Loại bỏ hoàn toàn thói quen nghe dịch thô trong đầu.
                </p>
                <div className="mv-card-bullets">
                  <div className="mv-bullet-item">
                    <i data-lucide="check-circle" style={{ width: '16px', height: '16px' }}></i>
                    <span>Gọi từng học viên đọc mẫu và sửa lỗi phát âm IPA 1-1 trực tiếp qua Zoom Live.</span>
                  </div>
                  <div className="mv-bullet-item">
                    <i data-lucide="check-circle" style={{ width: '16px', height: '16px' }}></i>
                    <span>Bẻ gãy bẫy câu hỏi WH- và các câu trả lời gián tiếp của đề thi ETS mới ("Ask David", "Not yet decided").</span>
                  </div>
                </div>
                <div className="mv-deliverable-badge">
                  <i data-lucide="target" style={{ width: '16px', height: '16px' }}></i>
                  <span>Mục tiêu chặng: Đúng &gt;80% Part 1 và làm chủ phản xạ bẫy câu hỏi Part 2 trong 3 giây.</span>
                </div>
              </div>
            </div>
          </div>

          {/*  Chặng 02  */}
          <div className="mv-roadmap-row">
            <div className="mv-roadmap-left">
              <span className="mv-stage-pill">• GIAI ĐOẠN 02</span>
              <h3 className="mv-stage-left-title">Bắt Nhịp Part 3 - Part 4</h3>
              <div className="mv-stage-sessions-tag">Buổi 07 – 12 • Tuần 3-4</div>
              <div className="mv-stage-illustration-wrap">
                <img
                  src="/image/stage-2-illustration.jpg"
                  alt="Minh họa Giai đoạn 02: Bắt Nhịp Part 3 - Part 4 & Săn Keyword"
                  className="mv-stage-illustration-img"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="mv-roadmap-center">
              <div className="mv-roadmap-node">02</div>
              <div className="mv-roadmap-spine"></div>
            </div>
            <div className="mv-roadmap-right">
              <div className="mv-roadmap-card">
                <div className="mv-mobile-stage-bar">
                  <span className="mv-stage-pill">• GIAI ĐOẠN 02</span>
                  <span className="mv-stage-sessions-tag">Buổi 07 – 12 • Tuần 3-4</span>
                </div>
                <div className="mv-mobile-stage-illustration">
                  <img
                    src="/image/stage-2-illustration.jpg"
                    alt="Minh họa Giai đoạn 02: Bắt Nhịp Part 3 - Part 4 & Săn Keyword"
                    className="mv-stage-illustration-img"
                    loading="lazy"
                  />
                </div>
                <h4 className="mv-card-headline">Luyện Sâu Kỹ Thuật Đọc Trước Đề & Săn Keyword Part 3 - 4</h4>
                <p className="mv-card-summary">
                  Thành thạo kỹ thuật đọc trước câu hỏi và đáp án trong 20 giây nghỉ giữa các đoạn audio, định vị trước ngữ cảnh để đón đầu đáp án trước khi người bản xứ nói dứt câu.
                </p>
                <div className="mv-card-bullets">
                  <div className="mv-bullet-item">
                    <i data-lucide="check-circle" style={{ width: '16px', height: '16px' }}></i>
                    <span>Nắm trọn cấu trúc Mở - Thân - Kết của đoạn hội thoại & bài độc thoại thường gặp trong môi trường công sở.</span>
                  </div>
                  <div className="mv-bullet-item">
                    <i data-lucide="check-circle" style={{ width: '16px', height: '16px' }}></i>
                    <span>Thi thử Checkpoint đánh giá sức bền nghe 100 câu liên tục không bị đuối sức.</span>
                  </div>
                </div>
                <div className="mv-deliverable-badge">
                  <i data-lucide="target" style={{ width: '16px', height: '16px' }}></i>
                  <span>Mục tiêu chặng: Bắt nhịp audio mượt mà, không bị trôi câu hỏi, tự tin đạt 350–420+ điểm Listening.</span>
                </div>
              </div>
            </div>
          </div>

          {/*  Chặng 03  */}
          <div className="mv-roadmap-row">
            <div className="mv-roadmap-left">
              <span className="mv-stage-pill">• GIAI ĐOẠN 03</span>
              <h3 className="mv-stage-left-title">Ngữ Pháp & Part 5 Siêu Tốc</h3>
              <div className="mv-stage-sessions-tag">Buổi 13 – 20 • Tuần 5-7</div>
              <div className="mv-stage-illustration-wrap">
                <img
                  src="/image/stage-3-illustration.jpg"
                  alt="Minh họa Giai đoạn 03: Ngữ Pháp Cốt Lõi & Part 5 Siêu Tốc Trong 15s"
                  className="mv-stage-illustration-img"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="mv-roadmap-center">
              <div className="mv-roadmap-node">03</div>
              <div className="mv-roadmap-spine"></div>
            </div>
            <div className="mv-roadmap-right">
              <div className="mv-roadmap-card">
                <div className="mv-mobile-stage-bar">
                  <span className="mv-stage-pill">• GIAI ĐOẠN 03</span>
                  <span className="mv-stage-sessions-tag">Buổi 13 – 20 • Tuần 5-7</span>
                </div>
                <div className="mv-mobile-stage-illustration">
                  <img
                    src="/image/stage-3-illustration.jpg"
                    alt="Minh họa Giai đoạn 03: Ngữ Pháp Cốt Lõi & Part 5 Siêu Tốc Trong 15s"
                    className="mv-stage-illustration-img"
                    loading="lazy"
                  />
                </div>
                <h4 className="mv-card-headline">Làm Chủ Ngữ Pháp Cốt Lõi & Xử Lý Part 5 Trong 15s/Câu</h4>
                <p className="mv-card-summary">
                  Cô đọng 12 thì động từ thực chiến, câu bị động, trật tự từ loại (Danh/Tính/Động/Trạng), mệnh đề quan hệ và liên từ. Dạy cách ngắt cụm ngữ pháp để nhìn ra ngay đáp án.
                </p>
                <div className="mv-card-bullets">
                  <div className="mv-bullet-item">
                    <i data-lucide="check-circle" style={{ width: '16px', height: '16px' }}></i>
                    <span>Kỹ thuật nhìn đuôi từ và vị trí ngữ pháp chọn ngay đáp án mà không cần dịch toàn bộ câu.</span>
                  </div>
                  <div className="mv-bullet-item">
                    <i data-lucide="check-circle" style={{ width: '16px', height: '16px' }}></i>
                    <span>Tiết kiệm ít nhất 15 phút quý giá cho phần Part 5 để dồn thời gian giải quyết Part 7.</span>
                  </div>
                </div>
                <div className="mv-deliverable-badge">
                  <i data-lucide="target" style={{ width: '16px', height: '16px' }}></i>
                  <span>Mục tiêu chặng: Hoàn thành 30 câu Part 5 trong dưới 8 phút với độ chính xác trên 85%.</span>
                </div>
              </div>
            </div>
          </div>

          {/*  Chặng 04  */}
          <div className="mv-roadmap-row">
            <div className="mv-roadmap-left">
              <span className="mv-stage-pill">• GIAI ĐOẠN 04</span>
              <h3 className="mv-stage-left-title">Scanning & Skimming Part 6 - 7</h3>
              <div className="mv-stage-sessions-tag">Buổi 21 – 28 • Tuần 8-9</div>
              <div className="mv-stage-illustration-wrap">
                <img
                  src="/image/stage-4-illustration.jpg"
                  alt="Minh họa Giai đoạn 04: Chiến Thuật Scanning - Skimming & Đọc Hiểu Part 6 - 7"
                  className="mv-stage-illustration-img"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="mv-roadmap-center">
              <div className="mv-roadmap-node">04</div>
              <div className="mv-roadmap-spine"></div>
            </div>
            <div className="mv-roadmap-right">
              <div className="mv-roadmap-card">
                <div className="mv-mobile-stage-bar">
                  <span className="mv-stage-pill">• GIAI ĐOẠN 04</span>
                  <span className="mv-stage-sessions-tag">Buổi 21 – 28 • Tuần 8-9</span>
                </div>
                <div className="mv-mobile-stage-illustration">
                  <img
                    src="/image/stage-4-illustration.jpg"
                    alt="Minh họa Giai đoạn 04: Chiến Thuật Scanning - Skimming & Đọc Hiểu Part 6 - 7"
                    className="mv-stage-illustration-img"
                    loading="lazy"
                  />
                </div>
                <h4 className="mv-card-headline">Chiến Thuật Scanning - Skimming & Đọc Hiểu Part 6 - Part 7</h4>
                <p className="mv-card-summary">
                  Phân bổ bản đồ thời gian phòng thi chuẩn xác: Kỹ thuật đọc lướt (Skimming) nắm ý chính và đọc quét (Scanning) định vị từ khóa cho từng dạng câu hỏi trong bài đọc dài.
                </p>
                <div className="mv-card-bullets">
                  <div className="mv-bullet-item">
                    <i data-lucide="check-circle" style={{ width: '16px', height: '16px' }}></i>
                    <span>Chiến lược xử lý triệt để đoạn đơn, đoạn đôi, đoạn ba và chuỗi tin nhắn Message Chain.</span>
                  </div>
                  <div className="mv-bullet-item">
                    <i data-lucide="check-circle" style={{ width: '16px', height: '16px' }}></i>
                    <span>Xóa bỏ hoàn toàn nỗi sợ cháy giờ, làm xong Part 7 vẫn thừa 5–10 phút kiểm tra lại bài.</span>
                  </div>
                </div>
                <div className="mv-deliverable-badge">
                  <i data-lucide="target" style={{ width: '16px', height: '16px' }}></i>
                  <span>Mục tiêu chặng: Không bao giờ bị thiếu giờ, tự tin giải quyết gọn gàng 100 câu Reading.</span>
                </div>
              </div>
            </div>
          </div>

          {/*  Chặng 05  */}
          <div className="mv-roadmap-row">
            <div className="mv-roadmap-left">
              <span className="mv-stage-pill">• GIAI ĐOẠN 05</span>
              <h3 className="mv-stage-left-title">Part 7 Nâng Cao & Bứt Tốc</h3>
              <div className="mv-stage-sessions-tag">Buổi 29 – 34 • Tuần 10-11</div>
              <div className="mv-stage-illustration-wrap">
                <img
                  src="/image/stage-5-illustration.jpg"
                  alt="Minh họa Giai đoạn 05: Xử Lý Văn Bản Khó Part 7 & Bứt Tốc Về Đích"
                  className="mv-stage-illustration-img"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="mv-roadmap-center">
              <div className="mv-roadmap-node">05</div>
              <div className="mv-roadmap-spine"></div>
            </div>
            <div className="mv-roadmap-right">
              <div className="mv-roadmap-card">
                <div className="mv-mobile-stage-bar">
                  <span className="mv-stage-pill">• GIAI ĐOẠN 05</span>
                  <span className="mv-stage-sessions-tag">Buổi 29 – 34 • Tuần 10-11</span>
                </div>
                <div className="mv-mobile-stage-illustration">
                  <img
                    src="/image/stage-5-illustration.jpg"
                    alt="Minh họa Giai đoạn 05: Xử Lý Văn Bản Khó Part 7 & Bứt Tốc Về Đích"
                    className="mv-stage-illustration-img"
                    loading="lazy"
                  />
                </div>
                <h4 className="mv-card-headline">Kỹ Năng Xử Lý Văn Bản Khó Part 7 & Bứt Tốc Về Đích</h4>
                <p className="mv-card-summary">
                  Bóc tách các bài đọc suy luận phức tạp, email đa chiều và bảng biểu kỹ thuật số. Thầy Hưng trực tiếp chấm chữa, bóc tách ma trận lỗi sai cá nhân của từng học viên.
                </p>
                <div className="mv-card-bullets">
                  <div className="mv-bullet-item">
                    <i data-lucide="check-circle" style={{ width: '16px', height: '16px' }}></i>
                    <span>Phân tích ma trận bẫy từ đồng nghĩa Paraphrase tinh vi nhất của các bộ đề ETS mới nhất.</span>
                  </div>
                  <div className="mv-bullet-item">
                    <i data-lucide="check-circle" style={{ width: '16px', height: '16px' }}></i>
                    <span>Vá ngay các lỗ hổng kiến thức và thói quen làm bài còn thiếu sót trước kỳ thi thật.</span>
                  </div>
                </div>
                <div className="mv-deliverable-badge">
                  <i data-lucide="target" style={{ width: '16px', height: '16px' }}></i>
                  <span>Mục tiêu chặng: Tăng thêm 80–120 điểm Reading, điểm thi thử đạt mốc 650–750+.</span>
                </div>
              </div>
            </div>
          </div>

          {/*  Chặng 06  */}
          <div className="mv-roadmap-row">
            <div className="mv-roadmap-left">
              <span className="mv-stage-pill">• GIAI ĐOẠN 06</span>
              <h3 className="mv-stage-left-title">Tổng Duyệt & Chạm Đích 800+</h3>
              <div className="mv-stage-sessions-tag">Buổi 35 – 36 • Tuần 12</div>
              <div className="mv-stage-illustration-wrap">
                <img
                  src="/image/stage-6-illustration.jpg"
                  alt="Minh họa Giai đoạn 06: Tổng Duyệt Phòng Thi & Chạm Đích 800+ TOEIC"
                  className="mv-stage-illustration-img"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="mv-roadmap-center">
              <div className="mv-roadmap-node">06</div>
              <div className="mv-roadmap-spine" style={{ display: 'none' }}></div>
            </div>
            <div className="mv-roadmap-right">
              <div className="mv-roadmap-card">
                <div className="mv-mobile-stage-bar">
                  <span className="mv-stage-pill">• GIAI ĐOẠN 06</span>
                  <span className="mv-stage-sessions-tag">Buổi 35 – 36 • Tuần 12</span>
                </div>
                <div className="mv-mobile-stage-illustration">
                  <img
                    src="/image/stage-6-illustration.jpg"
                    alt="Minh họa Giai đoạn 06: Tổng Duyệt Phòng Thi & Chạm Đích 800+ TOEIC"
                    className="mv-stage-illustration-img"
                    loading="lazy"
                  />
                </div>
                <h4 className="mv-card-headline">Tổng Duyệt Phòng Thi & Hướng Dẫn Tự Ôn Tập Bứt Phá 800+ TOEIC</h4>
                <p className="mv-card-summary">
                  Rèn luyện tâm lý phòng thi vững vàng, mẹo tránh bẫy tâm lý khi mất tập trung giữa giờ, quy tắc phân bổ thể lực 120 phút liên tục trong phòng thi thật.
                </p>
                <div className="mv-card-bullets">
                  <div className="mv-bullet-item">
                    <i data-lucide="check-circle" style={{ width: '16px', height: '16px' }}></i>
                    <span>Đảm bảo học xong đạt chuẩn 600+ cho học viên mất gốc (Học lại 100% MIỄN PHÍ nếu không đạt MỤC TIÊU).</span>
                  </div>
                  <div className="mv-bullet-item">
                    <i data-lucide="check-circle" style={{ width: '16px', height: '16px' }}></i>
                    <span>Trang bị phương pháp thực chiến và lộ trình tự rèn luyện để bứt phá 700, 800+, thậm chí 895 TOEIC bình thường.</span>
                  </div>
                </div>
                <div className="mv-deliverable-badge" style={{ background: 'rgba(196, 160, 124, 0.15)', borderColor: 'rgba(196, 160, 124, 0.4)', color: 'var(--color-accent)' }}>
                  <i data-lucide="award" style={{ width: '16px', height: '16px' }}></i>
                  <span>Mục tiêu chặng: Tự tin bước vào phòng thi thật ETS và cầm chắc chứng chỉ mong ước ngay lần thi đầu tiên!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ==========================================================================
       SECTION 4: GIỚI THIỆU GIẢNG VIÊN (THẦY HƯNG 985 TOEIC + 5 SLOTS CHỨNG CHỈ)
       ==========================================================================  */}
  <section className="section-padding instructor-spotlight-section" id="giang-vien">
    <div className="container">
      <div className="instructor-spotlight-grid">
        {/*  Photo Column  */}
        <div className="instructor-portrait-card">
          <img src="/image/1-web.webp" alt="Thầy Hưng 985/990 TOEIC" width="1067" height="1600" />
          <div className="instructor-score-overlay">
            <div className="score-number">985</div>
            <div className="score-label">TOEIC ETS</div>
          </div>
        </div>

        {/*  Instructor Details Column  */}
        <div className="instructor-details">
          <span className="section-badge">Người Trực Tiếp Đồng Hành Cùng Bạn</span>
          <h2 className="instructor-name-title">Thầy Hưng <span className="accent-name">(Mr. Hưng TOEIC)</span></h2>
          <div className="instructor-role-badge">Người đào tạo TOEIC đạt 985/990 TOEIC • Đã thi TOEIC nhiều lần • 5 năm kinh nghiệm</div>

          <p className="instructor-narrative">
            <strong>Xin chào các bạn! Mình là Hưng – Người đào tạo TOEIC đạt 985/990 TOEIC với 5 năm kinh nghiệm trực tiếp giảng dạy TOEIC chuyên sâu.</strong>
          </p>

          <p className="instructor-narrative">
            Là một người <strong>tự học TOEIC hoàn toàn từ con số 0</strong>, mình hiểu sâu sắc từng cảm giác bất lực của người mất gốc: học từ vựng trước quên sau, nghe audio bị ngợp, đọc dịch chậm chạp.
          </p>

          <p className="instructor-narrative">
            Chính vì vậy, mình đã <strong>trực tiếp đi thi TOEIC nhiều lần</strong> để cập nhật liên tục mọi thay đổi trong format ra đề của ETS, từ đó đúc kết nên <em>Hệ thống 36 buổi Live thực chiến phòng thi</em> — dạy trực tiếp qua Zoom, gọi từng người đọc dịch, sửa từng âm IPA để bạn học 1 lần là chắc chắn đạt mục tiêu.
          </p>

          <p className="instructor-narrative">
            Đến nay, mình đã trực tiếp kèm cặp và giúp hơn <strong>400+ bạn học viên</strong> bứt phá thành công mốc 600 - 850+ TOEIC, tự tin ra trường đúng hạn, ứng tuyển tiếp viên hàng không và nâng tầm thu nhập.
          </p>

          {/*  Core Credentials Checklist  */}
          <div className="credentials-list">
            <div className="credential-item">
              <i data-lucide="check-circle" style={{ width: '18px', height: '18px' }}></i>
              <span><strong>985/990 TOEIC ETS</strong> — Điểm số gần như tuyệt đối, trực tiếp đứng lớp 100% các buổi Zoom Live.</span>
            </div>
            <div className="credential-item">
              <i data-lucide="check-circle" style={{ width: '18px', height: '18px' }}></i>
              <span><strong>Đã trực tiếp thi TOEIC nhiều lần</strong> — Bắt trọn mọi xu hướng ra đề và bẫy gián tiếp mới nhất của ETS.</span>
            </div>
            <div className="credential-item">
              <i data-lucide="check-circle" style={{ width: '18px', height: '18px' }}></i>
              <span><strong>Hơn 400 học viên đạt mục tiêu</strong> — Tỉ lệ học viên đạt chuẩn đầu ra ngay sau khóa học đạt trên 92%.</span>
            </div>
            <div className="credential-item">
              <i data-lucide="check-circle" style={{ width: '18px', height: '18px' }}></i>
              <span><strong>Kèm cặp cá nhân hóa 1-1</strong> — Trực tiếp chấm bài tập, sửa phát âm và định hướng điểm yếu riêng cho từng bạn.</span>
            </div>
          </div>

          <div>
            <a href="#dang-ky" className="btn btn-accent">
              <span>Đăng Ký Học Live Cùng Thầy Hưng</span>
              <i data-lucide="arrow-right" style={{ width: '18px', height: '18px' }}></i>
            </a>
          </div>
        </div>
      </div>

      {/*  Single Certificate Showcase Container (1 phần chuyên nghiệp duy nhất để bỏ ảnh chứng chỉ)  */}
      <div className="certificates-showcase-box">
        <div className="certificates-showcase-header">
          <div className="cert-single-top-badge">
            <i data-lucide="award" style={{ width: '16px', height: '16px' }}></i>
            <span>BẢNG ĐIỂM THỰC TẾ IIG VIỆT NAM • ETS</span>
          </div>
          <h3 className="certificates-showcase-title">
            Chứng Chỉ Điểm Số TOEIC ETS Thầy Hưng
          </h3>
          <p className="certificates-showcase-subtitle">
            Minh chứng năng lực từ người thầy đạt 985/990 TOEIC ETS thực chiến.
          </p>
        </div>

        <div className="certificate-single-display-card" id="teacher-cert-card" style={{ cursor: 'pointer' }} title="Click để phóng to chứng chỉ Thầy Hưng 985/990">
          <div className="cert-card-media-wrap">
            <img src="/image/chung-chi-thay-hung.webp" alt="Bảng điểm TOEIC chính thức Thầy Hưng đạt 985/990 ETS" className="cert-actual-img" id="teacher-cert-img" loading="lazy" />
            <div className="cert-zoom-hint">
              <i data-lucide="zoom-in" style={{ width: '16px', height: '16px' }}></i>
              <span>Click để xem rõ bảng điểm gốc</span>
            </div>
          </div>
          <div className="cert-card-bottom-info">
            <div className="cert-score-callout">
              <div className="cert-big-score">985 <span className="cert-score-denominator">/ 990 TOEIC</span></div>
              <div className="cert-score-label">Listening 495 • Reading 490</div>
            </div>
            <div className="cert-meta-details">
              <div className="cert-org-title">Chứng Chỉ Khảo Thí Quốc Tế Do ETS & IIG Việt Nam Cấp</div>
              <div className="cert-org-desc">Thầy Hưng (985 TOEIC) trực tiếp đứng lớp 100% các buổi Zoom Live.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ==========================================================================
       SECTION 5: BẢNG SO SÁNH 2 BÊN (TRƯỚC KHÓA HỌC VS SAU KHÓA HỌC)
       ==========================================================================  */}
  <section className="section-padding comparison-section section-light" id="so-sanh">
    <div className="container">
      <div className="text-center">
        <span className="section-badge">Bảng Đối Chiếu Thực Tế</span>
        <h2 className="section-title">Sự Chuyển Hóa Rõ Rệt: <span className="highlight">Trước & Sau Khóa Học</span></h2>
        <p className="section-subtitle">
          Giải quyết dứt điểm các vướng mắc kinh niên của người học TOEIC dựa trên giáo trình thực chiến MrH:
        </p>
      </div>

      <div className="comparison-table-wrapper">
        {/*  Column 1: Before  */}
        <div className="comparison-col col-before">
          <div className="comparison-col-header">
            <span className="comparison-badge">TRƯỚC KHÓA HỌC</span>
            <h3 className="comparison-title">Những Vấn Đề Khiến Bạn Bế Tắc</h3>
          </div>

          <div className="comparison-list">
            <div className="comparison-item">
              <div className="comparison-icon"><i data-lucide="x" style={{ width: '14px', height: '14px' }}></i></div>
              <div><strong>Phát âm sai IPA:</strong> Bật audio người bản xứ lên nghe như vịt nghe sấm, không nhận ra từ quen thuộc vì tự đọc sai trong đầu.</div>
            </div>

            <div className="comparison-item">
              <div className="comparison-icon"><i data-lucide="x" style={{ width: '14px', height: '14px' }}></i></div>
              <div><strong>Part 2 dễ bị mất tập trung:</strong> Dính bẫy từ đồng âm khác nghĩa và lúng túng trước các câu trả lời gián tiếp của đề thi ETS.</div>
            </div>

            <div className="comparison-item">
              <div className="comparison-icon"><i data-lucide="x" style={{ width: '14px', height: '14px' }}></i></div>
              <div><strong>Part 5 mất cả phút một câu:</strong> Loay hoay dịch nghĩa từng từ, làm bài chậm chạp và không nhìn ra cấu trúc ngữ pháp cốt lõi.</div>
            </div>

            <div className="comparison-item">
              <div className="comparison-icon"><i data-lucide="x" style={{ width: '14px', height: '14px' }}></i></div>
              <div><strong>Part 7 cháy giờ kinh niên:</strong> Đọc dịch từng chữ, đến câu 175 là hết giờ, còn 25 câu nhắm mắt tô bừa C hoặc D cầu may.</div>
            </div>

            <div className="comparison-item">
              <div className="comparison-icon"><i data-lucide="x" style={{ width: '14px', height: '14px' }}></i></div>
              <div><strong>Từ vựng học trước quên sau:</strong> Mua sổ tay cày hàng ngàn từ lan man, không gắn vào ngữ cảnh thực tế của đề thi ETS mới.</div>
            </div>

            <div className="comparison-item">
              <div className="comparison-icon"><i data-lucide="x" style={{ width: '14px', height: '14px' }}></i></div>
              <div><strong>Tự học video cô độc:</strong> Không có người kiểm tra, phát âm sai không ai sửa, học được vài ngày nản lòng bỏ xó, mất tiền oan.</div>
            </div>
          </div>
        </div>

        {/*  Column 2: After  */}
        <div className="comparison-col col-after">
          <div className="comparison-col-header">
            <span className="comparison-badge">SAU KHÓA HỌC CÙNG THẦY HƯNG</span>
            <h3 className="comparison-title">Kết Quả Bứt Phá Thực Chiến</h3>
          </div>

          <div className="comparison-list">
            <div className="comparison-item">
              <div className="comparison-icon"><i data-lucide="check" style={{ width: '14px', height: '14px' }}></i></div>
              <div><strong>Chuẩn hóa 44 âm IPA:</strong> Tai bắt trọn âm nối, nuốt âm của người bản xứ, nghe rõ từng từ khóa trong audio và tăng 150+ điểm Listening.</div>
            </div>

            <div className="comparison-item">
              <div className="comparison-icon"><i data-lucide="check" style={{ width: '14px', height: '14px' }}></i></div>
              <div><strong>Làm chủ bẫy gián tiếp Part 2:</strong> Phản xạ loại trừ bẫy trong 3 giây, tự tin đạt tỷ lệ đúng trên 80% cho toàn bộ 25 câu hỏi Part 2.</div>
            </div>

            <div className="comparison-item">
              <div className="comparison-icon"><i data-lucide="check" style={{ width: '14px', height: '14px' }}></i></div>
              <div><strong>Giải quyết Part 5 trong 15s/câu:</strong> Nhìn vị trí từ loại và đuôi từ chọn ngay đáp án, tiết kiệm tối thiểu 15 phút dồn sức cho bài đọc.</div>
            </div>

            <div className="comparison-item">
              <div className="comparison-icon"><i data-lucide="check" style={{ width: '14px', height: '14px' }}></i></div>
              <div><strong>Kỹ thuật Scanning - Skimming đỉnh cao:</strong> Xử lý mượt mà đoạn đơn, đoạn đôi, đoạn ba và Message Chain, làm xong bài vẫn thừa 5–10 phút.</div>
            </div>

            <div className="comparison-item">
              <div className="comparison-icon"><i data-lucide="check" style={{ width: '14px', height: '14px' }}></i></div>
              <div><strong>Nắm trọn 1.000 từ vựng sát đề 90%:</strong> Bộ tài liệu độc quyền lọc sát đề thi thật, nhớ sâu qua ngữ cảnh và ứng dụng tức thì vào bài đọc.</div>
            </div>

            <div className="comparison-item">
              <div className="comparison-icon"><i data-lucide="check" style={{ width: '14px', height: '14px' }}></i></div>
              <div><strong>Thầy Hưng kèm Live 90p/buổi:</strong> Gọi đọc dịch, sửa từng âm 1-1, giải đáp qua Zalo 24/7, đảm bảo chuẩn đầu ra 600+, rèn kỹ năng tối ưu đạt 800+ bình thường (học lại 100% hoàn toàn miễn phí nếu không đạt mục tiêu).</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ==========================================================================
       SECTION 6: QUYỀN LỢI KHI HỌC (5 PHẦN QUÀ TẶNG KÈM THEO + HỖ TRỢ TIN NHẮN)
       ==========================================================================  */}
    <section className="section-padding rights-section" id="quyen-loi">
    <div className="container">
      <div className="text-center">
        <span className="section-badge">Hệ Sinh Thái Kèm Cặp Toàn Diện</span>
        <h2 className="section-title">5 Phần Quà Tặng Kèm & Quyền Lợi Độc Quyền</h2>
        <p className="section-subtitle">
          Không đơn thuần là một khóa học, đây là giải pháp trọn gói đảm bảo bạn vững vàng 600+ và tự tin bứt phá 800+ TOEIC:
        </p>
      </div>

      {/*  Mentorship Highlight Top Banner  */}
      <div className="exclusive-mentorship-banner">
        <div className="mentorship-highlight-card">
          <div className="mentorship-highlight-icon">
            <i data-lucide="video" style={{ width: '24px', height: '24px' }}></i>
          </div>
          <div>
            <h4>Dạy Live 100% Bởi Thầy Hưng Tất Cả Các Buổi</h4>
            <p>Không dùng video thu sẵn, không để trợ giảng dạy thay. Thầy Hưng 985 TOEIC trực tiếp đứng lớp 36 buổi, tương tác 2 chiều và sửa bài cho từng bạn.</p>
          </div>
        </div>

        <div className="mentorship-highlight-card">
          <div className="mentorship-highlight-icon">
            <i data-lucide="message-square" style={{ width: '24px', height: '24px' }}></i>
          </div>
          <div>
            <h4>Hỗ Trợ Giải Đáp Thắc Mắc Qua Tin Nhắn 1-1</h4>
            <p>Sau giờ học, bất cứ bài tập hay câu hỏi nào chưa hiểu, bạn được nhắn tin Zalo trực tiếp cho Thầy Hưng để được bóc tách và giải thích cặn kẽ.</p>
          </div>
        </div>
      </div>

      {/*  5 Split Gifts with Designated GIF Placeholder Frames  */}
      <div className="gifts-split-list" style={{ marginTop: '2.75rem' }}>
        {/*  Gift 1  */}
        <div className="gift-card-split">
          <div className="gift-content-side">
            <div className="gift-top-row">
              <span className="right-number-badge">🎁 QUÀ TẶNG #01</span>
              <span className="gift-val-badge">Trị giá: 1.200.000₫</span>
            </div>
            <h3 className="gift-card-split-title">Video Record Xem Lại Sau Mỗi Buổi Học</h3>
            <p className="gift-card-split-desc">
              Toàn bộ các buổi Live qua Zoom đều được ghi hình sắc nét và up lên hệ thống. Video record được lưu trữ tối đa 1 tuần kể từ ngày up để bạn ôn tập kỹ lưỡng hoặc xem lại khi có việc đột xuất.
            </p>
            <div className="gift-bullet-checks">
              <div className="gift-bullet-line">
                <i data-lucide="check" style={{ width: '16px', height: '16px' }}></i>
                <span>Không lo mất bài khi có việc đột xuất</span>
              </div>
              <div className="gift-bullet-line">
                <i data-lucide="check" style={{ width: '16px', height: '16px' }}></i>
                <span>Lưu trữ 1 tuần • Xem lại không giới hạn số lần</span>
              </div>
            </div>
          </div>
          <div className="gift-media-side">
            <div className="gift-media-mockup-frame">
              <div className="mockup-header-dots">
                <span className="mockup-dot dot-red"></span>
                <span className="mockup-dot dot-yellow"></span>
                <span className="mockup-dot dot-green"></span>
                <span className="mockup-title-text">record-player-zoom.mp4</span>
              </div>
              <div className="gift-media-slot-inner">
                <img src="/image/quyen-loi-record.webp" alt="Video Record Xem Lại Sau Mỗi Buổi Học" className="gift-benefit-img" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        {/*  Gift 2  */}
        <div className="gift-card-split">
          <div className="gift-content-side">
            <div className="gift-top-row">
              <span className="right-number-badge">🎁 QUÀ TẶNG #02</span>
              <span className="gift-val-badge">Trị giá: 1.500.000₫</span>
            </div>
            <h3 className="gift-card-split-title">App Luyện Thi Sát Đề 90% & Tracking Tiến Độ Học Tập</h3>
            <p className="gift-card-split-desc">
              Tặng tài khoản nền tảng app độc quyền tích hợp: làm bài tập sau mỗi buổi, luyện thi các bộ đề bám sát thi thật 90%, học từ vựng bóc tách từ đề thi và hệ thống tự động tracking tiến độ từng ngày của học viên.
            </p>
            <div className="gift-bullet-checks">
              <div className="gift-bullet-line">
                <i data-lucide="check" style={{ width: '16px', height: '16px' }}></i>
                <span>Đề thi sát thật 90% với ngân hàng câu hỏi mới nhất</span>
              </div>
              <div className="gift-bullet-line">
                <i data-lucide="check" style={{ width: '16px', height: '16px' }}></i>
                <span>Tự động theo dõi tiến độ, phân tích điểm mạnh - điểm yếu</span>
              </div>
            </div>
          </div>
          <div className="gift-media-side">
            <div className="gift-media-mockup-frame">
              <div className="mockup-header-dots">
                <span className="mockup-dot dot-red"></span>
                <span className="mockup-dot dot-yellow"></span>
                <span className="mockup-dot dot-green"></span>
                <span className="mockup-title-text">app-tracking-dashboard.io</span>
              </div>
              <div className="gift-media-slot-inner">
                <img src="/image/quyen-loi-tracking.webp" alt="App Luyện Thi Sát Đề 90% & Tracking Tiến Độ Học Tập" className="gift-benefit-img" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        {/*  Gift 3  */}
        <div className="gift-card-split">
          <div className="gift-content-side">
            <div className="gift-top-row">
              <span className="right-number-badge">🎁 QUÀ TẶNG #03</span>
              <span className="gift-val-badge">Trị giá: 800.000₫</span>
            </div>
            <h3 className="gift-card-split-title">File 1.000 Từ Vựng Sát Đề Thi Thật Bứt Phá 600 – 800+</h3>
            <p className="gift-card-split-desc">
              Bộ tài liệu độc quyền cô đọng 1.000 từ vựng có tần suất xuất hiện cao nhất trong các đề thi ETS mới nhất. Kèm ví dụ ngữ cảnh thực tế và phiên âm IPA chuẩn, giúp bạn tiết kiệm 70% thời gian cày cuốc.
            </p>
            <div className="gift-bullet-checks">
              <div className="gift-bullet-line">
                <i data-lucide="check" style={{ width: '16px', height: '16px' }}></i>
                <span>Trọng tâm 100% đề thi ETS mới nhất</span>
              </div>
              <div className="gift-bullet-line">
                <i data-lucide="check" style={{ width: '16px', height: '16px' }}></i>
                <span>Học từ vựng gắn liền với ngữ cảnh thực chiến Part 7</span>
              </div>
            </div>
          </div>
          <div className="gift-media-side">
            <div className="gift-media-mockup-frame">
              <div className="mockup-header-dots">
                <span className="mockup-dot dot-red"></span>
                <span className="mockup-dot dot-yellow"></span>
                <span className="mockup-dot dot-green"></span>
                <span className="mockup-title-text">vocab-flashcard-ets.app</span>
              </div>
              <div className="gift-media-slot-inner">
                <img src="/image/quyen-loi-tu-vung.webp" alt="File 1.000 Từ Vựng Sát Đề Thi Thật Bứt Phá 600 – 800+" className="gift-benefit-img" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        {/*  Gift 4  */}
        <div className="gift-card-split">
          <div className="gift-content-side">
            <div className="gift-top-row">
              <span className="right-number-badge">🎁 QUÀ TẶNG #04</span>
              <span className="gift-val-badge">Trị giá: 1.300.000₫</span>
            </div>
            <h3 className="gift-card-split-title">Phòng Luyện Thi & Thi Thử Định Kỳ Chuẩn ETS Áp Lực 120 Phút</h3>
            <p className="gift-card-split-desc">
              Các bài Mini Tests và Full Tests định kỳ mô phỏng chính xác áp lực phòng thi thật. Thầy Hưng trực tiếp chấm điểm, phân tích ma trận lỗi sai riêng và hướng dẫn cách khắc phục triệt để.
            </p>
            <div className="gift-bullet-checks">
              <div className="gift-bullet-line">
                <i data-lucide="check" style={{ width: '16px', height: '16px' }}></i>
                <span>Mô phỏng áp lực 120 phút & 200 câu hỏi liên tục</span>
              </div>
              <div className="gift-bullet-line">
                <i data-lucide="check" style={{ width: '16px', height: '16px' }}></i>
                <span>Thầy Hưng trực tiếp phân tích ma trận điểm mạnh - điểm yếu</span>
              </div>
            </div>
          </div>
          <div className="gift-media-side">
            <div className="gift-media-mockup-frame">
              <div className="mockup-header-dots">
                <span className="mockup-dot dot-red"></span>
                <span className="mockup-dot dot-yellow"></span>
                <span className="mockup-dot dot-green"></span>
                <span className="mockup-title-text">ets-exam-simulator.live</span>
              </div>
              <div className="gift-media-slot-inner">
                <img src="/image/quyen-loi-phong-thi.webp" alt="Phòng Luyện Thi & Thi Thử Định Kỳ Chuẩn ETS Áp Lực 120 Phút" className="gift-benefit-img" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        {/*  Gift 5  */}
        <div className="gift-card-split right-card-special">
          <div className="gift-content-side">
            <div className="gift-top-row">
              <span className="right-number-badge badge-special">🎁 QUÀ TẶNG #05 — ĐẶC QUYỀN CAO NHẤT</span>
              <span className="gift-val-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', borderColor: 'rgba(16, 185, 129, 0.4)' }}>GIÁ TRỊ VÔ GIÁ</span>
            </div>
            <h3 className="gift-card-split-title title-special">Đảm Bảo Chuẩn Đầu Ra 600+ TOEIC (Tự Tin Đạt 800+)</h3>
            <p className="gift-card-split-desc">
              Học viên tham gia học đầy đủ các buổi Live qua Zoom và làm bài theo hướng dẫn của Thầy Hưng được <strong>ĐẢM BẢO CHUẨN ĐẦU RA 600+ TOEIC</strong> (nếu không đạt, bạn được <strong>học lại 100% hoàn toàn miễn phí nếu không đạt MỤC TIÊU</strong> trong khóa tiếp theo). Đồng thời, phương pháp thực chiến tối ưu điểm số giúp bạn hoàn toàn có thể bứt phá 800+ bình thường!
            </p>
            <div className="gift-bullet-checks">
              <div className="gift-bullet-line">
                <i data-lucide="check" style={{ color: '#34D399', width: '16px', height: '16px' }}></i>
                <span>Đảm bảo chuẩn 600+ sau khi học xong • Tự tin bứt phá 800+</span>
              </div>
              <div className="gift-bullet-line">
                <i data-lucide="check" style={{ color: '#34D399', width: '16px', height: '16px' }}></i>
                <span>Học lại 100% miễn phí nếu không đạt mục tiêu</span>
              </div>
            </div>
          </div>
          <div className="gift-media-side">
            <div className="gift-media-mockup-frame" style={{ borderColor: '#10B981' }}>
              <div className="mockup-header-dots" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                <span className="mockup-dot dot-red"></span>
                <span className="mockup-dot dot-yellow"></span>
                <span className="mockup-dot dot-green"></span>
                <span className="mockup-title-text" style={{ color: '#34D399' }}>official-ets-guarantee.cert</span>
              </div>
              <div className="gift-media-slot-inner">
                <img src="/image/quyen-loi-cam-ket.webp" alt="Cam Kết Chuẩn Đầu Ra 600+ Học Lại Miễn Phí" className="gift-benefit-img" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ==========================================================================
       SECTION 7: ĐỐI TƯỢNG PHÙ HỢP VÀ KHÔNG PHÙ HỢP (SCREENSHOT 2 STYLE)
       ==========================================================================  */}
  <section className="section-padding audience-fit-section section-light" id="phu-hop">
    <div className="container">
      <div className="text-center">
        <h2 className="section-title">Chương trình này có thực sự <span className="highlight">phù hợp với bạn?</span></h2>
        <p className="section-subtitle">
          Chúng tôi đặt chất lượng và kết quả học viên lên hàng đầu, do đó khóa học chỉ dành cho những bạn thực sự nghiêm túc:
        </p>
      </div>

      <div className="audience-fit-grid">
        {/*  Fit Box: YES  */}
        <div className="fit-card fit-yes">
          <div className="fit-card-title">
            CHƯƠNG TRÌNH NÀY SẼ HOÀN HẢO NẾU BẠN LÀ:
          </div>

          <div className="fit-list">
            <div className="fit-item">
              <i data-lucide="check" style={{ width: '18px', height: '18px' }}></i>
              <div><strong>Sinh viên & người đi làm cần chuẩn 600+ hoặc muốn bứt phá 700 – 800+ TOEIC:</strong> Khóa học đảm bảo đầu ra 600+ sau khi hoàn thành cho các bạn mất gốc, nhưng giá trị và kinh nghiệm thực chiến của Thầy Hưng thừa sức giúp những bạn đã có nền tảng đạt 700, 800+, thậm chí 895 TOEIC bình thường để đổi điểm, xin việc và thăng tiến!</div>
            </div>

            <div className="fit-item">
              <i data-lucide="check" style={{ width: '18px', height: '18px' }}></i>
              <div>Người đi làm bận rộn muốn nâng điểm TOEIC để ứng tuyển công ty đa quốc gia, mở rộng cơ hội thăng tiến, tăng lương, hoặc ứng tuyển Tiếp viên hàng không.</div>
            </div>

            <div className="fit-item">
              <i data-lucide="check" style={{ width: '18px', height: '18px' }}></i>
              <div>Người mất gốc tiếng Anh lâu năm, sợ nghe, sợ đọc, cần một người thầy cầm tay chỉ việc, sửa từng lỗi phát âm và thúc đẩy kỷ luật mỗi ngày.</div>
            </div>

            <div className="fit-item">
              <i data-lucide="check" style={{ width: '18px', height: '18px' }}></i>
              <div>Bất kỳ ai đã mệt mỏi với việc tự học video thu sẵn chán nản, cày đề bừa bãi tốn hàng triệu đồng lệ phí thi mà điểm vẫn giậm chân tại chỗ.</div>
            </div>
          </div>
        </div>

        {/*  Fit Box: NO  */}
        <div className="fit-card fit-no">
          <div className="fit-card-title">
            CHƯƠNG TRÌNH NÀY KHÔNG PHÙ HỢP NẾU BẠN LÀ:
          </div>

          <div className="fit-list">
            <div className="fit-item">
              <i data-lucide="x" style={{ width: '18px', height: '18px' }}></i>
              <div>Người đang tìm kiếm các "công thức thần thánh", mẹo đánh lụi hay kiến thức "mì ăn liền" để có kết quả nhanh mà không muốn bỏ công sức thực hành.</div>
            </div>

            <div className="fit-item">
              <i data-lucide="x" style={{ width: '18px', height: '18px' }}></i>
              <div>Người lười biếng, vào lớp tắt cam tắt mic, không sẵn sàng bật mic tương tác và đọc dịch khi thầy gọi tên để sửa lỗi.</div>
            </div>

            <div className="fit-item">
              <i data-lucide="x" style={{ width: '18px', height: '18px' }}></i>
              <div>Người chỉ thích mua video lưu về máy để đó cho yên tâm chứ không muốn tham gia học Live tương tác 90 phút/buổi.</div>
            </div>

            <div className="fit-item">
              <i data-lucide="x" style={{ width: '18px', height: '18px' }}></i>
              <div>Người đã đạt trình độ 950+ TOEIC hoặc tìm kiếm các chứng chỉ sư phạm ngôn ngữ học thuật chuyên sâu.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    {/*  ==========================================================================
       SECTION 8: BẢNG GIÁ & FORM ĐĂNG KÝ (BỐ CỤC 2 CỘT CHUẨN ẢNH 1 & ẢNH 2)
       ==========================================================================  */}
  <section className="section-padding pricing-section" id="dang-ky">
    <div className="container container-wide">
      <div className="pricing-card-2col">
        
        {/*  CỘT TRÁI: TIÊU ĐỀ, BẢNG TÍNH GIÁ TRỊ, GIÁ GẠCH 10.800K & 5.400K SIÊU TO, PILLS  */}
        <div className="pricing-col-left">
          <h2 className="pricing-headline">
            Sẵn sàng bứt phá <span className="highlight">600 – 800+ TOEIC</span> cùng Thầy Hưng?
          </h2>

          <div className="pricing-valuestack-list">
            <div className="pricing-val-item">
              <div className="val-check">
                <i data-lucide="check" style={{ width: '16px', height: '16px', color: '#10B981', flexShrink: '0' }}></i>
                <span>Khóa Học TOEIC ONLINE PRO 36 Buổi Live Cùng Thầy Hưng</span>
              </div>
              <span className="val-price">6.000.000₫</span>
            </div>

            <div className="pricing-val-item">
              <div className="val-check">
                <i data-lucide="check" style={{ width: '16px', height: '16px', color: '#10B981', flexShrink: '0' }}></i>
                <span>BONUS 1: Video Record 36 Buổi Học Lưu Trữ Xem Lại Linh Hoạt</span>
              </div>
              <span className="val-price">1.200.000₫</span>
            </div>

            <div className="pricing-val-item">
              <div className="val-check">
                <i data-lucide="check" style={{ width: '16px', height: '16px', color: '#10B981', flexShrink: '0' }}></i>
                <span>BONUS 2: Hệ Thống App Luyện Thi Sát Đề 90% & Tracking Tiến Độ</span>
              </div>
              <span className="val-price">1.500.000₫</span>
            </div>

            <div className="pricing-val-item">
              <div className="val-check">
                <i data-lucide="check" style={{ width: '16px', height: '16px', color: '#10B981', flexShrink: '0' }}></i>
                <span>BONUS 3: Bộ Tài Liệu Độc Quyền 1.000 Từ Vựng Sát Đề Thi Thật ETS</span>
              </div>
              <span className="val-price">800.000₫</span>
            </div>

            <div className="pricing-val-item">
              <div className="val-check">
                <i data-lucide="check" style={{ width: '16px', height: '16px', color: '#10B981', flexShrink: '0' }}></i>
                <span>BONUS 4: Phòng Luyện Thi Thử Định Kỳ Chuẩn ETS Áp Lực 120 Phút</span>
              </div>
              <span className="val-price">1.300.000₫</span>
            </div>

            <div className="pricing-val-item">
              <div className="val-check">
                <i data-lucide="check" style={{ width: '16px', height: '16px', color: '#10B981', flexShrink: '0' }}></i>
                <span>BONUS 5: Cộng Đồng Học Viên Kèm Cặp & Giải Đáp 24/7</span>
              </div>
              <span className="val-price">500.000₫</span>
            </div>
          </div>

          {/*  Hiển thị Giá chuẩn Ảnh 1: Gạch 10.800.000đ và Giá to 5.400.000đ  */}
          <div className="pricing-price-display">
            <div className="price-strikethrough-row">
              <span className="price-total-label">Tổng giá trị:</span>
              <span className="price-strikethrough-pill">10.800.000₫</span>
            </div>
            <div className="pricing-giant-number">
              5.400.000 <span className="currency-symbol">đ</span>
            </div>
          </div>

          {/*  Các Feature Pill Badges chuẩn Ảnh 2  */}
          <div className="pricing-feature-pills">
            <span className="feat-pill"><i data-lucide="video" style={{ width: '14px', height: '14px' }}></i> Học Live Zoom 100%</span>
            <span className="feat-pill"><i data-lucide="user-check" style={{ width: '14px', height: '14px' }}></i> Kèm cặp 1-1 sửa lỗi</span>
            <span className="feat-pill"><i data-lucide="shield-check" style={{ width: '14px', height: '14px' }}></i> Cam kết học lại miễn phí</span>
            <span className="feat-pill"><i data-lucide="sparkles" style={{ width: '14px', height: '14px' }}></i> Cam kết đạt mục tiêu</span>
          </div>
        </div>

        {/*  CỘT PHẢI: LỜI DẪN, FORM ĐĂNG KÝ BÊN CẠNH & ĐỒNG HỒ ĐẾM NGƯỢC DƯỚI NÚT (ẢNH 2)  */}
        <div className="pricing-col-right">
          <p className="pricing-right-lead">
            Đừng để nỗi sợ mất gốc tiếp tục giữ bạn lại — trong khi hàng trăm học viên đã tự tin bứt phá 600 – 800+ TOEIC để ra trường đúng hạn và nhân đôi cơ hội việc làm.
          </p>

          <form id="toeic-registration-form" action="/payment" method="GET" className="pricing-direct-form">
            <div className="form-group-clean">
              <label className="form-clean-label" htmlFor="fullname">Họ & tên <span className="req">*</span></label>
              <input type="text" id="fullname" name="name" className="form-clean-input" placeholder="Nhập họ và tên của bạn" required />
            </div>

            <div className="form-group-clean">
              <label className="form-clean-label" htmlFor="phone">Số điện thoại <span className="req">*</span></label>
              <input type="tel" id="phone" name="phone" className="form-clean-input" placeholder="Nhập số điện thoại (có Zalo)" required />
            </div>

            <div className="form-group-clean">
              <label className="form-clean-label" htmlFor="email">Email <span className="req">*</span></label>
              <input type="email" id="email" name="email" className="form-clean-input" placeholder="Nhập email để nhận thông tin" required />
            </div>

            <button type="submit" className="btn-reg-gold">
              <span>ĐĂNG KÝ NGAY</span>
            </button>

            {/*  Khối Đếm Ngược Ngay Dưới Nút Bấm Chuẩn Ảnh 2  */}
            <div className="pricing-countdown-block">
              <div className="cd-label">Ưu đãi có hạn và kết thúc sau:</div>
              <div className="cd-timer-row">
                <div className="cd-box">
                  <span className="cd-num cd-hours">23</span>
                  <span className="cd-unit">GIỜ</span>
                </div>
                <span className="cd-colon">:</span>
                <div className="cd-box">
                  <span className="cd-num cd-minutes">59</span>
                  <span className="cd-unit">PHÚT</span>
                </div>
                <span className="cd-colon">:</span>
                <div className="cd-box">
                  <span className="cd-num cd-seconds">59</span>
                  <span className="cd-unit">GIÂY</span>
                </div>
              </div>
            </div>

            <div className="form-disclaimer">
              <i data-lucide="lock" style={{ width: '14px', height: '14px', color: 'var(--color-accent)' }}></i>
              <span>Thông tin của bạn được bảo mật tuyệt đối. Sau khi nhận đăng ký bạn sẽ được chuyển đến trang xác nhận.</span>
            </div>

            <div style={{ textAlign: 'center', marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
              <a href="/payment" style={{ color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
                <span>⚡ Bạn muốn chuyển khoản trực tiếp qua mã VietQR? Vào ngay trang /payment</span>
                <i data-lucide="arrow-right" style={{ width: '14px', height: '14px' }}></i>
              </a>
            </div>
          </form>
        </div>

      </div>
    </div>
  </section>

  {/*  ==========================================================================
       SECTION 9: FAQ (CÂU HỎI THƯỜNG GẶP - SCREENSHOT 3 STYLE)
       ==========================================================================  */}
  <section className="section-padding faq-section section-light" id="faq">
    <div className="container container-narrow">
      <div className="text-center">
        <span className="faq-badge-pill">• CÂU HỎI THƯỜNG GẶP</span>
        <h2 className="section-title">Giải đáp thêm về chương trình <br />nếu bạn vẫn còn băn khoăn</h2>
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        {/*  FAQ Item 1  */}
        <div className="faq-item-container active">
          <div className="faq-trigger">
            <div className="faq-question-text">Mình mất gốc tiếng Anh hoàn toàn, liệu có theo được khóa học này không?</div>
            <div className="faq-toggle-circle">+</div>
          </div>
          <div className="faq-content-pane">
            <div className="faq-content-inner">
              Đây chính xác là đối tượng mà khóa học TOEIC ONLINE PRO hướng tới. Khóa học được thiết kế bắt đầu ngay từ <strong>Chặng 1: Chuẩn hóa 44 âm IPA từ số 0</strong>, giúp bạn phát âm chuẩn từng từ và nghe được âm nối của người bản xứ. Trong mỗi buổi học 90 phút, Thầy Hưng sẽ gọi từng bạn đọc dịch và sửa bài 1-1, đảm bảo dù bạn mất gốc đến đâu cũng theo kịp tiến độ và tự tin đạt chuẩn 600+, làm bàn đạp bứt phá 800+.
            </div>
          </div>
        </div>

        {/*  FAQ Item 2  */}
        <div className="faq-item-container">
          <div className="faq-trigger">
            <div className="faq-question-text">Khóa học này là học Live trực tiếp hay là video xem sẵn?</div>
            <div className="faq-toggle-circle">+</div>
          </div>
          <div className="faq-content-pane">
            <div className="faq-content-inner">
              <strong>Khóa học được dạy trực tiếp 100% qua Zoom cùng Thầy Hưng (985/990 TOEIC ETS)</strong> trong suốt 36 buổi (90 phút/buổi), hoàn toàn không bán video xem sẵn. Trong mỗi buổi, thầy sẽ gọi từng học viên đọc dịch câu, trực tiếp sửa phát âm IPA và chữa bài tập chi tiết cho từng người.
            </div>
          </div>
        </div>

        {/*  FAQ Item 3  */}
        <div className="faq-item-container">
          <div className="faq-trigger">
            <div className="faq-question-text">Nếu mình bận đột xuất và phải nghỉ 1 buổi học thì có bị mất bài không?</div>
            <div className="faq-toggle-circle">+</div>
          </div>
          <div className="faq-content-pane">
            <div className="faq-content-inner">
              Bạn hoàn toàn yên tâm. <strong>Tất cả các buổi học Live đều có video Record chất lượng cao lưu xem lại trong 1 tuần</strong> kể từ ngày phát. Bạn có thể xem lại bài giảng bất cứ lúc nào, làm bài tập trên app và nhắn tin hỏi Thầy Hưng phần chưa hiểu để không bị hổng kiến thức.
            </div>
          </div>
        </div>

        {/*  FAQ Item 4  */}
        <div className="faq-item-container">
          <div className="faq-trigger">
            <div className="faq-question-text">Sau giờ học nếu làm bài tập không hiểu thì có được hỏi thầy không?</div>
            <div className="faq-toggle-circle">+</div>
          </div>
          <div className="faq-content-pane">
            <div className="faq-content-inner">
              Có. Đây là đặc quyền kèm cặp 1-1 của khóa học: <strong>Học viên được hỗ trợ giải đáp thắc mắc 24/7 qua tin nhắn Zalo trực tiếp cùng Thầy Hưng</strong>. Bất cứ câu hỏi nào trong quá trình làm bài tập trên app hay giải đề thi thử, thầy sẽ giải thích cặn kẽ nguyên nhân và chỉ ra bẫy thi thật.
            </div>
          </div>
        </div>

        {/*  FAQ Item 5  */}
        <div className="faq-item-container">
          <div className="faq-trigger">
            <div className="faq-question-text">Chính sách CAM KẾT ĐẦU RA hoạt động như thế nào?</div>
            <div className="faq-toggle-circle">+</div>
          </div>
          <div className="faq-content-pane">
            <div className="faq-content-inner">
              Học viên tham gia học đầy đủ các buổi Live qua Zoom và hoàn thành bài tập theo hướng dẫn sẽ được <strong>Đảm bảo đạt chuẩn đầu ra 600+ TOEIC sau khóa học</strong>. Nếu thi không đạt chuẩn, bạn được <strong>Học lại 100% hoàn toàn miễn phí nếu không đạt MỤC TIÊU</strong> trong khóa tiếp theo!
            </div>
          </div>
        </div>

        {/*  FAQ Item 6: Cho người aim 700 - 800+  */}
        <div className="faq-item-container">
          <div className="faq-trigger">
            <div className="faq-question-text">Em đã có nền tảng và muốn aim 700 - 800+ TOEIC thì khóa này có phù hợp không?</div>
            <div className="faq-toggle-circle">+</div>
          </div>
          <div className="faq-content-pane">
            <div className="faq-content-inner">
              <strong>Hoàn toàn phù hợp và bạn hoàn toàn có thể đạt 800+ bình thường!</strong> Khóa học đảm bảo chuẩn đầu ra 600+ sau khi học xong để các bạn mất gốc yên tâm tuyệt đối, nhưng toàn bộ kỹ năng làm bài, chiến thuật bóc tách bẫy Part 3–4 và mẹo quét thông tin Part 7 của Thầy Hưng (985 TOEIC) mang giá trị thực chiến rất cao. Thực tế đã có rất nhiều bạn học viên có nền tảng sau 3 tháng (36 buổi) đã bứt phá đạt 700, 800+, thậm chí cán đích <strong>895 TOEIC</strong> nhờ nắm trọn kinh nghiệm thi thực chiến và phương pháp tối ưu hóa điểm số.
            </div>
          </div>
        </div>

        {/*  FAQ Item 6  */}
        <div className="faq-item-container">
          <div className="faq-trigger">
            <div className="faq-question-text">Học phí 5.400.000₫ gồm những gì và có phát sinh chi phí nào khác không?</div>
            <div className="faq-toggle-circle">+</div>
          </div>
          <div className="faq-content-pane">
            <div className="faq-content-inner">
              Mức học phí 5.400.000₫ (ưu đãi 50% từ giá gốc 10.800.000₫) là <strong>trọn gói cho toàn bộ 36 buổi Live (90 ngày)</strong>. Bạn được tặng kèm toàn bộ 5 quà tặng: Nền tảng app luyện thi sát đề 90%, File 1.000 từ vựng độc quyền, Video Record lưu 1 tuần, các bài thi thử chấm lỗi 1-1, và hỗ trợ Zalo 24/7. Hoàn toàn không phát sinh thêm bất kỳ chi phí nào!
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ==========================================================================
       VIETQR CHECKOUT MODAL
       ==========================================================================  */}
  <div className="modal-overlay" id="vietqr-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div className="modal-container">
      <div className="modal-header">
        <div id="modal-title" className="modal-title">Thanh Toán Giữ Suất Ưu Đãi Lớp Live Zoom</div>
        <button className="modal-close-btn" id="modal-close-btn" aria-label="Đóng cửa sổ">✕</button>
      </div>

      <div className="modal-body">
        <div className="qr-box">
          <img id="modal-qr-img" src="" alt="Mã QR Chuyển khoản VietQR" className="qr-image" />
          <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.5rem' }}>
            Mở App ngân hàng bất kỳ để quét mã VietQR tự động điền số tiền và nội dung
          </div>
        </div>

        <div className="bank-info-grid">
          <div className="bank-row">
            <span className="bank-label">Ngân hàng:</span>
            <span className="bank-value">MB Bank (Quân Đội)</span>
          </div>

          <div className="bank-row">
            <span className="bank-label">Số tài khoản:</span>
            <div className="bank-value">
              <span id="modal-bank-acc">0904244824</span>
              <button className="btn-copy" data-copy-target="modal-bank-acc">Sao chép</button>
            </div>
          </div>

          <div className="bank-row">
            <span className="bank-label">Chủ tài khoản:</span>
            <span className="bank-value">NGUYEN THE HUNG</span>
          </div>

          <div className="bank-row">
            <span className="bank-label">Học phí ưu đãi:</span>
            <div className="bank-value" style={{ color: 'var(--color-accent)', fontSize: '1.15rem' }}>
              <span>5.400.000₫</span>
              <button className="btn-copy" data-copy-text="5400000">Sao chép</button>
            </div>
          </div>

          <div className="modal-countdown-notice">
            <i data-lucide="clock" style={{ width: '14px', height: '14px' }}></i>
            <span>Ưu đãi hết hạn sau: <strong className="live-countdown">23:59:59</strong> (Quá hạn về giá gốc 10.800.000₫)</span>
          </div>

          <div className="bank-row">
            <span className="bank-label">Nội dung chuyển khoản:</span>
            <div className="bank-value">
              <span id="modal-transfer-memo" style={{ color: 'var(--color-accent-light)', fontFamily: 'monospace' }}></span>
              <button className="btn-copy" data-copy-target="modal-transfer-memo">Sao chép</button>
            </div>
          </div>
        </div>

        <a href="https://zalo.me/0904244824" target="_blank" rel="noopener noreferrer" className="btn btn-accent" style={{ width: '100%', textAlign: 'center', marginBottom: '0.65rem' }}>
          <i data-lucide="check-circle" style={{ width: '18px', height: '18px' }}></i>
          <span>TÔI ĐÃ CHUYỂN KHOẢN (XÁC NHẬN QUA ZALO)</span>
        </a>

        <a href="/payment" className="btn btn-outline-accent" style={{ width: '100%', textAlign: 'center', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', fontSize: '0.85rem' }}>
          <span>Mở Cổng Thanh Toán Đầy Đủ (/payment)</span>
          <i data-lucide="arrow-right" style={{ width: '14px', height: '14px' }}></i>
        </a>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Học viên đăng ký: <strong id="modal-user-phone" style={{ color: '#FFFFFF' }}></strong>
        </div>
      </div>
    </div>
  </div>

  {/*  ==========================================================================
       FEEDBACK & CERTIFICATE LIGHTBOX MODAL (ZOOM TO READ DETAIL)
       ==========================================================================  */}
  <div className="feedback-lightbox-modal" id="feedback-lightbox" role="dialog" aria-modal="true" aria-label="Xem chi tiết feedback">
    <div className="lightbox-backdrop" id="lightbox-backdrop"></div>
    <div className="lightbox-dialog">
      <button type="button" className="lightbox-close-btn" id="lightbox-close-btn" aria-label="Đóng cửa sổ">×</button>
      <div className="lightbox-content-box">
        <div className="lightbox-img-pane">
          <img src="" alt="Feedback chi tiết học viên" id="lightbox-img" className="lightbox-main-image" />
        </div>
        <div className="lightbox-caption-bar">
          <div className="lightbox-caption-text">
            <h4 id="lightbox-student-name">Học viên</h4>
            <p id="lightbox-student-score">Điểm số TOEIC ETS & Cảm nhận thực tế</p>
          </div>
          <button type="button" className="lightbox-dismiss-btn" id="lightbox-dismiss-btn">Đóng</button>
        </div>
      </div>
    </div>
  </div>

  {/*  STICKY FLOATING BOTTOM BAR  */}
  <aside className="sticky-floating-bar" id="sticky-floating-bar" aria-label="Thanh ưu đãi nổi">
    <div className="sticky-bar-inner">
      <div className="sticky-course-info">
        <span className="sticky-title">TOEIC ONLINE PRO (Lớp Live Zoom 100%)</span>
        <div className="sticky-price-row">
          <span className="sticky-price-orig">10.800.000₫</span>
          <span className="sticky-price-cur">5.400.000₫</span>
          <span className="sticky-timer-pill">
            <i data-lucide="clock" style={{ width: '13px', height: '13px' }}></i>
            <span>Ưu đãi còn: <strong className="live-countdown">23:59:59</strong></span>
          </span>
        </div>
      </div>
      <a href="#dang-ky" className="btn btn-accent btn-pulse" style={{ padding: '0.65rem 1.4rem', fontSize: '0.875rem' }}>
        Đăng Ký Tư Vấn
      </a>
    </div>
  </aside>

  {/*  FOOTER & LEGAL DISCLAIMERS  */}
  <footer className="site-footer">
    <div className="container">
      <div className="footer-top">
        <div className="footer-logo-row">
          <img src="/image/logo-white.png" alt="MrH TOEIC Logo" style={{ height: '44px', width: 'auto' }} />
        </div>
      </div>

      <div className="footer-disclaimers">
        <p>COPYRIGHT 2026 | MrH TOEIC | PRIVACY POLICY | TERMS & CONDITIONS</p>
        <p>DISCLAIMER: Please understand results are not typical. Your results will vary and depend on your effort, background, and commitment level. All language learning entails consistent effort and deliberate practice.</p>
        <p>NOT FACEBOOK: This site is not a part of the Facebook™ website or Facebook Inc. Additionally, This site is NOT endorsed by Facebook™ in any way. FACEBOOK is a trademark of FACEBOOK, Inc.</p>
      </div>

      <div className="footer-bottom">
        © 2026 MrH TOEIC. All rights reserved. Khóa học TOEIC ONLINE PRO | Đảm bảo chuẩn đầu ra 600+ • Bứt phá 800+ thực chiến.
      </div>
    </div>
  </footer>

  
  

    </>
  );
}

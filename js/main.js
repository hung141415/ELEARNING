/**
 * Main Interactive Logic for TOEIC ONLINE PRO
 * Handles: Countdown Timer, Horizontal Infinite Feedback Carousel,
 * Lightbox Modal, 36-Session Curriculum Filtering & Accordion,
 * FAQ Accordion, Registration Form & VietQR Bank Transfer Modal,
 * Sticky Floating CTA Bar, and Smooth Scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdownTimer();
  initFeedbackCarousel();
  initLightboxModal();
  initCurriculum();
  initRoadmapFlowEffect();
  initFaqAccordion();
  initRegistrationModal();
  initStickyBar();
  initCopyButtons();
  initSmoothScroll();
});

/* ==========================================================================
   1. COUNTDOWN TIMER (24-Hour Rolling Urgency)
   ========================================================================== */
function initCountdownTimer() {
  const timerElements = document.querySelectorAll('.live-countdown');
  const cdHours = document.querySelectorAll('.cd-hours');
  const cdMinutes = document.querySelectorAll('.cd-minutes');
  const cdSeconds = document.querySelectorAll('.cd-seconds');

  const STORAGE_KEY = 'toeic_pro_offer_deadline';
  let targetTime = localStorage.getItem(STORAGE_KEY);

  const now = new Date().getTime();
  if (!targetTime || parseInt(targetTime) <= now) {
    targetTime = now + 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, targetTime.toString());
  } else {
    targetTime = parseInt(targetTime);
  }

  function update() {
    const currentTime = new Date().getTime();
    let diff = targetTime - currentTime;

    if (diff <= 0) {
      targetTime = currentTime + 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, targetTime.toString());
      diff = targetTime - currentTime;
    }

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const pad = (n) => (n < 10 ? '0' + n : n);
    const timeString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    timerElements.forEach((el) => {
      el.textContent = timeString;
    });

    cdHours.forEach((el) => { el.textContent = pad(hours); });
    cdMinutes.forEach((el) => { el.textContent = pad(minutes); });
    cdSeconds.forEach((el) => { el.textContent = pad(seconds); });
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. CURRICULUM FILTER & ACCORDION (36 SESSIONS)
   ========================================================================== */
function initCurriculum() {
  const filterBtns = document.querySelectorAll('.curriculum-filter-tabs .tab-btn');
  const lessonCards = document.querySelectorAll('.curriculum-accordion .lesson-card');

  // Filter tabs
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      lessonCards.forEach((card) => {
        const stage = card.getAttribute('data-stage');
        if (filter === 'all' || stage === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Accordion toggle
  lessonCards.forEach((card) => {
    const header = card.querySelector('.lesson-header');
    const body = card.querySelector('.lesson-body');

    header.addEventListener('click', () => {
      const isActive = card.classList.contains('active');

      // Close other open cards for cleaner UX
      lessonCards.forEach((otherCard) => {
        if (otherCard !== card && otherCard.classList.contains('active')) {
          otherCard.classList.remove('active');
          const otherBody = otherCard.querySelector('.lesson-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      if (!isActive) {
        card.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        card.classList.remove('active');
        body.style.maxHeight = null;
      }
    });
  });

  // Open first lesson by default
  if (lessonCards.length > 0) {
    const first = lessonCards[0];
    first.classList.add('active');
    const firstBody = first.querySelector('.lesson-body');
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }
}

/* ==========================================================================
   3. FAQ ACCORDION (SCREENSHOT 3 STYLE)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item-container, .faq-card');

  faqItems.forEach((card) => {
    const trigger = card.querySelector('.faq-trigger, .faq-header');
    const content = card.querySelector('.faq-content-pane, .faq-body');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = card.classList.contains('active');

      faqItems.forEach((other) => {
        if (other !== card && other.classList.contains('active')) {
          other.classList.remove('active');
          const otherBody = other.querySelector('.faq-content-pane, .faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      if (!isActive) {
        card.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        card.classList.remove('active');
        content.style.maxHeight = null;
      }
    });
  });

  // Open first item by default like Screenshot 3
  if (faqItems.length > 0) {
    const first = faqItems[0];
    first.classList.add('active');
    const firstContent = first.querySelector('.faq-content-pane, .faq-body');
    if (firstContent) firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
  }
}

/* ==========================================================================
   4. REGISTRATION FORM & VIETQR MODAL
   ========================================================================== */
function initRegistrationModal() {
  const form = document.getElementById('toeic-registration-form');
  const modal = document.getElementById('vietqr-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!form || !modal) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="fullname"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();

    if (!name || !phone) {
      alert('Vui lòng nhập đầy đủ Họ tên và Số điện thoại!');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      alert('Số điện thoại không hợp lệ. Vui lòng nhập từ 9-11 chữ số!');
      return;
    }

    // High-ticket fee: 5.400.000₫ (original 10.800.000₫)
    const bankId = 'MB'; // MB Bank
    const accountNo = '0375688888';
    const accountName = 'NGUYEN THE HUNG';
    const amount = '5400000';
    const transferMemo = `${cleanPhone}_TOEICPRO`;

    const qrUrl = `https://api.vietqr.io/image/${bankId}-${accountNo}-compact2.jpg?amount=${amount}&addInfo=${encodeURIComponent(transferMemo)}&accountName=${encodeURIComponent(accountName)}`;

    const qrImg = document.getElementById('modal-qr-img');
    const memoEl = document.getElementById('modal-transfer-memo');
    const phoneNotice = document.getElementById('modal-user-phone');

    if (qrImg) qrImg.src = qrUrl;
    if (memoEl) memoEl.textContent = transferMemo;
    if (phoneNotice) phoneNotice.textContent = `${name} (${phone})`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. STICKY FLOATING BOTTOM BAR
   ========================================================================== */
function initStickyBar() {
  const stickyBar = document.getElementById('sticky-floating-bar');
  const heroSection = document.querySelector('.hero-section');

  if (!stickyBar || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 100) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  }, { passive: true });
}

/* ==========================================================================
   6. COPY TO CLIPBOARD BUTTONS
   ========================================================================== */
function initCopyButtons() {
  document.querySelectorAll('.btn-copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      let textToCopy = '';

      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) textToCopy = targetEl.textContent.trim();
      } else if (btn.getAttribute('data-copy-text')) {
        textToCopy = btn.getAttribute('data-copy-text');
      }

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.textContent;
          btn.textContent = '✓ Đã chép';
          btn.style.backgroundColor = 'var(--color-accent)';
          btn.style.color = '#071120';

          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
          }, 2000);
        }).catch(() => {
          alert('Không thể sao chép tự động. Vui lòng chọn và sao chép thủ công!');
        });
      }
    });
  });
}

/* ==========================================================================
   7. SMOOTH SCROLLING
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = 65;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   8. FEEDBACK HORIZONTAL SWIPEABLE CAROUSEL (IMAGE 2 VIBE - INFINITE LOOP)
   ========================================================================== */
function initFeedbackCarousel() {
  const viewport = document.getElementById('feedback-carousel-viewport');
  const track = document.getElementById('feedback-carousel-track');
  const prevBtn = document.getElementById('feedback-prev-btn');
  const nextBtn = document.getElementById('feedback-next-btn');

  if (!viewport || !track) return;

  const originalSlides = Array.from(track.children);
  const count = originalSlides.length;
  if (count === 0) return;

  // Clone 2 sets (one before, one after) for 3 sets (45 cards)
  const setBefore = originalSlides.map(slide => slide.cloneNode(true));
  const setAfter = originalSlides.map(slide => slide.cloneNode(true));

  setBefore.forEach(slide => track.insertBefore(slide, track.firstChild));
  setAfter.forEach(slide => track.appendChild(slide));

  let slideWidth = 280;
  let gap = 22;
  let slideStep = slideWidth + gap;
  let singleLoopWidth = count * slideStep;

  function recalculateMetrics() {
    const firstSlide = track.querySelector('.feedback-slide');
    if (!firstSlide) return;
    slideWidth = firstSlide.offsetWidth;
    const computedTrack = window.getComputedStyle(track);
    const parsedGap = parseFloat(computedTrack.gap) || 22;
    gap = parsedGap;
    slideStep = slideWidth + gap;
    singleLoopWidth = count * slideStep;
  }

  // Initial positioning in middle set
  recalculateMetrics();
  let currentTranslate = -singleLoopWidth;
  track.classList.add('no-transition');
  track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;

  window.addEventListener('resize', () => {
    recalculateMetrics();
    track.classList.add('no-transition');
    currentTranslate = -singleLoopWidth;
    track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
  });

  // Drag states
  let isDragging = false;
  let startX = 0;
  let startTranslate = 0;
  let dragStartTime = 0;
  let hasMoved = false;

  function wrapBoundariesIfNeeded() {
    if (currentTranslate <= -2 * singleLoopWidth) {
      currentTranslate += singleLoopWidth;
      track.classList.add('no-transition');
      track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    } else if (currentTranslate >= -singleLoopWidth * 0.2) {
      currentTranslate -= singleLoopWidth;
      track.classList.add('no-transition');
      track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    }
  }

  function handlePointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    isDragging = true;
    hasMoved = false;
    startX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX) || 0;
    dragStartTime = Date.now();

    wrapBoundariesIfNeeded();
    startTranslate = currentTranslate;
    track.classList.add('no-transition');
    viewport.classList.add('is-dragging');
  }

  function handlePointerMove(e) {
    if (!isDragging) return;
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX) || 0;
    const diffX = clientX - startX;

    if (Math.abs(diffX) > 7) {
      hasMoved = true;
    }

    currentTranslate = startTranslate + diffX;

    // Fast boundary wrapping while dragging
    if (currentTranslate <= -2.5 * singleLoopWidth) {
      currentTranslate += singleLoopWidth;
      startTranslate += singleLoopWidth;
    } else if (currentTranslate >= 0) {
      currentTranslate -= singleLoopWidth;
      startTranslate -= singleLoopWidth;
    }

    track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
  }

  function handlePointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove('is-dragging');

    const clientX = (e.changedTouches && e.changedTouches[0].clientX) || e.clientX || startX;
    const diffX = clientX - startX;
    const timeElapsed = Date.now() - dragStartTime;

    track.classList.remove('no-transition');

    // Snap to nearest card with flick assistance
    let snapIndex = Math.round(currentTranslate / slideStep);
    if (timeElapsed < 250 && Math.abs(diffX) > 25) {
      if (diffX < 0) {
        snapIndex = Math.floor(currentTranslate / slideStep);
      } else {
        snapIndex = Math.ceil(currentTranslate / slideStep);
      }
    }

    currentTranslate = snapIndex * slideStep;
    track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
  }

  track.addEventListener('transitionend', () => {
    wrapBoundariesIfNeeded();
  });

  // Pointer events
  viewport.addEventListener('mousedown', handlePointerDown);
  window.addEventListener('mousemove', handlePointerMove);
  window.addEventListener('mouseup', handlePointerUp);

  viewport.addEventListener('touchstart', handlePointerDown, { passive: true });
  window.addEventListener('touchmove', handlePointerMove, { passive: true });
  window.addEventListener('touchend', handlePointerUp);

  // Arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      wrapBoundariesIfNeeded();
      track.classList.remove('no-transition');
      currentTranslate += slideStep;
      track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      wrapBoundariesIfNeeded();
      track.classList.remove('no-transition');
      currentTranslate -= slideStep;
      track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    });
  }

  // Click on slide to view full card
  track.addEventListener('click', (e) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    const slide = e.target.closest('.feedback-slide');
    if (!slide) return;

    const fullSrc = slide.getAttribute('data-full');
    const name = slide.getAttribute('data-name');
    const score = slide.getAttribute('data-score');

    if (fullSrc && typeof window.openFeedbackLightbox === 'function') {
      window.openFeedbackLightbox(fullSrc, name, score);
    }
  });

  // Re-run icons on cloned elements
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/* ==========================================================================
   9. FEEDBACK & TEACHER CERTIFICATE LIGHTBOX MODAL
   ========================================================================== */
function initLightboxModal() {
  const modal = document.getElementById('feedback-lightbox');
  const img = document.getElementById('lightbox-img');
  const nameEl = document.getElementById('lightbox-student-name');
  const scoreEl = document.getElementById('lightbox-student-score');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const dismissBtn = document.getElementById('lightbox-dismiss-btn');
  const backdrop = document.getElementById('lightbox-backdrop');

  if (!modal || !img) return;

  window.openFeedbackLightbox = function(src, name, score) {
    img.src = src;
    if (nameEl) nameEl.textContent = name || 'Học viên MrH TOEIC';
    if (scoreEl) scoreEl.textContent = score || 'Chứng chỉ ETS & Tin nhắn cảm nhận thực tế';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Also wire teacher cert card
  const teacherCard = document.getElementById('teacher-cert-card');
  if (teacherCard) {
    teacherCard.addEventListener('click', () => {
      window.openFeedbackLightbox(
        'public/image/chung-chi-thay-hung.webp',
        'Thầy Hưng (Mr. Hưng TOEIC)',
        'Chứng chỉ ETS & IIG Việt Nam đạt 985/990 TOEIC (Listening 495 • Reading 490)'
      );
    });
  }
}

/* ==========================================================================
   10. MẠNH VIBE ROADMAP SCROLL FLOWING BEAM & ACTIVE STAGE EFFECT
   ========================================================================== */
function initRoadmapFlowEffect() {
  const timeline = document.getElementById('mv-roadmap-timeline');
  const beam = document.getElementById('mv-roadmap-beam');
  const rows = document.querySelectorAll('.mv-roadmap-row');

  if (!timeline || !beam || !rows.length) return;

  let ticking = false;

  function updateRoadmap() {
    const rect = timeline.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Focal activation line in the viewport (at 52% of viewport height)
    const focalY = windowH * 0.52;

    const timelineTop = rect.top;
    const timelineHeight = rect.height;

    // Distance scrolled from top of timeline to the focal line
    const scrolledPx = focalY - timelineTop;
    const progress = Math.min(1, Math.max(0, scrolledPx / timelineHeight));

    // Ultra-smooth hardware-accelerated scaleY (no reflow, 60fps/120fps sync)
    beam.style.transform = `scaleY(${progress})`;

    // Activate/deactivate stage rows as beam passes them
    rows.forEach((row) => {
      const node = row.querySelector('.mv-roadmap-node');
      const targetPoint = node 
        ? (node.getBoundingClientRect().top + node.offsetHeight / 2) 
        : row.getBoundingClientRect().top + 50;

      if (targetPoint <= focalY + 25) {
        row.classList.add('is-active');
      } else {
        row.classList.remove('is-active');
      }
    });
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateRoadmap();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial calculation
  updateRoadmap();
}


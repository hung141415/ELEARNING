/**
 * Interactive Client Logic for TOEIC ONLINE PRO (Next.js)
 * Handles: Countdown Timer, Horizontal Infinite Feedback Carousel,
 * Lightbox Modal, 36-Session Curriculum Filtering & Accordion,
 * FAQ Accordion, Registration Form & VietQR Bank Transfer Modal,
 * Sticky Floating CTA Bar, and Smooth Scroll.
 */
import { createIcons, icons } from 'lucide';

export function initAllInteractions() {
  if (typeof window === 'undefined') return () => {};

  // Render Lucide icons
  createIcons({ icons });

  const clearTimer = initCountdownTimer();
  initFeedbackCarousel();
  initLightboxModal();
  initCurriculum();
  initRoadmapFlowEffect();
  initFaqAccordion();
  initRegistrationModal();
  const clearSticky = initStickyBar();
  initCopyButtons();
  initSmoothScroll();

  return () => {
    if (clearTimer) clearTimer();
    if (clearSticky) clearSticky();
  };
}

/* ==========================================================================
   1. COUNTDOWN TIMER (24-Hour Rolling Urgency)
   ========================================================================== */
function initCountdownTimer() {
  const timerElements = document.querySelectorAll('.live-countdown');
  const cdHours = document.querySelectorAll('.cd-hours');
  const cdMinutes = document.querySelectorAll('.cd-minutes');
  const cdSeconds = document.querySelectorAll('.cd-seconds');

  const SHARED_KEY = 'mrh_offer_deadline_v1';
  let targetTime = null;
  const now = Date.now();

  try {
    const stored = localStorage.getItem(SHARED_KEY) || localStorage.getItem('toeic_pro_offer_deadline') || localStorage.getItem('mrh_checkout_timer_end');
    if (stored) {
      targetTime = parseInt(stored, 10);
    }
  } catch (e) {}

  if (!targetTime || isNaN(targetTime) || targetTime <= now) {
    targetTime = now + 24 * 60 * 60 * 1000;
    try {
      localStorage.setItem(SHARED_KEY, targetTime.toString());
      localStorage.setItem('toeic_pro_offer_deadline', targetTime.toString());
      localStorage.setItem('mrh_checkout_timer_end', targetTime.toString());
    } catch (e) {}
  } else {
    try {
      localStorage.setItem(SHARED_KEY, targetTime.toString());
      localStorage.setItem('toeic_pro_offer_deadline', targetTime.toString());
      localStorage.setItem('mrh_checkout_timer_end', targetTime.toString());
    } catch (e) {}
  }

  function update() {
    const currentTime = Date.now();
    let diff = Math.max(0, Math.floor((targetTime - currentTime) / 1000));

    if (diff <= 0) {
      targetTime = currentTime + 24 * 60 * 60 * 1000;
      try {
        localStorage.setItem(SHARED_KEY, targetTime.toString());
        localStorage.setItem('toeic_pro_offer_deadline', targetTime.toString());
        localStorage.setItem('mrh_checkout_timer_end', targetTime.toString());
      } catch (e) {}
      diff = 24 * 3600;
    }

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    const pad = (n) => (n < 10 ? '0' + n : String(n));
    const timeString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    timerElements.forEach((el) => {
      el.textContent = timeString;
    });

    cdHours.forEach((el) => { el.textContent = pad(hours); });
    cdMinutes.forEach((el) => { el.textContent = pad(minutes); });
    cdSeconds.forEach((el) => { el.textContent = pad(seconds); });
  }

  update();
  const intervalId = setInterval(update, 1000);
  return () => clearInterval(intervalId);
}

/* ==========================================================================
   2. CURRICULUM FILTER & ACCORDION (36 SESSIONS)
   ========================================================================== */
function initCurriculum() {
  const filterBtns = document.querySelectorAll('.curriculum-filter-tabs .tab-btn');
  const lessonCards = document.querySelectorAll('.curriculum-accordion .lesson-card');

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

  lessonCards.forEach((card) => {
    const header = card.querySelector('.lesson-header');
    const body = card.querySelector('.lesson-body');
    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isActive = card.classList.contains('active');

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

  if (lessonCards.length > 0) {
    const first = lessonCards[0];
    first.classList.add('active');
    const firstBody = first.querySelector('.lesson-body');
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }
}

/* ==========================================================================
   3. FAQ ACCORDION
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

  if (faqItems.length > 0) {
    const first = faqItems[0];
    first.classList.add('active');
    const firstContent = first.querySelector('.faq-content-pane, .faq-body');
    if (firstContent) firstContent.style.maxHeight = firstContent.scrollHeight + 'px';

    window.addEventListener('resize', () => {
      const activeItem = document.querySelector('.faq-item-container.active, .faq-card.active');
      if (activeItem) {
        const pane = activeItem.querySelector('.faq-content-pane, .faq-body');
        if (pane) pane.style.maxHeight = pane.scrollHeight + 'px';
      }
    });
  }
}

/* ==========================================================================
   4. REGISTRATION FORM & VIETQR MODAL
   ========================================================================== */
function initRegistrationModal() {
  const form = document.getElementById('toeic-registration-form');
  const modal = document.getElementById('vietqr-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (form.querySelector('[name="name"]')?.value || form.querySelector('[name="fullname"]')?.value || '').trim();
    const phone = (form.querySelector('[name="phone"]')?.value || '').trim();
    const email = (form.querySelector('[name="email"]')?.value || '').trim();

    if (!name || !phone) {
      alert('Vui lòng nhập đầy đủ Họ tên và Số điện thoại!');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      alert('Số điện thoại không hợp lệ. Vui lòng nhập từ 9-11 chữ số!');
      return;
    }

    // Send lead data to backend API (to backup locally & sync to Google Sheets)
    try {
      const leadPayload = {
        name: name,
        phone: cleanPhone,
        email: email,
        url: window.location.href,
        payment_status: 'Chưa thanh toán'
      };

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/lead', new Blob([JSON.stringify(leadPayload)], { type: 'application/json' }));
      } else {
        fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload),
          keepalive: true
        }).catch(() => {});
      }
    } catch (e) {}

    // Ghi nhận sự kiện chuyển đổi Facebook Pixel: Purchase
    try {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Purchase', {
          value: 5400000,
          currency: 'VND',
          content_name: 'Khóa học TOEIC ONLINE PRO 36 Buổi Live',
          content_type: 'product'
        });
      }
    } catch (fbErr) {
      console.warn('FB Pixel Purchase track error:', fbErr);
    }

    // Save buyer info to localStorage for instant hydration on /payment
    try {
      localStorage.setItem('mrh_buyer_info', JSON.stringify({
        fullname: name,
        phone: cleanPhone,
        email: email
      }));
    } catch (err) {}

    // Redirect to payment page with query params (short delay to ensure FB Pixel event is sent)
    const query = new URLSearchParams({
      name: name,
      phone: cleanPhone,
      email: email
    }).toString();

    setTimeout(() => {
      window.location.href = `/payment?${query}`;
    }, 350);
  });

  if (!modal) return;

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

  if (!stickyBar || !heroSection) return () => {};

  const handleScroll = () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 100) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
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
   8. FEEDBACK HORIZONTAL SWIPEABLE CAROUSEL
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

  // Prevent duplicate clone if already cloned
  if (track.getAttribute('data-cloned') === 'true') {
    return;
  }
  track.setAttribute('data-cloned', 'true');

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

  viewport.addEventListener('mousedown', handlePointerDown);
  window.addEventListener('mousemove', handlePointerMove);
  window.addEventListener('mouseup', handlePointerUp);

  viewport.addEventListener('touchstart', handlePointerDown, { passive: true });
  window.addEventListener('touchmove', handlePointerMove, { passive: true });
  window.addEventListener('touchend', handlePointerUp);

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
  createIcons({ icons });
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
    // Normalize path to /image/
    const normalizedSrc = src.replace(/^\/?public\//, '/');
    img.src = normalizedSrc;
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

  const teacherCard = document.getElementById('teacher-cert-card');
  if (teacherCard) {
    teacherCard.addEventListener('click', () => {
      window.openFeedbackLightbox(
        '/image/chung-chi-thay-hung.webp',
        'Thầy Hưng (Mr. Hưng TOEIC)',
        'Chứng chỉ ETS & IIG Việt Nam đạt 985/990 TOEIC (Listening 495 • Reading 490)'
      );
    });
  }
}

/* ==========================================================================
   10. ROADMAP SCROLL FLOWING BEAM & ACTIVE STAGE EFFECT
   ========================================================================== */
function initRoadmapFlowEffect() {
  const timeline = document.getElementById('mv-roadmap-timeline');
  const beam = document.getElementById('mv-roadmap-beam');
  const track = timeline ? timeline.querySelector('.mv-roadmap-track') : null;
  const rows = document.querySelectorAll('.mv-roadmap-row');
  const nodes = timeline ? timeline.querySelectorAll('.mv-roadmap-node') : [];

  if (!timeline || !beam || !track || !rows.length || !nodes.length) return;

  let cachedGeometry = null;
  let cachedRows = [];
  let lastProgressRounded = -1;

  function updateGeometry() {
    const firstNode = nodes[0];
    const lastNode = nodes[nodes.length - 1];
    if (!firstNode || !lastNode) return null;

    const timelineRect = timeline.getBoundingClientRect();
    const firstRect = firstNode.getBoundingClientRect();
    const lastRect = lastNode.getBoundingClientRect();

    // Exact horizontal center relative to timeline:
    const centerX = (firstRect.left + firstRect.width / 2) - timelineRect.left;
    // Start at the center of Node 01:
    const startY = (firstRect.top + firstRect.height / 2) - timelineRect.top;
    // End at the center of Node 06 (never dangles into empty space):
    const endY = (lastRect.top + lastRect.height / 2) - timelineRect.top;
    const trackHeight = Math.max(1, endY - startY);

    track.style.left = `${centerX}px`;
    track.style.top = `${startY}px`;
    track.style.height = `${trackHeight}px`;

    // Cache relative vertical positions once to avoid layout thrashing during scroll:
    cachedRows = Array.from(rows).map((row) => {
      const node = row.querySelector('.mv-roadmap-node');
      if (!node) return null;
      const nodeRect = node.getBoundingClientRect();
      const relativeCenterY = (nodeRect.top + nodeRect.height / 2) - timelineRect.top;
      return {
        row,
        node,
        relativeCenterY,
        isActive: row.classList.contains('is-active')
      };
    }).filter(Boolean);

    cachedGeometry = {
      centerX,
      startY,
      endY,
      trackHeight,
    };
    return cachedGeometry;
  }

  let ticking = false;

  function updateRoadmap() {
    if (!cachedGeometry || !cachedRows.length) {
      updateGeometry();
      if (!cachedGeometry) return;
    }

    const timelineRect = timeline.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Viewport Culling: Skip work when timeline is completely offscreen
    if (timelineRect.bottom < -80) {
      if (lastProgressRounded !== 1) {
        lastProgressRounded = 1;
        beam.style.transform = 'scale3d(1, 1, 1)';
        for (let i = 0; i < cachedRows.length; i++) {
          const item = cachedRows[i];
          if (!item.isActive) {
            item.isActive = true;
            item.row.classList.add('is-active');
          }
        }
      }
      return;
    }

    if (timelineRect.top > windowH + 80) {
      if (lastProgressRounded !== 0) {
        lastProgressRounded = 0;
        beam.style.transform = 'scale3d(1, 0, 1)';
        for (let i = 0; i < cachedRows.length; i++) {
          const item = cachedRows[i];
          if (item.isActive) {
            item.isActive = false;
            item.row.classList.remove('is-active');
          }
        }
      }
      return;
    }

    const focalY = windowH * 0.52;
    const timelineTop = timelineRect.top;
    const trackTopViewport = timelineTop + cachedGeometry.startY;
    const scrolledPx = focalY - trackTopViewport;
    const progress = Math.min(1, Math.max(0, scrolledPx / cachedGeometry.trackHeight));

    // Hardware accelerated 3D transform (120Hz/60Hz smooth, no subpixel recalculation)
    const progressRounded = Math.round(progress * 1000) / 1000;
    if (progressRounded !== lastProgressRounded) {
      lastProgressRounded = progressRounded;
      beam.style.transform = `scale3d(1, ${progressRounded}, 1)`;
    }

    // Zero-reflow node state update: compares purely with cached relativeCenterY
    for (let i = 0; i < cachedRows.length; i++) {
      const item = cachedRows[i];
      const nodeCenter = timelineTop + item.relativeCenterY;
      const shouldBeActive = focalY >= (nodeCenter - 25);

      if (item.isActive !== shouldBeActive) {
        item.isActive = shouldBeActive;
        if (shouldBeActive) {
          item.row.classList.add('is-active');
        } else {
          item.row.classList.remove('is-active');
        }
      }
    }
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

  function onResize() {
    updateGeometry();
    updateRoadmap();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onResize, { passive: true });

  // Handle lazy image load shifts gracefully
  const timelineImages = timeline.querySelectorAll('img');
  timelineImages.forEach((img) => {
    if (!img.complete) {
      img.addEventListener('load', onResize, { once: true });
    }
  });

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => {
      onResize();
    });
    ro.observe(timeline);
  }

  // Initial calculation + fallbacks for font & layout settlement
  updateGeometry();
  updateRoadmap();

  setTimeout(onResize, 300);
  setTimeout(onResize, 1000);
}

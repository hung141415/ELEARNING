/**
 * TOEIC ALL-IN-ONE LANDING PAGE - MAIN INTERACTION SCRIPT
 * Handles 24h Countdown, Checkout Form, Live Order Toasts, FAQ Accordion, and Interactive UX
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. 24-HOUR COUNTDOWN TIMER
  // ==========================================
  const hoursEls = document.querySelectorAll('.timer-hours');
  const minutesEls = document.querySelectorAll('.timer-minutes');
  const secondsEls = document.querySelectorAll('.timer-seconds');

  // Set or get end timestamp from localStorage
  const STORAGE_KEY = 'mrh_toeic_offer_end_time';
  let endTime = localStorage.getItem(STORAGE_KEY);

  if (!endTime || Date.now() > parseInt(endTime, 10)) {
    // 23 hours, 47 minutes from first visit
    endTime = Date.now() + (23 * 3600 + 47 * 60 + 35) * 1000;
    localStorage.setItem(STORAGE_KEY, endTime.toString());
  } else {
    endTime = parseInt(endTime, 10);
  }

  function updateTimer() {
    const now = Date.now();
    let distance = endTime - now;

    if (distance < 0) {
      // Reset for continuous urgency loop
      endTime = Date.now() + (23 * 3600 + 59 * 60) * 1000;
      localStorage.setItem(STORAGE_KEY, endTime.toString());
      distance = endTime - now;
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    hoursEls.forEach(el => el.textContent = pad(hours));
    minutesEls.forEach(el => el.textContent = pad(minutes));
    secondsEls.forEach(el => el.textContent = pad(seconds));
  }

  updateTimer();
  setInterval(updateTimer, 1000);

  // ==========================================
  // 2. FAQ ACCORDION INTERACTION
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });

  // ==========================================
  // 3. LIVE SOCIAL PROOF ORDER TOASTS
  // ==========================================
  const toastContainer = document.getElementById('live-order-toast');
  const toastName = document.getElementById('toast-student-name');
  const toastDetail = document.getElementById('toast-detail');
  const toastTime = document.getElementById('toast-time');

  const studentOrders = [
    { name: 'Nguyễn Hải Đăng', note: 'Đã giữ suất ưu đãi 499.000đ + 5 Quà tặng', school: 'ĐH Bách Khoa Hà Nội', time: 'Vừa xong' },
    { name: 'Trần Thảo Linh', note: 'Đăng ký mục tiêu TOEIC 750+ thành công', school: 'ĐH Kinh Tế Quốc Dân', time: '2 phút trước' },
    { name: 'Lê Minh Tuấn', note: 'Người đi làm (FPT Software) nhận tư vấn lộ trình 60 ngày', school: 'Hà Nội', time: '4 phút trước' },
    { name: 'Phạm Thu Trang', note: 'Đã kích hoạt bảo lưu học phí & cam kết đầu ra', school: 'ĐH Ngoại Thương', time: '7 phút trước' },
    { name: 'Vũ Đức Mạnh', note: 'Đã đăng ký suất ưu đãi 499.000đ', school: 'Học Viện Tài Chính', time: '11 phút trước' },
    { name: 'Hoàng Yến Nhi', note: 'Mục tiêu 850+ bứt phá ra trường nhận full bonus', school: 'ĐH Quốc Gia', time: '15 phút trước' }
  ];

  let toastIdx = 0;

  function showOrderToast() {
    if (!toastContainer) return;

    const data = studentOrders[toastIdx];
    toastName.textContent = data.name;
    toastDetail.textContent = data.note;
    toastTime.textContent = data.time;

    toastContainer.classList.add('show');

    setTimeout(() => {
      toastContainer.classList.remove('show');
    }, 4500);

    toastIdx = (toastIdx + 1) % studentOrders.length;
  }

  // Initial show after 4 seconds, then repeat every 12 seconds
  setTimeout(() => {
    showOrderToast();
    setInterval(showOrderToast, 12000);
  }, 4000);

  // ==========================================
  // 4. CHECKOUT FORM INTERACTION & SUBMIT
  // ==========================================
  const checkoutForm = document.getElementById('registration-form');
  const submitBtn = document.getElementById('submit-btn');
  const formSuccessAlert = document.getElementById('form-success-alert');

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullname').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const target = document.getElementById('target-score').value;

      if (!name || !phone) {
        alert('Vui lòng điền đầy đủ Họ và tên cùng Số điện thoại để Thầy Hưng hỗ trợ nhé!');
        return;
      }

      // Simulate loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" style="width:20px;height:20px;animation:spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="4" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-width="4"></path>
        </svg>
        Đang xác nhận giữ chỗ...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        if (formSuccessAlert) {
          formSuccessAlert.style.display = 'block';
          formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        checkoutForm.reset();

        // Celebration banner or scroll
        alert(`🎉 Chúc mừng ${name}! Bạn đã giữ thành công suất học ưu đãi 499.000 VNĐ kèm 5 Quà Tặng Độc Quyền từ Thầy Phạm Việt Hưng.\n\nBan đào tạo và Thầy Hưng sẽ liên hệ trực tiếp qua số ${phone} trong ít phút.`);
      }, 900);
    });
  }

  // Smooth scroll helper for all CTA links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

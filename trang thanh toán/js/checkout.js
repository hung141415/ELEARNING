/**
 * CHECKOUT CLIENT INTERACTION LOGIC
 * Project: TOEIC ONLINE PRO - MrH TOEIC
 * CRO & Funnel Optimization Strategy
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Requirement: Always scroll to top immediately upon arriving on checkout page
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  // Student State
  let currentStudent = {
    fullname: 'Nguyễn Thế Hưng',
    phone: '0904244824',
    email: 'hung.pham@example.com'
  };

  // Offers Definition
  const OFFERS = {
    course: {
      id: 'course',
      name: 'TOEIC ONLINE PRO (36 Buổi Live Zoom Cùng Thầy Hưng)',
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

  let activeOfferKey = 'course';

  // Bank Info Constants (From Reference & IMG_8426.JPG)
  const BANK_INFO = {
    bankName: 'Vietcombank',
    bankFullName: 'Ngoại thương Việt Nam (Vietcombank)',
    accountNumber: '9904244824',
    accountName: 'PHAM VIET HUNG',
    branch: 'PGD Lê Chân'
  };

  // DOM Elements
  const offerTabBtns = document.querySelectorAll('.offer-tab-btn');
  const orderItemTitle = document.getElementById('order-item-title');
  const orderItemDesc = document.getElementById('order-item-desc');
  const orderPriceOriginal = document.getElementById('order-price-orig');
  const orderPriceFinal = document.getElementById('order-price-final');
  const orderSavingBadge = document.getElementById('order-saving-badge');
  const mobilePriceDisplay = document.getElementById('mobile-price-val');

  const bankAccNumEl = document.getElementById('bank-acc-num');
  const transferAmountEl = document.getElementById('transfer-amount-val');
  const transferMemoEl = document.getElementById('transfer-memo-val');
  const qrImageEl = document.getElementById('dynamic-qr-img');

  const buyerNameEl = document.getElementById('buyer-name-display');
  const buyerPhoneEl = document.getElementById('buyer-phone-display');
  const buyerEmailEl = document.getElementById('buyer-email-display');
  const heroBuyerPill = document.getElementById('hero-buyer-tag');

  const toastEl = document.getElementById('toast-notification');
  const toastMsgEl = document.getElementById('toast-msg');

  // Format Currency
  function formatMoney(num) {
    return num.toLocaleString('vi-VN') + '₫';
  }

  // Generate VietQR URL
  function getVietQRUrl(amount, memo) {
    // Vietcombank BIN: 970436
    const bin = '970436';
    const acc = BANK_INFO.accountNumber;
    const name = encodeURIComponent(BANK_INFO.accountName);
    const memoEncoded = encodeURIComponent(memo);
    return `https://api.vietqr.io/image/${bin}-${acc}-compact2.jpg?amount=${amount}&addInfo=${memoEncoded}&accountName=${name}`;
  }

  // Update UI with Active Offer & Student Data
  function updateCheckoutUI() {
    const offer = OFFERS[activeOfferKey];
    const memo = `${offer.memoPrefix} ${currentStudent.phone}`;

    // Update Order Summary
    if (orderItemTitle) orderItemTitle.textContent = offer.name;
    if (orderItemDesc) orderItemDesc.textContent = offer.description;
    if (orderPriceOriginal) orderPriceOriginal.textContent = formatMoney(offer.originalPrice);
    if (orderPriceFinal) orderPriceFinal.textContent = formatMoney(offer.price);
    if (orderSavingBadge) orderSavingBadge.textContent = `Tiết kiệm ${offer.saving}`;
    if (mobilePriceDisplay) mobilePriceDisplay.textContent = formatMoney(offer.price);

    // Update Transfer Details
    if (bankAccNumEl) bankAccNumEl.textContent = BANK_INFO.accountNumber;
    if (transferAmountEl) transferAmountEl.textContent = formatMoney(offer.price);
    if (transferMemoEl) transferMemoEl.textContent = memo;

    // Update Dynamic QR
    if (qrImageEl) {
      qrImageEl.src = getVietQRUrl(offer.price, memo);
    }

    // Update Buyer Details
    if (buyerNameEl) buyerNameEl.textContent = currentStudent.fullname;
    if (buyerPhoneEl) buyerPhoneEl.textContent = currentStudent.phone;
    if (buyerEmailEl) buyerEmailEl.textContent = currentStudent.email;
    if (heroBuyerPill) {
      heroBuyerPill.textContent = `Học viên: ${currentStudent.fullname} (${currentStudent.phone})`;
    }
  }

  // Initialize
  updateCheckoutUI();

  // Tab Switcher
  offerTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const offerId = btn.getAttribute('data-offer');
      if (OFFERS[offerId]) {
        offerTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeOfferKey = offerId;
        updateCheckoutUI();
        showToast(`Đã chuyển sang: ${OFFERS[offerId].shortName}`);
      }
    });
  });

  // Copy to Clipboard Helper
  function copyTextToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || '✓ Đã sao chép vào bộ nhớ tạm!');
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const input = document.createElement('textarea');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showToast(successMsg || '✓ Đã sao chép vào bộ nhớ tạm!');
    } catch (err) {
      showToast('Sao chép không thành công, vui lòng nhập tay');
    }
    document.body.removeChild(input);
  }

  // Toast Function
  let toastTimeout;
  function showToast(message) {
    if (!toastEl || !toastMsgEl) return;
    toastMsgEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  // Copy Button Listeners
  document.querySelectorAll('[data-copy-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const text = targetEl.textContent.trim().replace(/[₫\.]/g, '');
        copyTextToClipboard(text, `✓ Đã sao chép: ${targetEl.textContent.trim()}`);

        const originalText = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '<span>✓ Đã chép</span>';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalText;
        }, 2000);
      }
    });
  });

  // Copy Direct Text
  document.querySelectorAll('[data-copy-direct]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      let text = btn.getAttribute('data-copy-direct');
      if (text === 'current_amount') {
        text = OFFERS[activeOfferKey].price.toString();
      } else if (text === 'current_memo') {
        text = `${OFFERS[activeOfferKey].memoPrefix} ${currentStudent.phone}`;
      }
      copyTextToClipboard(text, `✓ Đã sao chép: ${text}`);
    });
  });

  // QR Code Mode Toggle (Dynamic VietQR vs. Original Ticket IMG_8426.JPG)
  const qrToggleBtns = document.querySelectorAll('.qr-toggle-btn');
  const qrDynamicBox = document.getElementById('qr-dynamic-view');
  const qrTicketBox = document.getElementById('qr-ticket-view');

  qrToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-qr-mode');
      qrToggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (mode === 'dynamic') {
        if (qrDynamicBox) qrDynamicBox.style.display = 'block';
        if (qrTicketBox) qrTicketBox.style.display = 'none';
      } else {
        if (qrDynamicBox) qrDynamicBox.style.display = 'none';
        if (qrTicketBox) qrTicketBox.style.display = 'block';
      }
    });
  });

  // Download QR Code Handler
  const downloadQrBtn = document.getElementById('download-qr-btn');
  if (downloadQrBtn) {
    downloadQrBtn.addEventListener('click', () => {
      const activeImg = qrTicketBox && qrTicketBox.style.display === 'block'
        ? 'images/vietcombank-qr-ticket.jpg'
        : qrImageEl.src;

      const link = document.createElement('a');
      link.href = activeImg;
      link.download = `VietQR-Vietcombank-${currentStudent.phone}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('📥 Đang tải ảnh mã QR về máy của bạn...');
    });
  }

  // Countdown Timer System (Stored in LocalStorage for consistent experience)
  const timerDurationSec = 24 * 60 * 60; // 24 hours countdown
  let endTime = localStorage.getItem('mrh_checkout_timer_end');

  if (!endTime) {
    endTime = Date.now() + timerDurationSec * 1000;
    localStorage.setItem('mrh_checkout_timer_end', endTime);
  }

  function updateCountdown() {
    const now = Date.now();
    let diff = Math.max(0, Math.floor((endTime - now) / 1000));

    if (diff <= 0) {
      // Reset timer if expired to keep urgency
      endTime = Date.now() + 6 * 3600 * 1000;
      localStorage.setItem('mrh_checkout_timer_end', endTime);
      diff = 6 * 3600;
    }

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    const pad = (n) => String(n).padStart(2, '0');

    document.querySelectorAll('.cd-hours').forEach(el => el.textContent = pad(hours));
    document.querySelectorAll('.cd-minutes').forEach(el => el.textContent = pad(minutes));
    document.querySelectorAll('.cd-seconds').forEach(el => el.textContent = pad(seconds));
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // FAQ Accordion System
  const faqItems = document.querySelectorAll('.faq-checkout-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-checkout-header');
    const body = item.querySelector('.faq-checkout-body');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBody = other.querySelector('.faq-checkout-body');
          if (otherBody) otherBody.style.maxHeight = '0px';
        }
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        body.style.maxHeight = '0px';
      }
    });
  });

  // Open first FAQ by default
  if (faqItems[0]) {
    const firstBody = faqItems[0].querySelector('.faq-checkout-body');
    faqItems[0].classList.add('active');
    if (firstBody) {
      firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
    }
  }

  // Modals Management
  const editInfoModal = document.getElementById('edit-info-modal');
  const successModal = document.getElementById('success-modal');
  const certModal = document.getElementById('cert-modal');

  function openModal(modal) {
    if (modal) modal.classList.add('active');
  }

  function closeModal(modal) {
    if (modal) modal.classList.remove('active');
  }

  document.querySelectorAll('.modal-close, .modal-backdrop').forEach(closer => {
    closer.addEventListener('click', (e) => {
      if (e.target === closer) {
        closeModal(closer.closest('.modal-backdrop'));
      }
    });
  });

  // Edit Info Triggers
  const btnEditInfo = document.getElementById('btn-open-edit-info');
  const editInfoForm = document.getElementById('edit-info-form');
  const inputName = document.getElementById('input-edit-name');
  const inputPhone = document.getElementById('input-edit-phone');
  const inputEmail = document.getElementById('input-edit-email');

  if (btnEditInfo) {
    btnEditInfo.addEventListener('click', () => {
      if (inputName) inputName.value = currentStudent.fullname;
      if (inputPhone) inputPhone.value = currentStudent.phone;
      if (inputEmail) inputEmail.value = currentStudent.email;
      openModal(editInfoModal);
    });
  }

  if (editInfoForm) {
    editInfoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      currentStudent.fullname = inputName.value.trim() || currentStudent.fullname;
      currentStudent.phone = inputPhone.value.trim() || currentStudent.phone;
      currentStudent.email = inputEmail.value.trim() || currentStudent.email;

      updateCheckoutUI();
      closeModal(editInfoModal);
      showToast('✓ Đã cập nhật thông tin học viên & nội dung chuyển khoản!');
    });
  }

  // Certificate Lightbox
  const certTriggers = document.querySelectorAll('.trigger-cert-modal');
  certTriggers.forEach(el => {
    el.addEventListener('click', () => {
      openModal(certModal);
    });
  });

  // Primary Payment Complete Action: "TÔI ĐÃ CHUYỂN KHOẢN THÀNH CÔNG"
  const completePaymentBtns = document.querySelectorAll('.trigger-payment-complete');
  completePaymentBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Confetti celebration if library is available
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c4a07c', '#10b981', '#ffffff', '#f59e0b']
        });
      }

      // Populate Success Modal
      const successPhoneEl = document.getElementById('success-student-phone');
      const successAmountEl = document.getElementById('success-order-amount');
      const successOfferNameEl = document.getElementById('success-offer-name');

      if (successPhoneEl) successPhoneEl.textContent = currentStudent.phone;
      if (successAmountEl) successAmountEl.textContent = formatMoney(OFFERS[activeOfferKey].price);
      if (successOfferNameEl) successOfferNameEl.textContent = OFFERS[activeOfferKey].name;

      openModal(successModal);
    });
  });

  // Fast scroll to QR box when clicking "Thanh toán ngay"
  document.querySelectorAll('.scroll-to-qr-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const qrSection = document.getElementById('payment-qr-gateway');
      if (qrSection) {
        qrSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        qrSection.classList.add('highlight-pulse');
        setTimeout(() => qrSection.classList.remove('highlight-pulse'), 1500);
      }
    });
  });
});

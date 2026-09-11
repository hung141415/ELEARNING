import urllib.request
import html as html_lib
import sys

try:
    raw_html = urllib.request.urlopen('http://localhost:3000').read().decode('utf-8')
    html = html_lib.unescape(raw_html)
except Exception as e:
    print('Failed to load localhost:3000:', e)
    sys.exit(1)

golden_titles = [
    'Có Phải Bạn Đang Rơi Vào “Vòng Xoáy Bế Tắc” Này?',
    '5 Cách Học Cũ Bạn Từng Thử (Và Vì Sao Nó Thất Bại)',
    'Sự Thật Chấn Động: Lý Do Bạn Nghe Mãi Không Kịp Đề Thi',
    'Hệ Thống TOEIC ALL-IN-ONE',
    '4 Kỹ Năng Quyết Định Người Đạt 800+ TOEIC',
    'Đăng Ký Khóa Học - Tặng Kèm 5 Bộ Quà Tặng Độc Quyền',
    'Học Viên Chia Sẻ Về Sự Chuyển Hóa Của Họ',
    'Bảng Đối Chiếu Trước & Sau Khi Sở Hữu Khóa Học',
    'Lộ Trình Huấn Luyện 60 Ngày Step-by-Step',
    '3 Tầng Cam Kết Vàng Dành Cho Học Viên',
    'Nhận Lộ Trình Huấn Luyện & 5 Quà Tặng'
]

print(f'=== VERIFYING {len(golden_titles)} GOLDEN TITLES ===')
all_titles_ok = True
for idx, title in enumerate(golden_titles, 1):
    found = title in html
    print(f'[{idx:02d}] Title -> {"OK" if found else "MISSING"}')
    if not found:
        all_titles_ok = False

print('\n=== VERIFYING COMPONENTS ===')
has_countdown = 'bonus-countdown-pill' in html
has_mentor_img = 'mentor-cutout-img' in html
has_btn_brown = 'btn-brown' in html
has_inter_font = 'Inter' in html or 'font-sans' in html

print(f'Bonus Countdown Pill: {has_countdown}')
print(f'Mentor Cutout Image:  {has_mentor_img}')
print(f'Btn Brown Class:      {has_btn_brown}')
print(f'Inter/Sans Font:      {has_inter_font}')

total_ok = all_titles_ok and has_countdown and has_mentor_img and has_btn_brown and has_inter_font
print(f'\n>>> ALL CHECKS PASSED: {total_ok} <<<')

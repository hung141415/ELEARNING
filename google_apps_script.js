/**
 * GOOGLE APPS SCRIPT CHO GOOGLE SHEET MRH TOEIC
 * Sheet: https://docs.google.com/spreadsheets/d/1YDtuWN5FIWBJSrTDjFe7rfEKlsCGZrFQYNmqe3G0iVc/edit?usp=sharing
 * 
 * HƯỚNG DẪN CÀI ĐẶT (CHỈ MẤT 1 PHÚT):
 * 1. Mở Google Sheet: https://docs.google.com/spreadsheets/d/1YDtuWN5FIWBJSrTDjFe7rfEKlsCGZrFQYNmqe3G0iVc/edit?usp=sharing
 * 2. Trên thanh menu, chọn: Tiện ích mở rộng (Extensions) -> Apps Script.
 * 3. Xoá code mặc định, dán toàn bộ đoạn mã trong file này vào.
 * 4. Bấm "Triển khai" (Deploy) ở góc trên bên phải -> "Tùy chọn triển khai mới" (New deployment).
 * 5. Bấm vào biểu tượng bánh răng bên cạnh "Chọn loại", chọn: "Ứng dụng web" (Web app).
 *    - Mô tả: Nhận form đăng ký MrH TOEIC
 *    - Thực thi dưới dạng (Execute as): Tôi (Me)
 *    - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone)  <--- BẮT BUỘC CHỌN "ANYONE"
 * 6. Bấm "Triển khai" (Deploy) -> Chọn tài khoản Google của bạn -> Bấm Advanced (Nâng cao) -> Đi tới ứng dụng (Go to project).
 * 7. Sao chép "URL ứng dụng web" (dạng https://script.google.com/macros/s/AKfycb.../exec).
 * 8. Dán URL đó vào file .env.local trong dự án:
 *    GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Tự động khởi tạo hàng tiêu đề nếu trang tính còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời gian đăng ký",
        "Họ và tên",
        "Số điện thoại",
        "Email",
        "Đường link đăng ký",
        "Đã thanh toán"
      ]);
      var headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setBackground("#0b1838");
      headerRange.setFontColor("#c4a07c");
      headerRange.setFontWeight("bold");
    }

    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || {};
    }

    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    var name = data.name || data.fullname || "";
    var phone = "'" + (data.phone || ""); // Thêm dấu nháy đơn ' để Google Sheet không bị mất số 0 đầu
    var email = data.email || "";
    var url = data.url || data.registration_url || "";
    var paymentStatus = data.payment_status || "Chưa thanh toán";

    sheet.appendRow([
      timestamp,
      name,
      phone,
      email,
      url,
      paymentStatus
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Lead saved successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "MrH TOEIC Google Sheet Webhook is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}

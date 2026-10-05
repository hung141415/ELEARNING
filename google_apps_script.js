function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var SPREADSHEET_ID = "1YDtuWN5FIWBJSrTDjFe7rfEKlsCGZrFQYNmqe3G0iVc";
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
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
    var phone = "'" + (data.phone || ""); // Thêm dấu nháy đơn ' để không bị mất số 0 đầu
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
    .createTextOutput(JSON.stringify({ status: "ok", message: "MrH TOEIC Webhook is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}

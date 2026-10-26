/**
 * Google Apps Script Web App for Hasini & Dinal's Wedding — RSVP + Wishes
 *
 * Spreadsheet:
 * https://docs.google.com/spreadsheets/d/1zj9EI-qEP26XGIR1TT2btwz_fY4TDfMPMh1H8KdWIJM/edit
 *
 * Automatically creates two sheets (with headers) on first use:
 * - RSVP   : Timestamp | Name | Attendance | Guests
 * - Wishes : Timestamp | Name | Message
 *
 * Tip: run setupSheets() once from the editor to create both sheets right away.
 */

const SPREADSHEET_ID = "1zj9EI-qEP26XGIR1TT2btwz_fY4TDfMPMh1H8KdWIJM";
const TIMEZONE = "Asia/Colombo";

const RSVP_SHEET_NAME = "RSVP";
const RSVP_HEADERS = ["Timestamp", "Name", "Attendance", "Guests"];

const WISH_SHEET_NAME = "Wishes";
const WISH_HEADERS = ["Timestamp", "Name", "Message"];

function doPost(e) {
  return handleRequest_(e);
}

function doGet(e) {
  return handleRequest_(e);
}

/** Run once manually to create both sheets with headers. */
function setupSheets() {
  getSheet_(RSVP_SHEET_NAME, RSVP_HEADERS);
  getSheet_(WISH_SHEET_NAME, WISH_HEADERS);
}

function handleRequest_(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const params = parseParams_(e);
    const action = String(params.action || "").trim().toLowerCase();

    if (!action) {
      return jsonResponse_({ ok: false, message: "Missing action" });
    }

    if (action === "rsvp") {
      return jsonResponse_(saveRsvp_(params));
    }

    if (action === "wish") {
      return jsonResponse_(saveWish_(params));
    }

    return jsonResponse_({ ok: false, message: "Invalid action" });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      message: error && error.message ? error.message : "Unexpected error",
    });
  } finally {
    lock.releaseLock();
  }
}

function saveRsvp_(params) {
  const sheet = getSheet_(RSVP_SHEET_NAME, RSVP_HEADERS);

  const name = String(params.name || "").trim();
  const attending = String(params.attending || "").trim().toLowerCase();
  const guests = String(params.guests || "").trim();

  if (!name) {
    return { ok: false, message: "Name is required" };
  }

  const isAttending = attending !== "no";

  sheet.appendRow([
    timestamp_(),
    name,
    isAttending ? "Attending" : "Declined",
    isAttending ? Number(guests || "1") : 0,
  ]);

  return { ok: true, message: "RSVP saved" };
}

function saveWish_(params) {
  const sheet = getSheet_(WISH_SHEET_NAME, WISH_HEADERS);

  const name = String(params.name || "").trim();
  const message = String(params.message || "").trim();

  if (!name || !message) {
    return { ok: false, message: "Name and message are required" };
  }

  sheet.appendRow([timestamp_(), name, message]);

  return { ok: true, message: "Wish saved" };
}

function getSheet_(sheetName, headers) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  ensureHeader_(sheet, headers);
  return sheet;
}

function ensureHeader_(sheet, headers) {
  if (sheet.getLastRow() > 0) {
    return;
  }

  sheet.appendRow(headers);

  const header = sheet.getRange(1, 1, 1, headers.length);
  header
    .setFontWeight("bold")
    .setFontColor("#3b2314")
    .setBackground("#e6c66a")
    .setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 170);
  sheet.setColumnWidth(2, 220);
  if (headers.length > 2) sheet.setColumnWidth(3, headers[2] === "Message" ? 420 : 130);
  if (headers.length > 3) sheet.setColumnWidth(4, 90);
}

function timestamp_() {
  return Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss");
}

function parseParams_(e) {
  const params = Object.assign({}, (e && e.parameter) || {});

  if (!(e && e.postData && e.postData.contents)) {
    return params;
  }

  const contents = String(e.postData.contents || "").trim();
  if (!contents) {
    return params;
  }

  if (contents.charAt(0) === "{") {
    const json = JSON.parse(contents);
    return Object.assign(params, json);
  }

  const parsed = parseFormEncoded_(contents);
  return Object.assign(params, parsed);
}

function parseFormEncoded_(raw) {
  const result = {};
  const pairs = String(raw || "").split("&");

  for (var i = 0; i < pairs.length; i++) {
    if (!pairs[i]) continue;
    var parts = pairs[i].split("=");
    var key = decodeURIComponent((parts[0] || "").replace(/\+/g, " "));
    var value = decodeURIComponent((parts.slice(1).join("=") || "").replace(/\+/g, " "));
    if (key) {
      result[key] = value;
    }
  }

  return result;
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

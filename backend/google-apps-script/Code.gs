/**
 * VANTORA DIGITAL — Website enquiry backend (Google Apps Script)
 * ---------------------------------------------------------------
 * Receives JSON enquiries from the website contact form and appends them
 * to a Google Spreadsheet. See README.md in this folder for setup.
 *
 * Configuration lives in Script Properties (Project Settings → Script
 * properties), NOT in this code:
 *   SPREADSHEET_ID   (required)  ID from the spreadsheet URL
 *   SHEET_NAME       (optional)  defaults to "Leads"
 *   NOTIFY_EMAIL     (optional)  address to receive a short new-lead alert
 *   ALLOWED_ORIGINS  (optional)  comma-separated, e.g. https://vantoradigital.info
 */

var HEADERS = [
  'Timestamp', 'Lead ID', 'Full Name', 'Business Name', 'Email', 'Phone',
  'Country', 'Industry', 'Required Service', 'Monthly Budget', 'Website',
  'Project Details', 'Contact Preference', 'Lead Source', 'Submission Status'
];

var LIMITS = {
  maxPerEmailPerHour: 3,     // same email address
  maxGlobalPerMinute: 30,    // whole site
  minFillMs: 2500            // humans take longer than this to fill the form
};

var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return json_({ ok: false, error: 'Empty request.' });
    if (e.postData.contents.length > 20000) return json_({ ok: false, error: 'Request too large.' });

    var data;
    try { data = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'Invalid JSON.' }); }

    // Optional origin allow-list (the page URL is sent by the form).
    var allowed = prop_('ALLOWED_ORIGINS');
    if (allowed) {
      var page = String(data.pageUrl || '');
      var okOrigin = allowed.split(',').some(function (o) { o = o.trim(); return o && page.indexOf(o) === 0; });
      if (!okOrigin) return json_({ ok: false, error: 'Origin not allowed.' });
    }

    // Spam protection: honeypot + too-fast submissions are silently accepted but not stored.
    if (clean_(data.website_hp, 200) !== '' || Number(data.elapsedMs || 0) < LIMITS.minFillMs) {
      return json_({ ok: true, leadId: 'VD-' + Utilities.getUuid().slice(0, 8).toUpperCase() });
    }

    var lead = {
      fullName: clean_(data.fullName, 120),
      businessName: clean_(data.businessName, 160),
      email: clean_(data.email, 160).toLowerCase(),
      phone: clean_(data.phone, 30),
      country: clean_(data.country, 80),
      industry: clean_(data.industry, 80),
      service: clean_(data.service, 120),
      budget: clean_(data.budget, 60),
      website: clean_(data.website, 300),
      details: clean_(data.details, 3000),
      contactPreference: clean_(data.contactPreference, 30),
      leadSource: clean_(data.leadSource, 80) || 'Website'
    };

    // Server-side validation
    var errors = [];
    if (lead.fullName.length < 2) errors.push('Full name is required.');
    if (!EMAIL_RE.test(lead.email)) errors.push('A valid email address is required.');
    var digits = lead.phone.replace(/\D/g, '');
    if (!PHONE_RE.test(lead.phone) || digits.length < 7 || digits.length > 15) errors.push('A valid contact number is required.');
    if (errors.length) return json_({ ok: false, error: errors.join(' ') });

    // Rate limits
    var cache = CacheService.getScriptCache();
    var emailKey = 'e_' + Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, lead.email));
    var perEmail = Number(cache.get(emailKey) || 0);
    if (perEmail >= LIMITS.maxPerEmailPerHour) return json_({ ok: false, error: 'Too many submissions. Please contact us on WhatsApp or by phone.' });
    var globalKey = 'g_' + Math.floor(Date.now() / 60000);
    var global = Number(cache.get(globalKey) || 0);
    if (global >= LIMITS.maxGlobalPerMinute) return json_({ ok: false, error: 'Server is busy. Please try again in a minute.' });

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    var leadId;
    try {
      var sheet = getSheet_();
      leadId = 'VD-' + Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyMMdd') + '-' + Utilities.getUuid().slice(0, 5).toUpperCase();
      sheet.appendRow([
        new Date(), leadId, safeCell_(lead.fullName), safeCell_(lead.businessName), safeCell_(lead.email),
        safeCell_(lead.phone), safeCell_(lead.country), safeCell_(lead.industry), safeCell_(lead.service),
        safeCell_(lead.budget), safeCell_(lead.website), safeCell_(lead.details),
        safeCell_(lead.contactPreference), safeCell_(lead.leadSource), 'New'
      ]);
    } finally {
      lock.releaseLock();
    }
    cache.put(emailKey, String(perEmail + 1), 3600);
    cache.put(globalKey, String(global + 1), 120);

    notify_(leadId, lead);
    return json_({ ok: true, leadId: leadId });
  } catch (err) {
    // Log only the error message — never the lead's personal data.
    console.error('Lead submission failed: ' + (err && err.message));
    return json_({ ok: false, error: 'Server error. Please try again or contact us on WhatsApp.' });
  }
}

/** Simple health check: open the Web App URL in a browser. */
function doGet() {
  return json_({ ok: true, service: 'VANTORA DIGITAL enquiry endpoint' });
}

/** Run once from the editor to create the sheet + headers and authorise. */
function setup() {
  var sheet = getSheet_();
  Logger.log('Ready: ' + sheet.getParent().getName() + ' → ' + sheet.getName());
}

/** Run from the editor to append a clearly-marked test row. */
function testSubmission() {
  var res = doPost({ postData: { contents: JSON.stringify({
    fullName: 'TEST — delete me', email: 'test@example.com', phone: '+91 90000 00000',
    service: 'Meta Advertising', details: 'Apps Script test row', contactPreference: 'Email',
    leadSource: 'Apps Script test', website_hp: '', elapsedMs: 10000, pageUrl: 'https://vantoradigital.info/contact'
  }) } });
  Logger.log(res.getContent());
}

// ---------- helpers ----------
function getSheet_() {
  var id = prop_('SPREADSHEET_ID');
  if (!id) throw new Error('SPREADSHEET_ID script property is not set.');
  var ss = SpreadsheetApp.openById(id);
  var name = prop_('SHEET_NAME') || 'Leads';
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#071426').setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function notify_(leadId, lead) {
  var to = prop_('NOTIFY_EMAIL');
  if (!to) return;
  try {
    MailApp.sendEmail({
      to: to,
      subject: 'New website enquiry ' + leadId + (lead.service ? ' — ' + lead.service : ''),
      body: 'A new enquiry has been added to the Leads sheet.\n\nLead ID: ' + leadId +
        '\nName: ' + lead.fullName + '\nBusiness: ' + (lead.businessName || '-') +
        '\nService: ' + (lead.service || '-') + '\nPreferred contact: ' + (lead.contactPreference || '-') +
        '\n\nOpen the spreadsheet for full details.'
    });
  } catch (err) {
    console.error('Notification email failed: ' + err.message);
  }
}

function prop_(k) { return PropertiesService.getScriptProperties().getProperty(k) || ''; }
function clean_(v, max) { return String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max); }
/** Prevent spreadsheet formula injection. */
function safeCell_(v) { return /^[=+\-@]/.test(v) ? "'" + v : v; }
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }

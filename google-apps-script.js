/**
 * Google Apps Script for Bright Reality Contact Form
 * 
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com/home
 * 2. COPY and PASTE this ENTIRE code into 'Code.gs'.
 * 3. Click "Deploy" -> "New deployment" -> "Web app" -> "New Version".
 * 4. IMPORTANT: You will see a permission screen "App wants to access your Google Account".
 *    - Click "Review Permissions"
 *    - Choose your account
 *    - If you see "Google hasn't verified this app" (since it's your own app), click "Advanced" -> "Go to ... (unsafe)" -> "Allow".
 *    - This is required for it to create the Google Sheet automatically.
 */

// CONFIGURATION
const OWNER_EMAIL = "brightrealitydotrealestate@gmail.com";
const COMPANY_NAME = "Bright Reality";
const COMPANY_PHONE = "+91 98400 55492";
const COMPANY_PHONE_TEL = "+919840055492";
const COMPANY_WHATSAPP = "919840013421";
const LEAD_LABEL_NAME = "LEAD FROM WEBSITE";
const SHEET_NAME = "Bright Reality Leads"; // Name of the sheet to store data

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);

        const submittedName = data.name || "Unknown";
        const submittedEmail = data.email || "No Email Provided";
        const submittedMobile = data.mobile || "No Mobile Provided";
        const submittedWhatsapp = data.whatsapp || "N/A";
        const submittedMessage = data.message || "No Message";
        const timestamp = new Date().toLocaleString();

        // 1. Store in Google Sheet (Auto-create if missing)
        try {
            addToGoogleSheet(timestamp, submittedName, submittedEmail, submittedMobile, submittedWhatsapp, submittedMessage);
        } catch (sheetError) {
            console.error("Sheet Error: " + sheetError.toString());
            // Continue execution so email still sends
        }

        // 2. Send "New Lead" Email to Owner & Apply Label
        sendOwnerNotification(submittedName, submittedEmail, submittedMobile, submittedWhatsapp, submittedMessage, timestamp);

        // 3. Send "Thank You" Auto-Reply to User
        if (submittedEmail && submittedEmail.includes("@")) {
            sendUserAutoReply(submittedName, submittedEmail);
        }

        return ContentService.createTextOutput(JSON.stringify({
            status: 'success',
            message: 'Form submitted successfully'
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            status: 'error',
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

function addToGoogleSheet(timestamp, name, email, mobile, whatsapp, message) {
    let sheet;
    const files = DriveApp.getFilesByName(SHEET_NAME);

    if (files.hasNext()) {
        // Sheet exists, open it
        const file = files.next();
        const spreadsheet = SpreadsheetApp.open(file);
        sheet = spreadsheet.getActiveSheet();
    } else {
        // Sheet doesn't exist, create it
        const spreadsheet = SpreadsheetApp.create(SHEET_NAME);
        sheet = spreadsheet.getActiveSheet();
        // Add Headers
        sheet.appendRow(["Timestamp", "Name", "Email", "Mobile", "WhatsApp", "Message"]);
        // Freeze header row
        sheet.setFrozenRows(1);
        // Bold header
        sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
    }

    // Append the new lead
    sheet.appendRow([timestamp, name, email, mobile, whatsapp, message]);
}

function sendOwnerNotification(name, email, mobile, whatsapp, message, time) {
    const subject = `New Lead: ${name} - ${COMPANY_NAME} Website`;
    const body = `
    You have received a new inquiry from the website.
    
    DETAILS:
    --------------------------------
    Name:     ${name}
    Mobile:   ${mobile}
    WhatsApp: ${whatsapp}
    Email:    ${email}
    Time:     ${time}
    
    MESSAGE:
    --------------------------------
    ${message}
    
    
    --------------------------------
    This is an automated message from your website contact form.
  `;

    try {
        const draft = GmailApp.createDraft(OWNER_EMAIL, subject, body);
        const msg = draft.send();
        const thread = msg.getThread();

        const label = getOrCreateLabel(LEAD_LABEL_NAME);
        thread.addLabel(label);

        if (!thread.isInInbox()) {
            thread.moveToInbox();
        }
    } catch (e) {
        console.error("Labeling failed: " + e.toString());
        MailApp.sendEmail(OWNER_EMAIL, subject, body);
    }
}

function getOrCreateLabel(labelName) {
    try {
        let label = GmailApp.getUserLabelByName(labelName);
        if (!label) {
            label = GmailApp.createLabel(labelName);
        }
        return label;
    } catch (e) {
        console.error("Error creating/getting label: " + e.toString());
        throw e;
    }
}

function sendUserAutoReply(name, email) {
    const subject = `Welcome to Open Your New Life Style - ${COMPANY_NAME}`;

    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #D9B104; text-align: center;">Welcome to ${COMPANY_NAME}</h2>
      <p>Dear <strong>${name}</strong>,</p>
      
      <p>Thank you for reaching out to us! We have received your details and are excited to help you find your dream property.</p>
      
      <p>Our team will review your enquiry and call you shortly to discuss how we can enrich your life with our premium real estate opportunities.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
        <p style="margin-bottom: 10px; font-weight: bold;">Need to reach us immediately?</p>
        
        <a href="tel:${COMPANY_PHONE_TEL}" style="display: inline-block; background-color: #D9B104; color: white; padding: 10px 20px; text-decoration: none; border-radius: 25px; margin: 5px; font-weight: bold;">
          📞 Call Us Now
        </a>
        
        <a href="https://wa.me/${COMPANY_WHATSAPP}" style="display: inline-block; background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 25px; margin: 5px; font-weight: bold;">
          💬 WhatsApp Us
        </a>
      </div>
      
      <p>We look forward to speaking with you!</p>
      
      <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
        &copy; ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.<br>
        This is an automated message, please do not reply.
      </p>
    </div>
  `;

    MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: htmlBody
    });
}

function doOptions(e) {
    return ContentService.createTextOutput("");
}

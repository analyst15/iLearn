import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const REFERRALS_FILE = path.join(process.cwd(), "referrals.json");
const SETTINGS_FILE = path.join(process.cwd(), "settings.json");

function getReferrals() {
  try {
    if (fs.existsSync(REFERRALS_FILE)) {
      const data = fs.readFileSync(REFERRALS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading referrals file:", error);
  }
  return [];
}

function saveReferrals(referrals: any[]) {
  try {
    fs.writeFileSync(REFERRALS_FILE, JSON.stringify(referrals, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing referrals file:", error);
  }
}

function getSettings() {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading settings file:", error);
  }
  return {
    googleScriptUrl: process.env.GOOGLE_SCRIPT_URL || ""
  };
}

function saveSettings(settings: any) {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing settings file:", error);
  }
}

// Gmail SMTP configuration
const gmailUser = process.env.GMAIL_USER || "techanalyst41@gmail.com";
const gmailPass = process.env.GMAIL_APP_PASSWORD || "ornw xtzn jsrj uvaa";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
});

// API endpoint to send emails
app.post("/api/send-email", async (req, res) => {
  const { type, data } = req.body;

  if (!type || !data) {
    return res.status(400).json({ success: false, error: "Missing type or data" });
  }

  let subject = "";
  let htmlContent = "";

  if (type === "contact") {
    const { name, email, phone, program, message } = data;
    subject = `New Contact Form Submission: ${name}`;
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
        <h2 style="color: #0F172A; border-bottom: 2px solid #3B82F6; padding-bottom: 10px; margin-top: 0;">New Contact Message Received</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 30%;">Full Name:</td>
            <td style="padding: 8px 0; color: #0f172a;">${name || "Not Provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Address:</td>
            <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone Number:</td>
            <td style="padding: 8px 0; color: #0f172a;">${phone || "Not Provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Class Interest:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${program || "Not Provided"}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #3B82F6; border-radius: 4px;">
          <h4 style="margin-top: 0; margin-bottom: 8px; color: #1e293b;">Message:</h4>
          <p style="margin: 0; color: #334155; line-height: 1.5; white-space: pre-wrap;">${message || ""}</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 11px; color: #64748b; text-align: center; margin: 0;">Sent automatically from iLearn Global Educational Platform</p>
      </div>
    `;
  } else if (type === "registration") {
    const { firstName, lastName, email, phone, service, residence, message } = data;
    subject = `New Course Registration: ${firstName} ${lastName} (${service})`;
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
        <h2 style="color: #0F172A; border-bottom: 2px solid #E11D48; padding-bottom: 10px; margin-top: 0;">New Student Enrollment</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 35%;">First Name:</td>
            <td style="padding: 8px 0; color: #0f172a;">${firstName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Last Name:</td>
            <td style="padding: 8px 0; color: #0f172a;">${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Address:</td>
            <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone Number:</td>
            <td style="padding: 8px 0; color: #0f172a;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Interested Service:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Residence:</td>
            <td style="padding: 8px 0; color: #0f172a;">${residence}</td>
          </tr>
        </table>
        ${
          message
            ? `
        <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #E11D48; border-radius: 4px;">
          <h4 style="margin-top: 0; margin-bottom: 8px; color: #1e293b;">Message/Notes:</h4>
          <p style="margin: 0; color: #334155; line-height: 1.5; white-space: pre-wrap;">${message}</p>
        </div>
        `
            : ""
        }
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 11px; color: #64748b; text-align: center; margin: 0;">Sent automatically from iLearn Global Educational Platform</p>
      </div>
    `;
  } else if (type === "agent-registration") {
    const { 
      studentFirstName, 
      studentLastName, 
      studentReferenceNumber, 
      examType, 
      bookingDate, 
      examDate, 
      agencyName, 
      agentsName,
      agentsPhone, 
      agentsEmail 
    } = data;
    subject = `Agent Student Referral: ${studentFirstName} ${studentLastName} (${examType}) - ${agencyName}`;
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
        <h2 style="color: #0F172A; border-bottom: 2px solid #10B981; padding-bottom: 10px; margin-top: 0;">Agent Student Referral Submitted</h2>
        
        <h3 style="color: #1e293b; margin-top: 20px; margin-bottom: 10px; font-size: 16px; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px;">Referred Student Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569; width: 40%;">Student Name:</td>
            <td style="padding: 6px 0; color: #0f172a;">${studentFirstName} ${studentLastName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Student Ref Number:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${studentReferenceNumber}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Exam Type:</td>
            <td style="padding: 6px 0; color: #0f172a;">${examType}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Booking Date:</td>
            <td style="padding: 6px 0; color: #0f172a;">${bookingDate}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Exam Date:</td>
            <td style="padding: 6px 0; color: #0f172a;">${examDate}</td>
          </tr>
        </table>

        <h3 style="color: #1e293b; margin-top: 25px; margin-bottom: 10px; font-size: 16px; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px;">Agent & Agency Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569; width: 40%;">Agency Name:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${agencyName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Agent's Name:</td>
            <td style="padding: 6px 0; color: #0f172a;">${agentsName || ''}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Agent's Email:</td>
            <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${agentsEmail}">${agentsEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Agent's Phone Number:</td>
            <td style="padding: 6px 0; color: #0f172a;">${agentsPhone}</td>
          </tr>
        </table>

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
        <p style="font-size: 11px; color: #64748b; text-align: center; margin: 0;">Sent automatically from iLearn Global Educational Platform</p>
      </div>
    `;
  } else {
    return res.status(400).json({ success: false, error: "Invalid form type" });
  }

  try {
    const mailOptions = {
      from: `"iLearn Global Notifications" <${gmailUser}>`,
      to: "techanalyst41@gmail.com",
      replyTo: data.email,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    // Save referral locally if type is agent-registration
    if (type === "agent-registration") {
      const newReferral = {
        id: `ref-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...data
      };
      
      try {
        const referrals = getReferrals();
        referrals.unshift(newReferral);
        saveReferrals(referrals);
      } catch (saveErr) {
        console.error("Error saving referral locally:", saveErr);
      }

      // Sync to central Google Sheets in real-time if URL is configured!
      try {
        const settings = getSettings();
        if (settings.googleScriptUrl) {
          console.log("Syncing referral to central Google Sheet in real-time...", settings.googleScriptUrl);
          fetch(settings.googleScriptUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReferral)
          })
          .then(async (sheetsRes) => {
            const txt = await sheetsRes.text();
            console.log("Central Sheets Sync Response:", txt);
          })
          .catch((err) => {
            console.error("Central Sheets Sync Network Error:", err);
          });
        }
      } catch (syncErr) {
        console.error("Error initiating central Google Sheet sync:", syncErr);
      }
    }

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return res.status(500).json({ success: false, error: error.message || "Failed to send email" });
  }
});

// GET all agent referrals for Admin Portal
app.get("/api/agent-referrals", (req, res) => {
  res.json(getReferrals());
});

// DELETE a referral from Admin Portal
app.delete("/api/agent-referrals/:id", (req, res) => {
  const { id } = req.params;
  try {
    const referrals = getReferrals();
    const filtered = referrals.filter((r: any) => r.id !== id);
    saveReferrals(filtered);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET settings (specifically Google Apps Script central URL)
app.get("/api/settings", (req, res) => {
  res.json(getSettings());
});

// POST settings (specifically update Google Apps Script central URL)
app.post("/api/settings", (req, res) => {
  const { googleScriptUrl } = req.body;
  try {
    const settings = getSettings();
    settings.googleScriptUrl = googleScriptUrl || "";
    saveSettings(settings);
    res.json({ success: true, settings });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST manually sync a referral to central Google Sheets
app.post("/api/sync-to-central", async (req, res) => {
  const { referralId } = req.body;
  try {
    const referrals = getReferrals();
    const referral = referrals.find((r: any) => r.id === referralId);
    if (!referral) {
      return res.status(404).json({ success: false, error: "Referral not found" });
    }

    const settings = getSettings();
    if (!settings.googleScriptUrl) {
      return res.status(400).json({ success: false, error: "Central Google Sheet script URL is not configured." });
    }

    const response = await fetch(settings.googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(referral)
    });

    const text = await response.text();
    console.log("Manual Sync Response:", text);

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      result = { success: true };
    }

    res.json({ success: true, details: result });
  } catch (err: any) {
    console.error("Manual central sync failed:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Vite middleware for development or Static Server for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

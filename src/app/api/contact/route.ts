import { NextResponse } from 'next/server';
import { readDb, writeDb, Submission } from '@/lib/db';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userIdentity, orgName, classification, description, product } = body;

    if (!userIdentity || !orgName) {
      return NextResponse.json({ success: false, message: 'Identity and Organization are required.' }, { status: 400 });
    }

    const selectedProduct = product || 'General Inquiry';

    const newSubmission: Submission = {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      userIdentity,
      orgName,
      classification,
      description: description || '',
      product: selectedProduct,
      timestamp: new Date().toISOString()
    };

    // 1. Save submission to db.json
    const db = await readDb();
    db.submissions.push(newSubmission);
    await writeDb(db);

    // 2. Format Email Content
    const emailSubject = `AxIyon Alert: Strategic Quote Request [${selectedProduct}] - ${newSubmission.id}`;
    const emailBody = `
========================================
NEW AXIYON LICENSE QUOTE REQUEST RECEIVED
========================================
ID:             ${newSubmission.id}
Timestamp:      ${newSubmission.timestamp}
Identity:       ${newSubmission.userIdentity}
Organization:   ${newSubmission.orgName}
Classification: ${newSubmission.classification}
Requested Block: ${newSubmission.product}

Intended Implementation / Project Needs:
----------------------------------------
${newSubmission.description || 'No description provided.'}
========================================
    `;

    // 3. Initialize Transporter (SMTP)
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === 'true';
    const to = process.env.ALERT_RECEIVER || 'sales@axiyon.com';

    let emailSent = false;
    let transportLog = '';

    if (host && user && pass) {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure,
          auth: { user, pass }
        });

        await transporter.sendMail({
          from: `"AxIyon Portal" <${user}>`,
          to,
          subject: emailSubject,
          text: emailBody
        });
        emailSent = true;
        transportLog = `[SMTP] Email successfully dispatched to ${to} via ${host}.`;
      } catch (smtpError: any) {
        console.error('[SMTP Error] Failed to send email via SMTP:', smtpError);
        transportLog = `[SMTP ERROR] Relay failed: ${smtpError.message || smtpError}. Fallback activated.`;
      }
    } else {
      transportLog = `[SMTP] Credentials not configured. Simulated dispatch active.`;
    }

    // Write email to dispatch log file for zero-SaaS air-gapped auditing
    const logFilePath = path.join(process.cwd(), 'data', 'dispatched_emails.log');
    const logEntry = `\n[DISPATCHED] ${new Date().toISOString()}\n${emailBody}\nTransport Logs: ${transportLog}\n----------------------------------------\n`;
    await fs.appendFile(logFilePath, logEntry, 'utf-8');

    return NextResponse.json({
      success: true,
      submission: newSubmission,
      emailSent,
      transportLog,
      hash: `AXI-${newSubmission.id}-${Math.floor(Math.random() * 10000)}`
    });
  } catch (error) {
    console.error('[API contact] Error:', error);
    return NextResponse.json({ success: false, message: 'Server-side registration error.' }, { status: 500 });
  }
}

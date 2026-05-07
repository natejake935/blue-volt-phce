import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";

const NOTIFY_EMAIL = "nate.jake935@gmail.com";
const NOTIFY_PHONE = "+19516913895";

export async function POST(request: NextRequest) {
  const { name, phone, email, address, aptSuite, zip, neighborhood, window, issue } =
    await request.json();

  const addressFull = aptSuite ? `${address}, ${aptSuite}` : address;
  const issueText = issue || "Not provided";

  const notifications: Promise<unknown>[] = [];

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    notifications.push(
      resend.emails.send({
        from: "Blue Bolt Bookings <onboarding@resend.dev>",
        to: NOTIFY_EMAIL,
        subject: `New Booking – ${name} | ${window}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
            <div style="background:#061A33;padding:20px 24px;border-radius:8px 8px 0 0">
              <h1 style="color:#FFD21E;margin:0;font-size:20px">&#9889; New Booking Request</h1>
              <p style="color:#93c5fd;margin:4px 0 0;font-size:13px">Blue Bolt Electrical — San Diego</p>
            </div>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;padding:24px;border-radius:0 0 8px 8px">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:8px 0;color:#64748b;width:140px">Name</td><td style="padding:8px 0;font-weight:600;color:#061A33">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b">Phone</td><td style="padding:8px 0;font-weight:600;color:#061A33">${phone}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0;font-weight:600;color:#061A33">${email}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b">Address</td><td style="padding:8px 0;font-weight:600;color:#061A33">${addressFull}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b">Area</td><td style="padding:8px 0;font-weight:600;color:#061A33">${neighborhood} (${zip})</td></tr>
                <tr><td style="padding:8px 0;color:#64748b">Appointment</td><td style="padding:8px 0;font-weight:600;color:#0B63F6">${window}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Issue</td><td style="padding:8px 0;color:#334155">${issueText}</td></tr>
              </table>
            </div>
          </div>
        `,
      })
    );
  }

  if (
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_PHONE_NUMBER
  ) {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const smsBody = [
      `⚡ Blue Bolt Booking`,
      `${name} | ${phone}`,
      `${addressFull}, ${zip}`,
      `${window}`,
      issue ? `"${issue.slice(0, 100)}"` : null,
    ]
      .filter(Boolean)
      .join("\n");

    notifications.push(
      client.messages.create({
        body: smsBody,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: NOTIFY_PHONE,
      })
    );
  }

  const results = await Promise.allSettled(notifications);
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`Notification[${i}] failed:`, r.reason);
    }
  });

  return NextResponse.json({ ok: true });
}

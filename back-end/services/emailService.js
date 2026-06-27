import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP || undefined,
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : undefined,
  secure: process.env.EMAIL_PORT === "465", // true for port 465, false for other ports
  service: process.env.EMAIL_SMTP ? undefined : "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send a deadline reminder email listing tasks that are due today or overdue.
 *
 * @param {string} toEmail  — recipient email address
 * @param {string} userName — recipient's display name
 * @param {Array}  dueTasks — tasks due today
 * @param {Array}  overdueTasks — tasks that are past their deadline
 */
export const sendDeadlineEmail = async (
  toEmail,
  userName,
  dueTasks = [],
  overdueTasks = [],
) => {
  const totalCount = dueTasks.length + overdueTasks.length;
  if (totalCount === 0) return;

  const formatDate = (d) =>
    new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const buildRows = (tasks, label, color) =>
    tasks
      .map(
        (t) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#0f172a;">
          ${t.title}
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#64748b;">
          ${t.deadline ? formatDate(t.deadline) : "No date"}
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;">
          <span style="background:${color};color:#fff;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;">
            ${label}
          </span>
        </td>
      </tr>`,
      )
      .join("");

  const dueRows = buildRows(dueTasks, "Due Today", "#d97706");
  const overdueRows = buildRows(overdueTasks, "Overdue", "#dc2626");

  const html = `
  <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f172a 0%,#1d4ed8 52%,#38bdf8 100%);padding:32px 24px;text-align:center;">
      <h1 style="color:#ffffff;margin:0 0 8px;font-size:24px;">⏰ Task Reminder</h1>
      <p style="color:rgba(255,255,255,0.85);margin:0;font-size:15px;">
        Hi ${userName}, you have ${totalCount} task${totalCount > 1 ? "s" : ""} that need${totalCount === 1 ? "s" : ""} your attention!
      </p>
    </div>

    <!-- Task Table -->
    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#f1f5f9;">
            <th style="padding:10px 16px;text-align:left;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Task</th>
            <th style="padding:10px 16px;text-align:left;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Deadline</th>
            <th style="padding:10px 16px;text-align:left;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${dueRows}${overdueRows}
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div style="padding:16px 24px;background:#f8fafc;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#94a3b8;font-size:13px;margin:0;">
        This is an automated reminder from <strong>Shana.net Task Pro</strong>. Log in to your dashboard to manage your tasks.
      </p>
    </div>
  </div>`;

  // Plain text fallback for better spam filter scoring
  const text = `Hi ${userName},\n\nYou have ${totalCount} task${totalCount > 1 ? "s" : ""} that require attention.\n\n` +
    (dueTasks.length > 0 ? `Due Today:\n` + dueTasks.map(t => `- ${t.title} (Due: ${t.deadline ? formatDate(t.deadline) : "No date"})`).join("\n") + `\n\n` : "") +
    (overdueTasks.length > 0 ? `Overdue Tasks:\n` + overdueTasks.map(t => `- ${t.title} (Due: ${t.deadline ? formatDate(t.deadline) : "No date"})`).join("\n") + `\n\n` : "") +
    `Log in to your Task Pro dashboard to manage them.`;

  const mailOptions = {
    from: `"Task Pro Support" <${process.env.EMAIL}>`,
    to: toEmail,
    subject: `Task Pro Update: Your agenda for today (${totalCount} task${totalCount > 1 ? "s" : ""})`,
    text,
    html,
    headers: {
      "Precedence": "bulk",
      "X-Auto-Response-Suppress": "OOF, AutoReply",
    }
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Deadline email sent to ${toEmail} (${totalCount} tasks)`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${toEmail}:`, err.message);
  }
};

export default transporter;

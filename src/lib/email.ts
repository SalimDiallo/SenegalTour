import nodemailer from "nodemailer";

// ─── Transport ───────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const FROM = `Senegal Premium Tour <${process.env.SMTP_FROM}>`;

// ─── Styles communes ──────────────────────────────────────
const styles = {
  wrapper: `font-family: 'Segoe UI', Arial, sans-serif; background: #f3f4f6; padding: 32px 16px; margin: 0; width: 100%;`,
  card: `background: #ffffff; border-radius: 16px; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);`,
  header: `background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); padding: 36px 32px; text-align: center;`,
  headerTitle: `color: #ffffff; font-size: 24px; font-weight: 700; margin: 12px 0 0; letter-spacing: -0.5px;`,
  headerSub: `color: rgba(255,255,255,0.85); font-size: 14px; margin: 8px 0 0;`,
  body: `padding: 32px;`,
  badge: `display: inline-block; background: #ecfeff; color: #0891b2; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; margin-bottom: 20px; border: 1px solid #cffafe;`,
  sectionTitle: `color: #374151; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin: 24px 0 12px; padding-bottom: 8px; border-bottom: 2px solid #ecfeff;`,
  row: `display: flex; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid #f3f4f6;`,
  rowLabel: `color: #6b7280; font-size: 13px; font-weight: 600; width: 140px; flex-shrink: 0;`,
  rowValue: `color: #1f2937; font-size: 13px; font-weight: 500;`,
  messageBox: `background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; margin: 16px 0; color: #374151; font-size: 13px; line-height: 1.6; font-style: italic;`,
  linkBtn: `display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 600; margin: 8px 0;`,
  footer: `background: #f9fafb; border-top: 1px solid #f3f4f6; padding: 24px 32px; text-align: center;`,
  footerText: `color: #9ca3af; font-size: 12px; line-height: 1.6;`,
  iconCircle: `display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.15); margin-bottom: 8px;`,
};

// ─── Template : Notification Réservation ──────────────────
function reservationHTML({
  name,
  email,
  phone,
  tourTitle,
  tourId,
  numberOfPersons,
  travelDate,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  tourTitle: string;
  tourId: number;
  numberOfPersons: number;
  travelDate: string;
  message?: string | null;
}) {
  const dateFormatted = new Date(travelDate + "T00:00:00").toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tourUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/tours/${tourId}`;

  return `
  <html>
  <body style="${styles.wrapper}">
    <div style="${styles.card}">
      <!-- Header -->
      <div style="${styles.header}">
        <div style="${styles.iconCircle}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <h1 style="${styles.headerTitle}">Nouvelle Réservation</h1>
        <p style="${styles.headerSub}">Un client a effectué une réservation</p>
      </div>

      <!-- Body -->
      <div style="${styles.body}">
        <div style="${styles.badge}">📍 Réservation de tour</div>

        <!-- Infos tour -->
        <div style="${styles.sectionTitle}">Détails du tour</div>
        <div style="${styles.row}">
          <span style="${styles.rowLabel}">Tour</span>
          <span style="${styles.rowValue}"><strong>${tourTitle}</strong></span>
        </div>
        <div style="${styles.row}">
          <span style="${styles.rowLabel}">Date voyage</span>
          <span style="${styles.rowValue}">${dateFormatted}</span>
        </div>
        <div style="${styles.row}">
          <span style="${styles.rowLabel}">Personnes</span>
          <span style="${styles.rowValue}">${numberOfPersons} personne${numberOfPersons > 1 ? "s" : ""}</span>
        </div>

        <!-- Infos client -->
        <div style="${styles.sectionTitle}">Informations du client</div>
        <div style="${styles.row}">
          <span style="${styles.rowLabel}">Nom</span>
          <span style="${styles.rowValue}">${name}</span>
        </div>
        <div style="${styles.row}">
          <span style="${styles.rowLabel}">Email</span>
          <span style="${styles.rowValue}"><a href="mailto:${email}" style="color:#0891b2; text-decoration:none;">${email}</a></span>
        </div>
        <div style="${styles.row}">
          <span style="${styles.rowLabel}">Téléphone</span>
          <span style="${styles.rowValue}"><a href="tel:${phone}" style="color:#0891b2; text-decoration:none;">${phone}</a></span>
        </div>

        ${message ? `<!-- Message --><div style="${styles.sectionTitle}">Message du client</div><div style="${styles.messageBox}">"${message}"</div>` : ""}

        <!-- CTA vers le tour -->
        <div style="text-align: center; margin-top: 28px;">
          <a href="${tourUrl}" style="${styles.linkBtn}">Voir la page du tour</a>
        </div>
      </div>

      <!-- Footer -->
      <div style="${styles.footer}">
        <p style="${styles.footerText}">
          Notification automatique — Senegal Premium Tour<br>
          senegalpremiumtour@gmail.com &nbsp;|&nbsp; +221 77 237 07 89
        </p>
      </div>
    </div>
  </body>
  </html>`;
}

// ─── Template : Notification Contact ─────────────────────
function contactHTML({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}) {
  return `
  <html>
  <body style="${styles.wrapper}">
    <div style="${styles.card}">
      <!-- Header -->
      <div style="${styles.header}">
        <div style="${styles.iconCircle}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
        <h1 style="${styles.headerTitle}">Nouveau Message</h1>
        <p style="${styles.headerSub}">Un visiteur vous a envoyé un message</p>
      </div>

      <!-- Body -->
      <div style="${styles.body}">
        <div style="${styles.badge}">✉️ Message de contact</div>

        <!-- Infos client -->
        <div style="${styles.sectionTitle}">Informations du visiteur</div>
        <div style="${styles.row}">
          <span style="${styles.rowLabel}">Nom</span>
          <span style="${styles.rowValue}">${name}</span>
        </div>
        <div style="${styles.row}">
          <span style="${styles.rowLabel}">Email</span>
          <span style="${styles.rowValue}"><a href="mailto:${email}" style="color:#0891b2; text-decoration:none;">${email}</a></span>
        </div>
        ${phone ? `<div style="${styles.row}"><span style="${styles.rowLabel}">Téléphone</span><span style="${styles.rowValue}"><a href="tel:${phone}" style="color:#0891b2; text-decoration:none;">${phone}</a></span></div>` : ""}

        <!-- Message -->
        <div style="${styles.sectionTitle}">Message</div>
        <div style="${styles.messageBox}">"${message}"</div>

        <!-- CTA répondre -->
        <div style="text-align: center; margin-top: 28px;">
          <a href="mailto:${email}?subject=Re: Votre message - Senegal Premium Tour" style="${styles.linkBtn}">Répondre à l'email</a>
        </div>
      </div>

      <!-- Footer -->
      <div style="${styles.footer}">
        <p style="${styles.footerText}">
          Notification automatique — Senegal Premium Tour<br>
          senegalpremiumtour@gmail.com &nbsp;|&nbsp; +221 77 237 07 89
        </p>
      </div>
    </div>
  </body>
  </html>`;
}

// ─── Exports ──────────────────────────────────────────────
export async function sendReservationEmail(data: {
  name: string;
  email: string;
  phone: string;
  tourTitle: string;
  tourId: number;
  numberOfPersons: number;
  travelDate: string;
  message?: string | null;
}) {
  try {
    await transporter.sendMail({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `[Réservation] ${data.tourTitle} — ${data.name}`,
      html: reservationHTML(data),
    });
  } catch (err) {
    console.error("[sendReservationEmail] failed:", err);
  }
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}) {
  try {
    await transporter.sendMail({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `[Contact] ${data.name} — Nouveau message`,
      html: contactHTML(data),
    });
  } catch (err) {
    console.error("[sendContactEmail] failed:", err);
  }
}

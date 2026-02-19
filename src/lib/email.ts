import nodemailer from "nodemailer";

// ─── Transport ────────────────────────────────────────────
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function getAdminEmail() {
  return process.env.ADMIN_EMAIL!;
}

function getFrom() {
  return `Senegal Premium Tour <${process.env.SMTP_FROM}>`;
}

// ─── Base HTML ────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
// const LOGO_URL = `${SITE_URL}/logo.png`;
const LOGO_URL = `https://www.senegalpremiumtour.com/logo.png`;


function baseTemplate(title: string, content: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

          <!-- LOGO -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <img src="${LOGO_URL}" alt="Senegal Premium Tour" height="52" style="display:block;" />
            </td>
          </tr>

          <!-- CARD -->
          <tr>
            <td style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e8e8e8;">

              <!-- BANDE COULEUR HAUT -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#1a1a1a;height:4px;"></td>
                </tr>
              </table>

              <!-- CONTENU -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:36px 40px;">
                    ${content}
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:12px;color:#999999;line-height:1.6;">
                Senegal Premium Tour &nbsp;&bull;&nbsp; senegalpremiumtour@gmail.com &nbsp;&bull;&nbsp; +221 77 237 07 89
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#bbbbbb;">
                Notification automatique — merci de ne pas répondre à cet email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Ligne de détail ──────────────────────────────────────
function row(label: string, value: string) {
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;width:38%;">
      <span style="font-size:12px;color:#888888;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">${label}</span>
    </td>
    <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
      <span style="font-size:14px;color:#1a1a1a;">${value}</span>
    </td>
  </tr>`;
}

// ─── Template : Réservation ───────────────────────────────
function reservationHTML(data: {
  name: string;
  email: string;
  phone: string;
  tourTitle: string;
  tourId: number;
  numberOfPersons: number;
  travelDate: string;
  message?: string | null;
}) {
  const dateFormatted = new Date(data.travelDate + "T00:00:00").toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tourUrl = `${SITE_URL}/tours/${data.tourId}`;

  const content = `
    <!-- TITRE -->
    <p style="margin:0 0 4px;font-size:11px;color:#888888;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Nouvelle réservation</p>
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1a1a1a;">${data.tourTitle}</h1>
    <p style="margin:0 0 32px;font-size:14px;color:#666666;">Un client vient d'effectuer une réservation.</p>

    <!-- TABLE TOUR -->
    <p style="margin:0 0 8px;font-size:11px;color:#888888;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Détails du tour</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      ${row("Date de voyage", dateFormatted)}
      ${row("Nombre de personnes", `${data.numberOfPersons} personne${data.numberOfPersons > 1 ? "s" : ""}`)}
    </table>

    <!-- TABLE CLIENT -->
    <p style="margin:0 0 8px;font-size:11px;color:#888888;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Informations client</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:${data.message ? "28px" : "32px"};">
      ${row("Nom", data.name)}
      ${row("Email", `<a href="mailto:${data.email}" style="color:#1a1a1a;text-decoration:underline;">${data.email}</a>`)}
      ${row("Téléphone", `<a href="tel:${data.phone}" style="color:#1a1a1a;text-decoration:underline;">${data.phone}</a>`)}
    </table>

    ${data.message ? `
    <!-- MESSAGE -->
    <p style="margin:0 0 8px;font-size:11px;color:#888888;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Message du client</p>
    <p style="margin:0 0 32px;font-size:14px;color:#444444;line-height:1.7;background:#f9f9f9;border-left:3px solid #e0e0e0;padding:14px 16px;border-radius:0 4px 4px 0;">${data.message}</p>
    ` : ""}

    <!-- CTA -->
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:#1a1a1a;border-radius:5px;">
          <a href="${tourUrl}" style="display:inline-block;padding:12px 24px;font-size:13px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">Voir le tour</a>
        </td>
      </tr>
    </table>
  `;

  return baseTemplate(`Réservation — ${data.tourTitle}`, content);
}

// ─── Template : Contact ───────────────────────────────────
function contactHTML(data: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}) {
  const content = `
    <!-- TITRE -->
    <p style="margin:0 0 4px;font-size:11px;color:#888888;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Nouveau message</p>
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1a1a1a;">${data.name}</h1>
    <p style="margin:0 0 32px;font-size:14px;color:#666666;">Un visiteur vous a envoyé un message depuis le formulaire de contact.</p>

    <!-- TABLE CLIENT -->
    <p style="margin:0 0 8px;font-size:11px;color:#888888;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Informations</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      ${row("Nom", data.name)}
      ${row("Email", `<a href="mailto:${data.email}" style="color:#1a1a1a;text-decoration:underline;">${data.email}</a>`)}
      ${data.phone ? row("Téléphone", `<a href="tel:${data.phone}" style="color:#1a1a1a;text-decoration:underline;">${data.phone}</a>`) : ""}
    </table>

    <!-- MESSAGE -->
    <p style="margin:0 0 8px;font-size:11px;color:#888888;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Message</p>
    <p style="margin:0 0 32px;font-size:14px;color:#444444;line-height:1.7;background:#f9f9f9;border-left:3px solid #e0e0e0;padding:14px 16px;border-radius:0 4px 4px 0;">${data.message}</p>

    <!-- CTA -->
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:#1a1a1a;border-radius:5px;">
          <a href="mailto:${data.email}?subject=Re: Votre message - Senegal Premium Tour" style="display:inline-block;padding:12px 24px;font-size:13px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">Répondre</a>
        </td>
      </tr>
    </table>
  `;

  return baseTemplate(`Message de ${data.name}`, content);
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
    await getTransporter().sendMail({
      from: getFrom(),
      to: getAdminEmail(),
      subject: `[Réservation] sur SenegalPremiumTour - ${data.tourTitle} — ${data.name}`,
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
    await getTransporter().sendMail({
      from: getFrom(),
      to: getAdminEmail(),
      subject: `[Contact] sur SenegalPremiumTour - ${data.name} — Nouveau message`,
      html: contactHTML(data),
    });
  } catch (err) {
    console.error("[sendContactEmail] failed:", err);
  }
}

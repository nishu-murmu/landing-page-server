import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
  const body = await req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  let mail;
  try {
    mail = await transporter.sendMail({
      from: body.email,
      to: process.env.SMTP_USERNAME,
      subject: "Purple Haze Media Pvt, Ltd. - Contact Us",
      html: `
        <h2>Contact Information</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <h2>Message</h2>
        <p>${body.message.replace(/\n/g, "<br>")}</p>
      `,
    });
  } catch (error) {
    return res.json({
      success: true,
      data: { error: error || null },
    });
  }

  return res.json({
    success: true,
    data: { mailId: mail.messageId || null },
  });
};

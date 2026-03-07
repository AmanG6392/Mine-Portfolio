import transporter from "../configurations/mailer.js";

export const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,

      text: `
Name: ${name}
Email: ${email}

Message:
${message}

-----------------------------
Time: ${new Date().toLocaleString()}
IP: ${req.ip}
User Agent: ${req.headers["user-agent"]}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

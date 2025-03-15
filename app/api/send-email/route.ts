// import { NextResponse } from "next/server";
// import emailjs from "@emailjs/browser";
// import config from "@/lib/config";

// export async function POST(req: Request) {
//   try {
//     const { name, email, message } = await req.json();

//     const templateParams = {
//       to_name: name,
//       to_email: email,
//       message: message,
//     };

//     const response = await emailjs.send(
//       config.env.emailJs.serviceId,
//       config.env.emailJs.templateId,
//       templateParams,
//       config.env.emailJs.publicApiKey
//     );

//     return NextResponse.json({ success: true, response });
//   } catch (error) {
//     console.error("Email send error:", error);
//     return NextResponse.json({ success: false, error });
//   }
// }
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password (not regular password)
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to CampusReads!",
      text: `Hi ${name},\n\n${message}\n\nBest regards,\nCampusReads Team`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" });
  }
}

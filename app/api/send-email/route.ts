import { NextResponse } from "next/server";
import emailjs from "@emailjs/browser";
import config from "@/lib/config";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const templateParams = {
      to_name: name,
      to_email: email,
      message: message,
    };

    const response = await emailjs.send(
      config.env.emailJs.serviceId,
      config.env.emailJs.templateId,
      templateParams,
      config.env.emailJs.publicApiKey
    );

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ success: false, error });
  }
}

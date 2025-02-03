"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { name, email, message } = data;

    const { data: emailData, error } = await resend.emails.send({
      from: "Contact Form <mail@davidkalina.com>",
      to: ["davidkalina@proton.me"],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true, messageId: emailData?.id };
  } catch {
    return { error: "Failed to send message. Please try again." };
  }
}

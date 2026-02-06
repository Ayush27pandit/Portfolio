import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Send email via Resend
        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>", // Use your verified domain in production
            to: "ayush12rps@gmail.com", // Your Resend-verified email
            replyTo: email,
            subject: `Portfolio Contact: ${name}`,
            html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; font-size: 20px; font-weight: 600; margin-bottom: 24px;">
            New message from your portfolio
          </h2>
          
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
              From
            </p>
            <p style="margin: 0 0 4px 0; color: #1a1a1a; font-size: 16px; font-weight: 500;">
              ${name}
            </p>
            <p style="margin: 0; color: #4b5563; font-size: 14px;">
              <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
            </p>
          </div>
          
          <div style="margin-bottom: 24px;">
            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
              Message
            </p>
            <p style="margin: 0; color: #1a1a1a; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
              ${message}
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          
          <p style="margin: 0; color: #9ca3af; font-size: 12px;">
            Sent from your portfolio contact form
          </p>
        </div>
      `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json(
                { error: "Failed to send email" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

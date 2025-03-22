import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, service, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Client <onboarding@resend.dev>',
      to: ['kleinhans.esc@gmail.com'],
      subject: 'Website Inquiry',
      react: EmailTemplate({ name, email, service, message }),
    });

    if (error) {
      console.error('API Error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
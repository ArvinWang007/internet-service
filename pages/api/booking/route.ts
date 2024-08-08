import { STRIPE_SECRET_KEY } from "@/config/env";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (error) {
    return new Response(`Webhook Error: ${(error as Error).message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    // 更新用户数据库逻辑
  }

  if (event.type === "invoice.payment_succeeded") {
    const session = event.data.object as Stripe.Invoice;

    if (session.billing_reason != "subscription_create") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      // 更新用户数据库逻辑
    }
  }

  return new Response(null, { status: 200 });
}
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { paymentMethodId, date, time, email } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 18800, // e.g., $188.00
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    // Here, you should save the booking information to your database

    return new Response(JSON.stringify({ paymentIntent }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
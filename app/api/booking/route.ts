import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { paymentMethodId, date, duration, email } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: duration === 'One Week' ? 18800 : 75200, // $188 for one week, $752 for one month
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    // Save booking information to your database here

    return new Response(JSON.stringify({ paymentIntent }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
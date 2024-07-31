import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
});

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { paymentMethodId, date, duration, email } = body;

    const amount = duration === 'One Week' ? 18800 : 75200; // $188 for one week, $752 for one month

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    // Save booking information to your database here

    return new Response(JSON.stringify({ paymentIntent }), { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    } else {
      return new Response(JSON.stringify({ error: 'Unknown error occurred' }), { status: 500 });
    }
  }
}
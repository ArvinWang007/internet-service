import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;

      if (!amount || typeof amount !== 'number') {
        throw new Error('Invalid amount value');
      }

      console.log(`Creating payment intent for amount: ${amount}`);

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });

      console.log('Payment intent created:', paymentIntent);

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
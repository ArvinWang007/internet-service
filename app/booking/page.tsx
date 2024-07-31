"use client";

import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const BookingForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('One Week'); // default duration

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email,
      },
    });

    if (error) {
      console.error('[error]', error);
    } else {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          startDate,
          duration,
          email,
        }),
      });

      const result = await response.json();

      if (result.error) {
        console.error('[error]', result.error);
      } else {
        console.log('[PaymentIntent]', result.paymentIntent);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      >
        <option value="One Week">One Week</option>
        <option value="One Month">One Month</option>
      </select>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Book and Pay
      </button>
    </form>
  );
};

const BookingPage = () => (
  <Elements stripe={stripePromise}>
    <BookingForm />
  </Elements>
);

export default BookingPage;
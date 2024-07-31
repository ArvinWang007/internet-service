"use client";

import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publicKey) {
      console.error('Stripe public key is not defined in environment variables');
    } else {
      setStripePromise(loadStripe(publicKey));
    }
  }, []);

  return stripePromise ? (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  ) : (
    <div>Loading...</div>
  );
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('One Week');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email,
      },
    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
      // 您可以在这里将 paymentMethod.id 发送到服务器
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.bookingForm}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.formInput}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={styles.formInput}
      />
      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className={styles.formSelect}
      >
        <option value="One Week">One Week</option>
        <option value="Two Weeks">Two Weeks</option>
        <option value="One Month">One Month</option>
      </select>
      <CardElement className={styles.cardElement} />
      <button type="submit" className={styles.formButton}>Book and Pay</button>
    </form>
  );
};

export default BookingForm;
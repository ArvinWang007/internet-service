"use client";

import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import styles from './BookingForm.module.css';

// 从环境变量中加载 Stripe 公钥
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublicKey) {
  throw new Error('Stripe public key is not defined in environment variables');
}

const stripePromise = loadStripe(stripePublicKey);

const BookingForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
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
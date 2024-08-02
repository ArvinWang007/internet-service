"use client";

import { Elements, loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import CheckoutFormWithStripe from './CheckoutFormWithStripe';

// Import language files
import ar from '../../locales/ar.json';
import en from '../../locales/en.json';
import es from '../../locales/es.json';
import ja from '../../locales/ja.json';
import ru from '../../locales/ru.json';
import zh from '../../locales/zh.json';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const BookingForm = ({ lang }: { lang: string }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const getPricingData = (lang: string) => {
    switch (lang) {
      case 'es':
        return es;
      case 'ar':
        return ar;
      case 'ja':
        return ja;
      case 'zh':
        return zh;
      case 'ru':
        return ru;
      default:
        return en;
    }
  };

  const pricingData = getPricingData(lang);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: 5000 }), // specify the amount as needed
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };

    if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      createPaymentIntent();
    }
  }, []);

  return (
    <div>
      {stripePromise && clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutFormWithStripe showPaymentForm={true} pricingData={pricingData} />
        </Elements>
      ) : (
        <CheckoutForm showPaymentForm={false} pricingData={pricingData} />
      )}
    </div>
  );
};

export default BookingForm;
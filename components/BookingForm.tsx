"use client";

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import pricingData from '../locales/en.json';
import styles from './BookingForm.module.css';

// Temporarily commenting out Stripe imports
// import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
//   ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
//   : null;

const BookingForm = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Temporarily commenting out Stripe hooks and useEffect
  // const stripe = useStripe();
  // const elements = useElements();

  // useEffect(() => {
  //   const createPaymentIntent = async () => {
  //     try {
  //       const response = await fetch('/api/create-payment-intent', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ amount: 5000 }), // specify the amount as needed
  //       });
  //       const data = await response.json();
  //       setClientSecret(data.clientSecret);
  //     } catch (error) {
  //       console.error('Error fetching client secret:', error);
  //     }
  //   };

  //   if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  //     createPaymentIntent();
  //   }
  // }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Temporarily bypass Stripe logic
    console.log('Form submitted without payment');
  };

  return (
    <div>
      {/* Temporarily bypass the Stripe payment form */}
      <CheckoutForm showPaymentForm={false} handleSubmit={handleSubmit} />
    </div>
  );
};

const CheckoutForm = ({
  showPaymentForm,
  handleSubmit,
}: {
  showPaymentForm: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const searchParams = useSearchParams();
  const plan = searchParams?.get('plan') || ''; // Use an empty string as a fallback
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(plan || '');
  const [endDate, setEndDate] = useState('');

  const calculateEndDate = (arrivalDate: string, planName: string) => {
    if (!arrivalDate || !planName) return '';

    const arrival = new Date(arrivalDate);
    let duration = 0;

    switch (planName) {
      case '7-Day Plan':
        duration = 7;
        break;
      case '1-Month Plan':
        duration = 30;
        break;
      case '2-Month Plan':
        duration = 60;
        break;
      default:
        duration = 0;
    }

    const end = new Date(arrival);
    end.setDate(arrival.getDate() + duration);
    return end.toISOString().split('T')[0];
  };

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    if (date) {
      setEndDate(calculateEndDate(date, planName));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);
    if (selectedPlan) {
      setEndDate(calculateEndDate(newDate, selectedPlan));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.bookingForm}>
      <h2>{pricingData.Pricing.title}</h2>
      <div className={styles.plans}>
        {pricingData.Pricing.plans.map((plan) => (
          <div
            key={plan.name}
            className={`${styles.plan} ${selectedPlan === plan.name ? styles.selected : ''}`}
            onClick={() => handlePlanSelect(plan.name)}
          >
            <h3>{plan.name}</h3>
            <p>{plan.price}</p>
            <p>{plan.description}</p>
          </div>
        ))}
      </div>
      <label>{pricingData.Payment.formFields.email.label}</label>
      <input
        type="email"
        placeholder={pricingData.Payment.formFields.email.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.formInput}
      />
      <label>{pricingData.Payment.formFields.date.label}</label>
      <input
        type="date"
        placeholder={pricingData.Payment.formFields.date.placeholder}
        value={date}
        onChange={handleDateChange}
        className={styles.formInput}
      />
      {endDate && (
        <p>End Date: {endDate}</p>
      )}
      {/* Temporarily bypass the Stripe CardElement */}
      {/* {showPaymentForm && (
        <CardElement className={styles.cardElement} />
      )} */}
      <button type="submit" className={styles.formButton}>
        {pricingData.Payment.formFields.submitButton}
      </button>
    </form>
  );
};

export default dynamic(() => Promise.resolve(BookingForm), { ssr: false });
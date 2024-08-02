import { CardElement } from '@stripe/react-stripe-js';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from './BookingForm.module.css';

type Props = {
  showPaymentForm: boolean;
  pricingData: any;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

const CheckoutForm = ({ showPaymentForm, pricingData, handleSubmit }: Props) => {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
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
      {showPaymentForm && (
        <div>
          <label>{pricingData.Payment.formFields.card.label}</label>
          <CardElement className={styles.cardElement} />
        </div>
      )}
      <button type="submit" className={styles.formButton}>
        {pricingData.Payment.formFields.submitButton}
      </button>
    </form>
  );
};

export default CheckoutForm;
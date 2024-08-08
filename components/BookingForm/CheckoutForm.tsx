import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './BookingForm.module.css';

type Props = {
  showPaymentForm: boolean;
  pricingData: any;
  dict: any;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

const CheckoutForm = ({ showPaymentForm, pricingData, dict, handleSubmit }: Props) => {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(plan || '');
  const [endDate, setEndDate] = useState('');

  console.log('Pricing Data in CheckoutForm:', pricingData);

  useEffect(() => {
    if (showPaymentForm) {
      // Initialize LemonSqueezy checkout form
      const script = document.createElement('script');
      script.src = 'https://cdn.lemonsqueezy.com/lemonsqueezy.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [showPaymentForm]);

  const calculateEndDate = (arrivalDate: string, planName: string) => {
    if (!arrivalDate || !planName) return '';

    const arrival = new Date(arrivalDate);
    let duration = 0;

    switch (planName) {
      case pricingData.plans[0].name:
        duration = 7;
        break;
      case pricingData.plans[1].name:
        duration = 30;
        break;
      case pricingData.plans[2].name:
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

  if (!pricingData.Payment) {
    console.log('Payment data is not available in pricingData');
    return <div>{dict.loading}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.bookingForm}>
      <h2>{pricingData.title}</h2>
      <div className={styles.plans}>
        {pricingData.plans.map((plan: any) => (
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
      <label>{dict.emailLabel}</label>
      <input
        type="email"
        placeholder={dict.emailPlaceholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.formInput}
      />
      <label>{dict.dateLabel}</label>
      <input
        type="date"
        placeholder={dict.datePlaceholder}
        value={date}
        onChange={handleDateChange}
        className={styles.formInput}
      />
      {endDate && (
        <p>{dict.endDateLabel}: {endDate}</p>
      )}
      {showPaymentForm && (
        <div>
          <label>{dict.cardLabel}</label>
          {/* Replace CardElement with LemonSqueezy payment form */}
          <div className="lemonsqueezy-button-container">
            <a href="https://checkout.lemonsqueezy.com/checkout" className="lemonsqueezy-button" data-store="your_store_id" data-plan="your_plan_id">
              {dict.submitButton}
            </a>
          </div>
        </div>
      )}
      <button type="submit" className={styles.formButton}>
        {dict.submitButton}
      </button>
    </form>
  );
};

export default CheckoutForm;
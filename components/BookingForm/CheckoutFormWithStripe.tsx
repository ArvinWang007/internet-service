import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FormEvent } from 'react';
import CheckoutForm from './CheckoutForm';

type Props = {
  showPaymentForm: boolean;
  pricingData: any;
};

const CheckoutFormWithStripe = ({ showPaymentForm, pricingData }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      billing_details: { email: '' }, // You can add email here if needed
    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
      // You can send paymentMethod.id to your server here
    }
  };

  return (
    <CheckoutForm showPaymentForm={showPaymentForm} pricingData={pricingData} handleSubmit={handleSubmit} />
  );
};

export default CheckoutFormWithStripe;
"use client";

import CheckoutForm from './CheckoutForm';

const BookingForm = ({ lang, dict }: { lang: string, dict: any }) => {
  if (!dict) {
    console.log('Dictionary is not loaded');
    return <div>Loading...</div>;
  }

  if (!dict.Pricing) {
    console.log('Pricing data is not available in dictionary');
    return <div>Loading...</div>;
  }

  console.log('Pricing Data:', dict.Pricing);

  return (
    <div>
      <CheckoutForm showPaymentForm={true} pricingData={dict.Pricing} dict={dict} handleSubmit={async (event) => { event.preventDefault(); /* Your submit logic */ }} />
    </div>
  );
};

export default BookingForm;
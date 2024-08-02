import React from 'react';

const Payment = ({ id, locale }: { id: string, locale: any }) => {
  return (
    <section id={id} className="py-16">
      <h2 className="text-2xl font-bold text-center">{locale.title}</h2>
      <p className="text-center text-gray-700 mb-8">{locale.description}</p>
      {/* Payment form or method will be implemented here */}
    </section>
  );
};

export default Payment;
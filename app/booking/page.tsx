"use client"; // Add this line to mark the component as a Client Component

import BookingForm from '@/components/BookingForm';

const BookingPage = () => {
  return (
    <div>
      <h1>Book Your VPN Service</h1>
      <BookingForm />
    </div>
  );
};

export default BookingPage;
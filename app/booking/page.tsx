"use client";
import BookingForm from '@/components/BookingForm/BookingForm';

export default function BookingPage({ params: { lang } }: { params: { lang: string } }) {
  return (
    <div className="container">
      <BookingForm lang={lang} />
    </div>
  );
}
import BookingForm from '@/components/BookingForm';
import Header from '@/components/header/Header';
import { getDictionary } from '@/lib/i18n';
import { GetServerSideProps } from 'next';

const BookingPage = ({ lang, dict }) => {
  return (
    <div>
      <Header />
      <main>
        <h1>{dict.booking.title}</h1>
        <BookingForm lang={lang} dict={dict} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { lang } = params!;
  const dictionary = await getDictionary(lang);

  return {
    props: {
      lang,
      dict: dictionary,
    },
  };
};

export default BookingPage;
import { getDictionary } from '@/lib/i18n';
import { GetServerSideProps } from 'next';
import HomePage from '../index';

const LangHomePage = (props: any) => {
  return <HomePage {...props} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { lang } = params!;
  const cookieLang = req.cookies.language || lang;

  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const origin = `${protocol}://${host}`;

  try {
    const dictionary = await getDictionary(cookieLang, origin);
    return {
      props: {
        lang: cookieLang,
        dict: dictionary,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      notFound: true,
    };
  }
};

export default LangHomePage;
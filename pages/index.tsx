import { getDictionary } from '@/lib/i18n';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';

const HomePage = ({ lang, dict }: { lang: string, dict: any }) => {
  const { t, i18n } = useTranslation('common');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.cookie = `language=${lng}`;
  };

  return (
    <div>
      <h1>{t('welcome_message')}</h1>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('zh')}>中文</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookieLang = req.cookies.language || 'en';

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

export default HomePage;
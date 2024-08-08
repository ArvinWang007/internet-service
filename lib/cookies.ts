import cookie from 'js-cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const COOKIE_NAME = 'language';
const COOKIE_EXPIRY_DAYS = 365;

export const setLanguageCookie = (lang: string): void => {
  cookie.set(COOKIE_NAME, lang, { expires: COOKIE_EXPIRY_DAYS });
};

export const getLanguageCookie = (): string | undefined => {
  return cookie.get(COOKIE_NAME);
};

export const setServerLanguageCookie = (res: NextApiResponse, lang: string): void => {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${lang}; Max-Age=${COOKIE_EXPIRY_DAYS * 24 * 60 * 60}; Path=/; HttpOnly`);
};

export const getServerLanguageCookie = (req: NextApiRequest): string | undefined => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return undefined;
  }

  const match = cookies.split(';').find(cookie => cookie.trim().startsWith(`${COOKIE_NAME}=`));
  if (!match) {
    return undefined;
  }

  return match.split('=')[1];
};
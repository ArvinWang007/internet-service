// config/env.ts
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;

if (!STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is not defined. Please set it in your environment variables.');
}

if (!NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.warn('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined. Please set it in your environment variables.');
}
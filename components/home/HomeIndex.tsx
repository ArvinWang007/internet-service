"use client";

import FAQ from "@/components/home/FAQ";
import Feature from "@/components/home/Feature";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import { defaultLocale, getDictionary } from '@/lib/i18n';
import { useEffect, useState } from 'react';

type HomeIndexProps = {
  lang: string;
};

export default function HomeIndex({ lang }: HomeIndexProps) {
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(lang || defaultLocale);
      setDict(dictionary);
    };

    fetchDictionary();
  }, [lang]);

  if (!dict || !dict.Hero) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Hero locale={dict.Hero} CTALocale={dict.CTALocale} />
      <Feature id="Features" locale={dict.Feature} langName={lang} />
      <Pricing id="Pricing" locale={dict.Pricing} langName={lang} />
      <FAQ id="FAQ" locale={dict.FAQ} langName={lang} />
    </>
  );
}
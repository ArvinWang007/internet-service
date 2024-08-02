import FAQ from "@/components/home/FAQ";
import Feature from "@/components/home/Feature";
import Hero from "@/components/home/Hero";
import Payment from "@/components/home/Payment";
import Pricing from "@/components/home/Pricing";
import { defaultLocale, getDictionary } from "@/lib/i18n";

export default async function HomeIndex({ lang }: { lang: string }) {
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <>
      <Hero locale={dict.Hero} CTALocale={dict.CTAButton} />
      <Feature id="Features" locale={dict.Feature} langName={langName} />
      <Pricing id="Pricing" locale={dict.Pricing} langName={langName} />
      <FAQ id="FAQ" locale={dict.FAQ} langName={langName} />
      <Payment id="Payment" locale={dict.Payment} />
    </>
  );
}
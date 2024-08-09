import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { RoughNotation } from "react-rough-notation";

// Define types for the locale object and Pricing component props
type PlanType = {
  name: string;
  price: string;
  description: string;
  features?: string[]; // Make features optional to handle cases where it's missing
  cta: string;
};

type LocaleType = {
  title: string;
  title2: string;
  description: string;
  plans: PlanType[];
};

interface PricingProps {
  id: string;
  locale: LocaleType;
  langName: string;
}

const Pricing: React.FC<PricingProps> = ({ id, locale, langName }) => {
  return (
    <section id={id} className="py-16 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <h2 className="text-6xl font-bold text-center text-white mb-4">
        <RoughNotation type="highlight" show={true} color="#2563EB">
          {locale.title}
        </RoughNotation>
      </h2>
      <h3 className="text-3xl font-medium text-center mb-2">{locale.title2}</h3>
      <p className="text-center text-muted-foreground mb-8">{locale.description}</p>
      <div className="flex flex-col sm:flex-row justify-center items-stretch gap-8">
        {locale.plans.map((plan, index) => (
          <Card
            key={index}
            className="bg-card shadow-lg rounded-lg overflow-hidden max-w-xs w-full flex flex-col justify-between"
          >
            <div>
              <CardHeader className="bg-card-foreground p-4 text-center">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
              </CardHeader>
              <Divider />
              <CardBody className="p-4 text-center">
                <p className="text-3xl font-bold text-primary mb-4">{plan.price}</p>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <ul className="space-y-2">
                  {(plan.features || []).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center text-foreground">
                      <FaCheck className="text-blue-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </div>
            <CardFooter className="bg-card-foreground p-4">
              <Button
                fullWidth
                as={Link}
                href={`/booking?plan=${encodeURIComponent(plan.name)}`}
                variant="solid"
                className="bg-primary text-primary-foreground hover:bg-primary-dark"
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
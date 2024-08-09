"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import { RoughNotation } from "react-rough-notation";

type LocaleType = {
  title: string;
  description: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
};

interface FAQProps {
  id: string;
  locale: LocaleType;
  langName: string;
}

// Define the triggerResizeEvent function locally
function triggerResizeEvent() {
  const event = new Event("resize");
  window.dispatchEvent(event);
}

const FAQ: React.FC<FAQProps> = ({ id, locale, langName }) => {
  return (
    <section
      id={id}
      className="flex flex-col justify-center max-w-[88%] items-center py-16 gap-12"
    >
      <div className="flex flex-col text-center gap-4">
        <h2 className="text-center text-white">
          <RoughNotation type="highlight" show={true} color="#2563EB">
            {locale.title}
          </RoughNotation>
        </h2>
        <p className="text-large text-default-500">{locale.description}</p>
      </div>
      <Accordion
        fullWidth
        keepContentMounted
        className="gap-3"
        itemClasses={{
          base: "px-6 !bg-default-100 !shadow-none hover:!bg-default-200/50",
          title: "font-medium",
          trigger: "py-6",
          content: "pt-0 pb-6 text-base text-default-500",
        }}
        items={locale.questions}
        selectionMode="multiple"
        variant="splitted"
        onSelectionChange={triggerResizeEvent}
      >
        {locale.questions.map((item, index) => (
          <AccordionItem
            key={index}
            indicator={<PlusIcon />}
            title={item.question}
          >
            {item.answer}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
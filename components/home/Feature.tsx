import { RoughNotation } from "react-rough-notation";

const Feature = ({ id, locale, langName }: { id: string, locale: any, langName: string }) => {
  return (
    <section id={id} className="flex flex-col justify-center lg:max-w-7xl md:max-w-5xl w-[95%] mx-auto md:gap-14 pt-16 text-foreground">
      <h2 className="text-6xl font-bold text-center text-white mb-4">
        <RoughNotation type="highlight" show={true} color="#2563EB">
          {locale.title}
        </RoughNotation>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-gray-700">
        {locale.features.map((feature: any, index: number) => (
          <div
            key={feature.title}
            className={`
              flex flex-col items-center text-center px-8 py-6 border-b
              ${index === 0 ? "md:border-r" : ""}
              ${index === 1 ? "lg:border-r" : ""}
              ${index === 2 ? "md:border-r lg:border-r-0" : ""}
              ${index === 3 ? "lg:border-b-0 lg:border-r" : ""}
              ${index === 4 ? "md:border-b-0 md:border-r" : ""}
              ${index === 5 ? "border-b-0 border-r-0" : ""}
            `}
          >
            <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
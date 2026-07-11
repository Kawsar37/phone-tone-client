import { FiShield, FiTruck, FiHeadphones, FiAward } from "react-icons/fi";

const features = [
  {
    icon: FiShield,
    title: "100% Authentic",
    desc: "Every device is sourced directly from authorized distributors.",
  },
  {
    icon: FiTruck,
    title: "Fast Delivery",
    desc: "Free next-day shipping on all orders over $500.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Support",
    desc: "Our tech experts are always ready to help you choose.",
  },
  {
    icon: FiAward,
    title: "2-Year Warranty",
    desc: "Extended warranty and hassle-free return policy.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral">
            Why Choose <span className="text-primary">PhoneTone</span>?
          </h2>
          <p className="mt-3 text-lg text-neutral/60 max-w-2xl mx-auto">
            We don&apos;t just sell phones; we deliver peace of mind and premium
            experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl border border-neutral/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-neutral mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral/60 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

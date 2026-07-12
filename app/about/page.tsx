import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { FiSmartphone, FiZap, FiUsers, FiShield } from "react-icons/fi";

export default function AboutPage() {
  const features = [
    {
      icon: FiSmartphone,
      title: "Curated Catalog",
      desc: "We meticulously select the best smartphones from top global brands to ensure you only see the best.",
    },
    {
      icon: FiZap,
      title: "AI-Powered Specs",
      desc: "Our backend uses Google Gemini AI to instantly generate accurate, detailed specifications for every new device.",
    },
    {
      icon: FiUsers,
      title: "Community Driven",
      desc: "Real reviews from real users help you make the most informed decision before buying your next phone.",
    },
    {
      icon: FiShield,
      title: "Secure & Fast",
      desc: "Built with Next.js and Express, ensuring lightning-fast page loads and secure, encrypted transactions.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral mb-6">
              About <span className="text-primary">PhoneTone</span>
            </h1>
            <p className="text-lg text-neutral/70 leading-relaxed">
              PhoneTone is not just another e-commerce store. We are a
              next-generation platform that combines cutting-edge AI with a
              seamless shopping experience to help you find your perfect
              smartphone in seconds.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 pb-24">
          <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white p-6 rounded-xl border border-neutral/5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral/60 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

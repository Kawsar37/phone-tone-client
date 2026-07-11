import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/shared/Hero";
import { FeaturedPhones } from "@/components/shared/FeaturedPhones";
import { PopularBrands } from "@/components/shared/PopularBrands";
import { LatestPhones } from "@/components/shared/LatestPhones";
import { WhyChooseUs } from "@/components/shared/WhyChooseUs";
import { Statistics } from "@/components/shared/Statistics";
import { Reviews } from "@/components/shared/Reviews";
import { FAQ } from "@/components/shared/FAQ";
import { Newsletter } from "@/components/shared/Newsletter";
import { Footer } from "@/components/shared/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedPhones />
        <PopularBrands />
        <LatestPhones />
        <WhyChooseUs />
        <Statistics />
        <Reviews />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    q: "Are all phones sold on PhoneTone brand new and authentic?",
    a: "Yes, absolutely. We source all our devices directly from authorized manufacturers and distributors. Every phone comes sealed in its original box with a valid manufacturer warranty.",
  },
  {
    q: "What is your return and refund policy?",
    a: "We offer a 14-day no-questions-asked return policy. If your device arrives damaged or you change your mind, simply contact our support team to initiate a free return and full refund.",
  },
  {
    q: "Do you offer trade-in options for old devices?",
    a: "Yes! During the checkout process, you can select the trade-in option. We will evaluate your old device's condition and instantly deduct its value from your new phone's price.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3-5 business days. We also offer free next-day express shipping for all orders over $500. You will receive a tracking number via email once your order is dispatched.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-3 text-lg text-neutral/60">
            Everything you need to know before you buy.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-neutral/10 rounded-xl overflow-hidden transition-all hover:border-primary/30"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-bg-light transition-colors"
              >
                <span className="text-base font-semibold text-neutral pr-4">
                  {faq.q}
                </span>
                <FiChevronDown
                  size={20}
                  className={`text-neutral/50 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="p-5 pt-0 text-sm text-neutral/70 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

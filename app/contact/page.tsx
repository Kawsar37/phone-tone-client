"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Message Sent!", {
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    { icon: FiMail, label: "Email Us", value: "support@phonetone.com" },
    { icon: FiPhone, label: "Call Us", value: "+1 (555) 123-4567" },
    {
      icon: FiMapPin,
      label: "Visit Us",
      value: "123 Tech Avenue, Silicon Valley, CA",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral mb-4">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-neutral/60 max-w-2xl mx-auto">
              Have a question about a phone, your order, or just want to say hi?
              We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.label}
                    className="bg-white p-6 rounded-xl border border-neutral/5 shadow-sm flex items-start gap-4"
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral">{info.label}</h3>
                      <p className="text-sm text-neutral/70 mt-1">
                        {info.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-xl border border-neutral/5 shadow-sm space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-neutral mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral/20 bg-white text-neutral placeholder-neutral/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <FiSend size={18} /> Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AddPhonePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    images: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to backend (Backend will trigger Gemini API)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Phone Added!", {
      description:
        "Backend is fetching specs via AI. Check 'Manage Phones' shortly.",
    });
    setFormData({ name: "", brand: "", images: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral/5 shadow-sm max-w-2xl">
      <h2 className="text-xl font-bold text-neutral mb-6">Add New Phone</h2>
      <p className="text-sm text-neutral/60 mb-6">
        Provide the phone name and images. Our AI will automatically fetch and
        populate the detailed specifications.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Phone Name"
          name="name"
          placeholder="e.g. Samsung Galaxy S25 Ultra"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Brand"
          name="brand"
          placeholder="e.g. Samsung"
          value={formData.brand}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block text-sm font-medium text-neutral mb-1.5">
            Image URLs
          </label>
          <textarea
            name="images"
            value={formData.images}
            onChange={handleChange}
            rows={3}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-neutral/20 bg-white text-neutral placeholder-neutral/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm"
            placeholder="Paste image URLs here, separated by commas..."
          />
        </div>

        <Button type="submit" isLoading={isSubmitting}>
          Generate Specs & Add Phone
        </Button>
      </form>
    </div>
  );
}

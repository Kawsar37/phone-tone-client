"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLoader, FiCheck } from "react-icons/fi";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { phoneAPI } from "@/utils/api";
import { toast } from "sonner";

export default function AddPhonePage() {
  const router = useRouter();
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

    try {
      const imagesArray = formData.images
        .split(/[\n,]+/)
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      if (imagesArray.length === 0) {
        toast.error("Please provide at least one valid image URL.");
        setIsSubmitting(false);
        return;
      }

      await phoneAPI.addPhone({
        name: formData.name,
        brand: formData.brand,
        images: imagesArray,
      });

      toast.success("Phone Added Successfully!", {
        description:
          "Gemini AI generated the specs and saved it to the database.",
      });

      setFormData({ name: "", brand: "", images: "" });
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to add phone. Check console for details.";
      toast.error("AI Generation Failed", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral/5 shadow-sm max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          <FiCheck size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral">Add New Phone</h2>
          <p className="text-sm text-neutral/60">
            AI will automatically fetch detailed specifications.
          </p>
        </div>
      </div>

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
            rows={4}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-neutral/20 bg-white text-neutral placeholder-neutral/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm"
            placeholder="Paste image URLs here. Separate multiple URLs with a comma or a new line..."
          />
        </div>

        <Button type="submit" isLoading={isSubmitting}>
          {isSubmitting
            ? "Generating Specs via AI..."
            : "Generate Specs & Add Phone"}
        </Button>
      </form>
    </div>
  );
}

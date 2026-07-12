"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiTruck, FiCreditCard } from "react-icons/fi";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useCart } from "@/hooks/use-cart";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, deliveryCharge, total, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    district: "",
    area: "",
    address: "",
    paymentMethod: "cod",
  });

  // Redirect if cart is empty
  if (cart.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to backend
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Order Placed Successfully!", {
      description: "Thank you for your purchase. We will contact you shortly.",
    });

    clearCart();
    setIsSubmitting(false);
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-neutral mb-8">
            Checkout
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-xl border border-neutral/5 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <FiTruck size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-neutral">
                    Shipping Address
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="District"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Area / Zip Code"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                  />
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral mb-1.5">
                      Detailed Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral/20 bg-white text-neutral placeholder-neutral/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      placeholder="House no, Street, Landmark..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-xl border border-neutral/5 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <FiCreditCard size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-neutral">
                    Payment Method
                  </h2>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 rounded-lg border border-neutral/20 cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="text-primary focus:ring-primary"
                    />
                    <div>
                      <p className="font-semibold text-neutral">
                        Cash on Delivery (COD)
                      </p>
                      <p className="text-xs text-neutral/60">
                        Pay when your phone arrives.
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-lg border border-neutral/20 cursor-not-allowed opacity-60 bg-bg-light">
                    <input
                      type="radio"
                      disabled
                      className="text-primary focus:ring-primary"
                    />
                    <div>
                      <p className="font-semibold text-neutral flex items-center gap-2">
                        bKash / Online Payment
                        <span className="text-[10px] font-bold uppercase bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                          Coming Soon
                        </span>
                      </p>
                      <p className="text-xs text-neutral/60">
                        Pay securely with bKash, Nagad, or Cards.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl border border-neutral/5 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-neutral mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 text-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-contain rounded bg-bg-light p-1"
                      />
                      <div className="flex-grow">
                        <p className="font-medium text-neutral line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-neutral/50">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-neutral">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm border-t border-neutral/10 pt-4 mb-6">
                  <div className="flex justify-between text-neutral/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral/70">
                    <span>Delivery</span>
                    <span>
                      {deliveryCharge === 0
                        ? "Free"
                        : `$${deliveryCharge.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-neutral pt-2 border-t border-neutral/10">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button type="submit" isLoading={isSubmitting}>
                  Place Order
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

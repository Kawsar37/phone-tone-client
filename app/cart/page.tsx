"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiLoader,
} from "react-icons/fi";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/Button";
import { cartAPI } from "@/utils/api";
import { ICartItem } from "@/types";
import { toast } from "sonner";
import Image from "next/image";

export default function CartPage() {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await cartAPI.getCart();
      setCart(data.cart);
    } catch {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (
    cartItemId: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;
    try {
      await cartAPI.updateCartQuantity(cartItemId, newQuantity);
      setCart((prev) =>
        prev.map((item) =>
          item._id === cartItemId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (cartItemId: string) => {
    try {
      await cartAPI.removeFromCart(cartItemId);
      setCart((prev) => prev.filter((item) => item._id !== cartItemId));
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.phoneId.price * item.quantity,
    0,
  );
  const deliveryCharge = subtotal > 500 ? 0 : 20;
  const total = subtotal + deliveryCharge;

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center bg-bg-light">
          <FiLoader className="animate-spin text-primary" size={40} />
        </main>
        <Footer />
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-bg-light flex flex-col items-center justify-center px-4">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-neutral/5 text-center max-w-md">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
              <FiShoppingBag size={32} />
            </div>
            <h1 className="text-2xl font-bold text-neutral mb-2">
              Your Cart is Empty
            </h1>
            <p className="text-neutral/60 mb-8">
              Looks like you haven&apos;t added any phones to your cart yet.
            </p>
            <Link href="/phones">
              <Button>Explore Phones</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-neutral mb-8">
            Shopping <span className="text-primary">Cart</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 bg-white p-4 rounded-xl border border-neutral/5 shadow-sm"
                >
                  <Image
                    height={600}
                    width={600}
                    src={item.phoneId.images[0]}
                    alt={item.phoneId.name}
                    className="w-24 h-24 object-contain rounded-lg bg-bg-light p-2 flex-shrink-0"
                  />
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-neutral">
                        {item.phoneId.name}
                      </h3>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-neutral/40 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                    <p className="text-lg font-extrabold text-primary mb-auto">
                      ${item.phoneId.price}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center border border-neutral/20 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-bg-light text-neutral"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="px-4 text-sm font-semibold text-neutral">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-bg-light text-neutral"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      <p className="font-bold text-neutral">
                        ${(item.phoneId.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl border border-neutral/5 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-neutral mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-neutral/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral/70">
                    <span>Delivery Charge</span>
                    <span>
                      {deliveryCharge === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        `$${deliveryCharge.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="border-t border-neutral/10 pt-3 flex justify-between text-lg font-bold text-neutral">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button>Proceed to Checkout</Button>
                </Link>
                <p className="text-xs text-neutral/50 text-center mt-4">
                  Taxes calculated at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

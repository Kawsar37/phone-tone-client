"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiChevronRight,
  FiStar,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiZap,
  FiCheck,
  FiLoader,
} from "react-icons/fi";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PhoneCard } from "@/components/shared/PhoneCard";
import { phoneAPI, cartAPI } from "@/utils/api";
import { IPhone } from "@/types";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import Image from "next/image";

export default function PhoneDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [phone, setPhone] = useState<IPhone | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "specs">("overview");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchPhone = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data } = await phoneAPI.getPhoneById(id as string);
        setPhone(data.phone);
        setMainImage(data.phone.images[0]);
        setSelectedColor(data.phone.colors[0] || "");
      } catch {
        toast.error("Failed to load phone details");
      } finally {
        setLoading(false);
      }
    };
    fetchPhone();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart", {
        action: { label: "Login", onClick: () => router.push("/login") },
      });
      return;
    }

    if (!phone) return;

    setIsAddingToCart(true);
    try {
      await cartAPI.addToCart({ phoneId: phone._id, quantity });
      toast.success("Added to Cart!", {
        description: `${quantity}x ${phone.name} added.`,
      });
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

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

  if (!phone) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center bg-bg-light">
          <div className="text-center">
            <p className="text-xl font-bold text-neutral mb-4">
              Phone not found
            </p>
            <Link
              href="/phones"
              className="text-primary font-semibold hover:underline"
            >
              Back to Explore
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const specsData = [
    { label: "Operating System", value: phone.operatingSystem },
    { label: "Processor", value: phone.processor },
    { label: "Chipset", value: phone.chipset },
    { label: "GPU", value: phone.gpu },
    { label: "RAM", value: phone.ram },
    { label: "Storage", value: phone.storage },
    {
      label: "Display",
      value: `${phone.display.size} ${phone.display.type}, ${phone.display.refreshRate}`,
    },
    { label: "Resolution", value: phone.display.resolution },
    {
      label: "Battery",
      value: `${phone.battery.capacity}, ${phone.battery.charging}`,
    },
    { label: "Rear Camera", value: phone.camera.rear },
    { label: "Front Camera", value: phone.camera.front },
    { label: "Network", value: phone.connectivity.network },
    { label: "Wi-Fi", value: phone.connectivity.wifi },
    { label: "Bluetooth", value: phone.connectivity.bluetooth },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-neutral/60 mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <FiChevronRight size={14} />
            <Link
              href="/phones"
              className="hover:text-primary transition-colors"
            >
              Phones
            </Link>
            <FiChevronRight size={14} />
            <span className="text-neutral font-medium truncate max-w-[200px]">
              {phone.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[500px] pb-2 md:pb-0 md:pr-2">
                {phone.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                      mainImage === img
                        ? "border-primary shadow-md"
                        : "border-neutral/10 hover:border-neutral/30"
                    }`}
                  >
                    <Image
                      height={80}
                      width={80}
                      src={img}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="flex-grow bg-white rounded-xl border border-neutral/5 p-6 flex items-center justify-center aspect-square md:aspect-auto md:max-h-[600px]">
                <Image
                  height={600}
                  width={600}
                  src={mainImage}
                  alt={phone.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="inline-block w-fit rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary mb-3">
                {phone.brand}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral mb-3">
                {phone.name}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-secondary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={
                        i < Math.floor(phone.rating)
                          ? "fill-current"
                          : "text-neutral/20"
                      }
                      size={18}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-neutral">
                  {phone.rating}
                </span>
              </div>

              <p className="text-4xl font-extrabold text-primary mb-4">
                ${phone.price}
              </p>
              <p className="text-neutral/70 leading-relaxed mb-8">
                {phone.shortDescription}
              </p>

              {phone.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-neutral mb-3">
                    Color:{" "}
                    <span className="font-normal text-neutral/70">
                      {selectedColor}
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {phone.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                          selectedColor === color
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-neutral/20 text-neutral/70 hover:border-neutral/40"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-bold text-neutral mb-3">
                  Quantity
                </h3>
                <div className="inline-flex items-center border border-neutral/20 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-bg-light text-neutral"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="px-6 py-2 text-sm font-semibold text-neutral border-x border-neutral/20 min-w-[50px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-bg-light text-neutral"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-70"
                >
                  {isAddingToCart ? (
                    <FiLoader className="animate-spin" size={20} />
                  ) : (
                    <FiShoppingCart size={20} />
                  )}
                  Add to Cart
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-secondary text-white font-semibold shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-all">
                  <FiZap size={20} /> Buy Now
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-neutral/10">
                <div className="flex items-center gap-2 text-sm text-neutral/70">
                  <FiCheck className="text-primary" /> Free Next-Day Shipping
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral/70">
                  <FiCheck className="text-primary" /> 2-Year Warranty
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral/70">
                  <FiCheck className="text-primary" /> 14-Day Returns
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral/70">
                  <FiCheck className="text-primary" /> 100% Authentic
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral/5 p-6 sm:p-8 mb-16">
            <div className="flex border-b border-neutral/10 mb-8 overflow-x-auto">
              {(["overview", "specs"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-all relative ${
                    activeTab === tab
                      ? "text-primary"
                      : "text-neutral/60 hover:text-neutral"
                  }`}
                >
                  {tab === "overview" ? "Overview" : "Specifications"}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>

            <div>
              {activeTab === "overview" && (
                <div className="prose max-w-none text-neutral/80 leading-relaxed">
                  <p>{phone.description}</p>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {specsData.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between py-3 border-b border-neutral/5"
                    >
                      <span className="text-sm font-medium text-neutral/60">
                        {spec.label}
                      </span>
                      <span className="text-sm font-semibold text-neutral text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

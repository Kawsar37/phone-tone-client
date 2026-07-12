"use client";

import { FiTrash2, FiEye } from "react-icons/fi";
import { toast } from "sonner";

const mockPhones = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199,
    stock: 45,
    image:
      "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1299,
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Pixel 8 Pro",
    brand: "Google",
    price: 999,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=100&auto=format&fit=crop",
  },
];

export default function ManagePhonesPage() {
  const handleDelete = (id: string) => {
    toast.success("Phone Deleted", {
      description: "The phone has been removed from the catalog.",
    });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral/5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-neutral">Manage Phones</h2>
        <span className="text-sm text-neutral/60">
          {mockPhones.length} devices
        </span>
      </div>

      <div className="overflow-x-auto -mx-6 sm:mx-0">
        <table className="w-full text-left min-w-[700px]">
          <thead>
            <tr className="border-b border-neutral/10 text-xs uppercase text-neutral/50 font-semibold tracking-wider">
              <th className="pb-3 pr-4">Phone</th>
              <th className="pb-3 pr-4">Brand</th>
              <th className="pb-3 pr-4">Price</th>
              <th className="pb-3 pr-4">Stock</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral/5">
            {mockPhones.map((phone) => (
              <tr
                key={phone.id}
                className="hover:bg-bg-light/50 transition-colors"
              >
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="w-10 h-10 object-contain rounded bg-bg-light p-1"
                    />
                    <span className="font-semibold text-neutral">
                      {phone.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-sm text-neutral/70">
                  {phone.brand}
                </td>
                <td className="py-4 pr-4 font-bold text-primary">
                  ${phone.price}
                </td>
                <td className="py-4 pr-4 text-sm text-neutral/70">
                  {phone.stock} units
                </td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 text-neutral/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="View"
                    >
                      <FiEye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(phone.id)}
                      className="p-2 text-neutral/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

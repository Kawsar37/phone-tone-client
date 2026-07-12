"use client";

import { useState, useEffect } from "react";
import { FiLoader, FiTrash2 } from "react-icons/fi";
import { phoneAPI } from "@/utils/api";
import { IPhone } from "@/types";
import { toast } from "sonner";

export default function AdminPhonesPage() {
  const [phones, setPhones] = useState<IPhone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const { data } = await phoneAPI.getPhones({ limit: 100 });
        setPhones(data.phones);
      } catch {
        toast.error("Failed to load phones");
      } finally {
        setLoading(false);
      }
    };
    fetchPhones();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this phone?")) return;
    try {
      await phoneAPI.deletePhone(id);
      setPhones((prev) => prev.filter((p) => p._id !== id));
      toast.success("Phone deleted successfully");
    } catch {
      toast.error("Failed to delete phone");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-neutral/5">
        <FiLoader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral/5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-neutral">Manage Phones</h2>
        <span className="text-sm text-neutral/60">{phones.length} devices</span>
      </div>

      {phones.length === 0 ? (
        <p className="text-center text-neutral/60 py-8">
          No phones in the catalog.
        </p>
      ) : (
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
              {phones.map((phone) => (
                <tr
                  key={phone._id}
                  className="hover:bg-bg-light/50 transition-colors"
                >
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={phone.images[0]}
                        alt={phone.name}
                        className="w-10 h-10 object-contain rounded bg-bg-light p-1"
                      />
                      <span className="font-semibold text-neutral truncate max-w-[200px]">
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
                    <button
                      onClick={() => handleDelete(phone._id)}
                      className="p-2 text-neutral/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

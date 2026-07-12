"use client";

import { useState, useEffect } from "react";
import { FiLoader, FiTrash2, FiEdit2, FiX } from "react-icons/fi";
import { phoneAPI } from "@/utils/api";
import { IPhone } from "@/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function AdminPhonesPage() {
  const [phones, setPhones] = useState<IPhone[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhone, setEditingPhone] = useState<IPhone | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const openEditModal = (phone: IPhone) => {
    setEditingPhone(phone);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPhone) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const updateData = {
        name: formData.get("name") as string,
        brand: formData.get("brand") as string,
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        shortDescription: formData.get("shortDescription") as string,
      };

      const { data } = await phoneAPI.updatePhone(editingPhone._id, updateData);

      setPhones((prev) =>
        prev.map((p) => (p._id === editingPhone._id ? data.phone : p)),
      );
      toast.success("Phone updated successfully");
      setIsModalOpen(false);
      setEditingPhone(null);
    } catch {
      toast.error("Failed to update phone");
    } finally {
      setIsSubmitting(false);
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
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(phone)}
                        className="p-2 text-neutral/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(phone._id)}
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
      )}

      {/* Edit Modal */}
      {isModalOpen && editingPhone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-neutral/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl border border-neutral/5 w-full max-w-lg p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neutral">
                Edit Phone Details
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral/60 hover:bg-bg-light rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <Input
                label="Phone Name"
                name="name"
                defaultValue={editingPhone.name}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Brand"
                  name="brand"
                  defaultValue={editingPhone.brand}
                  required
                />
                <Input
                  label="Stock"
                  name="stock"
                  type="number"
                  defaultValue={editingPhone.stock}
                  required
                />
              </div>
              <Input
                label="Price ($)"
                name="price"
                type="number"
                step="0.01"
                defaultValue={editingPhone.price}
                required
              />
              <div>
                <label className="block text-sm font-medium text-neutral mb-1.5">
                  Short Description
                </label>
                <textarea
                  name="shortDescription"
                  defaultValue={editingPhone.shortDescription}
                  rows={3}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral/20 bg-white text-neutral focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="flex-1"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

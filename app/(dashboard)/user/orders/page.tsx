"use client";

import { useState, useEffect } from "react";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiLoader,
} from "react-icons/fi";
import { orderAPI } from "@/utils/api";
import { IOrder } from "@/types";
import { toast } from "sonner";

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await orderAPI.getMyOrders();
        setOrders(data.orders);
      } catch {
        toast.error("Failed to load order history");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "delivered":
        return { color: "bg-green-100 text-green-700", icon: FiCheckCircle };
      case "shipped":
        return { color: "bg-blue-100 text-blue-700", icon: FiTruck };
      case "pending":
        return { color: "bg-yellow-100 text-yellow-700", icon: FiClock };
      case "cancelled":
        return { color: "bg-red-100 text-red-700", icon: FiPackage };
      default:
        return { color: "bg-neutral/10 text-neutral", icon: FiPackage };
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
      <h2 className="text-xl font-bold text-neutral mb-6">Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <FiPackage className="mx-auto text-neutral/30 mb-4" size={48} />
          <p className="text-neutral/60">
            You haven&apos;t placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b border-neutral/10 text-xs uppercase text-neutral/50 font-semibold tracking-wider">
                <th className="pb-3 pr-4">Order ID</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Items</th>
                <th className="pb-3 pr-4">Total</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral/5">
              {orders.map((order) => {
                const config = getStatusConfig(order.orderStatus);
                const Icon = config.icon;

                return (
                  <tr
                    key={order._id}
                    className="hover:bg-bg-light/50 transition-colors"
                  >
                    <td className="py-4 pr-4 font-semibold text-neutral">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="py-4 pr-4 text-sm text-neutral/70">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 pr-4 text-sm text-neutral/70">
                      {order.items.length} item(s)
                    </td>
                    <td className="py-4 pr-4 font-bold text-primary">
                      ${order.total}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}
                      >
                        <Icon size={14} />
                        {order.orderStatus.charAt(0).toUpperCase() +
                          order.orderStatus.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

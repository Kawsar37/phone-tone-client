"use client";

import { useState, useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import { orderAPI } from "@/utils/api";
import { IOrder } from "@/types";
import { toast } from "sonner";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await orderAPI.getAllOrders();
        setOrders(data.orders);
      } catch {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? { ...o, orderStatus: newStatus as IOrder["orderStatus"] }
            : o,
        ),
      );
      toast.success(
        `Order #${orderId.slice(-6).toUpperCase()} updated to ${newStatus}`,
      );
    } catch {
      toast.error("Failed to update status");
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
      <h2 className="text-xl font-bold text-neutral mb-6">Manage Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-neutral/60 py-8">No orders found.</p>
      ) : (
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="border-b border-neutral/10 text-xs uppercase text-neutral/50 font-semibold tracking-wider">
                <th className="pb-3 pr-4">Order ID</th>
                <th className="pb-3 pr-4">Customer</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Total</th>
                <th className="pb-3">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral/5">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-bg-light/50 transition-colors"
                >
                  <td className="py-4 pr-4 font-semibold text-neutral">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="py-4 pr-4 text-sm text-neutral/70">
                    {order.userId.name}
                  </td>
                  <td className="py-4 pr-4 text-sm text-neutral/70">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 pr-4 font-bold text-primary">
                    ${order.total}
                  </td>
                  <td className="py-4">
                    <select
                      defaultValue={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="px-3 py-1.5 rounded-lg border border-neutral/20 bg-white text-sm font-medium text-neutral focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
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

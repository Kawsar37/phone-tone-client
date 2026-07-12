"use client";

import { toast } from "sonner";

const mockOrders = [
  {
    id: "ORD-101",
    user: "Sarah Jenkins",
    total: 1199,
    status: "pending",
    date: "2026-07-10",
  },
  {
    id: "ORD-102",
    user: "Marcus Chen",
    total: 2598,
    status: "shipped",
    date: "2026-07-11",
  },
  {
    id: "ORD-103",
    user: "Elena Rodriguez",
    total: 799,
    status: "delivered",
    date: "2026-07-08",
  },
];

export default function ManageOrdersPage() {
  const handleStatusChange = (orderId: string, newStatus: string) => {
    toast.success("Status Updated", {
      description: `Order ${orderId} is now ${newStatus}.`,
    });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral/5 shadow-sm">
      <h2 className="text-xl font-bold text-neutral mb-6">Manage Orders</h2>

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
            {mockOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-bg-light/50 transition-colors"
              >
                <td className="py-4 pr-4 font-semibold text-neutral">
                  {order.id}
                </td>
                <td className="py-4 pr-4 text-sm text-neutral/70">
                  {order.user}
                </td>
                <td className="py-4 pr-4 text-sm text-neutral/70">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="py-4 pr-4 font-bold text-primary">
                  ${order.total}
                </td>
                <td className="py-4">
                  <select
                    defaultValue={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
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
    </div>
  );
}

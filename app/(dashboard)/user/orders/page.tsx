"use client";

import { FiPackage, FiTruck, FiCheckCircle, FiClock } from "react-icons/fi";

// Mock data (Will be replaced by API fetch later)
const mockOrders = [
  {
    id: "ORD-101",
    date: "2026-07-10",
    total: 1199,
    status: "delivered",
    items: 1,
  },
  {
    id: "ORD-102",
    date: "2026-07-11",
    total: 2598,
    status: "shipped",
    items: 2,
  },
  {
    id: "ORD-103",
    date: "2026-07-12",
    total: 799,
    status: "pending",
    items: 1,
  },
  {
    id: "ORD-104",
    date: "2026-07-05",
    total: 1399,
    status: "cancelled",
    items: 1,
  },
];

export default function UserOrdersPage() {
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

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral/5 shadow-sm">
      <h2 className="text-xl font-bold text-neutral mb-6">Order History</h2>

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
            {mockOrders.map((order) => {
              const config = getStatusConfig(order.status);
              const Icon = config.icon;

              return (
                <tr
                  key={order.id}
                  className="hover:bg-bg-light/50 transition-colors"
                >
                  <td className="py-4 pr-4 font-semibold text-neutral">
                    {order.id}
                  </td>
                  <td className="py-4 pr-4 text-sm text-neutral/70">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 pr-4 text-sm text-neutral/70">
                    {order.items} item(s)
                  </td>
                  <td className="py-4 pr-4 font-bold text-primary">
                    ${order.total}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}
                    >
                      <Icon size={14} />
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

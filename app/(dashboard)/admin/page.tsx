"use client";

import { FiSmartphone, FiUsers, FiPackage, FiDollarSign } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock Data for Charts
const monthlyOrdersData = [
  { month: "Jan", orders: 45, revenue: 4500 },
  { month: "Feb", orders: 52, revenue: 5200 },
  { month: "Mar", orders: 38, revenue: 3800 },
  { month: "Apr", orders: 65, revenue: 6500 },
  { month: "May", orders: 78, revenue: 7800 },
  { month: "Jun", orders: 90, revenue: 9000 },
];

const stats = [
  {
    label: "Total Phones",
    value: "124",
    icon: FiSmartphone,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Total Users",
    value: "1,205",
    icon: FiUsers,
    color: "bg-secondary/10 text-secondary",
  },
  {
    label: "Total Orders",
    value: "842",
    icon: FiPackage,
    color: "bg-green-100 text-green-700",
  },
  {
    label: "Revenue",
    value: "$84,200",
    icon: FiDollarSign,
    color: "bg-purple-100 text-purple-700",
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-xl border border-neutral/5 shadow-sm flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-lg ${stat.color}`}
              >
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-neutral/60 font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-extrabold text-neutral">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Orders Chart */}
        <div className="bg-white p-6 rounded-xl border border-neutral/5 shadow-sm">
          <h3 className="text-lg font-bold text-neutral mb-6">
            Monthly Orders
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="orders"
                  fill="#2563EB"
                  radius={[4, 4, 0, 0]}
                  name="Orders"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white p-6 rounded-xl border border-neutral/5 shadow-sm">
          <h3 className="text-lg font-bold text-neutral mb-6">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral/10 text-xs uppercase text-neutral/50 font-semibold">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">User</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral/5">
                <tr>
                  <td className="py-3 font-semibold">#ORD-104</td>
                  <td className="py-3">Sarah J.</td>
                  <td className="py-3 font-bold text-primary">$1199</td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">#ORD-103</td>
                  <td className="py-3">Marcus C.</td>
                  <td className="py-3 font-bold text-primary">$899</td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      Shipped
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">#ORD-102</td>
                  <td className="py-3">Elena R.</td>
                  <td className="py-3 font-bold text-primary">$1299</td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Delivered
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">#ORD-101</td>
                  <td className="py-3">David L.</td>
                  <td className="py-3 font-bold text-primary">$599</td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Delivered
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  FiSmartphone,
  FiUsers,
  FiPackage,
  FiDollarSign,
  FiLoader,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { adminAPI } from "@/utils/api";
import { toast } from "sonner";

interface DashboardStats {
  revenue: number;
  orders: number;
  users: number;
  phones: number;
}

interface ChartData {
  month: string;
  orders: number;
  revenue: number;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, chartRes] = await Promise.all([
          adminAPI.getStats(),
          adminAPI.getMonthlyOrders(),
        ]);
        setStats(statsRes.data.stats);
        setChartData(chartRes.data.chartData);
      } catch {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-neutral/5">
        <FiLoader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const statsData = [
    {
      label: "Total Phones",
      value: stats?.phones || 0,
      icon: FiSmartphone,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Total Users",
      value: stats?.users || 0,
      icon: FiUsers,
      color: "bg-secondary/10 text-secondary",
    },
    {
      label: "Total Orders",
      value: stats?.orders || 0,
      icon: FiPackage,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Revenue",
      value: `$${stats?.revenue.toLocaleString() || 0}`,
      icon: FiDollarSign,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
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

      <div className="bg-white p-6 rounded-xl border border-neutral/5 shadow-sm">
        <h3 className="text-lg font-bold text-neutral mb-6">
          Monthly Orders & Revenue
        </h3>
        {chartData.length > 0 ? (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                  }}
                />
                <Bar
                  dataKey="orders"
                  fill="#2563EB"
                  radius={[4, 4, 0, 0]}
                  name="Orders"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-72 flex items-center justify-center text-neutral/50">
            No order data available yet.
          </div>
        )}
      </div>
    </div>
  );
}

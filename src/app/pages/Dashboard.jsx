import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle,
  Target,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const KPICard = ({ title, value, change, isPositive, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span
              className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
            >
              {change}
            </span>
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  // Sales Trend Data
  const salesTrendData = [
    { month: "Aug", "2025": 35, "2026": 38 },
    { month: "Sep", "2025": 42, "2026": 45 },
    { month: "Oct", "2025": 38, "2026": 43 },
    { month: "Nov", "2025": 45, "2026": 48 },
    { month: "Dec", "2025": 40, "2026": 45 },
    { month: "Jan", "2025": 48, "2026": 52 },
    { month: "Feb", "2025": 43, "2026": 50 },
  ];

  // Target vs Actual Data
  const targetActualData = [
    { month: "Dec", target: 50, actual: 45 },
    { month: "Jan", target: 55, actual: 52 },
    { month: "Feb", target: 60, actual: 50 },
  ];

  // Payment Term Distribution
  const paymentTermData = [
    { name: "Cash", value: 28, color: "#3B82F6" },
    { name: "Financing", value: 52, color: "#10B981" },
    { name: "Bank PO", value: 20, color: "#F59E0B" },
  ];

  // Reservation by Team
  const teamReservationData = [
    { team: "NSR1", reservations: 35 },
    { team: "NSR2", reservations: 32 },
    { team: "NSR3", reservations: 25 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Executive summary of automotive sales performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        <KPICard
          title="Total Sales"
          value="125"
          change="+8%"
          isPositive={true}
          icon={Target}
        />
        <KPICard
          title="YTD Sales"
          value="75"
          change="+6%"
          isPositive={true}
          icon={TrendingUp}
        />
        <KPICard
          title="Total Reservations"
          value="92"
          change="+12%"
          isPositive={true}
          icon={Users}
        />
        <KPICard
          title="Approval Rate"
          value="68%"
          change="+4%"
          isPositive={true}
          icon={CheckCircle}
        />
        <KPICard
          title="Projected 2026 Sales"
          value="580"
          change="+5%"
          isPositive={true}
          icon={Target}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Trend */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Sales Trend (2025 vs 2026)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#6B7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />

              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="2025"
                stroke="#94A3B8"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="2026"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Target vs Actual */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Target vs Actual
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={targetActualData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#6B7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />

              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="target" fill="#94A3B8" radius={[8, 8, 0, 0]} />
              <Bar dataKey="actual" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Term Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Term Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentTermData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentTermData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Reservation by Team */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Reservation by Team
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamReservationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="team"
                stroke="#6B7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#6B7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />

              <Bar
                dataKey="reservations"
                fill="#10B981"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Executive Summary Card */}
    </div>
  );
};

import React, { useState } from "react";
import { Plus, Edit, ChevronDown, Award } from "lucide-react";
import {
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
import { useData } from "../context/DataContext";
import { AddVehicleSalesModal } from "../components/modals/AddVehicleSalesModal";
import { EditVehicleSalesGroupModal } from "../components/modals/EditVehicleSalesGroupModal";

export const VehicleSalesPerGroup = () => {
  const { vehicleSalesData, selectedMonth } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDataMonth, setSelectedDataMonth] = useState("Feb 2026");

  const months = [
    "Dec 2025",
    "Jan 2026",
    "Feb 2026",
    "Mar 2026",
    "Apr 2026",
    "May 2026",
    "Jun 2026",
    "Jul 2026",
    "Aug 2026",
    "Sep 2026",
    "Oct 2026",
    "Nov 2026",
    "Dec 2026",
  ];
  const models = [
    "Kicks",
    "E26",
    "N18",
    "Patrol",
    "D23",
    "Terra",
    "Livina",
    "NissanZ",
    "Prem",
  ];

  // Get data for selected month
  const monthData = vehicleSalesData[selectedDataMonth] || [];

  // Calculate totals
  const teamTotals = monthData.map((team) => {
    const total =
      team.Kicks +
      team.E26 +
      team.N18 +
      team.Patrol +
      team.D23 +
      team.Terra +
      team.Livina +
      team.NissanZ +
      team.Prem;
    return { ...team, total };
  });

  const modelTotals = models.reduce((acc, model) => {
    acc[model] = monthData.reduce((sum, team) => sum + team[model], 0);
    return acc;
  }, {});

  const grandTotal = Object.values(modelTotals).reduce(
    (sum, val) => sum + val,
    0,
  );
  const topTeam = teamTotals.reduce(
    (prev, current) => (current.total > prev.total ? current : prev),
    teamTotals[0],
  );
  const topModel = Object.entries(modelTotals).reduce(
    (prev, current) => (current[1] > prev[1] ? current : prev),
    ["", 0],
  );

  // Chart data
  const teamPerformanceData = teamTotals.map((team) => ({
    team: team.team.split(" – ")[0],
    units: team.total,
  }));

  const modelDistributionData = models.map((model) => ({
    name: model,
    value: modelTotals[model],
  }));

  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#F97316",
    "#6366F1",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 uppercase">
            {selectedDataMonth} PERFORMANCE PER GROUP
          </h1>
          <p className="text-gray-600">
            Vehicle sales breakdown by team and model
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Month Selector */}
          <div className="relative">
            <select
              value={selectedDataMonth}
              onChange={(e) => setSelectedDataMonth(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Monthly Data
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Units Sold</p>
          <h3 className="text-3xl font-bold text-gray-900">{grandTotal}</h3>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Top Team</p>
          <h3 className="text-xl font-bold text-[#C3002F]">
            {topTeam?.team || "N/A"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {topTeam?.total || 0} units
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Top Model</p>
          <h3 className="text-xl font-bold text-green-600">{topModel[0]}</h3>
          <p className="text-sm text-gray-500 mt-1">{topModel[1]} units</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Best Selling Model Units</p>
          <h3 className="text-3xl font-bold text-gray-900">{topModel[1]}</h3>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="sticky left-0 bg-gray-50 z-10 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  Team
                </th>
                {models.map((model) => (
                  <th
                    key={model}
                    className={`px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider ${
                      model === topModel[0] ? "bg-green-50" : ""
                    }`}
                  >
                    {model}
                  </th>
                ))}
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider bg-blue-50 border-l border-gray-200">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamTotals.map((team, index) => {
                const isTopTeam = team.total === topTeam?.total;
                return (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 ${isTopTeam ? "bg-green-50" : ""}`}
                  >
                    <td className="sticky left-0 bg-white px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200 z-10">
                      <div className="flex items-center gap-3">
                        
                        <div className="flex items-center gap-2">
                          {team.team}
                          {isTopTeam && (
                            <Award className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </div>
                    </td>
                    {models.map((model) => (
                      <td
                        key={model}
                        className={`px-6 py-4 text-sm text-center text-gray-900 ${
                          model === topModel[0] ? "bg-green-50" : ""
                        }`}
                      >
                        {team[model]}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-sm text-center font-bold text-gray-900 bg-blue-50 border-l border-gray-200">
                      {team.total}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="sticky left-0 bg-gray-100 px-6 py-4 text-sm text-gray-900 border-r border-gray-200 z-10">
                  TOTAL
                </td>
                {models.map((model) => (
                  <td
                    key={model}
                    className={`px-6 py-4 text-sm text-center text-gray-900 ${
                      model === topModel[0] ? "bg-green-100" : ""
                    }`}
                  >
                    {modelTotals[model]}
                  </td>
                ))}
                <td className="px-6 py-4 text-sm text-center text-gray-900 bg-blue-100 border-l border-gray-200">
                  {grandTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Performance Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Performance (Total Units)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamPerformanceData}>
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

              <Bar dataKey="units" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Model Distribution Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Model Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={modelDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {modelDistributionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
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
      </div>

      {/* Stacked Bar Chart - Model Contribution per Team */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Model Contribution per Team
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={teamTotals}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="team"
              stroke="#6B7280"
              style={{ fontSize: "12px" }}
              tickFormatter={(value) => value.split(" – ")[0]}
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
            {models.map((model, index) => (
              <Bar
                key={model}
                dataKey={model}
                stackId="a"
                fill={colors[index % colors.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddVehicleSalesModal onClose={() => setShowAddModal(false)} />
      )}
      {/* Edit Modal */}
      {showEditModal && (
        <EditVehicleSalesGroupModal
          onClose={() => setShowEditModal(false)}
          month={selectedDataMonth}
        />
      )}
    </div>
  );
};

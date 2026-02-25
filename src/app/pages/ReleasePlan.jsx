import React, { useState } from "react";
import { Plus, Edit2, ChevronDown, FileDown } from "lucide-react";
import { exportReleasePlan } from "../utils/exportToWord";
import { EditReleasePlanModal } from "../components/modals/EditReleasePlanModal";
import { AddReleasePlanModal } from "../components/modals/AddReleasePlanModal";

export const ReleasePlan = () => {
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

  const [selectedMonth, setSelectedMonth] = useState("Feb 2026");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [releasePlanData, setReleasePlanData] = useState({
    "Dec 2025": [
      {
        group: "NSR1 – Mike",
        avatar: "M",
        actual: 25,
        additionalThisWeek: 5,
        additionalNextWeek: 8,
        target: 40,
      },
      {
        group: "NSR2 – Jhoven",
        avatar: "J",
        actual: 20,
        additionalThisWeek: 4,
        additionalNextWeek: 6,
        target: 35,
      },
      {
        group: "NSR3 – Jay-R",
        avatar: "JR",
        actual: 18,
        additionalThisWeek: 3,
        additionalNextWeek: 5,
        target: 30,
      },
    ],
    "Jan 2026": [
      {
        group: "NSR1 – Mike",
        avatar: "M",
        actual: 28,
        additionalThisWeek: 6,
        additionalNextWeek: 9,
        target: 45,
      },
      {
        group: "NSR2 – Jhoven",
        avatar: "J",
        actual: 22,
        additionalThisWeek: 5,
        additionalNextWeek: 7,
        target: 38,
      },
      {
        group: "NSR3 – Jay-R",
        avatar: "JR",
        actual: 20,
        additionalThisWeek: 4,
        additionalNextWeek: 6,
        target: 32,
      },
    ],
    "Feb 2026": [
      {
        group: "NSR1 – Mike",
        avatar: "M",
        actual: 30,
        additionalThisWeek: 7,
        additionalNextWeek: 10,
        target: 48,
      },
      {
        group: "NSR2 – Jhoven",
        avatar: "J",
        actual: 25,
        additionalThisWeek: 6,
        additionalNextWeek: 8,
        target: 42,
      },
      {
        group: "NSR3 – Jay-R",
        avatar: "JR",
        actual: 22,
        additionalThisWeek: 5,
        additionalNextWeek: 7,
        target: 35,
      },
    ],
  });

  // Get data for selected month
  const monthData = releasePlanData[selectedMonth] || [];

  // Calculate month-end commitment and variance for each team
  const teamsWithCalculations = monthData.map((team) => {
    const monthEndCommitment =
      team.actual + team.additionalThisWeek + team.additionalNextWeek;
    const variance = monthEndCommitment - team.actual; // Variance is Commitment minus Actual
    return { ...team, monthEndCommitment, variance };
  });

  // Calculate totals
  const totals = teamsWithCalculations.reduce(
    (acc, team) => ({
      actual: acc.actual + team.actual,
      additionalThisWeek: acc.additionalThisWeek + team.additionalThisWeek,
      additionalNextWeek: acc.additionalNextWeek + team.additionalNextWeek,
      monthEndCommitment: acc.monthEndCommitment + team.monthEndCommitment,
      variance: acc.variance + team.variance,
    }),
    {
      actual: 0,
      additionalThisWeek: 0,
      additionalNextWeek: 0,
      monthEndCommitment: 0,
      variance: 0,
    },
  );

  const checkIfMonthHasData = () => {
    return (
      releasePlanData[selectedMonth] &&
      releasePlanData[selectedMonth].length > 0
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Release Plan</h1>
          <p className="text-gray-600 mt-1">
            Monthly release commitments and variance tracking
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Month Selector */}
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C3002F] cursor-pointer"
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
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Monthly Data
          </button>
          <button
            onClick={() =>
              exportReleasePlan(releasePlanData[selectedMonth], selectedMonth)
            }
            disabled={!monthData || monthData.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileDown className="w-4 h-4" />
            Export to Word
          </button>
        </div>
      </div>

      {/* Release Plan Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F6F8]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Group
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actual
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Additional
                  <br />
                  (This Week)
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Additional
                  <br />
                  (Next Week)
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider bg-blue-50">
                  Month-End
                  <br />
                  Commitment
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider bg-yellow-50">
                  Variance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamsWithCalculations.map((team) => (
                <tr key={team.group} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C3002F] flex items-center justify-center text-white text-xs font-semibold">
                        {team.avatar}
                      </div>
                      <span>{team.group}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-900">
                    {team.actual}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-900">
                    {team.additionalThisWeek}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-900">
                    {team.additionalNextWeek}
                  </td>
                  <td className="px-6 py-4 text-sm text-center font-bold text-gray-900 bg-blue-50">
                    {team.monthEndCommitment}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm text-center font-bold bg-yellow-50 ${team.variance >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {team.variance >= 0 ? "+" : ""}
                    {team.variance}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td className="px-6 py-4 text-sm text-gray-900">TOTAL</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">
                  {totals.actual}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">
                  {totals.additionalThisWeek}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">
                  {totals.additionalNextWeek}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900 bg-blue-100">
                  {totals.monthEndCommitment}
                </td>
                <td
                  className={`px-6 py-4 text-sm text-center bg-yellow-100 ${totals.variance >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {totals.variance >= 0 ? "+" : ""}
                  {totals.variance}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {monthData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No data available for {selectedMonth}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Click "Add Monthly Data" to create entries
            </p>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Actual</p>
          <h3 className="text-3xl font-bold text-gray-900">{totals.actual}</h3>
          <p className="text-xs text-gray-500 mt-1">
            Current completed releases
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Commitment</p>
          <h3 className="text-3xl font-bold text-blue-600">
            {totals.monthEndCommitment}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Actual + This Week + Next Week
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Variance</p>
          <h3
            className={`text-3xl font-bold ${totals.variance >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {totals.variance >= 0 ? "+" : ""}
            {totals.variance}
          </h3>
          <p className="text-xs text-gray-500 mt-1">Commitment vs Actual</p>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddReleasePlanModal
          onClose={() => setShowAddModal(false)}
          onAdd={(month, data) => {
            setReleasePlanData((prev) => ({
              ...prev,
              [month]: data,
            }));
            setShowAddModal(false);
          }}
          existingMonths={Object.keys(releasePlanData)}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && monthData.length > 0 && (
        <EditReleasePlanModal
          onClose={() => setShowEditModal(false)}
          onSave={(month, data) => {
            setReleasePlanData((prev) => ({
              ...prev,
              [month]: data,
            }));
            setShowEditModal(false);
          }}
          month={selectedMonth}
          initialData={monthData}
        />
      )}
    </div>
  );
};

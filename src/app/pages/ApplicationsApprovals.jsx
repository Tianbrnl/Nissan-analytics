import React, { useState } from "react";
import { Plus, Edit, Award, ChevronDown, FileDown } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useData } from "../context/DataContext";
import { AddApplicationDataModal } from "../components/modals/AddApplicationDataModal";
import { EditApplicationsModal } from "../components/modals/EditApplicationsModal";

export const ApplicationsApprovals = () => {
  const { applicationData, applicationsMatrix, selectedMonth } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTeamMonth, setSelectedTeamMonth] = useState("Dec 2025");

  // Calculate totals for matrix
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
  const matrixTotals = {
    applied: months.reduce(
      (sum, month) => sum + (applicationsMatrix[month]?.applied || 0),
      0,
    ),
    approvedAsApplied: months.reduce(
      (sum, month) => sum + (applicationsMatrix[month]?.approvedAsApplied || 0),
      0,
    ),
    approvedNotAsApplied: months.reduce(
      (sum, month) =>
        sum + (applicationsMatrix[month]?.approvedNotAsApplied || 0),
      0,
    ),
    availed: months.reduce(
      (sum, month) => sum + (applicationsMatrix[month]?.availed || 0),
      0,
    ),
  };
   
  const totalApproved =
    matrixTotals.approvedAsApplied + matrixTotals.approvedNotAsApplied;
  const approvalRate =
    matrixTotals.applied > 0
      ? ((totalApproved / matrixTotals.applied) * 100).toFixed(0)
      : 0;

  // Team data for selected month
  const teamData = applicationData[selectedTeamMonth] || [];
  const teamTotals = teamData.reduce(
    (acc, team) => ({
      applications: acc.applications + team.applications,
      approvedAsApplied: acc.approvedAsApplied + team.approvedAsApplied,
      approvedNotAsApplied:
        acc.approvedNotAsApplied + team.approvedNotAsApplied,
      availed: acc.availed + team.availed,
    }),
    {
      applications: 0,
      approvedAsApplied: 0,
      approvedNotAsApplied: 0,
      availed: 0,
    },
  );

  const teamTotalApprovalRate =
    teamTotals.applications > 0
      ? (
          ((teamTotals.approvedAsApplied + teamTotals.approvedNotAsApplied) /
            teamTotals.applications) *
          100
        ).toFixed(0)
      : 0;
  const teamTotalAvailmentRate =
    teamTotals.approvedAsApplied > 0
      ? ((teamTotals.availed / teamTotals.approvedAsApplied) * 100).toFixed(0)
      : 0;

  // Chart data
  const approvalRateTrendData = [
    { month: "Dec 2025", target: 65, actual: 67 },
    { month: "Jan 2026", target: 65, actual: 69 },
    { month: "Feb 2026", target: 65, actual: 68 },
    { month: "Mar 2026", target: 65, actual: 68 },
    { month: "Apr 2026", target: 65, actual: 68 },
  ];

  const availmentRateTrendData = [
    { month: "Dec 2025", target: 60, actual: 58 },
    { month: "Jan 2026", target: 60, actual: 55 },
    { month: "Feb 2026", target: 60, actual: 56 },
    { month: "Mar 2026", target: 65, actual: 68 },
    { month: "Apr 2026", target: 65, actual: 68 },
  ];

  const teamComparisonApprovalData = teamData.map((team) => ({
    team: team.team.split(" – ")[0],
    rate:
      team.applications > 0
        ? (
            ((team.approvedAsApplied + team.approvedNotAsApplied) /
              team.applications) *
            100
          ).toFixed(0)
        : 0,
  }));

  const teamComparisonAvailmentData = teamData.map((team) => ({
    team: team.team.split(" – ")[0],
    rate:
      team.approvedAsApplied > 0
        ? ((team.availed / team.approvedAsApplied) * 100).toFixed(0)
        : 0,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Applications & Approvals
          </h1>
          <p className="text-gray-600">
            Track and manage financing applications and approval rates
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          
          <button
            onClick={() => alert("Export to Word")}
            className="flex items-center gap-2 px-4 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
          >
            <FileDown className="w-4 h-4" />
            Export to Word
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Applications</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {matrixTotals.applied}
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Approved</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalApproved}</h3>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Availed</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {matrixTotals.availed}
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Approval Rate</p>
          <h3 className="text-3xl font-bold text-green-600">{approvalRate}%</h3>
        </div>
      </div>

      {/* SECTION 1: Overall Monthly Matrix */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Applications & Approvals - Overall Monthly Matrix
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Account Type
                </th>
                {months.map((month) => (
                  <th
                    key={month}
                    className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {month}
                  </th>
                ))}
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider bg-blue-50">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Applied
                </td>
                {months.map((month) => (
                  <td
                    key={month}
                    className="px-6 py-4 text-sm text-center text-gray-900"
                  >
                    {applicationsMatrix[month]?.applied || 0}
                  </td>
                ))}
                <td className="px-6 py-4 text-sm text-center font-bold text-gray-900 bg-blue-50">
                  {matrixTotals.applied}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Approved (As Applied)
                </td>
                {months.map((month) => (
                  <td
                    key={month}
                    className="px-6 py-4 text-sm text-center text-gray-900"
                  >
                    {applicationsMatrix[month]?.approvedAsApplied || 0}
                  </td>
                ))}
                <td className="px-6 py-4 text-sm text-center font-bold text-gray-900 bg-blue-50">
                  {matrixTotals.approvedAsApplied}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {" "}
                  Approved{" "}
                  <span className="text-red-500">(Not As Applied)</span>
                </td>
                {months.map((month) => (
                  <td
                    key={month}
                    className="px-6 py-4 text-sm text-center text-gray-900"
                  >
                    {applicationsMatrix[month]?.approvedNotAsApplied || 0}
                  </td>
                ))}
                <td className="px-6 py-4 text-sm text-center font-bold text-gray-900 bg-blue-50">
                  {matrixTotals.approvedNotAsApplied}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Availed
                </td>
                {months.map((month) => (
                  <td
                    key={month}
                    className="px-6 py-4 text-sm text-center text-gray-900"
                  >
                    {applicationsMatrix[month]?.availed || 0}
                  </td>
                ))}
                <td className="px-6 py-4 text-sm text-center font-bold text-gray-900 bg-blue-50">
                  {matrixTotals.availed}
                </td>
              </tr>
              <tr className="bg-gray-100 font-bold">
                <td className="px-6 py-4 text-sm text-gray-900">Total</td>
                {months.map((month) => (
                  <td
                    key={month}
                    className="px-6 py-4 text-sm text-center text-gray-900"
                  >
                    {applicationsMatrix[month]?.applied || 0}
                  </td>
                ))}
                <td className="px-6 py-4 text-sm text-center text-gray-900 bg-blue-50">
                  {matrixTotals.applied}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Per Team Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Team Performance - {selectedTeamMonth}
          </h2>
          <div className="relative min-w-[160px]">
            <select
              value={selectedTeamMonth}
              onChange={(e) => setSelectedTeamMonth(e.target.value)}
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
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Approved (As Applied)
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Approved (Not As Applied)
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Availed
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Approval Rate
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Availment Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamData.map((team, index) => {
                const approvalRate =
                  team.applications > 0
                    ? (
                        ((team.approvedAsApplied + team.approvedNotAsApplied) /
                          team.applications) *
                        100
                      ).toFixed(0)
                    : 0;
                const availmentRate =
                  team.approvedAsApplied > 0
                    ? ((team.availed / team.approvedAsApplied) * 100).toFixed(0)
                    : 0;
                const isTopPerformer = parseFloat(approvalRate) >= 70;

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        
                        <div className="flex items-center gap-2">
                          {team.team}
                          {isTopPerformer && (
                            <Award className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-900">
                      {team.applications}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-900">
                      {team.approvedAsApplied}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-900">
                      {team.approvedNotAsApplied}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-900">
                      {team.availed}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span
                        className={`font-semibold ${parseFloat(approvalRate) >= 65 ? "text-green-600" : "text-red-600"}`}
                      >
                        {approvalRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span
                        className={`font-semibold ${parseFloat(availmentRate) >= 60 ? "text-green-600" : "text-red-600"}`}
                      >
                        {availmentRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="px-6 py-4 text-sm text-gray-900">TOTAL</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">
                  {teamTotals.applications}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">
                  {teamTotals.approvedAsApplied}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">
                  {teamTotals.approvedNotAsApplied}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">
                  {teamTotals.availed}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">
                  {teamTotalApprovalRate}%
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">
                  {teamTotalAvailmentRate}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Comparison - Approval Rate
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={teamComparisonApprovalData}>
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

              <Bar dataKey="rate" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Comparison - Availment Rate
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={teamComparisonAvailmentData}>
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

              <Bar dataKey="rate" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 3: Approval & Availment Rates */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Approval & Availment Rates (Target vs Actual)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Dec 2025
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Jan 2026
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Feb 2026
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider bg-blue-50">
                  YTD
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Approval Rate
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">
                  65%
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-semibold text-green-600">
                      67%
                    </span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: "67%" }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-semibold text-green-600">
                      69%
                    </span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: "69%" }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-semibold text-green-600">
                      68%
                    </span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center bg-blue-50">
                  <span className="text-sm font-bold text-green-600">68%</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Availment Rate
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">
                  60%
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-semibold text-red-600">
                      58%
                    </span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full"
                        style={{ width: "58%" }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-semibold text-red-600">
                      55%
                    </span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full"
                        style={{ width: "55%" }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-semibold text-red-600">
                      56%
                    </span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full"
                        style={{ width: "56%" }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center bg-blue-50">
                  <span className="text-sm font-bold text-red-600">56%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Approval Rate Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={approvalRateTrendData}>
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
                dataKey="target"
                stroke="#94A3B8"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Availment Rate Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={availmentRateTrendData}>
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
                dataKey="target"
                stroke="#94A3B8"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddApplicationDataModal onClose={() => setShowAddModal(false)} />
      )}
      {/* Edit Modal */}
      {showEditModal && (
        <EditApplicationsModal onClose={() => setShowEditModal(false)} />
      )}
    </div>
  );
};

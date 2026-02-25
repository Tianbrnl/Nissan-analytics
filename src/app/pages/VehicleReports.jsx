import React, { useState } from "react";
import { Plus, TrendingUp, TrendingDown, Edit2, FileDown } from "lucide-react";
import { useData } from "../context/DataContext";
import { EditVehicleReportModal } from "../components/modals/EditVehicleReportModal";
import { AddVehicleReportModal } from "../components/modals/AddVehicleReportModal";
import {
  exportVehicleSalesByModel,
  exportPaymentTerms,
  exportReservationsByTeam,
} from "../utils/exportToWord";

export const VehicleReports = () => {
  const { vehicleSalesByModel, paymentTermData, reservationByTeam } = useData();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentSection, setCurrentSection] = useState("vehicleSales");

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
    "Nissan Z",
    "Prem",
  ];
  const paymentTerms = ["Cash", "Financing", "BankPO"];
  const teams = ["NSR1 – Mike", "NSR2 – Jhoven", "NSR3 – Jayr"];

  // Calculate totals for Vehicle Sales by Model
  const modelTotals = models.reduce((acc, model) => {
    acc[model] = months.reduce((sum, month) => {
      const monthData = vehicleSalesByModel[month];
      return sum + (monthData?.[model] || 0);
    }, 0);
    return acc;
  }, {});

  const modelMonthTotals = months.map((month) => {
    const monthData = vehicleSalesByModel[month];
    return models.reduce((sum, model) => sum + (monthData?.[model] || 0), 0);
  });

  const modelGrandTotal = Object.values(modelTotals).reduce(
    (sum, val) => sum + val,
    0,
  );

  // Calculate totals for Payment Terms
  const paymentTermTotals = paymentTerms.reduce((acc, term) => {
    acc[term] = months.reduce((sum, month) => {
      return sum + (paymentTermData[month]?.[term] || 0);
    }, 0);
    return acc;
  }, {});

  const paymentMonthTotals = months.map((month) => {
    const monthData = paymentTermData[month];
    return paymentTerms.reduce(
      (sum, term) => sum + (monthData?.[term] || 0),
      0,
    );
  });

  const paymentGrandTotal = Object.values(paymentTermTotals).reduce(
    (sum, val) => sum + val,
    0,
  );

  // Calculate totals for Reservations by Team
  const teamTotals = teams.reduce((acc, team) => {
    acc[team] = months.reduce((sum, month) => {
      return sum + (reservationByTeam[month]?.[team] || 0);
    }, 0);
    return acc;
  }, {});

  const reservationMonthTotals = months.map((month) => {
    const monthData = reservationByTeam[month];
    return teams.reduce((sum, team) => sum + (monthData?.[team] || 0), 0);
  });

  const reservationGrandTotal = Object.values(teamTotals).reduce(
    (sum, val) => sum + val,
    0,
  );

  const handleEdit = (section) => {
    setCurrentSection(section);
    setShowEditModal(true);
  };

  const handleAdd = (section) => {
    setCurrentSection(section);
    setShowAddModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Vehicle & Reservation Reports
          </h1>
          <p className="text-gray-600">
            Monthly breakdown by model, payment terms, and team reservations
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() =>
              exportVehicleSalesByModel(vehicleSalesByModel, months, models)
            }
            className="flex items-center gap-2 px-3 py-1.5 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
          >
            <FileDown className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* SECTION 1: Vehicle Sales by Model */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Vehicle Sales by Model (Monthly)
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEdit("vehicleSales")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit data"
            >
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => handleAdd("vehicleSales")}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
            <button
              onClick={() =>
                exportVehicleSalesByModel(vehicleSalesByModel, months, models)
              }
              className="flex items-center gap-2 px-3 py-1.5 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="sticky left-0 z-20 bg-gray-50 px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  Model
                </th>
                {months.map((month) => (
                  <th
                    key={month}
                    className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap"
                  >
                    {month}
                  </th>
                ))}
                <th className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider bg-blue-50 border-l border-gray-200">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {models.map((model) => (
                <tr key={model} className="hover:bg-gray-50">
                  <td className="sticky left-0 z-10 bg-white px-4 md:px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                    {model}
                  </td>
                  {months.map((month) => {
                    const value = vehicleSalesByModel[month]?.[model] || 0;
                    const isEmpty = value === 0;
                    return (
                      <td
                        key={month}
                        className={`px-4 md:px-6 py-4 text-sm text-center ${isEmpty ? "text-gray-400" : "text-gray-900"}`}
                      >
                        {value}
                      </td>
                    );
                  })}
                  <td className="px-4 md:px-6 py-4 text-sm text-center font-bold text-gray-900 bg-blue-50 border-l border-gray-200">
                    {modelTotals[model]}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td className="sticky left-0 z-10 bg-gray-100 px-4 md:px-6 py-4 text-sm text-gray-900 border-r border-gray-200">
                  TOTAL
                </td>
                {months.map((month, index) => (
                  <td
                    key={month}
                    className="px-4 md:px-6 py-4 text-sm text-center text-gray-900"
                  >
                    {modelMonthTotals[index]}
                  </td>
                ))}
                <td className="px-4 md:px-6 py-4 text-sm text-center text-gray-900 bg-blue-100 border-l border-gray-200">
                  {modelGrandTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Payment Term */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Payment Term (Monthly)
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEdit("paymentTerm")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit data"
            >
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => handleAdd("paymentTerm")}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
            <button
              onClick={() => exportPaymentTerms(paymentTermData, months)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="sticky left-0 z-20 bg-gray-50 px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  Payment Term
                </th>
                {months.map((month) => (
                  <th
                    key={month}
                    className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap"
                  >
                    {month}
                  </th>
                ))}
                <th className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider bg-blue-50 border-l border-gray-200">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="sticky left-0 z-10 bg-white px-4 md:px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                  Cash
                </td>
                {months.map((month) => {
                  const value = paymentTermData[month]?.Cash || 0;
                  const isEmpty = value === 0;
                  return (
                    <td
                      key={month}
                      className={`px-4 md:px-6 py-4 text-sm text-center ${isEmpty ? "text-gray-400" : "text-gray-900"}`}
                    >
                      {value}
                    </td>
                  );
                })}
                <td className="px-4 md:px-6 py-4 text-sm text-center font-bold text-gray-900 bg-blue-50 border-l border-gray-200">
                  {paymentTermTotals.Cash}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="sticky left-0 z-10 bg-white px-4 md:px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                  Financing
                </td>
                {months.map((month) => {
                  const value = paymentTermData[month]?.Financing || 0;
                  const isEmpty = value === 0;
                  return (
                    <td
                      key={month}
                      className={`px-4 md:px-6 py-4 text-sm text-center ${isEmpty ? "text-gray-400" : "text-gray-900"}`}
                    >
                      {value}
                    </td>
                  );
                })}
                <td className="px-4 md:px-6 py-4 text-sm text-center font-bold text-gray-900 bg-blue-50 border-l border-gray-200">
                  {paymentTermTotals.Financing}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="sticky left-0 z-10 bg-white px-4 md:px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                  Bank PO
                </td>
                {months.map((month) => {
                  const value = paymentTermData[month]?.BankPO || 0;
                  const isEmpty = value === 0;
                  return (
                    <td
                      key={month}
                      className={`px-4 md:px-6 py-4 text-sm text-center ${isEmpty ? "text-gray-400" : "text-gray-900"}`}
                    >
                      {value}
                    </td>
                  );
                })}
                <td className="px-4 md:px-6 py-4 text-sm text-center font-bold text-gray-900 bg-blue-50 border-l border-gray-200">
                  {paymentTermTotals.BankPO}
                </td>
              </tr>
              <tr className="bg-gray-100 font-bold">
                <td className="sticky left-0 z-10 bg-gray-100 px-4 md:px-6 py-4 text-sm text-gray-900 border-r border-gray-200">
                  TOTAL
                </td>
                {months.map((month, index) => (
                  <td
                    key={month}
                    className="px-4 md:px-6 py-4 text-sm text-center text-gray-900"
                  >
                    {paymentMonthTotals[index]}
                  </td>
                ))}
                <td className="px-4 md:px-6 py-4 text-sm text-center text-gray-900 bg-blue-100 border-l border-gray-200">
                  {paymentGrandTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: Reservation by Team */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Reservation by Team (Monthly)
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEdit("reservation")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit data"
            >
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => handleAdd("reservation")}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
            <button
              onClick={() =>
                exportReservationsByTeam(reservationByTeam, months, teams)
              }
              className="flex items-center gap-2 px-3 py-1.5 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="sticky left-0 z-20 bg-gray-50 px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  Team
                </th>
                {months.map((month) => (
                  <th
                    key={month}
                    className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap"
                  >
                    {month}
                  </th>
                ))}
                <th className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider bg-blue-50 border-l border-gray-200">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teams.map((team) => {
                // Calculate growth from the most recent two months with data
                const monthsWithData = months.filter(
                  (m) => (reservationByTeam[m]?.[team] || 0) > 0,
                );
                const prevMonth = monthsWithData[monthsWithData.length - 2];
                const currentMonth = monthsWithData[monthsWithData.length - 1];
                const growth =
                  prevMonth &&
                  currentMonth &&
                  reservationByTeam[prevMonth]?.[team]
                    ? ((reservationByTeam[currentMonth][team] -
                        reservationByTeam[prevMonth][team]) /
                        reservationByTeam[prevMonth][team]) *
                      100
                    : 0;

                return (
                  <tr key={team} className="hover:bg-gray-50">
                    <td className="sticky left-0 z-10 bg-white px-4 md:px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {team.split(" – ")[0].replace("NSR", "N")}
                        </div>
                        <div className="flex items-center gap-2">
                          <span>{team}</span>
                          {growth !== 0 && (
                            <span
                              className={`text-xs flex items-center gap-1 ${growth > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {growth > 0 ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {Math.abs(growth).toFixed(0)}%
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    {months.map((month) => {
                      const value = reservationByTeam[month]?.[team] || 0;
                      const isEmpty = value === 0;
                      return (
                        <td
                          key={month}
                          className={`px-4 md:px-6 py-4 text-sm text-center ${isEmpty ? "text-gray-400" : "text-gray-900"}`}
                        >
                          {value}
                        </td>
                      );
                    })}
                    <td className="px-4 md:px-6 py-4 text-sm text-center font-bold text-gray-900 bg-blue-50 border-l border-gray-200">
                      {teamTotals[team]}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td className="sticky left-0 z-10 bg-gray-100 px-4 md:px-6 py-4 text-sm text-gray-900 border-r border-gray-200">
                  TOTAL
                </td>
                {months.map((month, index) => (
                  <td
                    key={month}
                    className="px-4 md:px-6 py-4 text-sm text-center text-gray-900"
                  >
                    {reservationMonthTotals[index]}
                  </td>
                ))}
                <td className="px-4 md:px-6 py-4 text-sm text-center text-gray-900 bg-blue-100 border-l border-gray-200">
                  {reservationGrandTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showEditModal && (
        <EditVehicleReportModal
          onClose={() => setShowEditModal(false)}
          section={currentSection}
        />
      )}
      {showAddModal && (
        <AddVehicleReportModal
          onClose={() => setShowAddModal(false)}
          section={currentSection}
        />
      )}
    </div>
  );
};

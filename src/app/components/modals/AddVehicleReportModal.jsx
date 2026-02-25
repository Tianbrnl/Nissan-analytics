import React, { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { useData } from "../../context/DataContext";

export const AddVehicleReportModal = ({ onClose, section }) => {
  const {
    vehicleSalesByModel,
    setVehicleSalesByModel,
    paymentTermData,
    setPaymentTermData,
    reservationByTeam,
    setReservationByTeam,
  } = useData();
  const [selectedMonth, setSelectedMonth] = useState("Apr 2026");
  const [showWarning, setShowWarning] = useState(false);
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

  // Initialize empty form data
  const getInitialData = () => {
    if (section === "vehicleSales") {
      return models.reduce((acc, model) => {
        acc[model] = 0;
        return acc;
      }, {});
    } else if (section === "paymentTerm") {
      return { Cash: 0, Financing: 0, BankPO: 0 };
    } else {
      return teams.reduce((acc, team) => {
        acc[team] = 0;
        return acc;
      }, {});
    }
  };

  const [formData, setFormData] = useState(getInitialData());

  const handleInputChange = (key, value) => {
    const numValue = parseInt(value) || 0;
    setFormData((prev) => ({ ...prev, [key]: numValue }));
  };

  const checkIfMonthHasData = () => {
    if (section === "vehicleSales") {
      const monthData = vehicleSalesByModel[selectedMonth];
      return monthData && Object.values(monthData).some((val) => val > 0);
    } else if (section === "paymentTerm") {
      const monthData = paymentTermData[selectedMonth];
      return (
        monthData &&
        (monthData.Cash > 0 || monthData.Financing > 0 || monthData.BankPO > 0)
      );
    } else {
      const monthData = reservationByTeam[selectedMonth];
      return monthData && Object.values(monthData).some((val) => val > 0);
    }
  };

  const handleSave = () => {
    // Check if month already has data
    if (checkIfMonthHasData()) {
      setShowWarning(true);
      return;
    }

    // Add new month data
    if (section === "vehicleSales") {
      setVehicleSalesByModel((prev) => ({
        ...prev,
        [selectedMonth]: formData,
      }));
    } else if (section === "paymentTerm") {
      setPaymentTermData((prev) => ({
        ...prev,
        [selectedMonth]: formData,
      }));
    } else {
      setReservationByTeam((prev) => ({
        ...prev,
        [selectedMonth]: formData,
      }));
    }
    onClose();
  };

  const getSectionTitle = () => {
    if (section === "vehicleSales") return "Vehicle Sales by Model";
    if (section === "paymentTerm") return "Payment Term";
    return "Reservation by Team";
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Add Monthly Data
              </h2>
              <p className="text-sm text-gray-600 mt-1">{getSectionTitle()}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Month Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {section === "vehicleSales" &&
                models.map((model) => (
                  <div
                    key={model}
                    className="flex items-center justify-between"
                  >
                    <label className="text-sm font-medium text-gray-700 w-1/3">
                      {model}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData[model]}
                      onChange={(e) => handleInputChange(model, e.target.value)}
                      className="w-2/3 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}

              {section === "paymentTerm" &&
                paymentTerms.map((term) => (
                  <div key={term} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 w-1/3">
                      {term === "BankPO" ? "Bank PO" : term}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData[term]}
                      onChange={(e) => handleInputChange(term, e.target.value)}
                      className="w-2/3 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}

              {section === "reservation" &&
                teams.map((team) => (
                  <div key={team} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 w-1/3">
                      {team}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData[team]}
                      onChange={(e) => handleInputChange(team, e.target.value)}
                      className="w-2/3 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add Data
            </button>
          </div>
        </div>
      </div>

      {/* Warning Dialog */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-yellow-100 p-2 rounded-lg flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Data Already Exists
                </h3>
                <p className="text-sm text-gray-600">
                  This month already contains data. Use "Edit" instead to modify
                  existing data.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button
                onClick={() => setShowWarning(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState } from "react";
import { X } from "lucide-react";
import { useData } from "../../context/DataContext";

export const AddVehicleSalesModal = ({ onClose }) => {
  const { vehicleSalesData, setVehicleSalesData } = useData();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthWarning, setMonthWarning] = useState("");

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

  const [teamInputs, setTeamInputs] = useState({
    NSR1: {
      Kicks: 0,
      E26: 0,
      N18: 0,
      Patrol: 0,
      D23: 0,
      Terra: 0,
      Livina: 0,
      NissanZ: 0,
      Prem: 0,
    },
    NSR2: {
      Kicks: 0,
      E26: 0,
      N18: 0,
      Patrol: 0,
      D23: 0,
      Terra: 0,
      Livina: 0,
      NissanZ: 0,
      Prem: 0,
    },
    NSR3: {
      Kicks: 0,
      E26: 0,
      N18: 0,
      Patrol: 0,
      D23: 0,
      Terra: 0,
      Livina: 0,
      NissanZ: 0,
      Prem: 0,
    },
  });

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

  // Check if month exists when selecting
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    if (vehicleSalesData[month] && vehicleSalesData[month].length > 0) {
      setMonthWarning(
        `This month already exists. Please use "Edit" to modify ${month}.`,
      );
    } else {
      setMonthWarning("");
    }
  };

  const handleInputChange = (team, model, value) => {
    setTeamInputs((prev) => ({
      ...prev,
      [team]: {
        ...prev[team],
        [model]: parseInt(value) || 0,
      },
    }));
  };

  const calculateTeamTotal = (team) => {
    return Object.values(teamInputs[team]).reduce((sum, val) => sum + val, 0);
  };

  const calculateOverallTotal = () => {
    return Object.values(teamInputs).reduce(
      (sum, team) =>
        sum + Object.values(team).reduce((teamSum, val) => teamSum + val, 0),
      0,
    );
  };

  const handleSave = () => {
    const newData = [
      {
        team: "NSR1 – Mike",
        avatar: "M",
        ...teamInputs.NSR1,
      },
      {
        team: "NSR2 – Jhoven",
        avatar: "J",
        ...teamInputs.NSR2,
      },
      {
        team: "NSR3 – Jayr",
        avatar: "JR",
        ...teamInputs.NSR3,
      },
    ];

    setVehicleSalesData({
      ...vehicleSalesData,
      [selectedMonth]: newData,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Add Vehicle Sales Per Group – {selectedMonth}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Month Selector */}
        <div className="px-6 py-4 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a month</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          {monthWarning && (
            <p className="text-sm text-red-500 mt-1">{monthWarning}</p>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* NSR1 - Mike */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                  M
                </div>
                NSR1 – Mike
              </h3>
              <div className="text-sm">
                <span className="text-gray-600">Total: </span>
                <span className="font-bold text-blue-600">
                  {calculateTeamTotal("NSR1")} units
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {models.map((model) => (
                <div key={model}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {model}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={teamInputs.NSR1[model]}
                    onChange={(e) =>
                      handleInputChange("NSR1", model, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* NSR2 - Jhoven */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                  J
                </div>
                NSR2 – Jhoven
              </h3>
              <div className="text-sm">
                <span className="text-gray-600">Total: </span>
                <span className="font-bold text-blue-600">
                  {calculateTeamTotal("NSR2")} units
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {models.map((model) => (
                <div key={model}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {model}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={teamInputs.NSR2[model]}
                    onChange={(e) =>
                      handleInputChange("NSR2", model, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* NSR3 - Jayr */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                  JR
                </div>
                NSR3 – Jayr
              </h3>
              <div className="text-sm">
                <span className="text-gray-600">Total: </span>
                <span className="font-bold text-blue-600">
                  {calculateTeamTotal("NSR3")} units
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {models.map((model) => (
                <div key={model}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {model}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={teamInputs.NSR3[model]}
                    onChange={(e) =>
                      handleInputChange("NSR3", model, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Live Preview */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Live Preview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">NSR1 Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {calculateTeamTotal("NSR1")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">NSR2 Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {calculateTeamTotal("NSR2")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">NSR3 Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {calculateTeamTotal("NSR3")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Overall Total</p>
                <p className="text-2xl font-bold text-blue-600">
                  {calculateOverallTotal()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

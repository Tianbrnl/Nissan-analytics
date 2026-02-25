import React, { useState } from "react";
import { X } from "lucide-react";
import { useData } from "../../context/DataContext";

export const AddApplicationDataModal = ({ onClose }) => {
  const { applicationData, setApplicationData } = useData();
  const [selectedMonth, setSelectedMonth] = useState("Dec 2025");

  const [teamInputs, setTeamInputs] = useState({
    NSR1: {
      applications: 0,
      approvedAsApplied: 0,
      approvedNotAsApplied: 0,
      availed: 0,
    },
    NSR2: {
      applications: 0,
      approvedAsApplied: 0,
      approvedNotAsApplied: 0,
      availed: 0,
    },
    NSR3: {
      applications: 0,
      approvedAsApplied: 0,
      approvedNotAsApplied: 0,
      availed: 0,
    },
  });

  const handleInputChange = (team, field, value) => {
    setTeamInputs((prev) => ({
      ...prev,
      [team]: {
        ...prev[team],
        [field]: parseInt(value) || 0,
      },
    }));
  };

  const calculateTotals = () => {
    const totalApplications = Object.values(teamInputs).reduce(
      (sum, team) => sum + team.applications,
      0,
    );
    const totalApproved = Object.values(teamInputs).reduce(
      (sum, team) => sum + team.approvedAsApplied + team.approvedNotAsApplied,
      0,
    );
    const totalApprovedAsApplied = Object.values(teamInputs).reduce(
      (sum, team) => sum + team.approvedAsApplied,
      0,
    );
    const totalAvailed = Object.values(teamInputs).reduce(
      (sum, team) => sum + team.availed,
      0,
    );

    const approvalRate =
      totalApplications > 0
        ? ((totalApproved / totalApplications) * 100).toFixed(0)
        : 0;
    const availmentRate =
      totalApprovedAsApplied > 0
        ? ((totalAvailed / totalApprovedAsApplied) * 100).toFixed(0)
        : 0;

    return {
      totalApplications,
      totalApproved,
      totalAvailed,
      approvalRate,
      availmentRate,
    };
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

    setApplicationData({
      ...applicationData,
      [selectedMonth]: newData,
    });

    onClose();
  };

  const totals = calculateTotals();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Add Applications Data – {selectedMonth}
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
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Dec 2025">December 2025</option>
            <option value="Jan 2026">January 2026</option>
            <option value="Feb 2026">February 2026</option>
            <option value="Feb 2026">March 2026</option>
            <option value="Feb 2026">April 2026</option>
            <option value="Feb 2026">May 2026</option>
            <option value="Feb 2026">June 2026</option>
            <option value="Feb 2026">July 2026</option>
            <option value="Feb 2026">August 2026</option>
            <option value="Feb 2026">September 2026</option>
            <option value="Feb 2026">October 2026</option>
            <option value="Feb 2026">November 2026</option>
            <option value="Feb 2026">December 2026</option>
          </select>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* NSR1 - Mike */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                M
              </div>
              NSR1 – Mike
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applications
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamInputs.NSR1.applications}
                  onChange={(e) =>
                    handleInputChange("NSR1", "applications", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approved (As Applied)
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamInputs.NSR1.approvedAsApplied}
                  onChange={(e) =>
                    handleInputChange(
                      "NSR1",
                      "approvedAsApplied",
                      e.target.value,
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approved (Not As Applied)
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamInputs.NSR1.approvedNotAsApplied}
                  onChange={(e) =>
                    handleInputChange(
                      "NSR1",
                      "approvedNotAsApplied",
                      e.target.value,
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availed
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamInputs.NSR1.availed}
                  onChange={(e) =>
                    handleInputChange("NSR1", "availed", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* NSR2 - Jhoven */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                J
              </div>
              NSR2 – Jhoven
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applications
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamInputs.NSR2.applications}
                  onChange={(e) =>
                    handleInputChange("NSR2", "applications", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approved (As Applied)
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamInputs.NSR2.approvedAsApplied}
                  onChange={(e) =>
                    handleInputChange(
                      "NSR2",
                      "approvedAsApplied",
                      e.target.value,
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approved (Not As Applied)
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamInputs.NSR2.approvedNotAsApplied}
                  onChange={(e) =>
                    handleInputChange(
                      "NSR2",
                      "approvedNotAsApplied",
                      e.target.value,
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availed
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamInputs.NSR2.availed}
                  onChange={(e) =>
                    handleInputChange("NSR2", "availed", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* NSR3 - Jayr */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                JR
              </div>
              NSR3 – Jayr
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applications
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamInputs.NSR3.applications}
                  onChange={(e) =>
                    handleInputChange("NSR3", "applications", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approved (As Applied)
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamInputs.NSR3.approvedAsApplied}
                  onChange={(e) =>
                    handleInputChange(
                      "NSR3",
                      "approvedAsApplied",
                      e.target.value,
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approved (Not As Applied)
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamInputs.NSR3.approvedNotAsApplied}
                  onChange={(e) =>
                    handleInputChange(
                      "NSR3",
                      "approvedNotAsApplied",
                      e.target.value,
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availed
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamInputs.NSR3.availed}
                  onChange={(e) =>
                    handleInputChange("NSR3", "availed", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Live Preview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totals.totalApplications}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totals.totalApproved}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Approval Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {totals.approvalRate}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Availment Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totals.availmentRate}%
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

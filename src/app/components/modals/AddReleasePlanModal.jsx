import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

export const AddReleasePlanModal = ({ onClose, onAdd, existingMonths }) => {
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

  const [selectedMonth, setSelectedMonth] = useState("");
  const [groups, setGroups] = useState([
    {
      group: "",
      avatar: "",
      actual: 0,
      additionalThisWeek: 0,
      additionalNextWeek: 0,
      target: 0,
    },
  ]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [monthWarning, setMonthWarning] = useState("");

  // Check if month exists when selecting
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    if (existingMonths.includes(month)) {
      setMonthWarning(
        `This month already contains data. Use "Edit" instead to modify ${month}.`,
      );
    } else {
      setMonthWarning("");
    }
  };

  const handleGroupChange = (index, field, value) => {
    if (field === "group") {
      const avatar = value.trim().split(" ")[0].substring(0, 2).toUpperCase();
      setGroups((prev) => {
        const newGroups = [...prev];
        newGroups[index] = { ...newGroups[index], group: value, avatar };
        return newGroups;
      });
    } else {
      const numValue = parseInt(value) || 0;
      setGroups((prev) => {
        const newGroups = [...prev];
        newGroups[index] = { ...newGroups[index], [field]: numValue };
        return newGroups;
      });
    }
  };

  const handleAddGroup = () => {
    setGroups((prev) => [
      ...prev,
      {
        group: "",
        avatar: "",
        actual: 0,
        additionalThisWeek: 0,
        additionalNextWeek: 0,
        target: 0,
      },
    ]);
  };

  const handleRemoveGroup = (index) => {
    if (groups.length === 1) {
      alert("You must have at least one group!");
      return;
    }
    setGroups((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Validation
    if (!selectedMonth) {
      alert("Please select a month");
      return;
    }

    // Check if month already exists
    if (existingMonths.includes(selectedMonth)) {
      alert(
        `${selectedMonth} already has data. Please use "Edit" to modify existing data, or select a different month.`,
      );
      return;
    }

    // Validate all groups have names
    if (groups.some((g) => !g.group.trim())) {
      alert("All groups must have a name");
      return;
    }

    // Check for duplicate group names
    const groupNames = groups.map((g) => g.group.trim());
    if (new Set(groupNames).size !== groupNames.length) {
      alert("Duplicate group names are not allowed");
      return;
    }

    onAdd(selectedMonth, groups);
    onClose();
  };

  // Calculate preview totals
  const totals = groups.reduce(
    (acc, group) => {
      const commitment =
        group.actual + group.additionalThisWeek + group.additionalNextWeek;
      const variance = commitment - group.actual;
      return {
        actual: acc.actual + group.actual,
        thisWeek: acc.thisWeek + group.additionalThisWeek,
        nextWeek: acc.nextWeek + group.additionalNextWeek,
        commitment: acc.commitment + commitment,
        variance: acc.variance + variance,
      };
    },
    { actual: 0, thisWeek: 0, nextWeek: 0, commitment: 0, variance: 0 },
  );

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Add Monthly Release Plan
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Create release plan data for a new month
              </p>
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
                Select Month <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => handleMonthChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
              >
                <option value="">-- Select Month --</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}{" "}
                    {existingMonths.includes(month) ? "(Already exists)" : ""}
                  </option>
                ))}
              </select>
              {monthWarning && (
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">{monthWarning}</p>
                </div>
              )}
            </div>

            {/* Add Group Button */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Groups</h3>
              <button
                onClick={handleAddGroup}
                className="flex items-center gap-2 px-3 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Group
              </button>
            </div>

            {/* Groups Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Group Name
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">
                      Actual
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">
                      This Week
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">
                      Next Week
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 bg-blue-50">
                      Commitment
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 bg-yellow-50">
                      Variance
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {groups.map((group, index) => {
                    const commitment =
                      group.actual +
                      group.additionalThisWeek +
                      group.additionalNextWeek;
                    const variance = commitment - group.actual;
                    return (
                      <tr key={index}>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={group.group}
                            onChange={(e) =>
                              handleGroupChange(index, "group", e.target.value)
                            }
                            placeholder="e.g., NSR1 – Mike"
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="0"
                            value={group.actual}
                            onChange={(e) =>
                              handleGroupChange(index, "actual", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="0"
                            value={group.additionalThisWeek}
                            onChange={(e) =>
                              handleGroupChange(
                                index,
                                "additionalThisWeek",
                                e.target.value,
                              )
                            }
                            className="w-full border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="0"
                            value={group.additionalNextWeek}
                            onChange={(e) =>
                              handleGroupChange(
                                index,
                                "additionalNextWeek",
                                e.target.value,
                              )
                            }
                            className="w-full border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                          />
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-gray-900 bg-blue-50">
                          {commitment}
                        </td>
                        <td
                          className={`px-4 py-3 text-center font-bold bg-yellow-50 ${variance >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {variance >= 0 ? "+" : ""}
                          {variance}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleRemoveGroup(index)}
                            className="p-1 hover:bg-red-50 rounded transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {/* Totals Row */}
                  <tr className="bg-gray-100 font-bold">
                    <td className="px-4 py-3 text-gray-900">TOTAL</td>
                    <td className="px-4 py-3 text-center text-gray-900">
                      {totals.actual}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-900">
                      {totals.thisWeek}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-900">
                      {totals.nextWeek}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-900 bg-blue-100">
                      {totals.commitment}
                    </td>
                    <td
                      className={`px-4 py-3 text-center bg-yellow-100 ${totals.variance >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {totals.variance >= 0 ? "+" : ""}
                      {totals.variance}
                    </td>
                    <td className="px-4 py-3"></td>
                  </tr>
                </tbody>
              </table>
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
              onClick={() => setShowConfirm(true)}
              disabled={!selectedMonth || monthWarning !== ""}
              className="px-4 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Monthly Data
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Confirm Add Data
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to create release plan data for{" "}
              <strong>{selectedMonth}</strong>?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
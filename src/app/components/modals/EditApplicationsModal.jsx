import React, { useState } from "react";
import { X, Plus, Trash2, Edit3 } from "lucide-react";
import { useData } from "../../context/DataContext";

export const EditApplicationsModal = ({ onClose }) => {
  const {
    applicationsMatrix,
    setApplicationsMatrix,
    applicationData,
    setApplicationData,
  } = useData();
  const [selectedMonth, setSelectedMonth] = useState("Feb 2026");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingName, setEditingName] = useState(null);
  const [newName, setNewName] = useState("");
  const [addingNew, setAddingNew] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
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

  // Matrix Data
  const [matrixData, setMatrixData] = useState({
    applied: applicationsMatrix[selectedMonth]?.applied || 0,
    approvedAsApplied:
      applicationsMatrix[selectedMonth]?.approvedAsApplied || 0,
    approvedNotAsApplied:
      applicationsMatrix[selectedMonth]?.approvedNotAsApplied || 0,
    availed: applicationsMatrix[selectedMonth]?.availed || 0,
  });

  // Team Performance Data
  const defaultTeams = [
    {
      team: "NSR1 – Mike",
      applications: 0,
      approvedAsApplied: 0,
      approvedNotAsApplied: 0,
      availed: 0,
    },
    {
      team: "NSR2 – Jhoven",
      applications: 0,
      approvedAsApplied: 0,
      approvedNotAsApplied: 0,
      availed: 0,
    },
    {
      team: "NSR3 – Jayr",
      applications: 0,
      approvedAsApplied: 0,
      approvedNotAsApplied: 0,
      availed: 0,
    },
  ];

  const [teamData, setTeamData] = useState(
    applicationData[selectedMonth] || defaultTeams,
  );

  // Update data when month changes
  React.useEffect(() => {
    setMatrixData({
      applied: applicationsMatrix[selectedMonth]?.applied || 0,
      approvedAsApplied:
        applicationsMatrix[selectedMonth]?.approvedAsApplied || 0,
      approvedNotAsApplied:
        applicationsMatrix[selectedMonth]?.approvedNotAsApplied || 0,
      availed: applicationsMatrix[selectedMonth]?.availed || 0,
    });
    setTeamData(applicationData[selectedMonth] || defaultTeams);
  }, [selectedMonth]);

  const handleMatrixChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    setMatrixData((prev) => ({ ...prev, [field]: numValue }));
  };

  const handleTeamChange = (index, field, value) => {
    const numValue = parseInt(value) || 0;
    setTeamData((prev) => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [field]: numValue };
      return newData;
    });
  };

  const handleAddTeam = () => {
    if (!newTeamName.trim()) return;
    if (teamData.some((t) => t.team === newTeamName.trim())) {
      alert("This team already exists!");
      return;
    }

    setTeamData((prev) => [
      ...prev,
      {
        team: newTeamName.trim(),
        applications: 0,
        approvedAsApplied: 0,
        approvedNotAsApplied: 0,
        availed: 0,
      },
    ]);
    setNewTeamName("");
    setAddingNew(false);
  };

  const handleDeleteTeam = (team) => {
    setTeamData((prev) => prev.filter((t) => t.team !== team));
    setDeleteConfirm(null);
  };

  const handleRenameTeam = (oldName) => {
    if (!newName.trim() || newName.trim() === oldName) {
      setEditingName(null);
      return;
    }

    if (teamData.some((t) => t.team === newName.trim())) {
      alert("This team name already exists!");
      return;
    }

    setTeamData((prev) =>
      prev.map((t) =>
        t.team === oldName ? { ...t, team: newName.trim() } : t,
      ),
    );

    setEditingName(null);
    setNewName("");
  };

  const handleSave = () => {
    // Update matrix data for selected month
    setApplicationsMatrix((prev) => ({
      ...prev,
      [selectedMonth]: matrixData,
    }));

    // Update team data for selected month
    setApplicationData((prev) => ({
      ...prev,
      [selectedMonth]: teamData,
    }));

    onClose();
  };

  const handleConfirmSave = () => {
    setShowConfirm(false);
    handleSave();
  };

  // Calculate totals and rates
  const totalApproved =
    matrixData.approvedAsApplied + matrixData.approvedNotAsApplied;
  const approvalRate =
    matrixData.applied > 0
      ? ((totalApproved / matrixData.applied) * 100).toFixed(0)
      : "0";
  const availmentRate =
    matrixData.approvedAsApplied > 0
      ? ((matrixData.availed / matrixData.approvedAsApplied) * 100).toFixed(0)
      : "0";

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Edit Applications & Approvals
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Update monthly data and team performance
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
                Select Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Matrix Data Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Application Matrix
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Applied
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={matrixData.applied}
                    onChange={(e) =>
                      handleMatrixChange("applied", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Approved (As Applied)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={matrixData.approvedAsApplied}
                    onChange={(e) =>
                      handleMatrixChange("approvedAsApplied", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Approved (Not As Applied)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={matrixData.approvedNotAsApplied}
                    onChange={(e) =>
                      handleMatrixChange("approvedNotAsApplied", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availed
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={matrixData.availed}
                    onChange={(e) =>
                      handleMatrixChange("availed", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                  />
                </div>
              </div>

              {/* Preview Rates */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Approval Rate:</span>
                    <span className="ml-2 font-bold text-gray-900">
                      {approvalRate}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Availment Rate:</span>
                    <span className="ml-2 font-bold text-gray-900">
                      {availmentRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Performance Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Team Performance
                </h3>
                {!addingNew && (
                  <button
                    onClick={() => setAddingNew(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Team
                  </button>
                )}
              </div>

              {/* Add New Team Form */}
              {addingNew && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Team Name
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      placeholder="Enter team name"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                      onKeyPress={(e) => e.key === "Enter" && handleAddTeam()}
                    />

                    <button
                      onClick={handleAddTeam}
                      className="px-4 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setAddingNew(false);
                        setNewTeamName("");
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Team Data Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Team
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">
                        Applications
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">
                        As Applied
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">
                        Not As Applied
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">
                        Availed
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {teamData.map((team, index) => (
                      <tr key={team.team}>
                        <td className="px-4 py-3">
                          {editingName === team.team ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  handleRenameTeam(team.team)
                                }
                                autoFocus
                              />

                              <button
                                onClick={() => handleRenameTeam(team.team)}
                                className="px-2 py-1 bg-[#C3002F] text-white rounded text-xs hover:bg-[#A00027]"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingName(null);
                                  setNewName("");
                                }}
                                className="px-2 py-1 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">
                                {team.team}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingName(team.team);
                                  setNewName(team.team);
                                }}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                title="Rename"
                              >
                                <Edit3 className="w-3 h-3 text-gray-500" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="0"
                            value={team.applications}
                            onChange={(e) =>
                              handleTeamChange(
                                index,
                                "applications",
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
                            value={team.approvedAsApplied}
                            onChange={(e) =>
                              handleTeamChange(
                                index,
                                "approvedAsApplied",
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
                            value={team.approvedNotAsApplied}
                            onChange={(e) =>
                              handleTeamChange(
                                index,
                                "approvedNotAsApplied",
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
                            value={team.availed}
                            onChange={(e) =>
                              handleTeamChange(index, "availed", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => setDeleteConfirm(team.team)}
                            className="p-1 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
              className="px-4 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete <strong>{deleteConfirm}</strong>?
              This will remove the team from the current month only.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTeam(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Confirm Update
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to update {selectedMonth} data? This will
              only affect this specific month and auto-recalculate all rates and
              charts.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
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

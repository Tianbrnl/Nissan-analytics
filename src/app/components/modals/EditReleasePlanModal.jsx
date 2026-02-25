import React, { useState } from "react";
import { X, Plus, Trash2, Edit3 } from "lucide-react";

export const EditReleasePlanModal = ({
  onClose,
  onSave,
  month,
  initialData,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingName, setEditingName] = useState(null);
  const [newName, setNewName] = useState("");
  const [addingNew, setAddingNew] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [teamData, setTeamData] = useState(initialData);

  const handleChange = (index, field, value) => {
    const numValue = parseInt(value) || 0;
    setTeamData((prev) => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [field]: numValue };
      return newData;
    });
  };

  const handleAddTeam = () => {
    if (!newGroupName.trim()) return;
    if (teamData.some((t) => t.group === newGroupName.trim())) {
      alert("This group already exists!");
      return;
    }

    const avatar = newGroupName
      .trim()
      .split(" ")[0]
      .substring(0, 2)
      .toUpperCase();
    setTeamData((prev) => [
      ...prev,
      {
        group: newGroupName.trim(),
        avatar,
        actual: 0,
        additionalThisWeek: 0,
        additionalNextWeek: 0,
        target: 0,
      },
    ]);
    setNewGroupName("");
    setAddingNew(false);
  };

  const handleDeleteTeam = (group) => {
    setTeamData((prev) => prev.filter((t) => t.group !== group));
    setDeleteConfirm(null);
  };

  const handleRenameTeam = (oldName) => {
    if (!newName.trim() || newName.trim() === oldName) {
      setEditingName(null);
      return;
    }

    if (teamData.some((t) => t.group === newName.trim())) {
      alert("This group name already exists!");
      return;
    }

    const avatar = newName.trim().split(" ")[0].substring(0, 2).toUpperCase();
    setTeamData((prev) =>
      prev.map((t) =>
        t.group === oldName ? { ...t, group: newName.trim(), avatar } : t,
      ),
    );

    setEditingName(null);
    setNewName("");
  };

  const handleSave = () => {
    onSave(month, teamData);
    onClose();
  };

  const handleConfirmSave = () => {
    setShowConfirm(false);
    handleSave();
  };

  // Calculate preview values
  const totals = teamData.reduce(
    (acc, team) => {
      const commitment =
        team.actual + team.additionalThisWeek + team.additionalNextWeek;
      const variance = commitment - team.actual;
      return {
        actual: acc.actual + team.actual,
        thisWeek: acc.thisWeek + team.additionalThisWeek,
        nextWeek: acc.nextWeek + team.additionalNextWeek,
        commitment: acc.commitment + commitment,
        variance: acc.variance + variance,
      };
    },
    { actual: 0, thisWeek: 0, nextWeek: 0, commitment: 0, variance: 0 },
  );

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Edit Release Plan
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Update release data for {month}
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
            {/* Add New Group Button */}
            {!addingNew && (
              <button
                onClick={() => setAddingNew(true)}
                className="mb-4 flex items-center gap-2 px-3 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Group
              </button>
            )}

            {/* Add New Group Form */}
            {addingNew && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Group Name
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Enter group name (e.g., NSR4 – John)"
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
                      setNewGroupName("");
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Data Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Group
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
                  {teamData.map((team, index) => {
                    const commitment =
                      team.actual +
                      team.additionalThisWeek +
                      team.additionalNextWeek;
                    const variance = commitment - team.actual;
                    return (
                      <tr key={team.group}>
                        <td className="px-4 py-3">
                          {editingName === team.group ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  handleRenameTeam(team.group)
                                }
                                autoFocus
                              />

                              <button
                                onClick={() => handleRenameTeam(team.group)}
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
                                {team.group}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingName(team.group);
                                  setNewName(team.group);
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
                            value={team.actual}
                            onChange={(e) =>
                              handleChange(index, "actual", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="0"
                            value={team.additionalThisWeek}
                            onChange={(e) =>
                              handleChange(
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
                            value={team.additionalNextWeek}
                            onChange={(e) =>
                              handleChange(
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
                            onClick={() => setDeleteConfirm(team.group)}
                            className="p-1 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
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
              This will remove the group from the current month only.
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
              Are you sure you want to update {month} data? All calculations
              will be auto-updated.
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

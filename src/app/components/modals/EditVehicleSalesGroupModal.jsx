import React, { useState } from "react";
import { X, Plus, Trash2, Edit3 } from "lucide-react";
import { useData } from "../../context/DataContext";

export const EditVehicleSalesGroupModal = ({ onClose, month }) => {
  const { vehicleSalesData, setVehicleSalesData } = useData();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingGroupName, setEditingGroupName] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [addingNewGroup, setAddingNewGroup] = useState(false);
  const [newGroupInput, setNewGroupInput] = useState("");
  const [editingModelName, setEditingModelName] = useState(null);
  const [newModelName, setNewModelName] = useState("");
  const [addingNewModel, setAddingNewModel] = useState(false);
  const [newModelInput, setNewModelInput] = useState("");

  // Get current data for the selected month
  const monthData = vehicleSalesData[month] || [];
  const [teamData, setTeamData] = useState(monthData);

  // Get all model names from the first team (assuming all teams have same models)
  const getModelNames = () => {
    if (teamData.length === 0) return [];
    const firstTeam = teamData[0];
    return Object.keys(firstTeam).filter(
      (key) => key !== "team" && key !== "avatar",
    );
  };

  const [models, setModels] = useState(getModelNames());

  const handleValueChange = (teamIndex, model, value) => {
    const numValue = parseInt(value) || 0;
    setTeamData((prev) => {
      const newData = [...prev];
      newData[teamIndex] = { ...newData[teamIndex], [model]: numValue };
      return newData;
    });
  };

  const handleAddGroup = () => {
    if (!newGroupInput.trim()) return;
    if (teamData.some((t) => t.team === newGroupInput.trim())) {
      alert("This group already exists!");
      return;
    }

    const avatar = newGroupInput
      .trim()
      .split(" ")[0]
      .substring(0, 2)
      .toUpperCase();
    const newGroup = { team: newGroupInput.trim(), avatar };
    // Initialize all models to 0
    models.forEach((model) => {
      newGroup[model] = 0;
    });

    setTeamData((prev) => [...prev, newGroup]);
    setNewGroupInput("");
    setAddingNewGroup(false);
  };

  const handleDeleteGroup = (teamName) => {
    setTeamData((prev) => prev.filter((t) => t.team !== teamName));
    setDeleteConfirm(null);
  };

  const handleRenameGroup = (oldName) => {
    if (!newGroupName.trim() || newGroupName.trim() === oldName) {
      setEditingGroupName(null);
      return;
    }

    if (teamData.some((t) => t.team === newGroupName.trim())) {
      alert("This group name already exists!");
      return;
    }

    const avatar = newGroupName
      .trim()
      .split(" ")[0]
      .substring(0, 2)
      .toUpperCase();
    setTeamData((prev) =>
      prev.map((t) =>
        t.team === oldName ? { ...t, team: newGroupName.trim(), avatar } : t,
      ),
    );

    setEditingGroupName(null);
    setNewGroupName("");
  };

  const handleAddModel = () => {
    if (!newModelInput.trim()) return;
    if (models.includes(newModelInput.trim())) {
      alert("This model already exists!");
      return;
    }

    // Add new model to all teams with value 0
    setModels((prev) => [...prev, newModelInput.trim()]);
    setTeamData((prev) =>
      prev.map((team) => ({
        ...team,
        [newModelInput.trim()]: 0,
      })),
    );

    setNewModelInput("");
    setAddingNewModel(false);
  };

  const handleRenameModel = (oldName) => {
    if (!newModelName.trim() || newModelName.trim() === oldName) {
      setEditingModelName(null);
      return;
    }

    if (models.includes(newModelName.trim())) {
      alert("This model name already exists!");
      return;
    }

    // Update model name in models array
    setModels((prev) =>
      prev.map((m) => (m === oldName ? newModelName.trim() : m)),
    );
    // Update model name in all teams
    setTeamData((prev) =>
      prev.map((team) => {
        const newTeam = { ...team };
        newTeam[newModelName.trim()] = newTeam[oldName];
        delete newTeam[oldName];
        return newTeam;
      }),
    );

    setEditingModelName(null);
    setNewModelName("");
  };

  const handleSave = () => {
    // Update ONLY the selected month atomically
    setVehicleSalesData((prev) => ({
      ...prev,
      [month]: teamData,
    }));
    onClose();
  };

  const handleConfirmSave = () => {
    setShowConfirm(false);
    handleSave();
  };

  // Calculate totals
  const calculateTeamTotal = (team) => {
    return models.reduce((sum, model) => sum + (team[model] || 0), 0);
  };

  const calculateModelTotal = (model) => {
    return teamData.reduce((sum, team) => sum + (team[model] || 0), 0);
  };

  const grandTotal = models.reduce(
    (sum, model) => sum + calculateModelTotal(model),
    0,
  );

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Edit Vehicle Sales Per Group
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Update sales data for {month}
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
            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-4">
              {!addingNewGroup && (
                <button
                  onClick={() => setAddingNewGroup(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add New Group
                </button>
              )}
              {!addingNewModel && (
                <button
                  onClick={() => setAddingNewModel(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add New Model
                </button>
              )}
            </div>

            {/* Add New Group Form */}
            {addingNewGroup && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Group Name
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGroupInput}
                    onChange={(e) => setNewGroupInput(e.target.value)}
                    placeholder="e.g., NSR4 – John"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                    onKeyPress={(e) => e.key === "Enter" && handleAddGroup()}
                  />

                  <button
                    onClick={handleAddGroup}
                    className="px-4 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setAddingNewGroup(false);
                      setNewGroupInput("");
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Add New Model Form */}
            {addingNewModel && (
              <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Model Name
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newModelInput}
                    onChange={(e) => setNewModelInput(e.target.value)}
                    placeholder="e.g., Altima"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === "Enter" && handleAddModel()}
                  />

                  <button
                    onClick={handleAddModel}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setAddingNewModel(false);
                      setNewModelInput("");
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Data Table */}
            <div className="border border-gray-200 rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 sticky left-0 bg-gray-50 z-10">
                      Group
                    </th>
                    {models.map((model) => (
                      <th
                        key={model}
                        className="px-4 py-3 text-center font-semibold text-gray-700"
                      >
                        {editingModelName === model ? (
                          <div className="flex items-center justify-center gap-1">
                            <input
                              type="text"
                              value={newModelName}
                              onChange={(e) => setNewModelName(e.target.value)}
                              className="w-24 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleRenameModel(model)
                              }
                              autoFocus
                            />

                            <button
                              onClick={() => handleRenameModel(model)}
                              className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => {
                                setEditingModelName(null);
                                setNewModelName("");
                              }}
                              className="px-2 py-1 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
                            >
                              ✗
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <span>{model}</span>
                            <button
                              onClick={() => {
                                setEditingModelName(model);
                                setNewModelName(model);
                              }}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                              title="Rename model"
                            >
                              <Edit3 className="w-3 h-3 text-gray-500" />
                            </button>
                          </div>
                        )}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 bg-blue-50">
                      Total
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teamData.map((team, index) => (
                    <tr key={team.team}>
                      <td className="px-4 py-3 sticky left-0 bg-white z-10">
                        {editingGroupName === team.team ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={newGroupName}
                              onChange={(e) => setNewGroupName(e.target.value)}
                              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                handleRenameGroup(team.team)
                              }
                              autoFocus
                            />

                            <button
                              onClick={() => handleRenameGroup(team.team)}
                              className="px-2 py-1 bg-[#C3002F] text-white rounded text-xs hover:bg-[#A00027]"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingGroupName(null);
                                setNewGroupName("");
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
                                setEditingGroupName(team.team);
                                setNewGroupName(team.team);
                              }}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                              title="Rename"
                            >
                              <Edit3 className="w-3 h-3 text-gray-500" />
                            </button>
                          </div>
                        )}
                      </td>
                      {models.map((model) => (
                        <td key={model} className="px-4 py-3">
                          <input
                            type="number"
                            min="0"
                            value={team[model] || 0}
                            onChange={(e) =>
                              handleValueChange(index, model, e.target.value)
                            }
                            className="w-full border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                          />
                        </td>
                      ))}
                      <td className="px-4 py-3 text-center font-bold text-gray-900 bg-blue-50">
                        {calculateTeamTotal(team)}
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
                  {/* Totals Row */}
                  <tr className="bg-gray-100 font-bold">
                    <td className="px-4 py-3 text-gray-900 sticky left-0 bg-gray-100 z-10">
                      TOTAL
                    </td>
                    {models.map((model) => (
                      <td
                        key={model}
                        className="px-4 py-3 text-center text-gray-900"
                      >
                        {calculateModelTotal(model)}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center text-gray-900 bg-blue-100">
                      {grandTotal}
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
              This will remove the group from {month} only.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteGroup(deleteConfirm)}
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
              Are you sure you want to update {month} data? This will only
              affect {month} and auto-recalculate all totals.
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

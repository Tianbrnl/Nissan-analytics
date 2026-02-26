import React, { useState } from "react";
import { X, Plus, Trash2, Edit3 } from "lucide-react";
import { useData } from "../../context/DataContext";

export const EditVehicleReportModal = ({ onClose, section }) => {
  const {
    vehicleSalesByModel,
    setVehicleSalesByModel,
    paymentTermData,
    setPaymentTermData,
    reservationByTeam,
    setReservationByTeam,
  } = useData();
  const [selectedMonth, setSelectedMonth] = useState("Feb 2026");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingName, setEditingName] = useState(null);
  const [newName, setNewName] = useState("");
  const [addingNew, setAddingNew] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const defaultModels = [
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
  const defaultTeams = ["NSR1 – Mike", "NSR2 – Jhoven", "NSR3 – Jayr"];
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

  // Get current items (models or teams)
  const getCurrentItems = () => {
    if (section === "vehicleSales") {
      const monthData = vehicleSalesByModel[selectedMonth] || {};
      return Object.keys(monthData).length > 0
        ? Object.keys(monthData)
        : defaultModels;
    } else if (section === "reservation") {
      const monthData = reservationByTeam[selectedMonth] || {};
      return Object.keys(monthData).length > 0
        ? Object.keys(monthData)
        : defaultTeams;
    }
    return paymentTerms;
  };

  const [items, setItems] = useState(getCurrentItems());

  // Initialize form data based on section
  const getInitialData = () => {
    if (section === "vehicleSales") {
      const monthData = vehicleSalesByModel[selectedMonth] || {};
      return items.reduce((acc, model) => {
        acc[model] = monthData[model] || 0;
        return acc;
      }, {});
    } else if (section === "paymentTerm") {
      const monthData = paymentTermData[selectedMonth] || {};
      return {
        Cash: monthData.Cash || 0,
        Financing: monthData.Financing || 0,
        BankPO: monthData.BankPO || 0,
      };
    } else {
      const monthData = reservationByTeam[selectedMonth] || {};
      return items.reduce((acc, team) => {
        acc[team] = monthData[team] || 0;
        return acc;
      }, {});
    }
  };

  const [formData, setFormData] = useState(getInitialData());

  // Update form data when month changes
  React.useEffect(() => {
    const newItems = getCurrentItems();
    setItems(newItems);
    setFormData(getInitialData());
  }, [selectedMonth]);

  const handleInputChange = (key, value) => {
    const numValue = parseInt(value) || 0;
    setFormData((prev) => ({ ...prev, [key]: numValue }));
  };

  const handleAddNew = () => {
    if (!newItemName.trim()) return;
    if (items.includes(newItemName.trim())) {
      alert("This item already exists!");
      return;
    }

    setItems((prev) => [...prev, newItemName.trim()]);
    setFormData((prev) => ({ ...prev, [newItemName.trim()]: 0 }));
    setNewItemName("");
    setAddingNew(false);
  };

  const handleDelete = (item) => {
    setItems((prev) => prev.filter((i) => i !== item));
    setFormData((prev) => {
      const newData = { ...prev };
      delete newData[item];
      return newData;
    });
    setDeleteConfirm(null);
  };

  const handleRename = (oldName) => {
    if (!newName.trim() || newName.trim() === oldName) {
      setEditingName(null);
      return;
    }

    if (items.includes(newName.trim())) {
      alert("This name already exists!");
      return;
    }

    // Update items array
    setItems((prev) =>
      prev.map((item) => (item === oldName ? newName.trim() : item)),
    );
    // Update form data
    setFormData((prev) => {
      const newData = { ...prev };
      newData[newName.trim()] = newData[oldName];
      delete newData[oldName];
      return newData;
    });

    setEditingName(null);
    setNewName("");
  };

  const handleSave = () => {
    // Update ONLY the selected month atomically
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

  const handleConfirmSave = () => {
    setShowConfirm(false);
    handleSave();
  };

  const getSectionTitle = () => {
    if (section === "vehicleSales") return "Vehicle Sales by Model";
    if (section === "paymentTerm") return "Payment Term";
    return "Reservation by Team";
  };

  const canEdit = section !== "paymentTerm"; // Payment terms are fixed

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Edit Monthly Data
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Add New Item Button */}
            {canEdit && !addingNew && (
              <button
                onClick={() => setAddingNew(true)}
                className="mb-4 flex items-center gap-2 px-3 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New {section === "vehicleSales" ? "Model" : "Team"}
              </button>
            )}

            {/* Add New Item Form */}
            {addingNew && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New {section === "vehicleSales" ? "Model" : "Team"} Name
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder={`Enter ${section === "vehicleSales" ? "model" : "team"} name`}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                    onKeyPress={(e) => e.key === "Enter" && handleAddNew()}
                  />

                  <button
                    onClick={handleAddNew}
                    className="px-4 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setAddingNew(false);
                      setNewItemName("");
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  {editingName === item ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleRename(item)
                        }
                        autoFocus
                      />

                      <button
                        onClick={() => handleRename(item)}
                        className="px-3 py-2 bg-[#C3002F] text-white rounded-lg text-sm hover:bg-[#A00027]"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingName(null);
                          setNewName("");
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <label className="text-sm font-medium text-gray-700 w-1/3 flex items-center gap-2">
                        {section === "paymentTerm" && item === "BankPO"
                          ? "Bank PO"
                          : item}
                        {canEdit && (
                          <button
                            onClick={() => {
                              setEditingName(item);
                              setNewName(item);
                            }}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Rename"
                          >
                            <Edit3 className="w-3 h-3 text-gray-500" />
                          </button>
                        )}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData[item] || 0}
                        onChange={(e) =>
                          handleInputChange(item, e.target.value)
                        }
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                      />

                      {canEdit && (
                        <button
                          onClick={() => setDeleteConfirm(item)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      )}
                    </>
                  )}
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
              This will remove it from the current month only.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
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
              only affect this specific month.
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

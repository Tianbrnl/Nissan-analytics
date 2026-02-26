import React, { useState } from "react";
import { X } from "lucide-react";

export const AddPipelineEntryModal = ({ onClose, onAdd }) => {
  const [showConfirm, setShowConfirm] = useState(false);
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

  const [formData, setFormData] = useState({
    closed: "",
    targetRelease: "",
    variantUnit: "",
    color: "",
    csNumber: "",
    transaction: "Cash",
    bank: "",
    client: "",
    grm: "",
    status: "Sold",
    remarks: "",
    monthStart: "Dec 2025",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validation
    if (
      !formData.closed ||
      !formData.targetRelease ||
      !formData.variantUnit ||
      !formData.client ||
      !formData.grm ||
      !formData.csNumber
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // If financing or bank PO, bank is required
    if (
      (formData.transaction === "Financing" ||
        formData.transaction === "Bank PO") &&
      !formData.bank
    ) {
      alert("Bank name is required for Financing and Bank PO transactions");
      return;
    }

    const newEntry = {
      ...formData,
      id: Date.now().toString(),
    };

    onAdd(newEntry);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Add Pipeline Entry
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Enter all transaction details
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Closed Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Closed Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.closed}
                  onChange={(e) => handleChange("closed", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                />
              </div>

              {/* Target Release Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Release Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.targetRelease}
                  onChange={(e) =>
                    handleChange("targetRelease", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                />
              </div>

              {/* Variant Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variant Unit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.variantUnit}
                  onChange={(e) => handleChange("variantUnit", e.target.value)}
                  placeholder="e.g., Nissan Patrol"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleChange("model", e.target.value)}
                  placeholder="e.g., VL 4x4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => handleChange("color", e.target.value)}
                  placeholder="e.g., Pearl White"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                />
              </div>

              {/* CS Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CS Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.csNumber}
                  onChange={(e) => handleChange("csNumber", e.target.value)}
                  placeholder="e.g., CS-2026-001"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                />
              </div>

              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.transaction}
                  onChange={(e) => handleChange("transaction", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank PO">Bank PO</option>
                  <option value="Financing">Financing</option>
                </select>
              </div>

              {/* Bank (conditionally required) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank{" "}
                  {(formData.transaction === "Financing" ||
                    formData.transaction === "Bank PO") && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <input
                  type="text"
                  value={formData.bank}
                  onChange={(e) => handleChange("bank", e.target.value)}
                  placeholder={
                    formData.transaction === "Cash"
                      ? "N/A for Cash"
                      : "e.g., BDO, BPI"
                  }
                  disabled={formData.transaction === "Cash"}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F] disabled:bg-gray-100"
                />
              </div>

              {/* Client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => handleChange("client", e.target.value)}
                  placeholder="Client name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                />
              </div>

              {/* GRM */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GRM <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.grm}
                  onChange={(e) => handleChange("grm", e.target.value)}
                  placeholder="e.g., Mike, Jhoven"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                >
                  <option value="Sold">Sold</option>
                  <option value="For Release">For Release</option>
                  <option value="w/ Payment">w/ Payment</option>
                  <option value="For Bank Approval">For Bank Approval</option>
                </select>
              </div>

              {/* Month Start */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Month Start <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.monthStart}
                  onChange={(e) => handleChange("monthStart", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Remarks - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => handleChange("remarks", e.target.value)}
                  placeholder="Additional notes or comments"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F] resize-none"
                />
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
              Add Entry
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Confirm Add Entry
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to add this pipeline entry?
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

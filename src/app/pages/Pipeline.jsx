import React, { useState } from "react";
import { Plus, Edit2, Search, FileDown, Trash2 } from "lucide-react";
import { exportPipeline } from "../utils/exportToWord";
import { AddPipelineEntryModal } from "../components/modals/AddPipelineEntryModal";
import { EditPipelineEntryModal } from "../components/modals/EditPipelineEntryModal";

export const Pipeline = () => {
  const [entries, setEntries] = useState([
    {
      id: "1",
      closed: "2026-01-15",
      targetRelease: "2026-02-01",
      variantUnit: "Nissan Patrol",
      color: "Pearl White",
      csNumber: "CS-2026-001",
      transaction: "Financing",
      bank: "BDO",
      client: "John Doe",
      grm: "Mike",
      status: "For Release",
      remarks: "Pending documents",
      monthStart: "Jan 2026",
    },
    {
      id: "2",
      closed: "2026-01-20",
      targetRelease: "2026-02-10",
      variantUnit: "Nissan Kicks",
      color: "Midnight Black",
      csNumber: "CS-2026-002",
      transaction: "Cash",
      bank: "",
      client: "Jane Smith",
      grm: "Jhoven",
      status: "Sold",
      remarks: "Complete",
      monthStart: "Jan 2026",
    },
    {
      id: "3",
      closed: "2026-02-05",
      targetRelease: "2026-02-20",
      variantUnit: "Nissan Terra",
      color: "Silver Metallic",
      csNumber: "CS-2026-003",
      transaction: "Bank PO",
      bank: "BPI",
      client: "Mark Johnson",
      grm: "Jayr",
      status: "For Bank Approval",
      remarks: "Awaiting bank response",
      monthStart: "Feb 2026",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter entries based on search
  const filteredEntries = entries.filter(
    (entry) =>
      entry.csNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.variantUnit.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Sold":
        return "bg-green-100 text-green-700";
      case "For Release":
        return "bg-blue-100 text-blue-700";
      case "w/ Payment":
        return "bg-yellow-100 text-yellow-700";
      case "For Bank Approval":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
          <p className="text-gray-600 mt-1">
            Operational transaction tracking and management
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportPipeline(entries)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
          >
            <FileDown className="w-4 h-4" />
            Export to Word
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Entry
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by CS Number, Client, or Variant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]"
          />
        </div>
      </div>

      {/* Pipeline Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F6F8]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  Closed
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  Target Release
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  Variant Unit
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  Color
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  CS Number
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  Transaction
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  Bank
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  GRM
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  Remarks
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  Month Start
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {new Date(entry.closed).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {new Date(entry.targetRelease).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {entry.variantUnit}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {entry.color}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {entry.csNumber}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {entry.transaction}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {entry.bank || "-"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {entry.client}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {entry.grm}
                  </td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {entry.remarks}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {entry.monthStart}
                  </td>
                  <td className="px-4 py-4 text-sm text-center whitespace-nowrap">
                    <button
                      onClick={() => setEditingEntry(entry)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit entry"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => {
                        setEntries(entries.filter((e) => e.id !== entry.id));
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No entries found</p>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Entries</p>
          <h3 className="text-3xl font-bold text-gray-900">{entries.length}</h3>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Sold</p>
          <h3 className="text-3xl font-bold text-green-600">
            {entries.filter((e) => e.status === "Sold").length}
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">For Release</p>
          <h3 className="text-3xl font-bold text-blue-600">
            {entries.filter((e) => e.status === "For Release").length}
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Bank Approval</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {entries.filter((e) => e.status === "For Bank Approval").length}
          </h3>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddPipelineEntryModal
          onClose={() => setShowAddModal(false)}
          onAdd={(entry) => {
            setEntries([...entries, entry]);
            setShowAddModal(false);
          }}
        />
      )}

      {editingEntry && (
        <EditPipelineEntryModal
          onClose={() => setEditingEntry(null)}
          onSave={(updatedEntry) => {
            setEntries(
              entries.map((e) => (e.id === updatedEntry.id ? updatedEntry : e)),
            );
            setEditingEntry(null);
          }}
          entry={editingEntry}
        />
      )}
    </div>
  );
};

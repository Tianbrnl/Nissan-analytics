import React, { useState } from "react"
import { X } from "lucide-react"
import { useData } from "../../context/DataContext"

export const EditTeamModal = ({ team, onClose, onSuccess }) => {
  const { updateTeam, teams } = useData()
  const [formData, setFormData] = useState({
    code: team.code,
    leader: team.leader
  })
  const [errors, setErrors] = useState({})

  const generateAvatar = name => {
    if (!name) return ""
    const words = name.trim().split(" ")
    if (words.length === 1) {
      return name.substring(0, 2).toUpperCase()
    }
    return words
      .map(w => w[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.code.trim()) {
      newErrors.code = "Team code is required"
    } else if (
      teams.some(
        t =>
          t.id !== team.id &&
          t.code.toLowerCase() === formData.code.trim().toLowerCase()
      )
    ) {
      newErrors.code = "Team code already exists"
    }

    if (!formData.leader.trim()) {
      newErrors.leader = "Leader name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!validate()) return

    const updatedTeam = {
      ...team,
      code: formData.code.trim(),
      leader: formData.leader.trim(),
      avatar: generateAvatar(formData.leader.trim())
    }

    updateTeam(updatedTeam)
    onSuccess()
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Edit Team</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Team Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Code <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={e => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g., NSR1, NSR2"
              className={`w-full border ${
                errors.code ? "border-red-300" : "border-gray-300"
              } rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]`}
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-600">{errors.code}</p>
            )}
          </div>

          {/* Leader Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Leader / GRM Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.leader}
              onChange={e =>
                setFormData({ ...formData, leader: e.target.value })
              }
              placeholder="e.g., Mike, Jhoven"
              className={`w-full border ${
                errors.leader ? "border-red-300" : "border-gray-300"
              } rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F]`}
            />
            {errors.leader && (
              <p className="mt-1 text-sm text-red-600">{errors.leader}</p>
            )}
          </div>

          {/* Preview */}
          {formData.code && formData.leader && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-medium text-gray-600 mb-2">Preview</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C3002F] flex items-center justify-center text-white font-semibold">
                  {generateAvatar(formData.leader)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {formData.code}
                  </p>
                  <p className="text-xs text-gray-600">
                    {formData.code} – {formData.leader}
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#C3002F] text-white rounded-lg text-sm font-medium hover:bg-[#A00027] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

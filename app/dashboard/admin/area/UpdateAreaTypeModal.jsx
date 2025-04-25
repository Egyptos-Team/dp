import React, { useState } from "react";
import axios from "axios";

const UpdateAreaTypeModal = ({ show, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: ""
  });
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name } = formData;
    if (!id || !name) {
      return alert("Please enter both ID and Name.");
    }
    try {
      const res = await axios.put(
        `https://egyptos.runasp.net/api/AreaTypes/Update/${id}`,
        { id, name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      if (res.status === 200 || res.status === 204) {
        onUpdated();
        onClose();
      }  else {
        console.error("Unexpected status:", res.status, res.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("No response:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[10000]">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm relative text-black">
        <button
          className="absolute top-2 right-3 text-2xl font-bold text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Update Area Type</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Type ID</label>
            <input
              type="number"
              name="id"
              value={formData.id}
              onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
              placeholder="Enter Area Type ID"
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter new name"
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Type
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAreaTypeModal;

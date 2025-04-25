import React, { useState } from "react";
import axios from "axios";

const DeleteAreaModal = ({ show, onClose, onDeleted }) => {
  const [areaId, setAreaId] = useState("");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI";

  const handleDelete = async () => {
    if (!areaId) return alert("Please enter an Area ID to delete.");
    try {
      const res = await axios.delete(
        `https://egyptos.runasp.net/api/Areas/Delete/${areaId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (res.status === 200 || res.status === 204) {
        onDeleted && onDeleted();
        onClose();
      } else {
        console.error("Unexpected status:", res.status, res.data);
        alert(`Unexpected response: ${res.status}`);
      }
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("Request error - no response:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[10000]">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm relative text-black">
        <button
          className="absolute top-2 right-3 text-2xl font-bold text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-red-900">Delete Area</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-red-800">Area ID</label>
            <input
              type="number"
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
              placeholder="Enter Area ID"
              className="w-full border rounded px-3 py-2 mb-3 text-red-500"
              required
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Area
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAreaModal;

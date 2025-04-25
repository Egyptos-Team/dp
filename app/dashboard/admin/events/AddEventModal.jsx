import { useState } from "react";
export default function AddEventModal({ show, onClose, onAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eventTypeId: "",
  });
  const handleSubmit = async () => {
    try {
      const response = await fetch("https://egyptos.runasp.net/api/Event/Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          eventTypeId: parseInt(formData.eventTypeId),
        }),
      });

      if (response.ok) {
        const newEvent = await response.json();
        onAdded(newEvent); 
        onClose();     // غلق المودال
        // ريفريش البيانات
      } else {
        const err = await response.json();
      }
    } catch (err) {
      console.error("🔥 Error:", err);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-800">Add New Event</h2>
        <input
          type="text"
          placeholder="Event Name"
          className="w-full p-2 mb-3 border rounded text-red-600"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 mb-3 border rounded text-red-600"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Event Type ID"
          className="w-full p-2 mb-3 border rounded text-red-600"
          value={formData.eventTypeId}
          onChange={(e) => setFormData({ ...formData, eventTypeId: e.target.value })}
        />
        <div className="flex justify-between">
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Add Event
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

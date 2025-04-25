import React, { useState,useEffect } from "react";
import axios from "axios";

const EditAreaModal = ({ show, onClose, onUpdated, area }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    areaTypeId: "",
    description: "",
    latitude: "",
    longitude: "",
    location: "",
    ImageUrl: null,
    Images: []
  });
  
  useEffect(() => {
    if (area) {
      setFormData({
        id: area.id || "",
        name: area.name || "",
        address: area.address || "",
        areaTypeId: area.areaTypeId || "",
        description: area.description || "",
        latitude: area.latitude || "",
        longitude: area.longitude || "",
        location: area.location || "",
        ImageUrl: null,
        Images: []
      });
    }
  }, [area]);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI";

  const handleSubmit = async () => {
    try {
      const payload = new FormData();
      payload.append("id", area.id);
      payload.append("name", formData.name);
      payload.append("address", formData.address);
      payload.append("areaTypeId", formData.areaTypeId);
      payload.append("description", formData.description);
      payload.append("latitude", formData.latitude);
      payload.append("longitude", formData.longitude);
      payload.append("location", formData.location);
      if (formData.ImageUrl) payload.append("ImageUrl", formData.ImageUrl);
      formData.Images.forEach((img) => payload.append("AreaImages", img));      
      
      const res = await axios.put(
        `https://egyptos.runasp.net/api/Areas/Update/${area.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
  
      if (res.status >= 200 && res.status < 300) {
        onUpdated && onUpdated();
        onClose();
      }
       else {
        console.error("Unexpected response status:", res.status, res.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("Request error - no response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };
  
  if (!show) return null;
  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Address", name: "address", type: "text" },
    { label: "Area Type ID", name: "areaTypeId", type: "number" },
    { label: "Description", name: "description", type: "text" },
    { label: "Latitude", name: "latitude", type: "text" },
    { label: "Longitude", name: "longitude", type: "text" },
    { label: "Location", name: "location", type: "text" }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[10000]">
      <div className="bg-white p-6 rounded-lg w-full sm:max-w-md relative text-black overflow-y-auto max-h-[90vh]">
        <button className="absolute top-2 right-3 text-3xl font-bold text-gray-700" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold mb-4">Edit Area</h2>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {fields.map(({ label, name, type }) => (
            <div key={name}>
              <label className="block mb-1 font-semibold">{label}</label>
              <input
                type={type}
                name={name}
                placeholder={label}
                value={formData[name]}
                className="w-full border p-2 rounded"
                onChange={(e) => setFormData((prev) => ({ ...prev, [name]: e.target.value }))}
                required
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 font-semibold">ImageUrl (Single Image)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded"
              onChange={(e) => setFormData((prev) => ({ ...prev, ImageUrl: e.target.files[0] }))}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Images (Multiple)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full border p-2 rounded"
              onChange={(e) => setFormData((prev) => ({ ...prev, Images: Array.from(e.target.files) }))}
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update Area
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAreaModal;

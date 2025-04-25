"use client"
import React, { useState } from "react";
import axios from "axios";
const AddAreaModal = ({ isOpen, onClose, fetchAreas, token }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    address: "",
    latitude: "",
    longitude: "",
    areaTypeId: "",
  });
  const [imageUrl, setImageUrl] = useState(null); // صورة واحدة
  const [areaImages, setAreaImages] = useState([]); // مجموعة صور
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.files[0]);
  };
  const handleAreaImagesChange = (e) => {
    setAreaImages([...e.target.files]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Name", formData.name);
    data.append("Description", formData.description);
    data.append("Location", formData.location);
    data.append("Address", formData.address);
    data.append("Latitude", formData.latitude);
    data.append("Longitude", formData.longitude);
    data.append("AreaTypeId", formData.areaTypeId);  
    if (imageUrl) data.append("ImageUrl", imageUrl);
    areaImages.forEach((img) => data.append("AreaImages", img));
    for (let [k, v] of data.entries()) {
      console.log(k, v);
    }
    try {
      const res = await axios.post(
        "https://egyptos.runasp.net/api/Areas/Create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("تمت الإضافة بنجاح ✅", res.data);
      fetchAreas();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const msg = err.response?.data || err.message;
        if (status === 409) {
        } else {
        }
      } else {
      }
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4 text-black"> Add New Area</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* نصوص */}
          <input type="text" name="name" onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded text-red-700" required />
          <input type="text" name="description" onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded text-red-700" required />
          <input type="text" name="location" onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded text-red-700" required />
          <input type="text" name="address" onChange={handleChange} placeholder="Address" className="w-full border p-2 rounded text-red-700" required />
          <input type="number" name="latitude" onChange={handleChange} placeholder="Latitude" className="w-full border p-2 rounded text-red-700" required />
          <input type="number" name="longitude" onChange={handleChange} placeholder="Longitude" className="w-full border p-2 rounded text-red-700" required />
          <input type="number" name="areaTypeId" onChange={handleChange} placeholder="Area Type ID" className="w-full border p-2 rounded text-red-700" required />

          {/* رفع صورة واحدة */}
          <div>
            <label className="block font-medium text-red-800">Image url (for the main image)</label>
            <input type="file" accept="image/*" onChange={handleImageUrlChange} className="w-full" required />
          </div>

          {/* رفع صور متعددة */}
          <div>
            <label className="block font-medium text-red-800">Images (for muliple images)</label>
            <input type="file" multiple accept="image/*" onChange={handleAreaImagesChange} className="w-full" />
          </div>

          {/* الأزرار */}
          <div className="flex justify-end space-x-2 pt-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAreaModal;

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useToken from "../../__components/useToken";

export default function AddPrivateTransportPage() {
  const [name, setName] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [transportTypeId, setTransportTypeId] = useState("");
  const [transportTypes, setTransportTypes] = useState([]);
  const router = useRouter();
  const token = useToken();

  useEffect(() => {
    const fetchTransportTypes = async () => {
      const res = await fetch("https://egyptos.runasp.net/api/TransportTypes/GetAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTransportTypes(data);
    };

    fetchTransportTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("PricePerHour", pricePerHour);
    formData.append("Description", description);
    formData.append("Capacity", capacity);
    formData.append("Quantity", quantity);
    formData.append("TransportTypeId", transportTypeId);
    formData.append("ImageUrl", imageFile);

    const res = await fetch("https://egyptos.runasp.net/api/PrivateTransports/Create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      router.push("/dashboard/admin/transport");
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="w-full bg-black">
    <div className="mt-7 mr-10 flex flex-col mb-6 bg-[#8894A22E] rounded-xl space-y-6 w-[98%] text-white p-8">
      <div className="flex justify-between items-center border-b-[1px] border-[#FFFFFF] pb-4">
        <h2 className="text-2xl font-bold">Add Private Transport</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-3xl" encType="multipart/form-data">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-white text-black"
          required
        />
        <input
          type="number"
          placeholder="Price Per Hour"
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
          className="w-full p-2 rounded bg-white text-black"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-white text-black"
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="w-full p-2 rounded bg-white text-black"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 rounded bg-white text-black"
          required
        />

        <select
          value={transportTypeId}
          onChange={(e) => setTransportTypeId(e.target.value)}
          className="w-full p-2 rounded bg-white text-black"
          required
        >
          <option value="">Select Transport Type</option>
          {transportTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full p-2 rounded bg-white text-black"
          required
        />

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard/admin/transport")}
            className="bg-[#FFFFFF] text-[#020032] px-4 py-2 rounded hover:bg-[#eeeeeec0]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#FBC02D] text-white px-4 py-2 rounded hover:bg-[#fbc02dcb]"
          >
            Add
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

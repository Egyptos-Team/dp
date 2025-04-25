"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useToken from "../../../__components/useToken";

export default function EditTransportForm({ item }) {
  const [name, setName] = useState(item.name);
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();
  const token = useToken();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Id", item.id);
    formData.append("Name", name);

    if (imageFile) {
      formData.append("ImageUrl", imageFile);
    }

    const res = await fetch(
      `https://egyptos.runasp.net/api/TransportTypes/Update/${item.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (res.ok) {
      alert("Updated successfully!");
      router.push("/dashboard/admin/transport");
    } else {
      const errText = await res.text();
      alert("Update failed: " + errText);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="space-y-5 max-w-xl mx-auto mt-10 p-6 bg-[#8894A22E] text-white rounded-xl"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold text-center">Edit Transport Type</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded bg-white text-black placeholder:text-gray-500"
        placeholder="Name"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="w-full p-3 rounded bg-white text-black"
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard/admin/transport")}
          className="bg-[#C2C2C2] hover:bg-[#b0b0b0] text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#FFFFFF] text-[#020032] hover:bg-[#eeeeee] px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </form>
  );
}
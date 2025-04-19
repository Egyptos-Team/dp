"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTransportPage() {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("ImageUrl", imageFile); // 👈 هنا اسم الحقل في API backend
    const savedToken = JSON.parse(localStorage.getItem("User") || "{}");
    const token = savedToken.tokens;
    const res = await fetch(
      "https://egyptos.runasp.net/api/TransportTypes/Create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (res.ok) {
      router.push("/dashboard/admin/transport");
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Add Transport Type
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.push("/transport")}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

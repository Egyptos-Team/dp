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
    formData.append("ImageUrl", imageFile);
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
    <div className="w-full bg-black">
    <div className="mt-10 mx-auto p-6 bg-[#8894A22E] rounded-xl w-full max-w-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Transport Type</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder:text-gray-500"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full p-3 rounded bg-white text-black"
          required
        />
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard/admin/transport")}
            className="bg-[#C2C2C2] hover:bg-[#b0b0b0] text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#FFFFFF] text-[#020032] hover:bg-[#eeeeeec0] px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </form>
    </div></div>
  );
}
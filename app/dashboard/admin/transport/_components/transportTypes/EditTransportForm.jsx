"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useToken from "../../../__components/useToken";

export default function EditTransportForm({ item}) {
  const [name, setName] = useState(item.name);
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();
  const token = useToken();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Id", item.id); // مهم جدًا
    formData.append("Name", name);

    // لو المستخدم اختار صورة جديدة، نرفعها
    if (imageFile) {
      formData.append("ImageUrl", imageFile);
    }

    const res = await fetch(`https://egyptos.runasp.net/api/TransportTypes/Update/${item.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      alert("تم التحديث بنجاح");
      router.push("/dashboard/admin/transport");
    } else {
      const errText = await res.text();
      alert("فشل في التحديث: " + errText);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4 max-w-md mx-auto mt-10 p-6 bg-white shadow rounded" encType="multipart/form-data">
      <h2 className="text-xl font-bold text-center">تعديل وسيلة النقل</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Name"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="w-full p-2 border rounded"
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/transport")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          إلغاء
        </button>
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
          تحديث
        </button>
      </div>
    </form>
  );
}

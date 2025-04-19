"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTransportForm({ item, token }) {
  const [start, setStart] = useState(item.start);
  const [end, setEnd] = useState(item.end);
  const [location, setLocation] = useState(item.location);
  const [transportTypeId, setTransportTypeId] = useState(item.privateTransportId);
  const [transportTypes, setTransportTypes] = useState([]);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const body = {
      privateTransportId: transportTypeId,
      start,
      end,
      location,
    };
  
    console.log("🚀 Sending:", body);
  
    const res = await fetch(
      `https://egyptos.runasp.net/api/BookingPrivateTransports/Update/${item.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // 👈 مهم جدًا
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body), // 👈 تحويل البيانات لـ JSON
      }
    );
  
    if (res.ok) {
      alert("تم التحديث بنجاح");
      router.push("/transport");
    } else {
      const errText = await res.text();
      alert("فشل في التحديث: " + errText);
    }
  };
  


  useEffect(() => {
    const fetchTransportTypes = async () => {
      const res = await fetch("https://egyptos.runasp.net/api/PrivateTransports/GetAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTransportTypes(data);
    };

    fetchTransportTypes();
  }, []);


  return (
    
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
          <h2 className="text-2xl font-bold mb-4 text-center">Booking Form</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={transportTypeId}
              onChange={(e) => setTransportTypeId(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Transport Type</option>
              {transportTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                update
              </button>
            </div>
          </form>
        </div>
  );
}

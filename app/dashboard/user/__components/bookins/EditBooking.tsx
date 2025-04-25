"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useToken from "../useToken";

export default function EditBooking({ id }) {
  const token = useToken();
  const router = useRouter();

  const [item, setItem] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");
  const [transportTypeId, setTransportTypeId] = useState("");
  const [transportTypes, setTransportTypes] = useState([]);

  useEffect(() => {
    const fetchTransportTypes = async () => {
      try {
        const res = await fetch("https://egyptos.runasp.net/api/PrivateTransports/GetAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setTransportTypes(data);
      } catch (err) {
        console.error("Error loading transport types:", err);
      }
    };

    if (token) fetchTransportTypes();
  }, [token]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`https://egyptos.runasp.net/api/BookingPrivateTransports/GetById/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setItem(data);
        setStart(data.start);
        setEnd(data.end);
        setLocation(data.location);
        setTransportTypeId(data.privateTransportId);
      } catch (err) {
        console.error("Error loading booking details:", err);
      }
    };

    if (token && id) fetchBooking();
  }, [token, id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const body = {
      privateTransportId: transportTypeId,
      start,
      end,
      location,
    };

    try {
      const res = await fetch(
        `https://egyptos.runasp.net/api/BookingPrivateTransports/Update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (res.ok) {
        alert("Booking updated successfully.");
        router.push("/dashboard/user/booking");
      } else {
        const errText = await res.text();
        alert("Update failed: " + errText);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!item) {
    return <div className="text-center text-white py-10">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-[#8894A22E] rounded-xl shadow-md text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Booking</h2>
      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm">Start Date</label>
          <input
            type="datetime-local"
            value={start}
            min={new Date().toISOString().slice(0, 16)}
            onChange={(e) => setStart(e.target.value)}
            className="w-full p-2 rounded bg-transparent border border-white text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">End Date</label>
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full p-2 rounded bg-transparent border border-white text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 rounded bg-transparent border border-white text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Transport Type</label>
          <select
            value={transportTypeId}
            onChange={(e) => setTransportTypeId(e.target.value)}
            className="w-full p-2 rounded bg-transparent border border-white text-white"
            required
          >
            <option value="" className="bg-gray-700 text-white">
              Select Transport Type
            </option>
            {transportTypes.map((type) => (
              <option
                key={type.id}
                value={type.id}
                className="bg-gray-700 text-white"
              >
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#2684ff] hover:bg-[#1c6ed8] text-white px-6 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

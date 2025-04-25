"use client";

import { useEffect, useState } from "react";
import DeleteEvent from "./DleteteEvent";

export default function GetAllEventBookings({ token }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventBookings = async () => {
      try {
        const res = await fetch(
          "https://egyptos.runasp.net/api/BookingEventDate/BookedByUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        setData(json.eventDates || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventBookings();
  }, [token]);

  return (
    <div className="mt-7 mr-10 flex flex-col mb-6 bg-[#8894A22E] rounded-xl space-y-6 w-[98%]">
      <div className="flex p-6 py-5 border-b-[1px] border-[#FFFFFF]">
        <h1 className="text-2xl text-[#FFFFFF] font-bold">Event Bookings</h1>
      </div>

      <div className="overflow-x-auto px-6 pb-6 mt-6 max-h-[600px] text-[13px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded custom-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-800">
        {loading ? (
          <p className="text-white text-center py-6">Loading...</p>
        ) : (
          <table className="border-collapse border border-[#FFFFFF] shadow-sm w-full">
            <thead className="text-[#FFFFFF] bg-transparent sticky top-0 z-10">
              <tr>
                <th className="border border-gray-300 py-4 text-center">#</th>
                <th className="border border-gray-300 py-4 text-center">
                  Event
                </th>
                <th className="border border-gray-300 py-4 text-center">
                  Location
                </th>
                <th className="border border-gray-300 py-4 text-center">
                  Price
                </th>
                <th className="border border-gray-300 py-4 text-center">
                  Start
                </th>
                <th className="border border-gray-300 py-4 text-center">End</th>
                <th className="border border-gray-300 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((event, index) => (
                  <tr key={event.id} className="border-b text-[#FFFFFF]">
                    <td className="border p-2 text-center border-gray-300">
                      {index + 1}
                    </td>
                    <td className="border p-2 text-center border-gray-300">
                      {event.event?.name}
                    </td>
                    <td className="border p-2 text-center border-gray-300">
                      {event.location}
                    </td>
                    <td className="border p-2 text-center border-gray-300">
                      ${event.price}
                    </td>
                    <td className="border p-2 text-center border-gray-300">
                      {event.startDate?.split("T")[0]}
                    </td>
                    <td className="border p-2 text-center border-gray-300">
                      {event.endDate?.split("T")[0]}
                    </td>
                    <td className="border p-2 text-center border-gray-300">
                      <div className="flex justify-center space-x-2">
                        <DeleteEvent
                          id={event.id}
                          token={token}
                          className="bg-[#C62828] text-white px-3 hover:bg-red-300 text-[13px] py-2 rounded"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    No event bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

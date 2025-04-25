"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";

export default function GetAllTransport({ token }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://egyptos.runasp.net/api/BookingPrivateTransports/GetAllForUser",
          {
            method: "GET",
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Fetching failed");
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <div className="mt-7 mr-10 flex flex-col mb-6 bg-[#8894A22E] rounded-xl space-y-6 w-[98%]">
        <div className="flex p-6 py-5 border-b-[1px] border-[#FFFFFF]">
          <h1 className="text-2xl text-[#FFFFFF] font-bold">
            Booking Private Transports
          </h1>
        </div>

        <div className="overflow-x-auto px-6 pb-6 mt-6 max-h-[600px] text-[13px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded custom-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-800">
          {loading ? (
            <p className="text-white text-center py-6">Loading...</p>
          ) : (
            <table className="border-collapse border border-[#FFFFFF] shadow-sm w-full">
              <thead className="text-[#FFFFFF] bg-transparent sticky top-0 z-10">
                <tr>
                  <th className="border border-gray-300 py-4 text-center">
                    ID
                  </th>
                  <th className="border border-gray-300 py-4 text-center">
                    Name
                  </th>
                  <th className="border border-gray-300 py-4 text-center">
                    Type
                  </th>
                  <th className="border border-gray-300 py-4 text-center">
                    Total Price
                  </th>
                  <th className="border border-gray-300 py-4 text-center">
                    Location
                  </th>
                  <th className="border border-gray-300 py-4 text-center">
                    Start
                  </th>
                  <th className="border border-gray-300 py-4 text-center">
                    End
                  </th>
                  <th className="border border-gray-300 py-4 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data
                    .filter((item) => item.cancelBooking === null)
                    .map((item) => (
                      <tr key={item.id} className="border-b text-[#FFFFFF]">
                        <td className="border p-2 text-center border-gray-300">
                          {item.id}
                        </td>
                        <td className="border p-2 text-center border-gray-300">
                          {item.privateTransport?.name}
                        </td>
                        <td className="border p-2 text-center border-gray-300">
                          {item.privateTransport?.transportType?.name}
                        </td>
                        <td className="border p-2 text-center border-gray-300">
                          ${item.totalPrice}
                        </td>
                        <td className="border p-2 text-center border-gray-300">
                          {item.location}
                        </td>
                        <td className="border p-2 text-center border-gray-300">
                          {item.start}
                        </td>
                        <td className="border p-2 text-center border-gray-300">
                          {item.end}
                        </td>
                        <td className="border p-2 text-center border-gray-300">
                          <div className="flex justify-center space-x-2">
                            <Link
                              href={`/dashboard/user/booking/editBookingTransport/${item.id}`}
                              className="bg-[#FBC02D] text-white px-3 hover:bg-[#fbc02dcb] text-[13px] py-2 rounded"
                            >
                              Edit
                            </Link>
                            <DeleteButton
                              id={item.id}
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
                      colSpan={8}
                      className="px-4 py-3 text-center text-gray-500"
                    >
                      No private transports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

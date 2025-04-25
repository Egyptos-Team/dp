"use client";
import { useEffect, useState } from "react";

export default function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('User'))?.tokens;

    async function fetchBookings() {
      const res = await fetch("https://egyptos.runasp.net/api/BookingTourGuide/BookedByUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await res.json();
      setBookings(data);
      setFilteredBookings(data);
    }

    fetchBookings();
  }, []);

  useEffect(() => {
    let filtered = bookings;

    if (searchName) {
      filtered = filtered.filter(
        (item) =>
          item.userFirstName.toLowerCase().includes(searchName.toLowerCase()) ||
          item.userLastName.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => {
      const nameA = `${a.userFirstName} ${a.userLastName}`.toLowerCase();
      const nameB = `${b.userFirstName} ${b.userLastName}`.toLowerCase();
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    setFilteredBookings(filtered);
  }, [searchName, sortOrder, bookings]);

  return (
    <div className="p-6 flex flex-col space-y-6 bg-[#40434878] mt-6 rounded-2xl w-full">
      <div className="flex w-full">
        <h1 className="text-2xl text-white font-bold">Booking Data</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          className="border bg-transparent text-white placeholder:text-white border-gray-300 p-2 rounded"
          placeholder="Search by user name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border bg-transparent text-white border-gray-300 p-2 rounded"
        >
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>

      <div className="overflow-x-auto p-6 pl-0 max-h-[600px] text-[13px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded custom-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-800">
        <table className="border-collapse border border-[#FFFFFF] shadow-sm w-full">
          <thead className="text-[#FFFFFF]">
            <tr>
              <th className="border border-gray-300 py-5">ID</th>
              <th className="border border-gray-300">Tour Guide</th>
              <th className="border border-gray-300">User</th>
              <th className="border border-gray-300">User ID</th>
              <th className="border border-gray-300">Total Price</th>
              <th className="border border-gray-300">Payment Date</th>
              <th className="border border-gray-300">Payment Cancel</th>
              <th className="border border-gray-300">Cancel Booking</th>
              <th className="border border-gray-300">Start Booking</th>
              <th className="border border-gray-300">End Booking</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((item) => (
                <tr key={item.id} className="border-b text-[#FFFFFF]">
                  <td className="border p-2 text-center border-gray-300">{item?.id }</td>
                  <td className="border p-2 text-center border-gray-300">
                    {item?.tourGuideFirstName} {item?.tourGuideLastName}
                  </td>
                  <td className="border p-2 text-center border-gray-300">
                    {item?.userFirstName} {item?.userLastName}
                  </td>
                  <td className="border p-2 text-center border-gray-300">{item?.userId}</td>
                  <td className="border p-2 text-center border-gray-300">{item?.totalPrice}</td>
                  <td className="border p-2 text-center border-gray-300">
                    {item?.paymentDate ? new Date(item?.paymentDate).toLocaleString() : "N/A"}
                  </td>
                  <td className="border p-2 text-center border-gray-300">
                    {item?.paymentCancel ? new Date(item?.paymentCancel).toLocaleString() : "N/A"}
                  </td>
                  <td className="border p-2 text-center border-gray-300">
                    {item?.cancelBooking ? new Date(item?.cancelBooking).toLocaleString() : "N/A"}
                  </td>
                  <td className="border p-2 text-center border-gray-300">
                    {new Date(item?.startBooking).toLocaleString()}
                  </td>
                  <td className="border p-2 text-center border-gray-300">
                    {new Date(item?.endBooking).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center text-gray-400 py-4">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";

const BookingEventsTable = () => {
  const [bookingEvents, setBookingEvents] = useState([]);

  useEffect(() => {
    fetch("https://egyptos.runasp.net/api/BookingEventDate/GetAll")
      .then((res) => res.json())
      .then((data) => setBookingEvents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-7 mr-10 flex flex-col mb-6  bg-[#8894A22E]  rounded-xl space-y-6 w-[98%]">
     <div className="flex p-6 py-5  border-b-[1px] border-[#FFFFFF]">
        <h1 className="text-2xl text-[#FFFFFF]  font-bold"> Booking</h1>
      </div>
    <div className="overflow-x-auto p-6 max-h-[600px] text-[13px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded custom-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-800">
      <table className="border-collapse border border-[#FFFFFF] shadow-sm w-full">
        <thead className="text-[#FFFFFF]">
          <tr>
            <th className="border border-gray-300 py-5">Id</th>
            <th className="border border-gray-300">Event name</th>
            <th className="border border-gray-300">Event info</th>
            <th className="border border-gray-300">Price</th>
            <th className="border border-gray-300">startDate</th>
            <th className="border border-gray-300">endDate</th>
            <th className="border border-gray-300">startSubscription</th>
            <th className="border border-gray-300">endSubscription</th>
            <th className="border border-gray-300">Type</th>
            <th className="border border-gray-300">Location</th>
          </tr>
        </thead>
        <tbody>
          {bookingEvents.map((booking, index) => {
            const event = booking.eventDate?.event;
            const date = booking.eventDate;
            return (
              <tr key={index} className="border-b text-[#FFFFFF]">
                <td className="border p-2 text-center">{event?.id}</td>
                <td className="border p-2 text-center">{event?.name}</td>
                <td className="border p-2 text-center">{event?.description}</td>
                <td className="border p-2 text-center">{date?.price}</td>
                <td className="border p-2 text-center">
                  {new Date(date?.startDate).toLocaleDateString()}
                </td>
                <td className="border p-2 text-center">
                  {new Date(date?.endDate).toLocaleDateString()}
                </td>
                <td className="border p-2 text-center">
                  {new Date(date?.startSubscription).toLocaleDateString()}
                </td>
                <td className="border p-2 text-center">
                  {new Date(date?.endSubscription).toLocaleDateString()}
                </td>
                <td className="border p-2 text-center">{event?.eventTypeId}</td>
                <td className="border p-2 text-center">
                  {date?.location?.split(",")[0] || "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default BookingEventsTable;

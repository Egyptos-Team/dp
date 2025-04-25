import React from "react";

const Eventdefintion = ({ filteredEvents }) => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between  m-4">
        {/* الجدول الأول: Event Dates */}
        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-white text-lg font-bold mb-2">
            Event (ID ↔ Event ID)
          </h2>
          <div className="max-h-[270px] overflow-y-auto border border-gray-500 rounded-lg">
            <table className="border-collapse border border-[#FFFFFF] shadow-sm w-full">
              <thead className=" text-[#FFFFFF]">
                <tr className="">
                  <th className="border border-gray-300 py-5">Event ID</th>
                  <th className="border border-gray-300">Event name</th>
                  <th className="border border-gray-300">Event info</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredEvents.flatMap((event) => (
                  <tr key={event.id} className="border-b text-[#FFFFFF]">
                    <td className="border p-2 text-center">{event.id}</td>
                    <td className="border p-2 text-center">{event.name}</td>
                    <td className="border p-2 text-center">
                      {event.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* الجدول الثاني: Event Types */}
        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-white text-lg font-bold mb-2">
            Event Types (ID ↔ Name)
          </h2>
          <div className="max-h-[270px] overflow-y-auto border border-gray-500 rounded-lg">
            <table className="border-collapse border border-[#FFFFFF] shadow-sm w-full">
              <thead className="text-[#FFFFFF]">
                <tr className="">
                  <th className="border border-gray-300 py-5">Type ID</th>
                  <th className="border border-gray-300 ">Type Name</th>
                </tr>
              </thead>
              <tbody className="">
                {Array.from(
                  new Map(
                    filteredEvents.map((event) => [
                      event.eventType.id,
                      event.eventType.name,
                    ])
                  ).entries()
                ).map(([id, name]) => (
                  <tr key={id} className="border-b text-[#FFFFFF]">
                    <td className="border p-2 text-center">{id}</td>
                    <td className="border p-2 text-center">{name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventdefintion;

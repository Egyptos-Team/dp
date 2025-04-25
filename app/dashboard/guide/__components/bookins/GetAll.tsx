import Image from "next/image";
import Link from "next/link";

export default async function GetAll() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI";

  const res = await fetch("https://egyptos.runasp.net/api/Users/GetAllBookings", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { bookingPrivateTransports } = await res.json();

  return (
    <div className="mt-7 mr-10 flex flex-col mb-6 bg-[#8894A22E] rounded-xl space-y-6 w-[98%]">
      <div className="flex p-6 py-5 border-b-[1px] border-[#FFFFFF]">
        <h1 className="text-2xl text-[#FFFFFF] font-bold">Booking Private Transports</h1>
      </div>

      <div className="overflow-x-auto px-6 pb-6 mt-6 max-h-[600px] text-[13px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded custom-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-800">
        <table className="border-collapse border border-[#FFFFFF] shadow-sm w-full">
          <thead className="text-[#FFFFFF] bg-[#2684ff] sticky top-0 z-10">
            <tr>
              <th className="border border-gray-300 py-4 text-center">ID</th>
              <th className="border border-gray-300 py-4 text-center">Name</th>
              <th className="border border-gray-300 py-4 text-center">Type</th>
              <th className="border border-gray-300 py-4 text-center">Total Price</th>
              <th className="border border-gray-300 py-4 text-center">Location</th>
              <th className="border border-gray-300 py-4 text-center">Start</th>
              <th className="border border-gray-300 py-4 text-center">End</th>
              <th className="border border-gray-300 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookingPrivateTransports?.length > 0 ? (
              bookingPrivateTransports.map((item) => (
                <tr key={item.id} className="border-b text-[#FFFFFF]">
                  <td className="border p-2 text-center border-gray-300">{item.id}</td>
                  <td className="border p-2 text-center border-gray-300">{item.privateTransport?.name}</td>
                  <td className="border p-2 text-center border-gray-300">{item.privateTransport?.transportType?.name}</td>
                  <td className="border p-2 text-center border-gray-300">
                    {item.totalPrice ? `$${item.totalPrice}` : "N/A"}
                  </td>
                  <td className="border p-2 text-center border-gray-300">{item.location}</td>
                  <td className="border p-2 text-center border-gray-300">{item.start?.split("T")[0]}</td>
                  <td className="border p-2 text-center border-gray-300">{item.end ? item.end.split("T")[0] : "N/A"}</td>
                  <td className="border p-2 text-center border-gray-300">
                    <div className="flex justify-center space-x-2">
                      <Link
                        href={`/transport/editBooking/${item.id}`}
                        className="bg-[#FBC02D] text-white px-3 hover:bg-[#fbc02dcb] text-[13px] py-2 rounded"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-3 text-center text-gray-500">
                  No private transports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

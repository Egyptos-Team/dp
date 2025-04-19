import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default async function PrivateTransports() {
  const res = await fetch(
    "https://egyptos.runasp.net/api/PrivateTransports/GetAll",
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI";

  return (
    // <div className="flex-1 h-screen p-6 overflow-auto">
    //   <h1 className="text-2xl font-bold mb-6">Private Transports</h1>

    //   <div className="mb-6">
    //     <Link
    //       href="/transport/addPrivate"
    //       className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded text-lg"
    //     >
    //       Add
    //     </Link>
    //   </div>

    //   <div className="overflow-auto bg-white rounded shadow h-[calc(100vh-200px)]">
    //     <table className="min-w-full text-sm text-left border">
    //       <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
    //         <tr>
    //           <th className="px-4 py-3 text-center">ID</th>
    //           <th className="px-4 py-3 text-center">Name</th>
    //           <th className="px-4 py-3 text-center">Type</th>
    //           <th className="px-4 py-3 text-center">Price/hr</th>
    //           <th className="px-4 py-3 text-center">Capacity</th>
    //           <th className="px-4 py-3 text-center">Status</th>
    //           <th className="px-4 py-3 text-center">Image</th>
    //           <th className="px-4 py-3 text-center">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.length > 0 ? (
    //           data.map((item) => (
    //             <tr key={item.id} className="border-b hover:bg-gray-50">
    //               <td className="px-4 py-2 text-center">{item.id}</td>
    //               <td className="px-4 py-2 text-center">{item.name}</td>
    //               <td className="px-4 py-2 text-center">{item.transportType?.name}</td>
    //               <td className="px-4 py-2 text-center">${item.pricePerHour}</td>
    //               <td className="px-4 py-2 text-center">{item.capacity}</td>
    //               <td className="px-4 py-2 text-center">
    //                 {item.isAvailable ? (
    //                   <span className="text-green-600 font-semibold">Available</span>
    //                 ) : (
    //                   <span className="text-red-600 font-semibold">Unavailable</span>
    //                 )}
    //               </td>
    //               <td className="px-4 py-2 text-center">
    //                 <div className="w-[250px] h-[100px] overflow-hidden mx-auto rounded-md flex justify-center items-center">
    //                   <Image
    //                     src={`https://egyptos.runasp.net/${item.imageUrl}`}
    //                     alt={item.name}
    //                     width={250}
    //                     height={100}
    //                     className="object-contain"
    //                   />
    //                 </div>
    //               </td>
    //               <td className="px-4 py-2 text-center space-x-2">
    //               <Link
    //                     href={`/transport/editPrivate/${item.id}`}
    //                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
    //                   >
    //                     Edit
    //                   </Link>
    //                 {/* Add delete button if needed */}
    //                 <DeleteButton id={item.id} token={token} />
    //               </td>
    //             </tr>
    //           ))
    //         ) : (
    //           <tr>
    //             <td colSpan={8} className="text-center py-4 text-gray-500">
    //               No private transports found.
    //             </td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
<>
  <div className="mt-7 mr-10 flex flex-col mb-6 bg-[#8894A22E] rounded-xl space-y-6 w-[98%]">
    <div className="flex p-6 py-5 border-b-[1px] border-[#FFFFFF]">
      <h1 className="text-2xl text-[#FFFFFF] font-bold">Private Transports</h1>
    </div>

    <div className="px-6">
      <Link
        href="/dashboard/admin/transport/addPrivate"
        className="bg-[#FFFFFF] text-[#020032] cursor-pointer hover:bg-[#eeeeeec0] px-4 py-2 rounded"
      >
        Add
      </Link>
    </div>

    <div className="overflow-x-auto px-6 pb-6 mt-6 max-h-[600px] text-[13px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded custom-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-800">
      <table className="border-collapse border border-[#FFFFFF] shadow-sm w-full">
        <thead className="text-[#FFFFFF] bg-[#2684ff] sticky top-0 z-10">
          <tr>
            <th className="border border-gray-300 py-4 text-center">ID</th>
            <th className="border border-gray-300 py-4 text-center">Name</th>
            <th className="border border-gray-300 py-4 text-center">Type</th>
            <th className="border border-gray-300 py-4 text-center">Price/hr</th>
            <th className="border border-gray-300 py-4 text-center">Capacity</th>
            <th className="border border-gray-300 py-4 text-center">Status</th>
            <th className="border border-gray-300 py-4 text-center">Image</th>
            <th className="border border-gray-300 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="border-b text-[#FFFFFF]">
                <td className="border p-2 text-center border-gray-300">{item.id}</td>
                <td className="border p-2 text-center border-gray-300">{item.name}</td>
                <td className="border p-2 text-center border-gray-300">{item.transportType?.name}</td>
                <td className="border p-2 text-center border-gray-300">${item.pricePerHour}</td>
                <td className="border p-2 text-center border-gray-300">{item.capacity}</td>
                <td className="border p-2 text-center border-gray-300">
                  {item.isAvailable ? (
                    <span className="text-green-400 font-semibold">Available</span>
                  ) : (
                    <span className="text-red-400 font-semibold">Unavailable</span>
                  )}
                </td>
                <td className="border p-2 text-center border-gray-300">
                  <div className="w-[250px] h-[100px] overflow-hidden mx-auto rounded-md group flex justify-center items-center">
                    <Image
                      src={`https://egyptos.runasp.net/${item.imageUrl}`}
                      alt={item.name}
                      width={250}
                      height={100}
                      unoptimized
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </td>
                <td className="border p-2 text-center border-gray-300">
                  <div className="flex justify-center space-x-2">
                    <Link
                      href={`/dashboard/admin/transport/editPrivate/${item.id}`}
                      className="bg-[#FBC02D] hover:bg-[#fbc02dcb] text-white px-3  text-[13px] py-2 rounded"
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
              <td colSpan={8} className="px-4 py-3 text-center text-gray-500">
                No private transports found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</>

  );
}

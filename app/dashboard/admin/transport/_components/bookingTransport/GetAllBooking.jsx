import Image from "next/image";
import Link from "next/link";


export default async function PrivateTransports() {
  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI";

  const res = await fetch(
    "https://egyptos.runasp.net/api/BookingPrivateTransports/GetAll",
    {
      cache: "no-store",
      method:"GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    }
  );
  const data = await res.json();
  
  return (
    // <div className="flex-1 h-screen p-6 overflow-auto">
    //   <h1 className="text-2xl font-bold mb-6">Booking Private Transports</h1>

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
    //           <th className="px-4 py-3 text-center">Total Price</th>
    //           <th className="px-4 py-3 text-center">Location</th>
    //           <th className="px-4 py-3 text-center">Start</th>
    //           <th className="px-4 py-3 text-center">End</th>
    //           <th className="px-4 py-3 text-center">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.length > 0 ? (
    //           data.map((item) => (
    //             <tr key={item.id} className="border-b hover:bg-gray-50">
    //               <td className="px-4 py-2 text-center">{item.id}</td>
    //               <td className="px-4 py-2 text-center">{item.privateTransport.name}</td>
    //               <td className="px-4 py-2 text-center">{item.privateTransport.transportType?.name}</td>
    //                <td className="px-4 py-2 text-center">${item.totalPrice}</td>
    //               <td className="px-4 py-2 text-center">{item.location}</td> 
    //               <td className="px-4 py-2 text-center">{item.start}</td> 
    //               <td className="px-4 py-2 text-center">{item.end}</td> 
    //               {/* <td className="px-4 py-2 text-center">
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
    //               </td> */}
    //               <td className="px-4 py-2 text-center space-x-2">
    //               <Link
    //                     href={`/transport/editPrivate/${item.id}`}
    //                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
    //                   >
    //                     Edit
    //                   </Link>
                 
    //                 {/* Add delete button if needed */}
    //                 {/* <DeleteButton id={item.id} token={token} /> */}
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
      <h1 className="text-2xl text-[#FFFFFF] font-bold">Booking Private Transports</h1>
    </div>

    {/* <div className="px-6">
      <Link
        href="/transport/addPrivate"
        className="bg-[#FFFFFF] text-[#020032] cursor-pointer hover:bg-[#eeeeeec0] px-4 py-2 rounded"
      >
        Add
      </Link>
    </div> */}

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
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="border-b text-[#FFFFFF]">
                <td className="border p-2 text-center border-gray-300">{item.id}</td>
                <td className="border p-2 text-center border-gray-300">{item.privateTransport.name}</td>
                <td className="border p-2 text-center border-gray-300">{item.privateTransport.transportType?.name}</td>
                <td className="border p-2 text-center border-gray-300">${item.totalPrice}</td>
                <td className="border p-2 text-center border-gray-300">{item.location}</td>
                <td className="border p-2 text-center border-gray-300">{item.start}</td>
                <td className="border p-2 text-center border-gray-300">{item.end}</td>
                <td className="border p-2 text-center border-gray-300">
                  <div className="flex justify-center space-x-2">
                    <Link
                      href={`/transport/editBooking/${item.id}`}
                      className="bg-[#FBC02D] text-white px-3 hover:bg-[#fbc02dcb] text-[13px] py-2 rounded"
                    >
                      Edit
                    </Link>
                    {/* <DeleteButton id={item.id} token={token} className="bg-[#C62828] text-white px-3 hover:bg-red-300 text-[13px] py-2 rounded" /> */}
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

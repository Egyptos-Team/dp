// "use client"
// import Image from "next/image";
// import Link from "next/link";
// import DeleteButton from "./DeleteButton";
// import { useEffect, useState } from "react";

// export default async function TransportType() {
//   const res = await fetch(
//     "https://egyptos.runasp.net/api/TransportTypes/GetAll",
//     {
//       cache: "no-store",
//     }
//   );

//   return (
//     <>
//     <div className="mt-7 mr-10 flex flex-col mb-6 bg-[#8894A22E] rounded-xl space-y-6 w-[98%]">
//       <div className="flex p-6 py-5 border-b-[1px] border-[#FFFFFF]">
//         <h1 className="text-2xl text-[#FFFFFF] font-bold">Transport Types</h1>
//       </div>
  
//       <div className="px-6">
//         <Link
//           href="/transport/addType"
//           className="bg-[#FFFFFF] text-[#020032] cursor-pointer hover:bg-[#eeeeeec0] px-4 py-2 rounded"
//         >
//           Add
//         </Link>
//       </div>
  
//       <div className="overflow-x-auto px-6 pb-6 mt-6 max-h-[600px] text-[13px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded custom-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-800">
//         <table className="border-collapse border border-[#FFFFFF] shadow-sm w-full">
//           <thead className="text-[#FFFFFF] bg-[#2684ff] sticky top-0 z-10">
//             <tr>
//               <th className="border border-gray-300 py-4 text-center">ID</th>
//               <th className="border border-gray-300 py-4 text-center">Name</th>
//               <th className="border border-gray-300 py-4 text-center">Image</th>
//               <th className="border border-gray-300 py-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.length > 0 ? (
//               data.map((item) => (
//                 <tr key={item.id} className="border-b text-[#FFFFFF]">
//                   <td className="border p-2 text-center border-gray-300">
//                     {item.id}
//                   </td>
//                   <td className="border p-2 text-center border-gray-300">
//                     {item.name}
//                   </td>
//                   <td className="border p-2 text-center border-gray-300">
//                     <div className="w-[300px] h-[100px] overflow-hidden rounded-md mx-auto group flex justify-center items-center">
//                       <Image
//                         src={`https://egyptos.runasp.net/${item.imageUrl}`}
//                         alt={item.name}
//                         width={300}
//                         height={100}
//                         className="object-contain transition-transform duration-300 group-hover:scale-110"
//                       />
//                     </div>
//                   </td>
//                   <td className="border p-2 text-center border-gray-300">
//                     <div className="flex justify-center space-x-2">
//                       <Link
//                         href={`/transport/edit/${item.id}`}
//                         className="bg-[#FBC02D] hover:bg-[#fbc02dcb]  text-white px-3 cursor-pointer text-[13px] py-2 rounded"
//                       >
//                         Edit
//                       </Link>
//                       <DeleteButton
//                         id={item.id}
//                         token={token}
//                         className="bg-[#C62828] text-white px-3 hover:bg-red-300 text-[13px] py-2 rounded"
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={4} className="px-4 py-3 text-center text-gray-500">
//                   No data found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </>
// )  
// }



// TransportType.tsx (Server Component)
import TransportTable from './TransportTable';

export default async function TransportType() {
  const res = await fetch("https://egyptos.runasp.net/api/TransportTypes/GetAll", {
    cache: "no-store",
  });
  const data = await res.json();

  return <TransportTable data={data} />;
}

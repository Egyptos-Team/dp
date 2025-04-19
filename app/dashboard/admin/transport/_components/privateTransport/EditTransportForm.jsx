"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useToken from "../../../__components/useToken";

export default function EditTransportForm({ item}) {
  const [name, setName] = useState(item.name);
  const [pricePerHour, setPricePerHour] = useState(item.pricePerHour);
  const [description, setDescription] = useState(item.description);
  const [capacity, setCapacity] = useState(item.capacity);
  const [quantity, setQuantity] = useState(item.quantity);
  const [imageFile, setImageFile] = useState(null);
  const [transportTypeId, setTransportTypeId] = useState("");
  const [transportTypes, setTransportTypes] = useState([]);
  const router = useRouter();
  const token = useToken();


  useEffect(() => {
        const fetchTransportTypes = async () => {
          const res = await fetch("https://egyptos.runasp.net/api/TransportTypes/GetAll", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          setTransportTypes(data);
        };
    
        fetchTransportTypes();
      }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // if (!imageFile) {
    //   alert("Please select an image!");
    //   return;
    // }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("PricePerHour", pricePerHour);
    formData.append("Description", description);
    formData.append("Capacity", capacity);
    if(quantity>0){
    formData.append("Quantity", quantity);
    }else{
      alert("Quantity must be greater than 0")
    }
    formData.append("TransportTypeId", transportTypeId);
    formData.append("ImageUrl", imageFile);

    // لو المستخدم اختار صورة جديدة، نرفعها
    if (imageFile) {
      formData.append("ImageUrl", imageFile);
    }

    const res = await fetch(`https://egyptos.runasp.net/api/PrivateTransports/Update/${item.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      alert("تم التحديث بنجاح");
      router.push("/dashboard/admin/transport");
    } else {
      const errText = await res.text();
      alert("فشل في التحديث: " + errText);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
    <h2 className="text-2xl font-bold mb-4 text-center">Edit Private Transport</h2>
    <form onSubmit={handleUpdate} className="space-y-4" encType="multipart/form-data">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Price Per Hour"
        value={pricePerHour}
        onChange={(e) => setPricePerHour(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      {/* ✅ Dropdown لاختيار نوع المواصلات */}
      <select
        value={transportTypeId}
        onChange={(e) => setTransportTypeId(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Transport Type</option>
        {transportTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="w-full p-2 border rounded"
        required
      />
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => router.push("/transport")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Edit
        </button>
      </div>
    </form>
  </div>
  );
}



// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function AddPrivateTransportPage() {
//   const [name, setName] = useState("");
//   const [pricePerHour, setPricePerHour] = useState("");
//   const [description, setDescription] = useState("");
//   const [capacity, setCapacity] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [transportTypeId, setTransportTypeId] = useState("");
//   const [transportTypes, setTransportTypes] = useState([]);
//   const router = useRouter();

 

//   // 🧠 نجيب البيانات من API
//   useEffect(() => {
//     const fetchTransportTypes = async () => {
//       const res = await fetch("https://egyptos.runasp.net/api/TransportTypes/GetAll", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       setTransportTypes(data);
//     };

//     fetchTransportTypes();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!imageFile) {
//       alert("Please select an image!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("Name", name);
//     formData.append("PricePerHour", pricePerHour);
//     formData.append("Description", description);
//     formData.append("Capacity", capacity);
//     formData.append("Quantity", quantity);
//     formData.append("TransportTypeId", transportTypeId);
//     formData.append("ImageUrl", imageFile);

//     const res = await fetch("https://egyptos.runasp.net/api/PrivateTransports/Create", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     });

//     if (res.ok) {
//       router.push("/transport");
//     } else {
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4 text-center">Add Private Transport</h2>
//       <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="number"
//           placeholder="Price Per Hour"
//           value={pricePerHour}
//           onChange={(e) => setPricePerHour(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="number"
//           placeholder="Capacity"
//           value={capacity}
//           onChange={(e) => setCapacity(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />

//         {/* ✅ Dropdown لاختيار نوع المواصلات */}
//         <select
//           value={transportTypeId}
//           onChange={(e) => setTransportTypeId(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         >
//           <option value="">Select Transport Type</option>
//           {transportTypes.map((type) => (
//             <option key={type.id} value={type.id}>
//               {type.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImageFile(e.target.files[0])}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <div className="flex justify-end space-x-2">
//           <button
//             type="button"
//             onClick={() => router.push("/private-transport")}
//             className="bg-gray-300 px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Add
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

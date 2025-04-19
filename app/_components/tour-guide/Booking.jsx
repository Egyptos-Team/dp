"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline"

const governorates = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Port Said",
  "Suez",
  "Ismailia",
  "Luxor",
  "Aswan",
  "Asyut",
  "Mansoura",
  "Tanta",
  "Fayoum",
  "Zagazig",
  "Damietta",
  "Minya",
  "Beni Suef",
  "Qena",
  "Sohag",
  "Hurghada",
  "Sharm El-Sheikh",
];

export default function Booking() {
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startBooking: "",
    endBooking: "",
  });

  const pathname = usePathname();
  const tourGuideId = Number(pathname.split("/").pop()); 
  const userData = JSON.parse(localStorage.getItem("User")) || {};
  const token = userData.tokens || "";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    setLoading(true);
    const dataToSend = { ...formData, tourGuideId };
    console.log("Data:", dataToSend);
    try {
      await fetch(
        "https://egyptos.runasp.net/api/BookingTourGuide/BookATicket",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );
      alert("Booking successful!");
    } catch {
      alert("Error submitting booking");
    }
    setLoading(false);
  };

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className=" rounded-lg w-full max-w-[400px] min-w-[320px]  sm:max-w-md  space-y-5 transition-all"
  >
  
    <div className="relative">
      <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <select
        name="governorate"
        value={formData.governorate}
        onChange={handleChange}
        className="w-full p-3 pl-10 border rounded"
      >
        <option value="">Select Governorate</option>
        {governorates.map((gov) => (
          <option key={gov} value={gov}>
            {gov}
          </option>
        ))}
      </select>
    </div>
  
    
    <div className="relative">
      
      <input
        type="datetime-local"
        name="startBooking"
        value={formData.startBooking}
        onChange={handleChange}
        className="w-full p-2 pl-10 border rounded"
      />
    </div>
  
   
    <div className="relative">
      
      <input
        type="datetime-local"
        name="endBooking"
        value={formData.endBooking}
        onChange={handleChange}
        className="w-full p-2 pl-10 border rounded"
      />
    </div>
  
    
    <button
      type="submit"
      className="w-[50%] m-0 md:m-[100px] p-3 bg-[#020032] text-white rounded hover:bg-[#020032a4] transition duration-300"
      disabled={loading}
    >
      {loading ? "Booking..." : "Book Now"}
    </button>
  </form>
  );
}

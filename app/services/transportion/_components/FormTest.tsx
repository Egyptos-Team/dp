

"use client";
import LocationOnIcon from "@mui/icons-material/LocationOn"; 

import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // لتحميل الخريطة فقط عند الحاجة

const Map = dynamic(() => import("./MapComponent"), { ssr: false });

type Props = {
  vehicleType?: string;
  vehicleName?: string;
  vehicleID?:string;
};

export default function RideForm(props: Props) {
  const [vehicle, setVehicle] = useState(props.vehicleID || "");
  const [vehicleType, setVehicleType] = useState(props.vehicleType || "");
  const [dataTypes, setDataTypes] = useState<any[]>([]);
  const [dataVehicle, setDataVehicle] = useState<{ privateTransports?: any[] }>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");

  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [error, setError] = useState("");

  const [location, setLocation] = useState("");
    const [showMap, setShowMap] = useState(false);
  

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const savedToken = JSON.parse(localStorage.getItem("User")||"{}"); 
    const token=savedToken.tokens 

  if (!token) {
    alert(" You must be logged in to book a ride!");
    return;
  }
  
     if (timeStart < getTodayDate()) {
        alert(" You can't select a past date!");
        return;
      }
      if(timeEnd){
     if (timeStart > timeEnd ) {
        alert(" You can't select time end before time start!");
        return;
      }}
      if (!vehicleType || !vehicle || !location || !timeStart) {
        alert(" Please fill in all fields!");
        return;
      }
  
      
      // const datetime = new Date(`${date}T${time}`).toISOString();
  
      const bookingData = {  
        start:timeStart ,  
        end: timeEnd || null, 
        location: location, 
        privateTransportId:Number(vehicle)  
      };
  
  
    setError("");
  
 
  
    try {
      const response = await fetch("https://egyptos.runasp.net/api/BookingPrivateTransports/Create", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(bookingData),
      });
        console.log("response",response);
        console.log("bookingData",bookingData);
      if (!response.ok) throw new Error("Failed to book ride");
  
      const result = await response.json();
      console.log(" Booking Successful:", result);
      alert("Your ride has been booked successfully!");
    } catch (error) {
      console.error(" Error booking ride:", error);
      alert(" Failed to book ride. Please try again.");
    }
  };
  


  useEffect(() => {
    if (!vehicle) setVehicle(props.vehicleName || "");
    if (!vehicleType) setVehicleType(props.vehicleType || "");
  }, [props.vehicleName, props.vehicleType]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch(
          `https://egyptos.runasp.net/api/TransportTypes/GetAll`
        );
        const data = await res.json();
        setDataTypes(data);
      } catch (error) {
        console.error("Error fetching vehicle types:", error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchVehicle = async () => {
      try {
        const res = await fetch(
          `https://egyptos.runasp.net/api/TransportTypes/Get/${id}`
        );
        const data = await res.json();
        setDataVehicle(data);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setVehicleType(selectedType);
    // سيرش بناءا عن الاسم الموجود
    const selectedTypeObj = dataTypes.find(
      (type) => type.name === selectedType
    );
    if (selectedTypeObj) {
      setId(selectedTypeObj.id);
    }
  };
  return (
    <div className="my-10 w-full">
      <h2 className="  z-10 text-[45px] lg:text-[75px] text-[#DF3C20] font-bold font-sans text-center lg:hidden :block">
        Book Rides Anywhere
      </h2>

      <div className=" relative w-[90%] mx-auto my-20 flex flex-col lg:flex-row lg:bg-white bg-bgBlueColor rounded-xl">
        <div className="lg:w-[50%] w-[100%]  bg-bgBlueColor  flex flex-col items-center justify-center py-10 rounded-xl">
          <div className="w-[70%]   ">
            <h2 className="text-xl font-semibold text-center text-white mb-4">
              Travel more? Plan your Ride !!
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                className="w-full p-3 rounded-lg bg-white text-gray-700"
                value={vehicleType}
                onChange={handleVehicleTypeChange}
                disabled={!!props.vehicleType}
              >
                <option value="">Choose vehicle*</option>
                {dataTypes.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>

              <select
              name="privateTransportId"
                className="w-full p-3 rounded-lg bg-white text-gray-700"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                disabled={
                  !!props.vehicleName ||
                  !dataVehicle?.privateTransports ||
                  dataVehicle.privateTransports.length === 0
                } // لو في قيمة بقا هتبقي disabled
              >
                {/* لو بعت داتا هتظهر */}
                {props.vehicleID && <option value={props.vehicleID}>{props.vehicleName}</option>}

                {/* هتظهر رسالة تحميل لو مفيش داتا*/}
                {!dataVehicle?.privateTransports ||
                dataVehicle.privateTransports.length === 0 ? (
                  <option value="">Loading vehicle types...</option>
                ) : (
                  <>
                    <option value="">Select {vehicleType} Type*</option>
                    {dataVehicle.privateTransports.map((type: { id: string; name: string }) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </>
                )}
              </select>

          {/* اختيار موقع المستخدم */}
               <div>
                 <div className="flex">
                   <input
                   name="Location"
                    type="text"
                    value={location}
                    readOnly
                    placeholder="Location"
                    className="w-full p-3 rounded-lg bg-gray-200 text-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMap(true)}
                    className="ml-2 bg-[#DF3C20] text-white p-3 rounded-lg  hover:text-white hover:bg-blue-700 transition duration-200"
                  >
                    <LocationOnIcon/>
                  </button>
                </div>
              </div>

              {/*  الخريطة */}
              {showMap && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg w-[95%] md:w-[60%] lg:w-[50%] xl:w-[40%] shadow-lg relative">
                    <button
                      onClick={() => setShowMap(false)}
                      className="absolute top-2 right-2 text-red-600 text-xl font-bold"
                    >
                      ✖
                    </button>
                    <Map setLocation={setLocation} />
                  </div>
                </div>
              )}


          

              {/* time start required */}

              <input
                type="datetime-local"
                className="w-full p-3 rounded-lg bg-white text-gray-700 border border-gray-300"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
                required
              />

              {/* Time end   */}

              <input
                type="datetime-local"
                className="w-full p-3 rounded-lg bg-white text-gray-700 border border-gray-300"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#DF3C20] text-blue-950 font-bold tracking-widest p-3 rounded-lg hover:text-white hover:bg-blue-700 transition duration-200"
              >
                Book Ride
              </button>
            </form>
          </div>
        </div>
        <div className="  lg:w-[50%] ">
          <h2 className=" absolute z-10 text-[45px] lg:text-[75px] text-[#DF3C20] font-bold font-sans text-center hidden lg:block">
            Book Rides Anywhere
          </h2>
          <div className=" lg:absolute lg:left-[40%] lg:bottom-[-14%] lg:w-[55%] xl:w-[55%]">
            <Image
              height={300}
              width={600}
              src={"/transportion/form.png"}
              alt="form"
              className="w-full"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}







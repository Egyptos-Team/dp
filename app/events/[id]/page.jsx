"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { MapPinIcon } from "@heroicons/react/24/outline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [mainEvent, setMainEvent] = useState(null);
  const router = useRouter();
  const { id } = useParams(); // الحصول على ID من الرابط

  useEffect(() => {
    fetch("https://egyptos.runasp.net/api/Event/GetAll")
      .then((res) => res.json())
      .then((data) => {
        const selectedEvent = data.find((event) => event.id === parseInt(id));
        setMainEvent(selectedEvent); // تخزين بيانات الحدث الأساسي
        setEvents(data.filter((event) => event.id !== parseInt(id))); // استبعاد الحدث الرئيسي من قائمة الأحداث الأخرى
      });
  }, [id]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {mainEvent && (
        <div className="bg-white p-6 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{mainEvent.name}</h1>
            <p className="flex items-center text-gray-600 my-2">
              <MapPinIcon className="w-5 h-5 mr-2" /> {mainEvent.eventDates[0]?.location}
            </p>
            <p className="flex items-center gap-2 text-sm mt-2 text-gray-600">
  <CalendarTodayIcon className="w-5 h-5 text-gray-500" />
  {mainEvent.eventDates[0]?.startDate ? new Date(mainEvent.eventDates[0]?.startDate).toLocaleDateString() : "No Date"}
</p>
            <p className="text-gray-700 mb-4">{mainEvent.description}</p>
            <p className="text-gray-700 mb-4">{mainEvent.description}</p>
            <p className="text-gray-700 mb-4">{mainEvent.description}</p>
            <p className="text-gray-700 mb-4">{mainEvent.description}</p>
            <button className="bg-[#020032] text-white px-4 py-2 rounded-md mt-2">
              Book Now
            </button>
          </div>

          {/* عرض 3 صور خاصة بالحدث */}
          <div className="flex-1 grid grid-cols-1 gap-2">
            {mainEvent.eventDates?.[0]?.eventImages?.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                src={`https://egyptos.runasp.net/${image.imageUrl}`}
                alt={mainEvent.name}
                width={400}
                height={200}
                unoptimized
                className={`w-full object-fill rounded-lg ${index === 1 ? "h-24" : "h-44"}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Events */}
      <h2 className="text-3xl font-bold mt-6 text-center">Other Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {events.slice(0, 6).map((event) => {
          const eventDate = new Date(event.eventDates?.[0]?.startDate || "");
          const today = new Date();
          const status = eventDate > today ? "Soon" : "Ended";
          const eventImage = event.eventDates?.[0]?.eventImages?.[0]?.imageUrl;

          return (
            <div key={event.id} className="bg-white p-4 flex flex-col h-full">
              <div className="relative">
                {eventImage && (
                  <Image
                    src={`https://egyptos.runasp.net/${eventImage}`}
                    alt={event.name}
                    width={507}
                    unoptimized
                    height={314}
                    className="w-full h-48 object-fill rounded-lg"
                  />
                )}
                {/* الحالة (Soon / Ended) */}
                <span className="absolute top-[1rem] right-[1rem] bg-red-600 text-white px-2 py-4 rounded-sm text-sm">
                  {status}
                </span>
              </div>
              <h1 className="text-xl mt-2 ">{event.name}</h1>
              <h3 className="text-lg font-bold mt-2">{event.title}</h3>
              <p className="text-gray-700 line-clamp-2 mb-2">{event.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <p className="text-gray-600 text-sm flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2" /> {event.eventDates?.[0]?.location}
                </p>
                <button
                  onClick={() => router.push(`/events/${event.id}`)}
                  className="hover:text-white hover:bg-[#020032] border border-[#020032] text-[#020032] hover:opacity-80 px-4 py-2 rounded-md"
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
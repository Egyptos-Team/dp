"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(5);
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [eventTypes, setEventTypes] = useState([]);

  useEffect(() => {
    fetch("https://egyptos.runasp.net/api/Event/GetAll")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const uniqueEventTypes = Array.from(
      new Set(events.map((event) => event.eventType?.name))
    );
    setEventTypes(uniqueEventTypes);
  }, [events]);

  let filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (eventTypeFilter !== "all") {
    filteredEvents = filteredEvents.filter(
      (event) => event.eventType?.name === eventTypeFilter
    );
  }

  filteredEvents = filteredEvents.filter((event) => {
    const today = new Date();
    const eventDate = new Date(event.eventDates[0]?.startDate);

    if (filter === "soon") return eventDate > today;
    if (filter === "ended") return eventDate < today;
    return true;
  });

  return (
    <div className="p-4 max-w-6xl mt-6 mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
          {[
            { type: "all", label: "All" },
            { type: "soon", label: "Soon" },
            { type: "ended", label: "Ended" },
          ].map(({ type, label }) => (
            <button
              key={type}
              className={`px-4 py-2 whitespace-nowrap rounded-lg text-lg ${
                filter === type
                  ? "bg-[#020032] text-white"
                  : "text-[#020032] border border-[#020032]"
              }`}
              onClick={() => setFilter(type)}
            >
              {label}
            </button>
          ))}

          <div className="relative w-full md:w-auto">
            <select
              className="px-2 py-3 w-[130px] max-[500px]:w-full rounded-lg text-lg border border-[#020032] focus:outline-none"
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative w-full md:w-[400px]">
          <SearchIcon className="absolute left-4 top-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search For Events"
            className="pl-12 pr-4 border border-[#020032] rounded-lg h-[50px] w-full text-lg focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-16">
        {filteredEvents.slice(0, visibleCount).map((event, index) => {
          const eventDate = new Date(event.eventDates[0]?.startDate);
          const today = new Date();
          const status = eventDate > today ? "Soon" : "Ended";

          return (
            <div
              key={event.id}
              className="p-4 mt-20 relative flex flex-col md:flex-row justify-between border border-b-2"
            >
              <span className="absolute top-[-3.5rem] right-[-1rem] bg-red-600 text-white px-2 py-4 rounded-sm text-sm">
                {status}
              </span>
              <div className="flex flex-col max-w-xl">
                <h3 className="text-lg font-bold mb-2">{event.name}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {event.description}
                </p>
                <p className="flex items-center gap-2 text-sm mt-2 text-gray-600">
                  <MapPinIcon className="w-5 h-5" />
                  {event.eventDates[0]?.location || "Unknown Location"}
                </p>
                <Link
                  href={`/events/${event.id}`}
                  className="flex items-center"
                >
                  <button className="bg-[#020032] mt-3 md:mb-11 lg:mb-6 text-white text-lg px-6 py-3 hover:bg-[#020032]/90 rounded-lg">
                    View <ArrowRightAltIcon className="ml-3 mt-[-5px]" />
                  </button>
                </Link>
                <span className="font-bold">${event.eventDates[0]?.price}</span>
              </div>

              {/* عرض الصور بترتيب متناسق */}
              <div className="grid grid-cols-2 gap-2 max-w-5xl items-stretch">
                {index % 2 === 0 ? (
                  <>
                    {event.eventDates[0]?.eventImages[0]?.imageUrl && (
                      <Image
                        src={`https://egyptos.runasp.net/${event.eventDates[0].eventImages[0].imageUrl}`}
                        alt={event.name}
                        width={250}
                        unoptimized
                        height={308}
                        className="w-[250px] h-[308px] object-fill rounded-xl"
                      />
                    )}
                    <div className="flex flex-col gap-2 h-[300px]">
                      {event.eventDates[0]?.eventImages[1]?.imageUrl && (
                        <Image
                          src={`https://egyptos.runasp.net/${event.eventDates[0].eventImages[1].imageUrl}`}
                          alt={event.name}
                          width={250}
                          unoptimized
                          height={150}
                          className="w-[250px] h-[150px] object-fill rounded-tr-3xl"
                        />
                      )}
                      {event.eventDates[0]?.eventImages[2]?.imageUrl && (
                        <Image
                          src={`https://egyptos.runasp.net/${event.eventDates[0].eventImages[2].imageUrl}`}
                          alt={event.name}
                          width={250}
                          unoptimized
                          height={150}
                          className="w-[250px] h-[150px] object-fill rounded-br-3xl"
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {event.eventDates[0]?.eventImages[0]?.imageUrl && (
                      <Image
                        src={`https://egyptos.runasp.net/${event.eventDates[0].eventImages[0].imageUrl}`}
                        alt={event.name}
                        width={250}
                        unoptimized
                        height={308}
                        className="w-[250px] h-[308px] object-fill rounded-xl"
                      />
                    )}
                    <div className="flex flex-col gap-2 h-[300px]">
                      {event.eventDates[0]?.eventImages[1]?.imageUrl && (
                        <Image
                          src={`https://egyptos.runasp.net/${event.eventDates[0].eventImages[1].imageUrl}`}
                          alt={event.name}
                          width={250}
                          unoptimized
                          height={150}
                          className="w-[250px] h-[150px] object-fill rounded-tr-3xl"
                        />
                      )}
                      {event.eventDates[0]?.eventImages[2]?.imageUrl && (
                        <Image
                          src={`https://egyptos.runasp.net/${event.eventDates[0].eventImages[2].imageUrl}`}
                          alt={event.name}
                          width={250}
                          height={150}
                          unoptimized
                          className="w-[250px] h-[150px] object-fill rounded-br-3xl"
                        />
                      )}
                    </div>{" "}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* زر تحميل المزيد */}
      {visibleCount < filteredEvents.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount(visibleCount + 5)}
            className="bg-[#020032] text-white text-lg p-[10px] w-full sm:w-80 h-[50px] sm:h-12 hover:bg-[#020032]/90 rounded"
          >
            Explore More
          </button>
        </div>
      )}
    </div>
  );
}

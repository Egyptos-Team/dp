"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import AddEventModal from "./AddEventModal";
import UpdateEventTypeModal from "./UpdateEventTypeModal";
import Eventdefintion from "./Eventdefintion";
export default function EventsTable() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState("");
  const [locations, setLocations] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [eventDates, setEventDates] = useState([]);
  const [showUpdateeventtypeModal, setShowUpdateeventtypeModal] =
    useState(false);
  const [Loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [types, setTypes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [dateStatuses, setDateStatuses] = useState([]);
  const [showaddForm, setShowaddForm] = useState(false);
  const [showdelForm, setShowdelForm] = useState(false);
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setid] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showupdatedateModal, setshowupdatedateModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [newEvent, setNewEvent] = useState({
    name: "",
    eventType: [
      {
        name: "",
      },
    ],
    description: "",
    eventDates: [
      {
        location: "",
        price: "",
        startDate: "",
        endDate: "",
        startSubscription: "",
        endSubscription: "",
      },
    ],
    eventImages: {
      imageUrl: [],
    },
  });
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    startSubscription: "",
    endSubscription: "",
    description: "",
    location: "",
    price: "",
    eventId: "",
    Images: "",
    id: "",
  });
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedDateStatus, setSelectedDateStatus] = useState("");
  const priceRanges = [
    { label: "Price", value: "" },
    { label: "1 - 100 EGP", value: "0-100" },
    { label: "101 - 250 EGP", value: "101-250" },
    { label: "251 - 500 EGP", value: "251-500" },
    { label: "501 - 1000 EGP", value: "501-1000" },
    { label: "1000+ EGP", value: "1000-100000" },
  ];
  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "https://egyptos.runasp.net/api/Event/GetAll"
      );
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data.slice(0, 5));
      const locs = new Set();
      const types = new Set();
      const prices = new Set();
      const statuses = new Set();
      const now = new Date();
      data.forEach((e) => {
        e.eventDates.forEach((d) => {
          locs.add(d.location);
          prices.add(d.price);
          const endDate = new Date(d.endDate);
          statuses.add(endDate > now ? "Soon" : "Ended");
        });
        types.add(e.eventType.name);
      });
      setLocations([...locs]);
      setTypes([...types]);
      setPrices([...prices]);
      setDateStatuses([...statuses]);
    } catch (err) {
      console.error("❌ Error fetching events:", err);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  const handleDeleted = (deletedId) => {
    console.log("✅ Deleted ID:", deletedId);
    fetchEvents();
  };
  useEffect(() => {
    let filtered = [...events];

    if (selectedLocation)
      filtered = filtered.filter((event) =>
        event.eventDates?.some((d) => d.location === selectedLocation)
      );
    if (selectedType)
      filtered = filtered.filter(
        (event) => event.eventType?.name === selectedType
      );
    // فلترة حسب السعر
    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map(Number);
      filtered = filtered.filter((event) =>
        event.eventDates?.some((d) => {
          const price = Number(d.price) || 0;
          return price >= min && price <= max;
        })
      );
    }
    if (selectedDateStatus) {
      const now = new Date();
      filtered = filtered.filter((event) =>
        event.eventDates?.some((d) => {
          const endDate = new Date(d.endDate);
          return selectedDateStatus === "Soon" ? endDate > now : endDate <= now;
        })
      );
    }
    if (search.trim()) {
      filtered = filtered.filter((e) =>
        e.name?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredEvents(filtered);
  }, [
    selectedLocation,
    selectedType,
    selectedPrice,
    selectedDateStatus,
    search,
    events,
  ]);
  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setFilteredEvents([...filteredEvents, { ...newEvent, id: Date.now() }]);
  };
  const getSelectStyle = (value) => {
    return value
      ? "bg-white text-[#0B1120] font-semibold cursor-pointer"
      : "bg-[#0B1120] text-white hover:bg-white hover:text-[#0B1120] focus:bg-white focus:text-[#0B1120] cursor-pointer";
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmitAdd = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("eventId", formData.eventId);
    formDataToSend.append("startDate", formData.startDate);
    formDataToSend.append("endDate", formData.endDate);
    formDataToSend.append("startSubscription", formData.startSubscription);
    formDataToSend.append("endSubscription", formData.endSubscription);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("price", formData.price);
    // نضيف الصور كلها
    formData.Images.forEach((image) => {
      formDataToSend.append("Images", image);
    });
    try {
      const response = await fetch(
        "https://egyptos.runasp.net/api/EventDates/Add",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI`,
          },
          body: formDataToSend,
        }
      );
      if (response.ok) {
        fetchEvents();
        setShowAddModal(false);
      } else {
        const error = await response.json();
        console.log("🔥 Error while sending to API:", error);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmitUpdate = async () => {
    console.log("📦 formData before submit:", formData);
    const formDataToSend = new FormData();
    formDataToSend.append("id", formData.id);
    formDataToSend.append("eventId", formData.eventId);
    formDataToSend.append("startDate", formData.startDate);
    formDataToSend.append("endDate", formData.endDate);
    formDataToSend.append("startSubscription", formData.startSubscription);
    formDataToSend.append("endSubscription", formData.endSubscription);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("price", formData.price);

    // نضيف الصور كلها
    formData.Images.forEach((image) => {
      formDataToSend.append("Images", image);
    });
    console.log("📤 FormData being sent:");
    for (let pair of formDataToSend.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    try {
      console.log(
        "📤 Sending PUT request to:",
        `https://egyptos.runasp.net/api/EventDates/Update/${formData.id}`
      );
      const response = await fetch(
        `https://egyptos.runasp.net/api/EventDates/Update/${formData.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI`,
          },
          body: formDataToSend,
        }
      );
      if (response.ok) {
        fetchEvents(); // علشان تجيب التحديثات الجديدة
        setshowupdatedateModal(false); // تقفل المودال
      } else {
        const error = await response.json();
        console.log("Error Response:", error);
        console.error("🔥 Error while updating:", error);
      }
    } catch (err) {
      console.error("❌ Network or fetch error:", err);
    }
  };
  const handleEditSubmit = async () => {
    try {
      console.log("🔧 Sending this data:", selectedEvent);

      const response = await fetch(
        `https://egyptos.runasp.net/api/Event/Update/${selectedEvent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI`,
          },
          body: JSON.stringify({
            name: selectedEvent.name,
            description: selectedEvent.description,
          }),
        }
      );
      console.log("📩 Status:", response.status);
      if (response.ok) {
        setShowEditModal(false);
        fetchEvents();
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const error = await response.json();
          console.log("🔥 JSON Error from API:", error);
        } else {
          const text = await response.text();
          console.log("🔥 Raw Error from API:", text);
        }
      }
    } catch (err) {
      console.error("❌ Catch error:", err);
    }
  };
  const handleDeleteEvent = async (eventId) => {
    try {
      const res = await fetch(
        `https://egyptos.runasp.net/api/Event/Delete/${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI`,
          },
        }
      );
      if (res.ok) {
        fetchEvents(); // إعادة جلب البيانات
      } else {
        const txt = await res.text();
        console.error("❌ Error deleting event:", txt);
      }
    } catch (err) {
      console.error("❌ Exception:", err);
    }
  };
  const handleSubmit = async () => {
    if (!name) {
      setErrorMessage("❌ Please enter a name.");
      return;
    }
    try {
      const response = await fetch(
        "https://egyptos.runasp.net/api/EventType/Add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI",
          },
          body: JSON.stringify({ name }),
        }
      );
      const text = await response.text();
      console.log("Status:", response.status);
      console.log("Response:", text);

      if (!response.ok) throw new Error(text);
      if (response.ok) {
        fetchEvents();
        setShowaddForm(false);
      } else {
        console.error("Added failed:", result);
      }
      setErrorMessage("");
      setName("");
      setShowaddForm(false);
    } catch (err) {
      setErrorMessage("❌ " + err.message);
      setSuccessMessage("");
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://egyptos.runasp.net/api/EventType/Delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI`,
          },
          body: JSON.stringify({ id }),
        }
      );
      console.log("Status:", response.status);
      // تأكدي إن في body قبل ما تعملي json
      let result = null;
      const text = await response.text();
      if (text) {
        result = JSON.parse(text);
        console.log("Response:", result);
      }
      if (response.ok) {
        fetchEvents();
        setid("");
        setShowdelForm(false);
      } else {
        console.error("Delete failed:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="mt-1 mr-8 flex flex-col mb-6  bg-[#8894A22E]  rounded-xl space-y-6 w-[98%]" >
      <div className="flex p-6 py-5  border-b-[1px] border-[#FFFFFF]">
          <h1 className="text-2xl text-[#FFFFFF]  font-bold">Event </h1>
        </div>
        <div className="flex flex-wrap p-5 justify-between items-center gap-4 mb-4">
          {/* Filters group (All + Selects) */}
          <div className="flex flex-wrap gap-5 items-center">
            <button
              onClick={() => {
                setSelectedLocation("");
                setSelectedType("");
                setSelectedPrice("");
                setSelectedDateStatus("");
                setSearch("");
                setFilteredEvents(events.slice(0, 5));
              }}
              className=" bg-[#FFFFFF21] outline-none hover:bg-white hover:text-[#0B1120]  text-white p-2 rounded-2xl]  font-semibold w-24 h-10 rounded-lg text-sm"
            >
              All
            </button>
            <select
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={`bg-[#FFFFFF21] outline-none text-white p-2 rounded-2xl]  font-semibold w-24 h-10 rounded-lg text-sm ${getSelectStyle(
                selectedLocation
              )}`}
            >
              <option value="">Location</option>
              {locations.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc.split(",")[0]}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSelectedType(e.target.value)}
              className={`bg-[#FFFFFF21] outline-none text-white p-2 rounded-2xl]  font-semibold w-24 h-10 rounded-lg text-sm${getSelectStyle(
                selectedType
              )}`}
            >
              <option value="">Type</option>
              {types.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSelectedDateStatus(e.target.value)}
              className={`bg-[#FFFFFF21] outline-none text-white p-2 rounded-2xl]  font-semibold w-24 h-10 rounded-lg text-sm ${getSelectStyle(
                selectedDateStatus
              )}`}
            >
              <option value="">Date</option>
              {["Soon", "Ended"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSelectedPrice(e.target.value)}
              className={`bg-[#FFFFFF21] outline-none text-white p-2 rounded-2xl]  font-semibold w-24 h-10 rounded-lg text-sm ${getSelectStyle(
                selectedPrice
              )}`}
            >
              {priceRanges.map((range, i) => (
                <option key={i} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          {/* Search input aligned to the right */}
          <div className="flex items-center gap-2 w-[150px] bg-[#FFFFFF21] outline-none text-white p-2 rounded-2xl px-3 py-2  ring-0   sm:w-auto">
            <MagnifyingGlassIcon className="text-white w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-white w-full sm:w-40"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      
        <div className="overflow-x-auto p-6 max-h-[600px] text-[13px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded  custom-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-800">
          <table className="border-collapse border border-[#FFFFFF] shadow-sm w-full ">
            <thead className="text-[#FFFFFF]">
              <tr>
                <th className="border border-gray-300 py-5">Id</th>
                <th className="border border-gray-300">Event name</th>
                <th className="border border-gray-300">Event info</th>
                <th className="border border-gray-300">Price</th>
                <th className="border border-gray-300">startDate</th>
                <th className="border border-gray-300">endDate</th>
                <th className="border border-gray-300">startSubscription</th>
                <th className="border border-gray-300">endSubscription</th>
                <th className="border border-gray-300">Type</th>
                <th className="border border-gray-300">Location</th>
                <th className="border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) =>
                event.eventDates.map((date) => (
                  <tr key={date.id} className="border-b text-[#FFFFFF]">
                    <td className="border p-2 text-center">{event.id}</td>
                    <td className="border p-2 text-center">{event.name}</td>
                    <td className="border p-2 text-center">
                      {event.description}
                    </td>
                    <td className="border p-2 text-center">{date.price}</td>
                    <td className="border p-2 text-center">
                      {new Date(date.startDate).toLocaleDateString()}
                    </td>
                    <td className="border p-2 text-center">
                      {new Date(date.endDate).toLocaleDateString()}
                    </td>
                    <td className="border p-2 text-center">
                      {new Date(date.startSubscription).toLocaleDateString()}
                    </td>
                    <td className="border p-2 text-center">
                      {new Date(date.endSubscription).toLocaleDateString()}
                    </td>
                    <td className="border p-2 text-center">
                      {event.eventType?.name || "N/A"}
                    </td>
                    <td className="border p-2 text-center">
                      {date.location?.split(",")[0] || "N/A"}
                    </td>
                    <td className="border p-2 text-center">
                      <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedEvent({
                              id: event.id,
                              name: event.name,
                              description: event.description,
                            });
                            setShowEditModal(true);
                          }}
                          className="bg-green-600 text-white px-4 cursor-pointer items-center hover:bg-green-300 flex mx-1 text-[13px] py-2 rounded"
                        >
                          <PencilIcon className="h-4 w-4 text-white inline-block mr-1" />{" "}
                          Edit
                        </button>

                        <button
                          onClick={async () => {
                            try {
                              const res = await fetch(
                                `https://egyptos.runasp.net/api/EventDates/Delete/${date.id}`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    Authorization:
                                      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI",
                                  },
                                }
                              );
                              if (!res.ok) {
                                const error = await res.json();
                                throw new Error(
                                  error.message || "Failed to delete"
                                );
                              }
                              // تحديث الحالة المحلية بدون ريفرش
                              setFilteredEvents((prev) =>
                                prev.map((ev) =>
                                  ev.id === event.id
                                    ? {
                                        ...ev,
                                        eventDates: ev.eventDates.filter(
                                          (d) => d.id !== date.id
                                        ),
                                      }
                                    : ev
                                )
                              );
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          className="bg-[#C62828] text-white px-4 cursor-pointer items-center hover:bg-red-300 flex mx-1 text-[13px] py-2 rounded"
                        >
                          <TrashIcon className="h-4 w-4 text-white inline-block mr-1" />{" "}
                          Delete
                        </button>

                        <button
                          onClick={() => {
                            setFormData({
                              id: date.id,
                              eventId: event.id,
                              startDate: date.startDate,
                              endDate: date.endDate,
                              startSubscription: date.startSubscription,
                              endSubscription: date.endSubscription,
                              description: date.description,
                              location: date.location,
                              price: date.price,
                              Images: [],
                            });
                            setshowupdatedateModal(true);
                          }}
                          className="bg-[#FFFFFF] text-[#020032] cursor-pointer hover:bg-[#eeeeeec0] p-1 rounded"
                        >
                          Update EDate
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* modal to update event date */}
        {showupdatedateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[10000]">
            <div className="bg-white p-6 rounded-lg w-full sm:max-w-md relative text-black overflow-y-auto max-h-[90vh]">
              <button
                className="absolute top-2 right-3 text-3xl font-bold text-gray-700"
                onClick={() => setshowupdatedateModal(false)}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">Update Event Date</h2>
              {/* Form Fields */}
              <div className="space-y-4">
                {[
                  { label: "Event ID", name: "eventId", type: "number" },
                  {
                    label: "Start Date",
                    name: "startDate",
                    type: "datetime-local",
                  },
                  {
                    label: "End Date",
                    name: "endDate",
                    type: "datetime-local",
                  },
                  {
                    label: "Start Subscription",
                    name: "startSubscription",
                    type: "datetime-local",
                  },
                  {
                    label: "End Subscription",
                    name: "endSubscription",
                    type: "datetime-local",
                  },
                  { label: "Description", name: "description", type: "text" },
                  { label: "Location", name: "location", type: "text" },
                  { label: "Price", name: "price", type: "number" },
                ].map(({ label, name, type }) => (
                  <div key={name}>
                    <label className="block mb-1 font-semibold">{label}</label>
                    <input
                      type={type}
                      placeholder={label}
                      className="w-full border p-2 rounded"
                      value={formData[name] ?? ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [name]: e.target.value,
                        }))
                      }
                    />
                  </div>
                ))}
                <div>
                  <label className="block mb-1 font-semibold">Images </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full border p-2 rounded"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        Images: Array.from(e.target.files), // نخزن الصور كـ File[]
                      }))
                    }
                  />
                </div>
              </div>
              {/* Submit & Cancel */}
              <div className="flex justify-between mt-6">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setshowupdatedateModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleSubmitUpdate}
                >
                  Update Event Date
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modal to Add Event */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[10000]">
            <div className="bg-white p-6 rounded-lg w-full sm:max-w-md relative text-black overflow-y-auto max-h-[90vh]">
              <button
                className="absolute top-2 right-3 text-3xl font-bold text-gray-700"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">Add Event Date</h2>
              {/* Form Fields */}
              <div className="space-y-4">
                {[
                  { label: "Event ID", name: "eventId", type: "number" },
                  {
                    label: "Start Date",
                    name: "startDate",
                    type: "datetime-local",
                  },
                  {
                    label: "End Date",
                    name: "endDate",
                    type: "datetime-local",
                  },
                  {
                    label: "Start Subscription",
                    name: "startSubscription",
                    type: "datetime-local",
                  },
                  {
                    label: "End Subscription",
                    name: "endSubscription",
                    type: "datetime-local",
                  },
                  { label: "Description", name: "description", type: "text" },
                  { label: "Location", name: "location", type: "text" },
                  { label: "Price", name: "price", type: "number" },
                ].map(({ label, name, type }) => (
                  <div key={name}>
                    <label className="block mb-1 font-semibold">{label}</label>
                    <input
                      type={type}
                      placeholder={label}
                      className="w-full border p-2 rounded"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [name]: e.target.value,
                        }))
                      }
                    />
                  </div>
                ))}
                <div>
                  <label className="block mb-1 font-semibold">Images </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full border p-2 rounded"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        Images: Array.from(e.target.files), // نخزن الصور كـ File[]
                      }))
                    }
                  />
                </div>
              </div>
              {/* Submit & Cancel */}
              <div className="flex justify-between mt-6">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleSubmitAdd}
                >
                  Add Event Date
                </button>
              </div>
            </div>
          </div>
        )}
        {showEditModal && (
          <div className="fixed inset-0 z-[9999] bg-black bg-opacity-70 flex justify-center items-center ">
            <div className="bg-white p-6 rounded-lg w-full sm:max-w-md relative text-black">
              <button
                className="fixed top-2 right-3 text-5xl font-bold text-white w-10 h-10"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">Edit Event</h2>

              <div className="mb-4">
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  value={selectedEvent.name}
                  onChange={(e) =>
                    setSelectedEvent({ ...selectedEvent, name: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Description</label>
                <textarea
                  value={selectedEvent.description}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                onClick={handleEditSubmit}
              >
                Update Event
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-center gap-4 mt-6">
          {events.length > 0 && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer mb-8"
            >
              Delete Event
            </button>
          )}
          {/*show model delete event */}
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4 text-red-600">
                  Delete Event By ID
                </h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!deleteEventId) {
                      alert("❗ Please enter a valid Event ID");
                      return;
                    }
                    await handleDeleteEvent(deleteEventId);
                    setShowDeleteModal(false);
                    setDeleteEventId("");
                  }}
                >
                  <label className="block mb-2 font-medium">Event ID</label>
                  <input
                    type="text"
                    value={deleteEventId}
                    onChange={(e) => setDeleteEventId(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-red-700"
                    placeholder="Enter Event ID"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowDeleteModal(false);
                        setDeleteEventId("");
                      }}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Add Event button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#FFFFFF] text-[#020032] cursor-pointer mb-8 hover:bg-[#eeeeeec0] px-4 py-2 rounded"
          >
            Add Event Dates
          </button>
          <button
            onClick={() => setShowaddForm(true)}
            className="bg-[#FFFFFF] text-[#020032] cursor-pointer mb-8 hover:bg-[#eeeeeec0] px-4 py-2 rounded"
          >
            Add Event Type
          </button>
          {/* المودال */}
          {showaddForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">
                  Add New Event Type
                </h2>

                <input
                  type="text"
                  placeholder="Enter event type name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded mb-4 text-red-600"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowaddForm(false)}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => setShowdelForm(!showdelForm)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer mb-8"
          >
            Delete Type Event
          </button>
          <button
            onClick={() => setShowUpdateeventtypeModal(true)}
            className="bg-[#FFFFFF] text-[#020032] cursor-pointer mb-8 hover:bg-[#eeeeeec0] px-4 py-2 rounded"
          >
            Update Event Type
          </button>
          <button
            onClick={() => setShowAddEventModal(true)}
            className="bg-[#FFFFFF] text-[#020032] cursor-pointer mb-8 hover:bg-[#eeeeeec0] px-4 py-2 rounded"
          >
            Add New Event
          </button>
          <AddEventModal
            show={showAddEventModal}
            onClose={() => setShowAddEventModal(false)}
            onAdded={() => fetchEvents()} // دالة الريفريش
          />
          {/* to update event type modal */}
          {showUpdateeventtypeModal && (
            <UpdateEventTypeModal
              show={showUpdateeventtypeModal}
              onClose={() => setShowUpdateeventtypeModal(false)}
              onUpdated={fetchEvents} // أو fetchEventTypes لو عندك فانكشن مخصوص
            />
          )}
          {/* مودال حذف Event Type */}
          {showdelForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4 text-red-600">
                  Delete Event Type
                </h2>
                <input
                  type="text"
                  placeholder="Enter ID to delete"
                  value={id}
                  onChange={(e) => setid(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded mb-4 text-red-600"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowdelForm(false)}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-1 mr-8 flex flex-col mb-6  bg-[#8894A22E]  rounded-xl space-y-6 w-[98%]">
          <Eventdefintion filteredEvents={filteredEvents} />
      </div>
    </div>
  );
}

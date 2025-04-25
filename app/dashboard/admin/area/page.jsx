"use client";
import { useEffect, useState } from "react";
import {
  TrashIcon,
  MagnifyingGlassIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import Image from "next/image";
import AddAreaModal from "./AddAreaModal";
import EditAreaModal from "./EditAreaModal";
import UpdateAreaTypeModal from "./UpdateAreaTypeModal";
import Areadefintoin from "./Areadefintoin";
export default function AreaTable() {
  const [types, setTypes] = useState([]); // كل الأنواع
  const [filteredAreas, setFilteredAreas] = useState([]); // المناطق اللي هتتعرض
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [areaName, setAreaName] = useState("");
  const [areaAddress, setAreaAddress] = useState("");
  const [areaId, setAreaId] = useState("");
  const [search, setSearch] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAreaTypeName, setNewAreaTypeName] = useState("");
  const [showDeleteFormModal, setShowDeleteFormModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [areas, setAreas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [deleteTypeId, setDeleteTypeId] = useState("");
  const [showDeleteareaModal, setShowDeleteareaModal] = useState(false);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI"; // ← عدل التوكن هنا

  const fetchTypes = async () => {
    try {
      const response = await fetch(
        "https://egyptos.runasp.net/api/AreaTypes/GetAll"
      );
      const data = await response.json();
      setTypes(data);
      const allAreas = data.flatMap((type) =>
        type.areas.map((area) => ({ ...area, typeId: type.id }))
      );
      setFilteredAreas(allAreas);
    } catch (error) {
      console.error("Error fetching area types:", error);
    }
  };
  const getSelectStyle = (value, defaultText) => {
    const isAllTypes = defaultText === "All Types";
    const isSelected = value || isAllTypes;
    const base =
      "h-10 rounded-lg text-sm font-semibold px-2 appearance-none cursor-pointer";
    // نخصص العرض حسب نوع السيليكت
    const width =
      defaultText === "Area Name" || defaultText === "Address"
        ? "w-62"
        : "w-40";
    const colors = isSelected
      ? ""
      : "bg-[#0B1120] text-white";
    const transitions = `
     hover:text-white
    focus:bg-white focus:text-[#0B1120]
  `;
    return `${base} ${width} ${colors} ${transitions}`;
  };
  const handleFilter = () => {
    let allAreas = types
      .filter((type) => !selectedTypeId || type.id === parseInt(selectedTypeId))
      .flatMap((type) =>
        type.areas.map((area) => ({ ...area, typeId: type.id }))
      );
    if (areaName) allAreas = allAreas.filter((area) => area.name === areaName);
    if (areaAddress)
      allAreas = allAreas.filter((area) => area.address === areaAddress);
    if (areaId)
      allAreas = allAreas.filter((area) => area.id === parseInt(areaId));
    if (search)
      allAreas = allAreas.filter((area) =>
        area.name.toLowerCase().includes(search.toLowerCase())
      );
    setFilteredAreas(allAreas);
  };
  //deelet area
  const handleDeleteArea = async (id) => {
    if (!id) return alert("Missing ID");
    const confirmDelete = confirm("Are you sure you want to delete this Area?");
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(
        `https://egyptos.runasp.net/api/Areas/Delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200 || res.status === 204) {
        fetchTypes();
      } else {
      }
    } catch (error) {
      if (error.response) {
      } else if (error.request) {
      } else {
      }
    }
  };
  const handleDelete = async () => {
    try {
      await fetch(
        `https://egyptos.runasp.net/api/AreaTypes/Delete/${selectedAreaId}`,
        {
          method: "DELETE",
          headers: { Authorization: token },
        }
      );
      setShowDeleteModal(false);
      setSelectedAreaId(null);
      fetchTypes();
    } catch (error) {
      console.error("Error deleting area:", error);
    }
  };
  useEffect(() => {
    fetchTypes();
  }, []);
  useEffect(() => {
    handleFilter();
  }, [selectedTypeId, areaName, areaAddress, areaId, search]);
  // to create area type
  const handleCreateAreaType = async () => {
    if (!newAreaTypeName.trim()) return;
    try {
      const response = await fetch(
        "https://egyptos.runasp.net/api/AreaTypes/Create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: newAreaTypeName }),
        }
      );

      if (response.ok) {
        setShowCreateModal(false);
        setNewAreaTypeName("");
        fetchTypes(); // لتحديث القائمة بعد الإضافة
      } else {
        const errorData = await response.json();
        console.error("Creation failed:", errorData);
      }
    } catch (error) {
      console.error("Error creating area type:", error);
    }
  };
  // to delete area type
  const handleDeleteTypeById = async () => {
    if (!deleteTypeId.trim()) return;

    try {
      const response = await fetch(
        `https://egyptos.runasp.net/api/AreaTypes/Delete/${deleteTypeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setDeleteTypeId("");
        setShowDeleteFormModal(false);
        fetchTypes(); // لتحديث البيانات
      } else {
        const errorText = await response.text();
        console.error("Delete failed:", errorText);
      }
    } catch (error) {
      console.error("Error deleting Area Type:", error);
    }
  };
  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="mt-1 mr-8 flex flex-col mb-6  bg-[#8894A22E]  rounded-xl space-y-6 w-[98%]">
        <div className="flex p-6 py-5  border-b-[1px] border-[#FFFFFF]">
          <h1 className="text-2xl text-[#FFFFFF]  font-bold">Area </h1>
        </div>

        
        <div className="flex flex-nowrap justify-between p-5  items-center gap-4 ">
          <div className="flex flex-wrap gap-5 items-center justify-start   ">

            <div className="flex flex-wrap gap-4  ">
              {
                [
                  {
                    value: selectedTypeId,
                    onChange: setSelectedTypeId,
                    defaultText: "All Types",
                    options: types.map((type) => ({
                      value: type.id,
                      label: type.name,
                    })),
                  },
                  {
                    value: areaId,
                    onChange: setAreaId,
                    defaultText: "Area ID",
                    options: filteredAreas.map((a) => ({
                      value: a.id,
                      label: a.id,
                    })),
                  },
                  {
                    value: areaName,
                    onChange: setAreaName,
                    defaultText: "Area Name",
                    options: [...new Set(filteredAreas.map((a) => a.name))].map(
                      (name) => ({ value: name, label: name })
                    ),
                  },
                  {
                    value: areaAddress,
                    onChange: setAreaAddress,
                    defaultText: "Address",
                    options: [
                      ...new Set(filteredAreas.map((a) => a.address)),
                    ].map((addr) => ({ value: addr, label: addr })),
                  },
                
                
              ].map((select, i) => (
                <select
                  key={i}
                  value={select.value}
                  onChange={(e) => select.onChange(e.target.value)}
                  className={`${getSelectStyle(
                    select.value,
                    select.defaultText
                  )} w-[150px]  bg-[#FFFFFF21] outline-none text-white p-2 rounded-2xl `}
                >
                  <option value="">{select.defaultText}</option>
                  {select.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>
          {/* السيرش على اليمين */}
          <div className="flex items-center gap-2 bg-[#FFFFFF21] outline-none text-white p-2 rounded-2xl">
            <MagnifyingGlassIcon className="text-white w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              className="bg-transparent outline-none text-white w-40"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
       

        {/* جدول البيانات */}
        <div className="overflow-x-auto p-6 max-h-[600px] text-[13px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded  custom-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-800">
          <table className="border-collapse border border-[#FFFFFF] shadow-sm w-full">
            <thead className="text-[#FFFFFF]">
              <tr>
                <th className="border border-gray-300 py-5">Id</th>
                <th className="border border-gray-300">Name</th>
                <th className="border border-gray-300">Description</th>
                <th className="border border-gray-300">Address</th>
                <th className="border border-gray-300">latitude</th>
                <th className="border border-gray-300"> Long latitude</th>
                <th className="border border-gray-300">Image</th>
                <th className="border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAreas.map((area, index) => (
                <tr key={area.id} className="border-b text-[#FFFFFF]">
                  <td className="border p-2 py-10 text-center border-gray-300">
                    {area.id}
                  </td>
                  <td className="border p-2 text-center py-10 border-gray-300">
                    {area.name}
                  </td>
                  <td className="p-2 py-10 text-center border-r max-w-[200px] max-h-[100px] overflow-auto whitespace-nowrap">
                    {area.description}
                  </td>

                  <td className="border p-2 text-center py-10 border-gray-300">
                    {area.address}
                  </td>
                  <td className="border p-2 text-center py-10 border-gray-300">
                    {area.latitude}
                  </td>
                  <td className="border p-2 text-center py-10 border-gray-300">
                    {area.longitude}
                  </td>
                  <td className="border p-2 text-center py-10 border-gray-300">
                    <Image
                      src={`https://egyptos.runasp.net/${area.imageUrl}`}
                      unoptimized
                      alt="Area"
                      className="w-16 h-16 object-cover mx-auto rounded"
                      width={200}
                      height={200}
                    />
                  </td>
                  <td className="border p-2 text-center py-10 border-gray-300">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedArea(area);
                          setShowEditModal(true);
                        }}
                        className="bg-green-600 text-white px-4 cursor-pointer items-center  hover:bg-green-300 flex mx-1 text-[13px] py-2 rounded"
                      >
                        <PencilIcon className="h-4 w-4 text-white inline-block mr-1" />{" "}
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteArea(area.id)}
                        className="bg-[#C62828] text-white px-4 cursor-pointer items-center  hover:bg-red-300 flex mx-1 text-[13px] py-2 rounded"
                      >
                        <TrashIcon className="h-4 w-4 text-white inline-block mr-1" />{" "}
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal الحذف */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
              <p className="mb-6">
                Are you sure you want to delete this Area Type?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#FFFFFF] text-[#020032] cursor-pointer mb-8 hover:bg-[#eeeeeec0] px-4 py-2 rounded"
          >
            Create Area Type
          </button>
          <button
            onClick={() => setShowDeleteFormModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded  mb-8 cursor-pointer hover:bg-red-500"
          >
            Delete Area Type
          </button>
          {/* زر فتح المودال */}
          <button
            onClick={() => setShowUpdateModal(true)}
            className="bg-[#FFFFFF] text-[#020032] cursor-pointer mb-8 hover:bg-[#eeeeeec0] px-4 py-2 rounded"
          >
            Update Area Type
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#FFFFFF] text-[#020032] cursor-pointer mb-8 hover:bg-[#eeeeeec0] px-4 py-2 rounded"
          >
            Add Area
          </button>
          {/* modal to update area type */}
          {showUpdateModal && (
            <UpdateAreaTypeModal
              show={showUpdateModal}
              onClose={() => setShowUpdateModal(false)}
              onUpdated={fetchTypes}
            />
          )}
          {/* modal to add area */}
          <AddAreaModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            fetchAreas={fetchTypes}
            token={token}
          />
          {showEditModal && selectedArea && (
            <EditAreaModal
              show={showEditModal}
              onClose={() => setShowEditModal(false)}
              onUpdated={fetchTypes}
              area={selectedArea}
            />
          )}

          {/* modal to delete area type */}
          {showDeleteFormModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h3 className="text-lg font-bold mb-4 text-[#0B1120]">
                  Delete Area Type
                </h3>
                <p className="text-[#0B1120] mb-2">
                  Enter the Area Type ID you want to delete:
                </p>
                <input
                  type="number"
                  value={deleteTypeId}
                  onChange={(e) => setDeleteTypeId(e.target.value)}
                  className="w-full px-3 py-2 border rounded mb-4 text-[#0B1120]"
                  placeholder="Type ID"
                />
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => setShowDeleteFormModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={handleDeleteTypeById}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* modal create area type */}
          {showCreateModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h3 className="text-lg font-bold mb-4">Create New Area Type</h3>
                <input
                  type="text"
                  value={newAreaTypeName}
                  onChange={(e) => setNewAreaTypeName(e.target.value)}
                  placeholder="Enter area type name"
                  className="w-full border rounded px-3 py-2 mb-4 text-green-600 text-3xl"
                />
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => {
                      setShowCreateModal(false);
                      setNewAreaTypeName("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={handleCreateAreaType}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-1 mr-8 flex flex-col mb-6  bg-[#8894A22E]  rounded-xl space-y-6 w-[98%]">
        <Areadefintoin types={types} />
      </div>
    </div>
  );
}

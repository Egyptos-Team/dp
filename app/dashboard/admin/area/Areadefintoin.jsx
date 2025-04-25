import React from 'react'

const Areadefintoin = ({types}) => {
  return (
    <div>
      <div className="w-full md:w-1/2 p-5 pb-8 m-auto ">
  <h2 className="text-white text-center p-3 text-lg font-bold mb-2">Area Types (ID ↔ Name)</h2>
  <div className="max-h-[400px] overflow-y-auto border border-gray-500 rounded-lg">
    <table className="border-collapse border border-[#FFFFFF] shadow-sm w-full">
      <thead className="text-[#FFFFFF]">
        <tr>
          <th className="border border-gray-300 py-5">Type ID</th>
          <th className="border border-gray-300 ">Type Name</th>
        </tr>
      </thead>
      <tbody className="">
        {types.map((type) => (
          <tr key={type.id} className="border-b text-[#FFFFFF]">
            <td className="border p-2 text-center">{type.id}</td>
            <td className="border p-2 text-center">{type.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>
  )
}

export default Areadefintoin

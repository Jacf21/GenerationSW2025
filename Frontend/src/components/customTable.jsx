import React from "react";

const CustomTable = ({ columns, data, onRowSelect, selectedRowId }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-2xl">
      <table className="min-w-full border border-gray-200 bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="py-2 px-4 text-left font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowSelect && onRowSelect(row)}
              className={`cursor-pointer hover:bg-blue-50 ${
                selectedRowId === row.id ? "bg-blue-100" : ""
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="py-2 px-4 border-t">
                  {row[col.key]?.toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;

import React, { useState } from "react";
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import RecordModel from "./RecordModel";
import {
  deleteRecord,
  setSearchTerm,
  selectSearchTerm,
  selectFilteredRecords,
} from "../store/recordsSlice";
import { useDispatch, useSelector } from "react-redux";

function RecordTable() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const filteredRecords = useSelector(selectFilteredRecords);
  const sortedRecords = [...filteredRecords].sort((a, b) => b.id - a.id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      dispatch(deleteRecord(id));
    }
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentRecord(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Employee Management</h1>
          <p className="text-gray-600 mb-4">Manage employee records with Redux Toolkit</p>

          {/* Search and Add */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                  placeholder="Search by name, email or position"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleAddNew}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              <FiPlus size={20} />
              Add New Record
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Position</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedRecords.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  sortedRecords.map((record) => (
                    <tr key={record.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">{record.id}</td>
                      <td className="py-3 px-4">{record.name}</td>
                      <td className="py-3 px-4">{record.email}</td>
                      <td className="py-3 px-4">{record.phone}</td>
                      <td className="py-3 px-4">{record.position}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(record)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {sortedRecords.length} record{sortedRecords.length !== 1 && "s"}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <RecordModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentRecord(null);
        }}
        currentRecord={currentRecord}
      />
    </div>
  );
}

export default RecordTable;

import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addRecord, updateRecord } from "../store/recordsSlice";

function RecordModel({ isOpen, onClose, currentRecord }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (currentRecord) {
      setForm({
        name: currentRecord.name || "",
        email: currentRecord.email || "",
        phone: currentRecord.phone || "",
        location: currentRecord.position || "",
      });
    } else {
      setForm({ name: "", email: "", phone: "", location: "" });
    }
  }, [currentRecord]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const recordData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      position: form.location,
    };

    if (currentRecord) {
      dispatch(updateRecord([currentRecord.id, recordData]));
    } else {
      dispatch(addRecord(recordData));
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {currentRecord ? "Edit Record" : "Add New Record"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Position"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {currentRecord ? "Update" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecordModel;

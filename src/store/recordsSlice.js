import { createSlice } from "@reduxjs/toolkit";

const demoRecords = [
  {
    id: 1,
    name: "Batoul Ahmad",
    email: "batoul@example.com",
    phone: "+963-944-123456",
    position: "Manager",
  },
  {
    id: 2,
    name: "Ali Hasan",
    email: "ali.hasan@example.com",
    phone: "+963-933-654321",
    position: "Developer",
  },
  {
    id: 3,
    name: "Sara Khaled",
    email: "sara.k@example.com",
    phone: "+963-988-112233",
    position: "Developer",
  },
  {
    id: 4,
    name: "Omar Youssef",
    email: "omar.y@example.com",
    phone: "+963-991-445566",
    position: "Developer",
  },
  {
    id: 5,
    name: "Lina Fadel",
    email: "lina.f@example.com",
    phone: "+963-944-778899",
    position: "Developer",
  },
];

const loadRecordFromLocalStorage = () => {
  try {
    const savedRecord = localStorage.getItem("employeerecords");
    return savedRecord ? JSON.parse(savedRecord) : demoRecords;
  } catch (error) {
    console.error("Error loading records", error);
    return demoRecords;
  }
};

const calculateNextId = (records) => {
  if (!records || records.length === 0) return 1;
  return Math.max(...records.map((r) => r.id)) + 1;
};

const recordsSlice = createSlice({
  name: "records",
  initialState: {
    items: loadRecordFromLocalStorage(),
    searchTerm: "",
    nextId: calculateNextId(loadRecordFromLocalStorage()),
  },
  reducers: {
    addRecord: (state, action) => {
      const newRecord = { id: state.nextId, ...action.payload };
      state.items.push(newRecord);
      localStorage.setItem("employeerecords", JSON.stringify(state.items));
      state.nextId = calculateNextId(state.items);
    },
    updateRecord: (state, action) => {
      const [id, data] = action.payload;
      const index = state.items.findIndex((r) => r.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...data };
        localStorage.setItem("employeerecords", JSON.stringify(state.items));
      }
    },
    deleteRecord: (state, action) => {
      state.items = state.items.filter((r) => r.id !== action.payload);
      localStorage.setItem("employeerecords", JSON.stringify(state.items));
      state.nextId = calculateNextId(state.items);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    resetAllRecords: (state) => {
      state.items = demoRecords;
      state.nextId = calculateNextId(demoRecords);
      localStorage.setItem("employeerecords", JSON.stringify(demoRecords));
    },
  },
});

export const {
  addRecord,
  updateRecord,
  deleteRecord,
  setSearchTerm,
  resetAllRecords,
} = recordsSlice.actions;

export const selectSearchTerm = (state) => state.records.searchTerm;
export const selectAllRecords = (state) => state.records.items;
export const selectFilteredRecords = (state) => {
  const term = state.records.searchTerm.toLowerCase();
  return state.records.items.filter(
    (r) =>
      r.name.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.position.toLowerCase().includes(term)
  );
};

export default recordsSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import recordsReducer from "./recordsSlice"; // أو المسار الصحيح حسب مكان الملف

export const store = configureStore({
  reducer: {
    records: recordsReducer,
  },
});

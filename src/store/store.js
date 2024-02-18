import { configureStore } from "@reduxjs/toolkit";
import { excelSlice } from "./slice/excelSlice";

export const store = configureStore({
  reducer: {
    [excelSlice.name]: excelSlice.reducer,
  },
});

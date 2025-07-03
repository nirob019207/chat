import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TDuration = {
  salesDuration: string;
  customerDuration: string;
  language: string;
};

const initialState: TDuration = {
  salesDuration: "monthly",
  customerDuration: "monthly",
  language: "Eng",
};

const dashboardSlice = createSlice({
  name: "dashboard", // ✅ Use a meaningful name
  initialState,
  reducers: {
    setSalesChartDuration: (state, action: PayloadAction<string>) => {
      state.salesDuration = action.payload;
    },
    setCustomerChartDuration: (state, action: PayloadAction<string>) => {
      state.customerDuration = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setSalesChartDuration, setCustomerChartDuration, setLanguage } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;

export const seletSalesChartDuration = (state: RootState) =>
  state.dashboard.salesDuration;
export const seletCustomerChartDuration = (state: RootState) =>
  state.dashboard.customerDuration;
export const seletLanguage = (state: RootState) => state.dashboard.language;

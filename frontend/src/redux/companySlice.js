import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompsny: null,
  },
  reducers: {
    // actions
    setSingleCompany: (state, action) => {
      state.singleCompsny = action.payload;
    },
  },
});

export const { setSingleCompany } = companySlice.actions;
export default companySlice.reducer;

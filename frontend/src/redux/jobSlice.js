import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    allAdminJobs: [],
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    savedJobs: [],
  },
  reducers: {
    // actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    saveJobForLater: (state, action) => {
      const job = action.payload;
      const savedJobs = state.savedJobs || []; // ✅ Ensure fallback before usage
      const alreadySaved = savedJobs.find((j) => j._id === job._id);

      if (!alreadySaved) {
        state.savedJobs = [...savedJobs, job];
      }
    },

    removeSavedJob: (state, action) => {
      state.savedJobs = state.savedJobs.filter((j) => j._id !== action.payload);
    },
  },
});

export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery, saveJobForLater, removeSavedJob } = jobSlice.actions;
export default jobSlice.reducer;

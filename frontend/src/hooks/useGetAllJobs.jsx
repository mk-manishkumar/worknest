import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "../utils/constant";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery, allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    if (allJobs.length === 0 || searchedQuery) {
      fetchAllJobs();
    }
  }, [dispatch, searchedQuery]);
};

export default useGetAllJobs;

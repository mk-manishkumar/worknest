import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { saveJobForLater } from "@/redux/jobSlice";

const useGetSavedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/saved-jobs`, {
          withCredentials: true,
        });

        if (res.data.success && Array.isArray(res.data.savedJobs)) {
          res.data.savedJobs.forEach((job) => {
            dispatch(saveJobForLater(job));
          });
        } else {
          console.warn("Saved jobs is not an array or fetch failed.");
        }
      } catch (error) {
        console.error("Failed to fetch saved jobs:", error);
        toast.error("Failed to load saved jobs");
      }
    };

    fetchSaved();
  }, []);
};

export default useGetSavedJobs;

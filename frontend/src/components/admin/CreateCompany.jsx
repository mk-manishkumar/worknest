import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setSingleCompany } from "../../redux/companySlice";
import Footer from "../shared/Footer";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow w-full px-4 sm:px-6 md:max-w-4xl md:mx-auto py-6 md:py-10">
        <div className="mb-6 md:mb-10">
          <h1 className="font-bold text-xl md:text-2xl">Your Company Name</h1>
          <p className="text-gray-500 text-sm md:text-base mt-2">What name would you like to give your company? You can change it later.</p>
        </div>

        <Label className="text-sm md:text-base">Company Name</Label>
        <Input type="text" className="w-full my-2" placeholder="Worknest, Meta, Google" onChange={(e) => setCompanyName(e.target.value)} />

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 md:mt-10">
          <Button className="w-full sm:w-auto cursor-pointer order-2 sm:order-1" variant="outline" onClick={() => navigate("/admin/companies")}>
            Cancel
          </Button>
          <Button onClick={registerNewCompany} className="w-full sm:w-auto cursor-pointer order-1 sm:order-2">
            Continue
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateCompany;

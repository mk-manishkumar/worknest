import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import useGetCompanyById from "./../../hooks/useGetCompanyById";
import Footer from "../shared/Footer";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow w-full px-4 md:max-w-xl md:mx-auto py-6 md:py-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-3 mb-6 p-2 sm:p-4">
            <Button variant="outline" className="p-2 sm:p-3 flex items-center gap-1 sm:gap-2 text-gray-500 text-xs sm:text-sm cursor-pointer" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <h2 className="font-bold text-lg sm:text-xl">Company Setup</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">Company Name</Label>
              <Input type="text" name="name" value={input.name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Description</Label>
              <Input type="text" name="description" value={input.description} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Website</Label>
              <Input type="text" name="website" value={input.website} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Location</Label>
              <Input type="text" name="location" value={input.location} onChange={handleChange} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-sm">Company Logo</Label>
              <Input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
            </div>
          </div>

          <Button type="submit" className="w-full mt-6 md:mt-8 cursor-pointer" disabled={loading}>
            {loading ? "Please wait.." : "Update"}
          </Button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CompanySetup;

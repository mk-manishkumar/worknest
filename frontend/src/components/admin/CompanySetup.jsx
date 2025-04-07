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
    <div>
      <Navbar />

      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold cursor-pointer" onClick={() => navigate(-1)}>
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h2 className="font-bold text-xl">Company Setup</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-3">Company Name</Label>
              <Input type="text" name="name" value={input.name} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-3">Description</Label>
              <Input type="text" name="description" value={input.description} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-3">Website</Label>
              <Input type="text" name="website" value={input.website} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-3">Location</Label>
              <Input type="text" name="location" value={input.location} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-3">Company Logo</Label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4" disabled>
              Please wait..
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default CompanySetup;

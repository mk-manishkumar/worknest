import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import Footer from "../shared/Footer";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow max-w-6xl mx-auto my-10 w-full">
        <div className="flex justify-between items-center my-5">
          <Input className="w-fit" placeholder="Filter by name" onChange={(e) => setInput(e.target.value)} />
          <Button onClick={() => navigate("/admin/companies/create")} className="cursor-pointer">
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
      <Footer />
    </div>
  );
};

export default Companies;

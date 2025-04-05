import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import Footer from "../shared/Footer";

const Companies = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 mb-61 ">
        <div className="flex justify-between items-center my-5">
          <Input className="w-fit" placeholder="Filter by name" />
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

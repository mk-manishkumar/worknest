import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Delete, Edit2, MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";

const CompaniesTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState([]);

  useEffect(() => {
    const filtered =
      companies?.filter((company) => {
        if (!searchCompanyByText) return true;
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      }) || [];

    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  // DELETE company from DB + Redux
  const handleDeleteClick = async (companyId) => {
    try {
      const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Company deleted");

        // Update Redux
        const updatedCompanies = companies.filter((c) => c._id !== companyId);
        dispatch(setCompanies(updatedCompanies));
      }
    } catch (error) {
      console.error("Company delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete company");
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="text-xs sm:text-sm">A list of your recently registered companies</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterCompany.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground text-sm">
                  You haven't registered any companies yet
                </TableCell>
              </TableRow>
            ) : (
              filterCompany.map((company) => (
                <TableRow key={company._id}>
                  <TableCell>
                    <Avatar className="w-8 h-8 md:w-10 md:h-10">
                      <AvatarImage src={company?.logo || "https://assets.turbologo.com/blog/en/2019/05/19085137/no-logo.png"} />
                    </Avatar>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm font-medium">{company.name}</TableCell>
                  <TableCell className="hidden sm:table-cell text-xs sm:text-sm">{company.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer w-5 h-5 ml-auto" />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 p-2">
                        <button type="button" className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded-md text-xs sm:text-sm" onClick={() => navigate(`/admin/companies/${company._id}`)}>
                          <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Edit</span>
                        </button>

                        <button type="button" className="flex items-center w-full gap-2 p-2 hover:bg-gray-100 rounded-md mt-1 text-red-600 text-xs sm:text-sm" onClick={() => handleDeleteClick(company._id)}>
                          <Delete className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Delete</span>
                        </button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompaniesTable;

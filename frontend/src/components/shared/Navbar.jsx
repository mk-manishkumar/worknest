import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User2, LogOut, Menu, X, Bookmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
        setMobileMenuOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const NavLinks = () => (
    <ul className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-5 font-medium">
      {user && user.role === "recruiter" ? (
        <>
          <li className="w-full md:w-auto">
            <Link to="/admin/companies" className="block py-2 md:py-0 hover:text-[#F83002]" onClick={() => setMobileMenuOpen(false)}>
              Companies
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <Link to="/admin/jobs" className="block py-2 md:py-0 hover:text-[#F83002]" onClick={() => setMobileMenuOpen(false)}>
              Jobs
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="w-full md:w-auto">
            <Link to="/" className="block py-2 md:py-0 hover:text-[#F83002]" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <Link to="/jobs" className="block py-2 md:py-0 hover:text-[#F83002]" onClick={() => setMobileMenuOpen(false)}>
              Jobs
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <Link to="/browse" className="block py-2 md:py-0 hover:text-[#F83002]" onClick={() => setMobileMenuOpen(false)}>
              Browse
            </Link>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <div className="bg-white">
      <div className="px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Work<span className="text-[#F83002]">nest</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6 lg:gap-12">
            <NavLinks />

            {!user ? (
              <div className="flex gap-2 items-center">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-sm">Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer h-8 w-8 md:h-10 md:w-10">
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-64 md:w-80">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer h-10 w-10">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <>
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                          <User2 size={18} />
                          <Button variant="link" className="p-0 h-auto" onClick={() => setMobileMenuOpen(false)}>
                            <Link to="/profile">View Profile</Link>
                          </Button>
                        </div>
                        <div className="flex w-fit items-center gap-2 cursor-pointer mt-2">
                          <Bookmark size={18} />
                          <Button variant="link" className="p-0 h-auto" onClick={() => setMobileMenuOpen(false)}>
                            <Link to="/save-for-later">Saved Jobs</Link>
                          </Button>
                        </div>
                      </>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer mt-2">
                      <LogOut size={18} />
                      <Button onClick={logoutHandler} variant="link" className="p-0 h-auto">
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="h-10 w-10 p-2" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <NavLinks />

              {!user ? (
                <div className="flex gap-2 items-center pt-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button variant="primary" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">Signup</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-4 pt-2">
                  <Avatar className="cursor-pointer h-10 w-10">
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    {user && user.role === "student" && (
                      <>
                        <div className="flex items-center gap-2 cursor-pointer text-sm">
                          <User2 size={14} />
                          <Link to="/profile" className="text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                            View Profile
                          </Link>
                        </div>
                        <div className="flex w-fit items-center gap-2 cursor-pointer mt-1">
                          <Bookmark size={14} />
                          <Link to="/save-for-later" className="text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                            Saved Jobs
                          </Link>
                        </div>
                      </>
                    )}
                    <div className="flex items-center gap-2 cursor-pointer text-sm mt-1">
                      <LogOut size={14} />
                      <button onClick={logoutHandler} className="text-blue-600">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

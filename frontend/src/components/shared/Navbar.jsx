import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, User2, LogOut, Bookmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";
import NavLinks from "./NavLinks";

const DEFAULT_AVATAR_URL = "https://assets.turbologo.com/blog/en/2019/05/19085137/no-logo.png";

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
      console.error(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white">
      <div className="px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Work<span className="text-[#F83002]">nest</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-12">
            <NavLinks user={user} setMobileMenuOpen={setMobileMenuOpen} />

            {!user ? (
              <div className="flex gap-2 items-center">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="text-sm cursor-pointer">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-sm cursor-pointer">Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer h-8 w-8 md:h-10 md:w-10">
                    <AvatarImage src={user?.profile?.profilePhoto || DEFAULT_AVATAR_URL} alt={user?.fullname || "User Avatar"} />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-64 md:w-80">
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.profile?.profilePhoto || DEFAULT_AVATAR_URL} />
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user?.fullname}</h4>
                        <p className="text-xs text-gray-500">{user?.profile?.bio}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2 border-t">
                      {/* Student: profile + saved + logout */}
                      {user?.role === "student" && (
                        <>
                          <Button
                            variant="ghost"
                            className="justify-start gap-2"
                            onClick={() => {
                              navigate("/profile");
                            }}
                          >
                            <User2 size={16} /> View Profile
                          </Button>

                          <Button
                            variant="ghost"
                            className="justify-start gap-2"
                            onClick={() => {
                              navigate("/save-for-later");
                            }}
                          >
                            <Bookmark size={16} /> Saved Jobs
                          </Button>
                        </>
                      )}

                      {/* Recruiter: only logout */}
                      <Button variant="ghost" className={`justify-start gap-2 ${user?.role === "recruiter" ? "text-red-500" : ""}`} onClick={logoutHandler}>
                        <LogOut size={16} /> Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="h-10 w-10 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <NavLinks user={user} setMobileMenuOpen={setMobileMenuOpen} />

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
                    <AvatarImage src={user?.profile?.profilePhoto || DEFAULT_AVATAR_URL} alt={user?.fullname || "User Avatar"} />
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">{user?.fullname}</h4>

                    {user?.role === "student" && (
                      <>
                        <div className="flex items-center gap-2 cursor-pointer text-sm mt-2">
                          <User2 size={14} />
                          <Link to="/profile" className="text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                            View Profile
                          </Link>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer text-sm mt-1">
                          <Bookmark size={14} />
                          <Link to="/save-for-later" className="text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                            Saved Jobs
                          </Link>
                        </div>
                      </>
                    )}

                    <div className="flex items-center gap-2 cursor-pointer text-sm mt-2">
                      <LogOut size={14} />
                      <Button onClick={logoutHandler} className="text-blue-600 p-0 h-auto">
                        Logout
                      </Button>
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

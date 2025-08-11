import { Link } from "react-router-dom";

const NavLinks = ({ user, setMobileMenuOpen }) => (
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

export default NavLinks;

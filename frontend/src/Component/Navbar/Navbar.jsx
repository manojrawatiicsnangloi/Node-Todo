import Cookies from "js-cookie";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

    const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Todo App</span>
      </div>
      
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow hidden">
          {/* Navlinks */}
          {isLoggedIn ? (
           <>

            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

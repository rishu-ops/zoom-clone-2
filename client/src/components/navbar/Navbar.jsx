import React, { useState } from "react";
import { Homeimage9, dropdownImage } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contex/Auth";
import axios from "axios";
import { baseUrl } from "../../config";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [flag, Setflag] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${baseUrl}/logout`);
      setAuth({
        ...auth,
        user: null,
        token: "",
      });

      localStorage.removeItem("auth");
      // Consider using a user-friendly alert library here
      alert("Logout successfully");
      navigate("/");
    } catch (error) {
      alert("Somthing Went Wrong While Logging Out ");
    }
  };

  const handleClick = () => {
    Setflag(!flag);
  };

  return (
    <div className="sticky top-0 left-0 right-0 bg-white z-10">
      <div className="flex justify-between p-6  ">
        <div>
          <Link to="/">
            <img src={Homeimage9} alt="" className="h-10" />
          </Link>
        </div>

        <div className="lg:flex md:flex gap-5 text-xl font-semibold hidden">
          <button className="border border-blue-600  rounded-2xl pl-2 pr-2 text-blue-700 ">
            Contact Sales
          </button>

          {!auth?.user ? (
            <>
              <button className="bg-blue-600 hover:bg-blue-700 text-white  pl-4 pr-4 w-[120px] rounded-2xl flex items-center justify-center">
                <Link to={"/signup"}>Sing Up </Link>
              </button>

              <button className="bg-blue-600 hover:bg-blue-700 text-white pl-4 pr-4  w-[120px] rounded-2xl flex items-center justify-center">
                <Link to={"/signin"}> Sing In </Link>
              </button>
            </>
          ) : (
            <>
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl pl-2 pr-2 ">
                <Link to={"/dashboard"}> My Account </Link>
              </button>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl pl-2 pr-2"
                onClick={handleLogout}
              >
                <Link to={"/signin"}> Log Out </Link>
              </button>
            </>
          )}
        </div>

        <div className="lg:hidden md:hidden flex">
          <img
            src={dropdownImage}
            alt=""
            className="h-6"
            onClick={handleClick} // Attach onClick event handler
            style={{ cursor: "pointer" }} // Optionally change cursor to pointer
          />
        </div>
      </div>

      {flag || (
        <div
          className="w-full flex flex-col text-center items-center lg:hidden md:hidden"
          onClick={handleClick}
        >
          <button className="border border-gray-300  text-gray-800 w-full h-10 hover:text-blue-700 ">
            Contact Sales
          </button>

          {!auth?.user ? (
            <>
              <button className="border border-gray-300  text-gray-800 w-full h-10 hover:text-blue-700 ">
                <Link to={"/signup"}>Sing Up </Link>
              </button>

              <button className="border border-gray-300  text-gray-800 w-full h-10 hover:text-blue-700 ">
                <Link to={"/signin"}> Sing In </Link>
              </button>
            </>
          ) : (
            <>
              <button className="border border-gray-300  text-gray-800 w-full h-10 hover:text-blue-700  ">
                <Link to={"/dashboard"}> My Account </Link>
              </button>

              <button
                className="border border-gray-300  text-gray-800 w-full h-10 hover:text-blue-700  "
                onClick={handleLogout}
              >
                <Link to={"/signin"}> Log Out </Link>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

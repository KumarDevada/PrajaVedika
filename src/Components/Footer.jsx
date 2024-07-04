import React from "react";
import Logo from "../assets/logo4.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate()
  return (
    <div>
      <div className="h-fit w-full mt-[20vh] md:flex flex-col justify-center shadow-0  p-5">
        <div>
          <h1 className="font-semibold font-montserrat text-xl text-[#FEFBE5] text-left">
            You can help <br /> Shape the Future
          </h1>
        </div>

        <div className="mt-5 flex justify-between items-center flex-col">
          <div className="w-[300px]">
            <img src={Logo} alt="logo" className="w-full" />
          </div>

          <div>
          <ul className="flex flex-col items-center mt-3 gap-2">
            <li
              className="font-semibold font-montserrat  hover:text-[#ff5757] cursor-pointer"
              onClick={() => navigate("/")}
            >
              <a>Home</a>
            </li>
            <li
              className="font-semibold font-montserrat  hover:text-[#ff5757] cursor-pointer"
              onClick={() => navigate("/mlaprofile")}
            >
              <a>MLA</a>
            </li>
            
          </ul>
          </div>
        </div>
        <div className="flex  items-center justify-center mt-5">
          <h1 className="flex justify-center text-xl text-left   font-montserrat font-semibold gap-2">
            Created by<span className="font-bold text-xl  font-montserrat text-orange-500">PrajaVedika</span>Team
          </h1>
          </div>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import Logo from "../assets/logofinal.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate()
  return (
    <div>
      <div className="h-fit w-full mt-[20vh] flex items-center flex-col md:flex-row justify-evenly shadow-md bg-blue-100  p-5">
          <div className=" w-48 md:w-[250px]">
            <img src={Logo} alt="logo" className="w-full" />
          </div>

          
        
        <div>
          <h1 className="font-semibold mt-3 font-montserrat text-2xl text-slate-500 text-left">
            Social Media <i className="fa-solid fa-hashtag"></i>
          </h1>
          <div>
          <ul className="flex flex-col items-center mt-3 gap-2">
            <li
              className="font-semibold font-montserrat  text-slate-600 hover:text-white cursor-pointer"
              
            >
              <a href="https://www.facebook.com/profile.php?id=61562119770018"><i className="fa-brands fa-facebook"></i> FaceBook</a>
            </li>
            <li
              className="font-semibold font-montserrat  text-slate-600 hover:text-white cursor-pointer"
              
            >
              <a href="https://x.com/prajavedikha"><i className="fa-brands fa-twitter"></i> Twitter</a>
            </li>
            <li
              className="font-semibold font-montserrat  text-slate-600 hover:text-white cursor-pointer"
              
            >
              <a href="https://www.instagram.com/prajavedikaofficial/"><i className="fa-brands fa-square-instagram"></i> Instagram</a>
            </li>
            
            
            
          </ul>
          </div>

        </div>

        <div className="mt-2 flex items-center flex-col">
          
          <h1 className="font-semibold mt-3 font-montserrat text-2xl text-slate-500 text-left">Quick Links <i className="fa-solid fa-link"></i></h1>

          <div>
          <ul className="flex flex-col items-center mt-3 gap-2">
            <li
              className="font-semibold font-montserrat  text-slate-600 hover:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              <a><i className="fa-solid fa-house"></i> Home</a>
            </li>
            <li
              className="font-semibold font-montserrat  text-slate-600 hover:text-white cursor-pointer"
              onClick={() => navigate("/mlaprofile")}
            >
              <a><i className="fa-solid fa-crown"></i> MLA</a>
            </li>
            <li
              className="font-semibold font-montserrat  text-slate-600 hover:text-white cursor-pointer"
              
            >
              <a href="https://en.wikipedia.org/wiki/Prathipadu,_Kakinada_district" target="_blank"> <i className="fa-solid fa-location-dot"></i> Pratipadu</a>
            </li>
            
          </ul>
          </div>
        </div>
        <div className="flex flex-col  items-center justify-center mt-2">
          <h1 className="font-semibold mt-3 font-montserrat text-2xl text-slate-500 text-left">
            Support
          </h1>
          <ul className="flex flex-col items-center mt-3 gap-2">
            <li
              className="font-semibold font-montserrat  text-slate-600  cursor-pointer"
              
            >
              <h1><i className="fa-solid fa-envelope"></i> prajavedikaofficial@gmail.com</h1>
            </li>
            <li
              className="font-semibold font-montserrat  text-slate-600  cursor-pointer"
              
            >
              <h1><i className="fa-solid fa-phone"></i> +91 934343434</h1>
            </li>
            
          </ul>

          <div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

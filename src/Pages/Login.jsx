import React from "react";
import { useContext } from "react";
import gsap from "gsap";
import Context from "../context/Context";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Wrapper , Loading} from "../Components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { set } from "mongoose";



const Login = () => {
  const { mandalVillageData, isdark , islogin, setislogin , setUser } = useContext(Context);
  // const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Aadhar, setAadhar] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");

  const [flag, setflag] = useState(true);
  
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const [selectedMandal, setSelectedMandal] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  const handleCountryChange = (e) => {
    setSelectedMandal(e.target.value);
    setSelectedVillage(''); // Reset Village when country changes
  };

  const handleVillageChange = (e) => {
    setSelectedVillage(e.target.value);
  };




  const login = async () => {
    if (PhoneNumber === "" || Password === "") {
      alert("Please fill all the fields");
    } else {
      try {
        // navigate('/')
        
        console.log('login button clicked');
        setloading(true);
        const res = await fetch(
          "https://prajavedika-backend.onrender.com/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phoneNumber: PhoneNumber, password: Password }),
          }
        );

        const data = await res.json();
        console.log(data?.user);
        setloading(false);
        if (res.status == 200) {
          setUser(data?.user);
          setislogin(true);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        } else {
          alert(data?.msg)
        }
      } catch (error) {
        alert("Internal Server Error");
      }
    }
  };

  const Register = async () => {
    if (Username === "" || Password === "") {
      alert("Please fill all the fields");
    } else {
      try {
        // navigate('/')
        const user = {
          Username,
          Password,
          Aadhar,
          PhoneNumber,
          selectedMandal,
          selectedVillage
        }
        console.log(user);
        setloading(true);
        const res = await fetch(
          "https://prajavedika-backend.onrender.com/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({username: Username, phoneNumber: PhoneNumber, mandalName: selectedMandal, villageName: selectedVillage, aadhar: Aadhar, password: Password }),
          }
        );
    
        const data = await res.json();
        setloading(false);
        if (res.status == 201) {
          alert("User Created Successfully")
          setislogin(true)
          setflag(true);
        } else {
          alert("Aadhar or phone number already exists");
        }
      } catch (error) {
        setloading(false);
        alert("Internal Server Error");
      }
    }
    
  }

  return (
    <Wrapper>
      {loading && <Loading />}
      <div className="flex w-full py-4 md:px-[8vw] justify-center ">
        

        {/* Login Cred */}
        {flag ? (<div className="auth w-80 bg-white h-fit flex flex-col items-center shadow-xl p-6  rounded-xl">
          <div>
            <h1 className=" mt-2 font-montserrat text-center font-bold text-3xl text-orange-500">
              User Login @ Praja Vedika
            </h1>
            <p className=" font-montserrat text-slate-500 font-light text-center">
              Please enter your details
            </p>
          </div>

          <div className="flex flex-col items-center mt-4 gap-[2vh] md:w-fit  w-full ">
            
            <div className=" border-b-2  flex">
              <input
                type="text"
                className=" mt-0 bg-white w-full rounded-lg p-4 font-montserrat  font-medium"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                value={PhoneNumber}
                placeholder="phone number"
              />
            </div>
            <div className=" border-b-2 flex">
              <input
                type="password"
                className=" mt-2 bg-white w-full rounded-lg  p-4 font-montserrat  font-medium "
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={Password}
                placeholder="Password"
              />
            </div>
            <div className="w-full justify-center flex">
              
              <button
                className=" font-montserrat px-2 rounded-md text-blue-800 font-medium   hover:text-[#01796f] hover:scale-105 transition-transform"
                onClick={() => {setflag(false)}}
              >
                Not a User? Register
              </button>
            </div>
          </div>

          <div className="w-full mt-8">
            <button
              className="text-md bg-blue-400 w-full font-poppins font-medium  shadow-sm p-3 rounded-md hover:bg-green-400 active:bg-green-500 hover:scale-105 transition-transform"
              onClick={() => login()}
            >
              Login
            </button>
            
          </div>
        </div>) : (
        
        // Register
        
        <div className="auth w-80 md:w-1/2 bg-white  h-fit flex flex-col items-center shadow-xl p-6  rounded-xl ">
          <div>
            <h1 className="mt-4 text-center font-montserrat font-bold text-3xl text-orange-500 ">
              Register with Praja Vedika
            </h1>
            <p className=" font-montserrat font-light text-center">
              Please fill your details to register
            </p>
          </div>

          <div className="flex flex-col items-center mt-4 gap-[2vh] md:w-fit  w-full ">
            <div className="w-full flex flex-col md:flex-row md:gap-2">
            <div className=" border-b-2   flex ">
                  <input
                    type="text"
                    className=" mt-2 w-56 bg-white rounded-lg p-4 font-montserrat  font-medium  "
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    value={Username}
                    placeholder="user name"
                  />
                </div>
                <div className=" border-b-2   flex ">
                  <input
                    type="password"
                    className=" mt-2 w-56 bg-white rounded-lg p-4 font-montserrat  font-medium  "
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={Password}
                    placeholder="password"
                  />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row md:gap-2">
              <div className=" border-b-2  flex ">
                <input
                  type="text"
                  className=" mt-2 w-56 bg-white rounded-lg  p-4 font-montserrat  font-medium "
                  onChange={(e) => {
                    setAadhar(e.target.value);
                  }}
                  value={Aadhar}
                  placeholder="aadhar number"
                />
              </div>

              <div className=" border-b-2  flex ">
                <input
                  type="text"
                  className=" mt-2 w-56 bg-white rounded-lg  p-4 font-montserrat  font-medium "
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  value={PhoneNumber}
                  placeholder="phone number"
                />
              </div>
            </div>
            
          
            
            <div className=" w-full flex flex-col md:flex-row md:gap-2 justify-between">
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                  Mandal
                </label>
                <select
                  id="country"
                  value={selectedMandal}
                  onChange={handleCountryChange}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Select a Mandal</option>
                  {Object.keys(mandalVillageData).map((mandal) => (
                    <option key={mandal} value={mandal}>
                      {mandal}
                    </option>
                  ))}
                </select>
              </div>

              {/* Village Dropdown */}
              {selectedMandal && (
                <div className="mb-4 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Village">
                    Village
                  </label>
                  <select
                    id="Village"
                    value={selectedVillage}
                    onChange={handleVillageChange}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="">Select a Village</option>
                    {mandalVillageData[selectedMandal].mptc.map((item) => (
                      item.villages.map((village,index) => (
                        <option key={index} value={village}>
                          {village}
                        </option>
                      ))
                    ))}
                  </select>
                </div>
              )}
                
            </div>
            <div className="w-full flex justify-center">
            <button
                className=" font-montserrat text-center font-medium text-blue-800 p-2 rounded-md  hover:text-[#01796f] hover:scale-105 transition-transform"
                onClick={() => {setflag(true)}}
              >
                Already a User?
              </button>
            </div>
          </div>

          <div className=" w-full mt-8">
            <button
              className="text-md w-full font-poppins font-medium  shadow-md p-3 rounded-md bg-blue-400 hover:bg-green-400 active:bg-green-500 hover:scale-105 transition-transform"
              onClick={() => Register()}
            >
              Sign up
            </button>
            
          </div>
        </div>)}
        
      </div>
    </Wrapper>
  );
};

export default Login;

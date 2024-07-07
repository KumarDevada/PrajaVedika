import React from 'react'
import { useContext } from "react";
import Context from "../context/Context";
import { useState } from "react";
import { Wrapper , Loading} from "../Components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { set } from "mongoose";


const AdminLogin = () => {

  const { isdark ,mladata, islogin, setislogin ,setadmin,  setUser, mandalVillageData } = useContext(Context);

  const [adminid, setadminid] = useState("");
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const [flag, setflag] = useState(true) 

  


  const login = async () => {
    if (adminid === '') {
      alert('Please enter a valid admin ID');
      return;
    }

    console.log('checking if adminType is mpp')
    if(adminType == 'mpp') {
      setloading(true);
      let adminFound = false;

      // Loop over each mandal in mandalVillageData
      for (const mandal in mandalVillageData) {
        // console.log(mandal);
          if(mandalVillageData[mandal].mpp.phone === adminid) {
            alert('Login successful');
              const temp = {
                username : mandalVillageData[mandal].mpp.name,
                mandalName : mandal,
                villageName : mandal,
                mpp: true,
              }
              localStorage.setItem("user", JSON.stringify(temp));
              setUser(temp);
              setislogin(true);
              setadmin('mpp');
              setloading(false);
              adminFound = true;
              break;
          }
        
      }
  
      if (!adminFound) {
        alert('MPP not found');
        setloading(false);
      }
      else navigate('/')

    }
    else if(adminType == 'mla') {

      setloading(true);
      let adminFound = false;

      if(adminid === mladata.phone) {
        alert('Login successful');
          const temp = {
            username : mladata.name,
            mandalName : 'Prathipadu',
            villageName : 'Prathipadu',
            mla : true,
          }
          localStorage.setItem("user", JSON.stringify(temp));
          setUser(temp);
          setislogin(true);
          setadmin('mla');
          setloading(false);
          adminFound = true;
      }

      if (!adminFound) {
        alert('MLA not found');
        setloading(false);
      }
      else navigate('/')
    }
  
    try {
      if(adminType !== 'mptc') {
        return;
      }
      setloading(true);
      let adminFound = false;
  
      // Loop over each mandal in mandalVillageData
      for (const mandal in mandalVillageData) {
        if (mandalVillageData.hasOwnProperty(mandal)) {
          // Loop over each MPTC in the current mandal
          for (const element of mandalVillageData[mandal].mptc) {
            if (element.id === adminid) {
              alert('Login successful');
              const temp = {
                username : element.name,
                mandalName : mandal,
                villageName : mandal,
                mptc : adminid,
              }
              localStorage.setItem("user", JSON.stringify(temp));
              setUser(temp);
              setislogin(true);
              setadmin('mptc');
              setloading(false);
              adminFound = true;
              break;
            }
          }
        }
        if (adminFound) {
          break;
        }
      }
  
      if (!adminFound) {
        alert('Official ID not found');
        setloading(false);
      }
      else navigate('/')
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
      setloading(false);
    }
  };


  const [adminType, setAdminType] = useState('mptc');

  const handleAdminTypeChange = (event) => {
    setAdminType(event.target.value);
  };



  return (
    <Wrapper>
      {loading && <Loading />}
      <div className="flex py-4 md:px-[8vw] justify-center ">
        

        {/* Login Cred */}
        {flag ? (<div className="auth w-80 mt-16 bg-white h-fit flex flex-col items-center shadow-xl p-6  rounded-xl">
          <div>
            <h1 className=" mt-2 font-montserrat text-center font-bold text-3xl text-orange-500">
              Official Login @ Praja Vedika
            </h1>
            <p className=" font-montserrat text-slate-500 font-light text-center">
              Please enter your details
            </p>
          </div>

          <div className="flex flex-col items-center mt-4 gap-[2vh] md:w-fit  w-full  ">
            
                <h2 className="text-2xl font-bold mb-6 text-center text-slate-500">Select Official Type</h2>
                <div className="w-full flex justify-center gap-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id='mptc'
                      value="mptc"
                      checked={adminType === 'mptc'}
                      onChange={handleAdminTypeChange}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <label htmlFor='mptc' className="ml-2 text-gray-700">MPTC</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id='mpp'
                      value="mpp"
                      checked={adminType === 'mpp'}
                      onChange={handleAdminTypeChange}
                      className="form-radio h-5 w-5 text-green-600"
                    />
                    <label htmlFor='mpp' className="ml-2 text-gray-700">MPP</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      value="mla"
                      id='mla'
                      checked={adminType === 'mla'}
                      onChange={handleAdminTypeChange}
                      className="form-radio h-5 w-5 text-red-600"
                    />
                    <label htmlFor='mla' className="ml-2 text-gray-700">MLA</label>
                  </div>
                </div>
              
            
            <div className=" border-b-2  flex">
              <input
                type="text"
                className=" mt-0 bg-white w-full rounded-lg p-4 font-montserrat  font-medium"
                value={adminid}
                onChange={(e) => {
                  setadminid(e.target.value);
                }}
                placeholder="Official ID"
              />
            </div>
            {/* <div className=" border-b-2 flex">
              <input
                type="password"
                className=" mt-2 bg-white w-full rounded-lg  p-4 font-montserrat  font-medium "
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
            </div> */}
            {/* <div className="w-full justify-center flex">
              
              <button
                className=" font-montserrat px-2 rounded-md text-blue-800 font-medium   hover:text-[#01796f] hover:scale-105 transition-transform"
                onClick={() => {setflag(false)}}
              >
                Not a User? Register
              </button>
            </div> */}
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
        
        <div className="auth bg-white  h-fit flex flex-col items-center shadow-xl p-6  rounded-xl sm:w-80">
          <div>
            <h1 className="mt-4 text-center font-montserrat font-bold text-3xl text-orange-500 ">
              Register with Praja Vedika
            </h1>
            <p className=" font-montserrat font-light text-center">
              Please fill your details to register
            </p>
          </div>

          <div className="flex flex-col items-center mt-4 gap-[2vh] md:w-fit  w-full ">
          <div className=" border-b-2   flex ">
              <input
                type="text"
                className=" mt-2 w-56 bg-white rounded-lg p-4 font-montserrat  font-medium  "
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Username"
              />
            </div>
            <div className=" border-b-2   flex ">
              <input
                type="email"
                className=" mt-2 w-56 bg-white rounded-lg p-4 font-montserrat  font-medium  "
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              />
            </div>
            <div className=" border-b-2  flex ">
              <input
                type="password"
                className=" mt-2 w-56 bg-white rounded-lg  p-4 font-montserrat  font-medium "
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
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
  )
}

export default AdminLogin
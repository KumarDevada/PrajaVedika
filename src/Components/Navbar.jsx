import React from 'react'
import Wrapper from './Wrapper'
// import Logo from "../assets/echakra.png";
import Logo from "../assets/logofinal.png";
import gsap from 'gsap';
import { useState } from 'react';
import {useContext } from 'react';
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { BiCoinStack } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { useEffect } from 'react';
const Navbar = () => {

  const { resetState ,isdark , setisdark, setadmin , setislogin, islogin , User, setUser} = useContext(Context)

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log(storedUser);
      setUser(JSON.parse(storedUser));
      setislogin(true); // Assuming you want to set the user as logged in if there's a user in localStorage
      if(storedUser?.mla) {
        setadmin('mla')
      }
      else if(storedUser?.mpp) {
        setadmin('mpp')
      }
      else if(storedUser.mandalName === storedUser.villageName) {
        setadmin('mptc')
      }
    }
  }, []);
  
  
  const navigate = useNavigate();
  const body = document.body;

  const modetoggle=()=>{
    if(body.classList.contains("light")){
      body.classList.remove("light");
      setisdark(!isdark)
    }
    else{
      body.classList.add("light");
      setisdark(!isdark)
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleclick = () => {
    if(islogin) {
      navigate('/explore')
    }
    else {
      alert('Please Login to continue.')
      navigate('/login')
    }
  }

  const handleuserprofile  = () => {
    // if(User?.aadhar) {
      navigate('/profile')
    // }
  }


  const handlelogout = () => {
    const yes = confirm('Are you sure you want to log out ?');
    if(yes) {
      localStorage.clear();
      sessionStorage.clear();
      resetState(); // Reset the context state
      navigate('/')
    }
  }
  

  return (
    <div className=''>
    <Wrapper>
      <div className='justify-between items-center flex h-[15vh]'>
        {/* Logo */}
        <div className='flex items-center cursor-pointer' onClick={()=>navigate('/')}>
        <img src={Logo} alt="logo" className=' w-16 md:w-32'/>
        <h1 className=' sm:text-md text-2xl font-montserrat font-bold text-orange-500'>PrajaVedika</h1>
        </div>
        
        {/* <div className='absolute bg-red-400 w-fit'></div> */}

        {/* Desktop Menu */}
        <div className='md:flex hidden relative justify-between items-center gap-[10vh]'>  
        <nav >
          <ul className="hidden md:flex gap-10 justify-center items-center ">
            
            <li
              className="font-semibold font-montserrat hover:text-[#01796f] cursor-pointer nav"
              onClick={() => navigate("/")}
            >
              <a>Home</a>
            </li>
            {/* <li
              className="font-semibold font-montserrat  hover:text-[#01796f] cursor-pointer nav"
              onClick={()=>document.getElementById("about").scrollIntoView({behavior:"smooth"})}
              
            >
              <a>About</a>
            </li> */}
            {/* <li
              className="font-semibold font-montserrat hover:text-[#01796f] cursor-pointer nav"
              onClick={()=>document.getElementById("contact").scrollIntoView({behavior:"smooth"})}
              
            >
              <a>Education</a>
            </li> */}
            <li
              className="font-semibold font-montserrat hover:text-[#01796f] cursor-pointer nav"
              onClick={()=> handleclick()}
              
            >
              <a>Query</a>
            </li>
            <li
              className="font-semibold font-montserrat hover:text-[#01796f] cursor-pointer nav"
              onClick={()=> navigate('/mlaprofile')}
              
            >
              <a>MLA</a>
            </li>
            {/* <li
              className="font-semibold font-montserrat hover:text-[#01796f] cursor-pointer nav"
              onClick={()=> navigate('/redeem')}
              
            >
              <a>Contact Us</a>
            </li> */}
          </ul>
        </nav>
        {/* {
          !isdark ? (<button
            className="shadow-5xl font-medium font-poppins hover:text-[#01796f] transition-transform nav"
            onClick={()=>{modetoggle()}}
          >
            <i className="fi fi-sr-moon-stars group"></i>
          </button>) : (<button
              className="shadow-5xl font-medium font-poppins hover:text-[#01796f] transition-transform nav"
              onClick={()=>{modetoggle()}}
            >
              <i className="fi fi-br-brightness"></i>
            </button>)
        } */}
        
        </div>
        <div className='md:flex hidden gap-[5vh] items-center'>
          {!localStorage.getItem("user") ? (<h1 className=' font-montserrat font-bold text-orange-500 flex items-center gap-[1vh]'><i className="fa-solid fa-location-dot"></i> Location</h1>) : (<h1 className=' font-montserrat text-lg font-bold text-green-600 flex items-center gap-[1vh]'><i className="fi fi-rr-marker"></i>{User?.villageName}</h1>)}
          
        {!localStorage.getItem("user") ? (<div className='md:flex hidden gap-[5vh]'>
        <button style={{backgroundColor: '#34d399'}}
              className=" shadow-sm font-medium border-2 font-poppins px-4 py-2 bg-green-400 rounded-3xl hover:bg-green-600  transition-transform nav"
              onClick={() => {
                navigate("/login")}}
            >
              User Login
            </button>
            <button style={{backgroundColor: '#34d399'}}
              className=" shadow-sm font-medium border-2 font-poppins px-4 py-2 bg-green-400 rounded-3xl hover:bg-green-600  transition-transform nav"
              onClick={() => {
                navigate("/adminlogin")}}
            >
              Official Login
            </button>
        </div>) :(
          <div className='md:flex hidden gap-[2vh]'>
           
            <button onClick={() => handleuserprofile()} className=' font-medium  font-poppins px-4 py-2 rounded-3xl transition-transform nav' ><i className="fi fi-sr-user"></i> {(User?.mptc || User?.mpp) ? 'My Profile' : User?.username}</button>
            <button className=' font-medium  font-poppins px-4 py-2 rounded-3xl bg-blue-400 hover:bg-[#34d399]  transition-transform nav' onClick={() => {handlelogout();navigate('/')}} > Log out <i className="fa-solid fa-right-to-bracket"></i></button>
            {/* <div className='flex w-fit h-fit cursor-pointer justify-center items-center p-2 rounded-lg border-2' onClick={()=>{navigate('/redeem')}} >
              <h1 className='font-semibold'>{User?.credits || 0} <i style={{color:'orange'}} "fa-brands fa-bitcoin"></i></h1>
              
            </div> */}
          </div>
        )}
        </div>

        {/* Mobile Menu */}
        <div className='md:hidden flex items-center gap-[5vh]'>
        {/* {
          !isdark ? (<button
            className="shadow-5xl font-medium font-poppins hover:text-[#01796f] transition-transform nav"
            onClick={()=>{modetoggle()}}
          >
            <i className="fi fi-sr-moon-stars group"></i>
          </button>) : (<button
              className="shadow-5xl font-medium font-poppins hover:text-[#01796f] transition-transform nav"
              onClick={()=>{modetoggle()}}
            >
              <i className="fi fi-br-brightness"></i>
            </button>)
        } */}
          <button onClick={toggleSidebar} className=' font-medium font-poppins hover:text-[#01796f] transition-transform'>
          <i className="fa-solid fa-bars text-xl"></i>
          </button>

          <div
              className={`fixed z-20 top-0 right-0 w-68 bg-slate-200 shadow-xl h-full transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
              } transition-transform duration-300 ease-in-out`}>
              <div className="p-4 mt-8">
                <div className='w-full'>
                  <button
                    onClick={toggleSidebar}
                    className='text-gray-600 ml-56 hover:text-gray-800 font-bold mb-4 px-2 rounded-md hover:bg-red-300 '>
                    <i className='fa fa-close'></i>
                  </button>
                </div>
                
                <div className="flex flex-col bg-white py-4 px-2 rounded-md space-y-2">
                  <button
                    className='text-gray-700 text-center  font-bold    py-1 rounded-md'>
                    Menu
                  </button>
                  {localStorage.getItem("user") && (
                        <button
                          onClick={() => {handleuserprofile(); toggleSidebar()}}
                          className='text-gray-700  font-medium  bg-white rounded-md'>
                          <i className='fa fa-user'></i> {User?.username}
                        </button>
                    )}
                  <button
                    onClick={() => {navigate('/'); toggleSidebar()}}
                    className='text-gray-500 hover:text-white font-medium hover:bg-orange-300 bg-white active:bg-orange-500 py-1 rounded-md'>
                    Home <i className="fa-solid fa-arrow-right"></i>
                  </button>
                  <button
                    onClick={() => {navigate('/explore'); toggleSidebar()}}
                    className='text-gray-500 hover:text-white font-medium hover:bg-orange-300 bg-white active:bg-orange-500 py-1 rounded-md'>
                    Query <i className="fa-solid fa-arrow-right"></i>
                  </button>
                  {!localStorage.getItem("user") && (
                      <button
                        onClick={() => {navigate('/login'); toggleSidebar()}}
                        className='text-gray-500 hover:text-white font-medium hover:bg-orange-300 bg-white active:bg-orange-500 py-1 rounded-md'>
                        User Login <i className="fa-solid fa-arrow-right"></i>
                      </button>
                  )}
                  {!localStorage.getItem("user") && (
                      <button
                        onClick={() => {navigate('/adminlogin'); toggleSidebar()}}
                        className='text-gray-500 hover:text-white font-medium hover:bg-orange-300 bg-white active:bg-orange-500 py-1 rounded-md'>
                        Official Login <i className="fa-solid fa-arrow-right"></i>
                      </button>
                  )}

                  {localStorage.getItem("user") && (User?.aadhar)  && (
                    <button
                      onClick={() => {handleuserprofile(); toggleSidebar()}}
                      className='text-gray-500 hover:text-white font-medium hover:bg-orange-300 bg-white active:bg-orange-500 py-1 rounded-md'>
                      My Profile <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  )}
                  
                  <button
                    onClick={() => {navigate('/mlaprofile'); toggleSidebar()}}
                    className='text-gray-500 hover:text-white font-medium hover:bg-orange-300 bg-white active:bg-orange-500 py-1 rounded-md'>
                    About MLA <i className="fa-solid fa-arrow-right"></i>
                  </button>
                  {localStorage.getItem("user") && (
                      <button
                        onClick={() => {toggleSidebar();handlelogout()}}
                        className='text-white font-medium hover:bg-orange-300 bg-blue-400 active:bg-orange-500 py-1 rounded-md'>
                        Log out <i className="fa-solid fa-right-to-bracket"></i>
                      </button>
                  )}

                  <br />
                  <br />
                  <br />
                  <br />
                  <br />

                  <h1 className="font-semibold font-montserrat text-center text-xl text-slate-500">
                    Support
                  </h1>
                  <ul className="flex flex-col items-center mt-3 gap-2 text-center">
                    <li
                      className="font-semibold font-montserrat  text-slate-600  cursor-pointer"
                      
                    >
                      <h1 className='text-sm'><i className="fa-solid fa-envelope"></i> prajavedikaofficial@gmail.com</h1>
                    </li>
                    <li
                      className="font-semibold font-montserrat text-center text-slate-600  cursor-pointer"
                      
                    >
                      <h1 className='text-sm'><i className="fa-solid fa-phone"></i> +91 934343434</h1>
                    </li>
                    
                  </ul>
                  


                  
                </div>
              </div>
            </div>


        </div>
      </div>
    </Wrapper>
    </div>
  )
}

export default Navbar
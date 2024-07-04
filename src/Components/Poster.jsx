import React, { useEffect, useState , useContext } from "react";
import Context from "../context/Context";
import Loading from "./Loading";
import map from "../assets/apmap.jpg" ;
import { useNavigate } from "react-router-dom";

const Poster = () => {

  const {isdark, islogin} = useContext(Context)
  const [isLoading, setisLoading] = useState(false);
  const [city, setcity] = useState("");
  const [isdowncity, setisdowncity] = useState(false);
  const [isdownstate, setisdownstate] = useState(false);
  const [state, setstate] = useState("");
  const [fetcheddata, setfetcheddata] = useState([])
  const [state1, setstate1] = useState([])

  const navigate = useNavigate();

  

  const fadeDuration = 1.5; // Duration of fade-in/fade-out animation in seconds

  const handleclick = () => {
    // console.log('clicked to explore');
    if(islogin) {
      navigate(`/explore`)
    }
    else {
      alert('Please Login to continue.')
      navigate('/login')
    }
  }

  


  return (
    <div>
      {isLoading ? <Loading /> : ""}
      <div
        className="flex relative rounded-lg  pt-[2vh] mt-2 md:mt-[1vh] gap-10 justify-center items-center md:max-h-[70vh] "
        id="searchposter"
        // style={{backgroundImage : `url(${isdark ? (bgdark) : (bg)})` , backgroundSize : "cover"}}
      >
        <div className="hidden absolute opacity-20 top-0 md:flex w-full max-h-[75vh] ">
          <img
            src={map}
            alt="MAP"
            className="max-h-[100vh] w-full object-cover rounded-xl"
          />
        </div>
        <div  className="w-full h-fit m-0 md:m-10 opacity-70 mt-0 md:mt-[20vh] shadow-l rounded-xl p-0 md:p-7 md:ml-16 mb-10 z-10 searchtext other ">
          <h1 className="md:text-[5vh] text-3xl font-montserrat text-orange-500  font-bold mb-4">
            Welcome To Praja Vedika
          </h1>
          <p className=" text-slate-500 text-lg font-mono font-small">
          A platform designed to bridge the gap between citizens and their local government officials. We believe in the power of community voices to bring about meaningful change. Our mission is to provide a streamlined, transparent, and efficient way for citizens to raise concerns and for government officials to address them.
          </p>

          <div className="mt-5 flex justify-center items-center gap-5">
            
            
            
            
            <button style={{backgroundColor:'#34d399', color:"darkgreen"}}
              className="hover:bg-[#34d399] hover:scale-105 shadow-sm transition-transform  font-montserrat font-semibold p-4 rounded-lg  w-fit"
              // onClick={() => {city ? navigate(`/search/${state}/${city}`) : (alert("Please select a city"))}}
              onClick={() => handleclick()}
            >
              Query page
            </button>
          </div>
        </div>
        
      </div>
    </div>
    
  );
};

export default Poster;

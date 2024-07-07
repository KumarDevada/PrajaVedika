import React , {useEffect , useContext} from 'react'
import {Wrapper , Poster } from "../Components" ;
import gsap from 'gsap';
import map from "../assets/garbage-truck.png";
import Context from '../context/Context';
import { ScrollTrigger } from 'gsap/all';
import { Draggable } from 'gsap/all';
import { set } from 'mongoose';
import Announcements from './Announcements';

const Homepage = () => {


  const {isdark , setisdark , setislogin, islogin , User, setUser} = useContext(Context)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log(storedUser);
      setUser(JSON.parse(storedUser));
      setislogin(true); // Assuming you want to set the user as logged in if there's a user in localStorage
    }
  }, []);

    

  return (
    <Wrapper>
      {/* {ispopup ? <Popup/> : null} */}
      <Poster/>
      <Announcements />
    </Wrapper>
  )
}

export default Homepage
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {Navbar, Footer} from "./Components" ;
import {Homepage ,Login , Explore } from "./Pages" ;
import State from './context/State';
import QueryForm from './Pages/QueryForm';
import AdminLogin from './Pages/AdminLogin';
import MLAProfile from './Pages/MLAProfile';

const App = () => {
  return (
    <div>
      <State>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Homepage/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/adminlogin" element={<AdminLogin />} />
          <Route exact path="/register" element={<Login/>} />
          <Route exact path="/explore" element={<Explore/>} />
          <Route exact path="/queryform" element={<QueryForm/>} />
          <Route exact path="/mlaprofile" element={<MLAProfile />} />
        </Routes>
        <Footer/>
      </Router>
      </State>
    </div>
  )
}

export default App
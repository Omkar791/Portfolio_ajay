import React from "react";
import {Routes,Route} from 'react-router-dom'
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";
import Blogs from "./components/Blogs";

function App() {
  return (
    <div>
     {/* <Navbar/> */}
     <About />
     {/* <Footer /> */}
     {/* <Blogs /> */}
    </div>
  );
}

export default App;

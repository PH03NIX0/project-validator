import { useState } from "react";
import HomePage from "../pages/Homepage.jsx";
import Navbar from "./components/Navbar.jsx";
import Searchbar from "./components/Searchbar.jsx";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <HomePage />
    </>
  );
};

export default App;

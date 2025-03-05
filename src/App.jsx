import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home"; // Ensure this file exists

const App = () => {
  return (
    <div>
   
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
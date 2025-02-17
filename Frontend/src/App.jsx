import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/CombineLayout/Layout.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";

const App = () => {
  const authToken = true;

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/management"
        element={authToken ? <Layout /> : <Navigate to="/" />}
      ></Route>
    </Routes>
  );
};

export default App;

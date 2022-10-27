import { useEffect } from "react";
import { Route, Routes, Outlet, Router } from "react-router-dom";
import Layout from "./components/landingPage/Layout";
import Landing from "./components/landingPage/Landing";
import Pricing from "./components/Pages/Pricing";
import Format from "./components/Pages/Format";
import Career from "./components/Pages/Career";
import Contact from "./components/Pages/Contacts";
import About from "./components/Pages/About";
import GetStarted from "./components/Pages/GetStarted";
import DashboardLayout from "./components/landingPage/DashboardLayout";
import Dashboard from "./components/Pages/Dashboard";
import PrivateRoute from "./components/Pages/PrivateRoute";

import "./styles/Main.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  // useEffect(() => {
  //   console.log("wawa2");
  // }, []);
  return (
    <AuthProvider>
      <div className="main">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route exact path="/pricing" element={<Pricing />} />
            <Route exact path="/formats" element={<Format />} />
            <Route exact path="/careers" element={<Career />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/get-started" element={<GetStarted />} />
          </Route>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

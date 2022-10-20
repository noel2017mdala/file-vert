import { Route, Routes } from "react-router-dom";
import Layout from "./components/landingPage/Layout";
import Landing from "./components/landingPage/Landing";
import Pricing from "./components/Pages/Pricing";
import Format from "./components/Pages/Format";
import Career from "./components/Pages/Career";
import Contact from "./components/Pages/Contacts";
import About from "./components/Pages/About";
import GetStarted from "./components/Pages/GetStarted";
import "./styles/Main.css";

function App() {
  return (
    <div className="main">
      <Layout>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/pricing" element={<Pricing />} />
          <Route exact path="/formats" element={<Format />} />
          <Route exact path="/careers" element={<Career />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/ge-started" element={<GetStarted />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;

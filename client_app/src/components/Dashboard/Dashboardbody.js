import Navbar from "./NavBar";
import GetStarted from "../Pages/FileUpload";

const DashboardBody = () => {
  return (
    <div className="min-h-screen bg-white w-screen">
      <Navbar />

      <div>
        <GetStarted />
      </div>
    </div>
  );
};

export default DashboardBody;

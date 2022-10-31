import { useAuth } from "../../context/AuthContext";
import Sidebar from "../Dashboard/Sidebar";
import DashboardBody from "../Dashboard/Dashboardbody";
const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="">
      <div className="flex">
        <Sidebar />
        <DashboardBody />
      </div>
    </div>
  );
};

export default Dashboard;

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../Dashboard/Sidebar";
import DashboardBody from "../Dashboard/Dashboardbody";
const Dashboard = () => {
  const { currentUser } = useAuth();

  const [tabState, setTabState] = useState({
    dashboard: true,
    messages: false,
    notifications: false,
    files: false,
    profile: false,
    settings: false,
  });

  return (
    <div className="">
      <div className="flex">
        <Sidebar state={tabState} changeState={setTabState} />
        <DashboardBody state={tabState} changeState={setTabState} />
      </div>
    </div>
  );
};

export default Dashboard;

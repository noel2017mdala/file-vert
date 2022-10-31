import Navbar from "./NavBar";
import GetStarted from "../Pages/FileUpload";
import Messages from "./Messages";
import Notification from "./Notification";
import Files from "./Files";

const DashboardBody = ({ state, changeState }) => {
  return (
    <div className="min-h-screen bg-white w-screen">
      <Navbar />

      <div>
        {state.dashboard ? (
          <GetStarted />
        ) : state.messages ? (
          <Messages />
        ) : state.notifications ? (
          <Notification />
        ) : state.files ? (
          <Files />
        ) : (
          "No data to display"
        )}
      </div>
    </div>
  );
};

export default DashboardBody;

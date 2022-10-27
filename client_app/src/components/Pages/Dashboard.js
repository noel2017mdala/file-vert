import { useAuth } from "../../context/AuthContext";
const Dashboard = () => {
  const { currentUser } = useAuth();

  return <div>Hello {currentUser && currentUser.user.firstName}</div>;
};

export default Dashboard;

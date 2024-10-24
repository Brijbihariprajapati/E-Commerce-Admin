
import UserCount from './UserCount';
import OrderDashBoard from './OrderDashBoard';
import MessageDashboard from './MessageDashboard';


function Dashboard({logoutaction}) {
  
 
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <UserCount logoutaction={logoutaction}/>
      <OrderDashBoard/>
      <MessageDashboard/>
    </div>
  );
}

export default Dashboard;

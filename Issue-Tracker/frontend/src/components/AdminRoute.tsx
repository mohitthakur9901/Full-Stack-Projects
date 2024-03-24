
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const AdminRoute = () => {
  const user = useSelector((state:any) => state.user)

  return user && user.loggedInUser.Role === 'admin' ? <Outlet /> : <Navigate to="/" />;

}

export default AdminRoute
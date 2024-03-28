import { useSelector } from 'react-redux';
import { Outlet , Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const {user} = useSelector((state :any) => state.user)

  return (
    user.user._id ? <Outlet/> :  <Navigate to={'/'} />
  )
}

export default PrivateRoute
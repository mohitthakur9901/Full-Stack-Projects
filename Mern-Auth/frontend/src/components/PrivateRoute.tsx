import { useSelector } from "react-redux";
import { Navigate , Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const user = useSelector((state : any) => state.user);

    
    
    return user.refresh_token ? <Outlet/> : <Navigate to={'/sign-in'}/>
}

export default PrivateRoute
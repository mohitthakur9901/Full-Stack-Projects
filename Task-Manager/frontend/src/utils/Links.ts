import { FaRegUser } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";



export const Links = () => {
  const { user } = useSelector((state : any) => state.user); 

  const adminLinks = [
    { Title: "Dashboard", ref: "/dashboard", icon: MdOutlineDashboard },
    { Title: "Employees", ref: "/employee", icon: FaRegUser },
    { Title: "Tasks", ref: "/tasks", icon: FaTasks },
    { Title: "Profile", ref: "/profile", icon: FaRegUserCircle }
  ];

  const nonAdminLinks = [{ Title: "Tasks", ref: "/tasks", icon: FaTasks }, { Title: "Profile", ref: "/profile", icon: FaRegUserCircle }];

  return user.user.role === "admin" ? adminLinks : nonAdminLinks;
};

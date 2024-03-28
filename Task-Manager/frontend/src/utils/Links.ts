import { FaRegUser } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";


export const Links =  [
      { Title: "Dashboard", ref: "/dashboard", icon: MdOutlineDashboard },
      { Title: "Employees", ref: "/employee", icon: FaRegUser },
      { Title: "Tasks", ref: "/tasks", icon: FaTasks }, 
      { Title: "Profile", ref: "/profile", icon: FaRegUserCircle },
];

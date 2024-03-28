import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaBars, FaSignOutAlt } from "react-icons/fa"; // Import icons
import { useDispatch } from "react-redux";
import { clearUser } from "../store/userSlice/user";

const Button = React.lazy(() => import("../components/Button")); // Import Button component)

interface SideBarProps {
  user: string;
  links: {
    Title: string;
    ref: string;
    icon: React.ComponentType;
  }[];
  isOpen: boolean;
  toggleSideBar: () => void;
  role:string
}


const SideBar: React.FC<SideBarProps> = ({ user, links, isOpen, toggleSideBar , role}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <>
      <Button
        className={`fixed bottom-16 right-4 overflow-hidden bg-gray-800 text-white rounded-full p-4 focus:outline-none md:hidden`}
        onClick={toggleSideBar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </Button>
      <div
        className={`fixed left-0 h-screen w-auto bg-gray-800 rounded-r-xl border border-r-white text-white overflow-y-auto pt-8 pb-4 transition duration-300 ease-in-out transform ${isOpen ? "-translate-x-0" : "-translate-x-full"
          } md:fixed md:top-0 md:h-screen md:w-64 md:transform-none`}
      >
        
        <div className="items-center border-b text-3xl px-2">
          <p className="mb-4 font-bold text-xl">Welcome</p>
          
          <p className="mb-4 flex gap-2">{user} <span className="inline-flex items-center rounded-md  py-1 px-3  text-sm font-medium ring-1 ring-inset ring-gray-500/10">
        {role}
      </span></p>
        </div>
        <ul className="space-y-4">
          {links.map((link) => (
            <Link to={link.ref} key={link.ref}>
              <li className="py-2 px-4 hover:bg-gray-700 flex items-center gap-5">

                <span className="inline-block mr-2 text-xl">
                  <link.icon />
                </span>
                <span >{link.Title}</span>

              </li>
            </Link>
          ))}
          <li key="signout" className="py-2 px-4 hover:bg-gray-700 flex items-center gap-5">
            <Button onClick={() => {
              dispatch(clearUser())
              navigate('/')

            }}>
              <span className="inline-block mr-2">
                <FaSignOutAlt className="text-xl" />
              </span>
              <span className="hidden md:inline-block">Sign Out</span>
            </Button>
          </li>
        </ul>
      </div>
    </>

  );

};
export default SideBar;

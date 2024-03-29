import React, { useState } from "react";

const AppBar = React.lazy(() => import('./AppBar'))
const SideBar = React.lazy(() => import('./SideBar'))
import { Links } from "../utils/Links";
import { useSelector } from "react-redux";


const Layout = ({ children }: { children: React.ReactNode }) => {

  const { user } = useSelector((state: any) => state.user)

  const links = Links();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSideBar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex flex-col md:flex-row flex-1 p-4 bg-gradient-to-b from-gray-400 to-gray-800">
      <h1 className=" w-64">
        <SideBar isOpen={isOpen} role={user.user.role} toggleSideBar={toggleSideBar} links={links} user={user.user.userName} />
      </h1>
      <div className="flex-1  bg-gray-100 rounded-md">
        <AppBar user={user.user.userName} role={user.user.role} img={user.user.avatar} className={`opacity-100 md:opacity-${isOpen ? 0 : 100} transition duration-300 ease-in-out`} />
        <div className={`opacity-100 md:opacity-${isOpen ? 0 : 100} transition duration-300 ease-in-out`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
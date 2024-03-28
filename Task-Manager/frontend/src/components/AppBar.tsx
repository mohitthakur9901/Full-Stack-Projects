import React from "react";
import { Link } from "react-router-dom";
import { SiTask } from "react-icons/si";


interface AppBarProps {
  user: string;
  className:string
  img:string
  
}

const AppBar : React.FC<AppBarProps> = ({ user,img,className }) => {
  return (
    <div className={`flex justify-between items-center p-5 border-b border-gray-200 bg-gray-800 text-white rounded-md mb-5 ${className}`}>
    <Link to="/dashboard" className="text-xl font-bold hover:animate-pulse">
    <SiTask className="mr-2 text-4xl " />
    </Link>
    <div className="flex items-center justify-between">
      <img src={img} alt="img" className="h-10 w-10"/>
      <span className="ml-4 text-sm">{user && `Hi, ${user}`}</span>
    </div>
  </div>
  );
};

export default AppBar;

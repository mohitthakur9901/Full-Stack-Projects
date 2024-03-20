import { FaBug } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Avatar } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const NavBar = () => {
  const currentPath = window.location.pathname;
  const user = useSelector((state: any) => state.user);
  console.log(user.loggedInUser);
  
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const links = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Issues', href: '/issues' },
    ...(user.loggedInUser?.Role === 'admin' ? [{ label: 'All Users', href: '/all-users' }] : [])
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className='flex items-center justify-between border-b-2 '>
      <div className="flex items-center space-x-6 mb-5 px-5 h-14 text-xl">
        <Link to='/'><FaBug /></Link>
        <ul className='flex items-center space-x-6'>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className={classNames({
                  "text-zinc-500": link.href === currentPath,
                  "font-bold": link.href === currentPath,
                  "font-normal": link.href !== currentPath,
                  "hover:text-zinc-900 transition-colors": link.href !== currentPath,
                  "hover:text-zinc-500 transition-colors": link.href === currentPath,
                  "hover:font-bold": link.href !== currentPath,
                  "hover:font-normal": link.href === currentPath,
                  "transition": true,
                  "duration-300": true,
                  "ease-in-out": true,
                  "cursor-pointer": true,
                  "text-base": true,
                  "leading-6": true,
                  "tracking-widest": true,
                  "uppercase": true,
                  "font-mono": true,
                  "ml-2": true,
                  "mr-2": true,
                })}
                to={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        {user.loggedInUser._id  ? (
          <div className="">
            <button onClick={toggleDropdown}>
              {user.loggedInUser.avatar ? (
                <Avatar alt="User settings" img={user.loggedInUser.avatar} className='h-12 w-12 mr-10' />
              ) : (
                <Avatar rounded />
              )}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {user.loggedInUser.Role === 'admin' ? (
                    <p className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                      {user.loggedInUser.Role}
                    </p>
                  ) : (
                    ""
                  )}
                  <p className="block px-4 py-2 text-lg text-gray-700">{user.loggedInUser.name}</p>
                  <p className="block px-4 py-2 text-sm text-gray-700">{user.loggedInUser.email}</p>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 w-full" onClick={() => navigate('/settings')}>
                    Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to='/signup' className='text-zinc-900 font-bold text-base leading-6 tracking-widest uppercase font-mono ml-2 mr-10'>Sign Up</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

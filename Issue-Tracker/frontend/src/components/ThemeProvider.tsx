import React from 'react';
import { useSelector } from 'react-redux';

export default function ThemeProvider({ children } : {children : React.ReactNode}) {
  const { theme } = useSelector((state : any) => state.theme);
  return (
    <div className={theme}>
      <div className='bg-white  dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen'>
        {children}
      </div>
    </div>
  );
}
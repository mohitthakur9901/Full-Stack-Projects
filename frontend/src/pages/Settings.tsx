// Settings.js
import { useState } from 'react';
import SideBar from '../components/SideBar';

const Settings = () => {
    const [isTrue, setIsTrue] = useState<boolean>(false);    

    return (
        <div>
            <SideBar setIsTrue={setIsTrue} />
        </div>
    );
};

export default Settings;

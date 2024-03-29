import React, { useEffect, useState } from "react";

import MainNav from './components/MainNav/MainNav'
import { Outlet } from "react-router-dom";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);
 
    return (
        <React.Fragment>
          {isLoggedIn && < MainNav/>}
            <Outlet />
        </React.Fragment>
    );
}
export default App;
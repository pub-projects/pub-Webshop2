import React, { useEffect } from 'react';
import { useToken } from '../auth/useToken';
import { Profiler, proCB } from './Profiler';

const UserData = React.createContext();
const UserConsumer = UserData.Consumer;


const UserContext = ({ children }) => {
    const [token, setToken] = useToken();

    return (
        <>
            <Profiler id="UserConsumer" onRender={proCB} />
            <UserData.Provider value={{ token, setToken }}>
                {children}
            </UserData.Provider>
        </>
    );
}

export { UserContext, UserConsumer };
import React, { useState } from 'react'
import ls from '../helpers/ls'
export const AuthenticatedContext = React.createContext({
    Authenticated: false,
    setAuthenticated: (token, status) => {}
});

export const AuthenticatedContextProvider = (props) => {
    const setAuthenticated = (token, status) => {
        console.log("token ");
        status ? ls.set("token", token) : ls.remove('token');
        setState({...state, Authenticated: status })
    };
    const initState = {
        Authenticated: false,
        setAuthenticated: setAuthenticated
    };

    const [state, setState] = useState(initState);

    return (
        <AuthenticatedContext.Provider value={state}>
            {props.children}
        </AuthenticatedContext.Provider>
    )
};

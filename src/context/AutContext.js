import React, { createContext, memo, useState } from "react";
import ls from "../helpers/ls";

export const AuthenticatedContext = createContext({
    authenticated: false,
    setAuthenticated: () => {}
});
export const AuthenticatedContextProvider = memo(({ children }) => {
    const setAuthenticated = async (token, user_id) => {
        !!user_id ? await ls.set("user_id", user_id) : ls.remove("user_id");
        !!token ? await ls.set("token", token) : ls.remove("token");
        await setState({
            ...state,
            authenticated: !!token
        });
    };

    const [state, setState] = useState({
        authenticated: false,
        setAuthenticated: setAuthenticated
    });

    return (
        <AuthenticatedContext.Provider value={state}>
            {children}
        </AuthenticatedContext.Provider>
    );
});

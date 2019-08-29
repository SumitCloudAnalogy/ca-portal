import React, { memo, Suspense, useContext } from "react";
import authRoutes from "./authRoutes";
import privateRoutes from "./privateRoutes";
import Main from "../layout/Main";
import Auth from "../layout/Auth";
import {AuthenticatedContext} from "../context/AutContext";
import HandleRoutes from "../routes_handler";


const Routes = memo(() => {
    const { authenticated } = useContext(AuthenticatedContext);
    return (
        <Suspense fallback={<div>Loading....</div>}>
                {
                    HandleRoutes(
                    authenticated,
                    'token',
                    Main,
                    Auth,
                    privateRoutes,
                    authRoutes,
                    '/dashboard',
                    '/login')
                }
        </Suspense>
    );
});

export default Routes;


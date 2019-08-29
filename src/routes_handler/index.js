import ls from "../helpers/ls";
import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";

const PrivateRoute = (props) =>{
    if(props.path === props.location.pathname && props.computedMatch) {
        return (
            <Route
                exact={true}
                key={props.path}
                path={props.path}
                component={props.component}
                render={() => {
                    return (
                        <Redirect to={props.path}/>
                    )
                }}
            />
        );
    } else {
        return (
            <Route render={() => <Redirect to={props.path} />} />
        );
    }
};

const HandleRoutes = (
    authenticated,
    localStorageTokenKey,
    MainComponent,
    AuthComponent,
    authRoutesJson,
    unAuthRoutesJson,
    defaultAuthRoute,
    defaultUnAuthRoute
) => {
    return (
        <Router>
            <Switch>
                {authenticated && (
                    <MainComponent>
                        <Switch>
                            {authRoutesJson.map(route => (
                                <PrivateRoute
                                    key={route.path}
                                    path={route.path}
                                    component={route.component}
                                />
                            ))}

                            <Route render={() => <Redirect to={defaultAuthRoute} />} />
                        </Switch>
                    </MainComponent>
                )}
                {!authenticated && !ls.get(localStorageTokenKey) && (
                    <AuthComponent>
                        <Switch>
                            {unAuthRoutesJson.map(route => (
                                <Route
                                    exact
                                    key={route.path}
                                    path={route.path}
                                    component={route.component}
                                />
                            ))}
                            <Route render={() => <Redirect to={defaultUnAuthRoute} />}/>
                        </Switch>
                    </AuthComponent>
                )}
            </Switch>
        </Router>
    )
};
export default HandleRoutes;

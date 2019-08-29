import React, { memo } from "react";
import { Tabs } from "antd";
import useReactRouter from "use-react-router";
import "./index.scss";
import Login from "./Login";
import Register from "./Register";

const { TabPane } = Tabs;

const Auth = memo(() => {
    const { history, location } = useReactRouter();

    const tabChangedHandler = key => {
        history.replace(key);
    };

    return (
        <div className="auth-component-container">
            <Tabs defaultActiveKey={location.pathname} onChange={tabChangedHandler}>
                <TabPane tab="Login" key="/login">
                    <Login />
                </TabPane>
                <TabPane tab="Register" key="/register">
                    <Register />
                </TabPane>
            </Tabs>
        </div>
    );
});

export default Auth;

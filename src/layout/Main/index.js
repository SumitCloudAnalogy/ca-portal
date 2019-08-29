import React, {memo, useContext, useEffect, useState} from 'react';
import {Layout, Menu, Icon, Drawer} from 'antd';
import AppFooter from "../UI/Footer";
import './index.scss'
import {useMedia} from "the-platform";
import MainSider from "./MainSider";
import {useQuery} from "@apollo/react-hooks";
import {USER_DETAILS} from "../../graphql/user";
import ls from '../../helpers/ls'
import {AuthenticatedContext} from "../../context/AutContext";
import {UserProvider} from "../../context/UserContext";
const { Header, Sider, Content } = Layout;

const Main = memo(({children, user_id}) => {
    const [collapsed, setCollapsed] = useState(false);
    const isWide = useMedia({minWidth: 480});
    const {loading, data, subscribeToMore} = useQuery(USER_DETAILS, {
        variables:{
            id: user_id
        }
    });
    if (loading) {
        return null;
    }
    const toggle = () => {
        setCollapsed(!collapsed);
    };
    console.log("[Main.js] USER_SUBSCRIPTION data:", data);
    const content = (
        <div className="main-container">
            <Layout>
                {isWide ? (
                    <MainSider collapsed={collapsed} toggle={toggle} />
                ) : (
                    <Drawer
                        closable={false}
                        visible={!collapsed}
                        placement="left"
                        onClose={() => setCollapsed(true)}
                    >
                        <MainSider collapsed={collapsed} />
                    </Drawer>
                )}
                <Layout
                    style={{
                        minHeight: "100vh",
                        paddingLeft: !isWide ? 0 : collapsed ? 80 : 256
                    }}
                >
                    <Header
                        className="portal-header"
                        style={{
                            width: !isWide
                                ? "100%"
                                : collapsed
                                    ? "calc(100% - 80px)"
                                    : "calc(100% - 256px)"
                        }}
                    >
                        <Icon
                            className="trigger"
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            position: "relative",
                            margin: "80px 16px 24px",
                            padding: 0,
                            background: "#fff",
                            minHeight: "auto"
                        }}
                    >
                        {children}
                    </Content>
                    <AppFooter/>
                </Layout>
            </Layout>
        </div>
    );
    return data && data.user ? (
        <UserProvider value={data.user[0]}>{content}</UserProvider>
    ) : null;
});
const MainWrapper = memo(({ children }) => {
    const [userId, setUserId] = useState(null);
    const { authenticated } = useContext(AuthenticatedContext);

    useEffect(() => {
        if (authenticated) {
            checkUserId().then();
        }
    }, [authenticated]);

    const checkUserId = async () => {
        const user_id = await ls.get("user_id");
        if (user_id) {
            setUserId(user_id);
        }
    };

    return userId ? <Main user_id={userId}>{children}</Main> : null;
});
export default MainWrapper;

import React, { memo, useContext } from "react";
import {Avatar, Badge, Checkbox, Icon, Layout, Menu} from "antd";
import logo from "../../assets/images/logo.png";
import useReactRouter from "use-react-router";
import { NavLink } from "react-router-dom";
import { useMedia } from "the-platform";
import { UserContext } from "../../context/UserContext";
import constants from "../../helpers/constants";
import {AuthenticatedContext} from "../../context/AutContext";
import ls from '../../helpers/ls';
const { Sider } = Layout;

const MainSider = memo(({ collapsed, toggle }) => {
  const user = useContext(UserContext);
  const { history } = useReactRouter();
  const { setAuthenticated } = useContext(AuthenticatedContext);
  const { location } = useReactRouter();
  const isWide = useMedia({ minWidth: 480 });
  let spanStyle ={display: collapsed ? "none" : "block"};
    const { SubMenu } = Menu;
  const onMenuClicked = (e) => {
    if (!isWide) {
        try {
            toggle();
        }
        catch (e) {

        }

    }
    if(e.key === "/logout"){
       setAuthenticated(null, null);
       ls.removeAll();
       history.replace("/login");    }
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="portal-sider"
    >
      <div className="logo">
        <img
          style={{
            height: "100%"
          }}
          src={logo}
          alt={"Cloudanalogy"}
        />
        <span
          style={{
            fontSize: 22,
            display: collapsed ? "none" : "block"
          }}
        >
          {constants.TITLE}
        </span>
      </div>
      <div className="profile-details">
        <Avatar size={64} src={user.avatar_url} />
        <span style={spanStyle}>{user.name.toString().split(' ')[0].toUpperCase()}</span>
        <span style={spanStyle}>{user.email}</span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        selectedKeys={[location.pathname]}
        onClick={onMenuClicked.bind(this)}
      >
        <Menu.Item key="/dashboard">
          <NavLink to={"/dashboard"}>
            <Icon type="dashboard" />
            <span>Dashboard</span>
          </NavLink>
        </Menu.Item>
        {user && user.admin && (
          <Menu.Item key="/organisations">
            <NavLink to={"/organisations"}>
              <Icon type="bank" />
              <span>Organisations</span>
            </NavLink>
          </Menu.Item>
        )}
        <Menu.Item key="/settings">
          <NavLink to={"/settings"}>
            <Icon type="setting" />
            <span>Settings</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/profile">
          <NavLink to={"/profile"}>
            <Icon type="user" />
            <span>{user.name}</span>
          </NavLink>
        </Menu.Item>
          {user && user.admin && (
              <Menu.Item key="/all-employees">
              <NavLink to={"/all-employees"}>
                  <Icon type="team" />
                  <span>All Employee</span>
              </NavLink>
          </Menu.Item>)}
          <Menu.Item key="/holidays">
              <NavLink to={"/holidays"}>
                  <Icon type="info-circle" />
                  <span>Holidays</span>
              </NavLink>
          </Menu.Item>
          <Menu.Item key="/task">
              <NavLink to={"/task"}>
                  <Icon type="form" />
                  <span>Task</span>
              </NavLink>
          </Menu.Item>
        <Menu.Item key="/logout">
            <Icon type="logout" />
            <span>Logout</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
});

export default MainSider;

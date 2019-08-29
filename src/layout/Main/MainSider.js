import React, { memo, useContext } from "react";
import {Avatar, Checkbox, Icon, Layout, Menu} from "antd";
import logo from "../../assets/images/logo.png";
import useReactRouter from "use-react-router";
import { NavLink } from "react-router-dom";
import { useMedia } from "the-platform";
import { UserContext } from "../../context/UserContext";

const { Sider } = Layout;

const MainSider = memo(({ collapsed, toggle }) => {
  const user = useContext(UserContext);
  const { location } = useReactRouter();
  const isWide = useMedia({ minWidth: 480 });
  let spanStyle ={display: collapsed ? "none" : "block"};

  const onMenuClicked = () => {
    if (!isWide) {
      toggle();
    }
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
          Cloudanalogy
        </span>
      </div>
      <div className="profile-details">
        <Avatar size={64} src={user.avatar_url} />
        <span style={spanStyle}>{user.name}</span>
        <span style={spanStyle}>{user.email}</span>
       {/* <span>
          <Checkbox
            style={{
              color: "#fff"
            }}
            checked={user.admin}
          >
            Admin
          </Checkbox>
        </span>*/}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        selectedKeys={[location.pathname]}
        onClick={onMenuClicked}
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
      </Menu>
    </Sider>
  );
});

export default MainSider;

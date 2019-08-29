import React, {memo} from 'react';
import Profile from "../components/Profile";
import Organisations from "../components/Organisations";
import OrganisationEdit from "../components/Organisations/OrganisationEdit";
import Holidays from "../components/Holidays";
import Task from "../components/Task";
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";
import {NavLink} from "react-router-dom";
import AllEmployee from "../components/Admin/AllEmployees";
import EmployeeDetails from "../components/Admin/AllEmployees/EmployeeDetails";

const SettingsFist = memo(() => {
    return <div>
        <NavLink to={"/setting/first/second"} > /setting/first/second
        </NavLink>
    </div>
});
const SettingsTwo = memo(() => {
    return <div>
        <NavLink to={"/setting/first/second/third"} > /setting/first/second/third
    </NavLink>
    </div>;
});

const SettingsThree = memo(() => {
    return <div>
        <NavLink to={"/setting/first/second/third/four"} > /setting/first/second/third/four
        </NavLink>
    </div>;
});
const SettingsFour = memo(() => {
    return <div>
        /setting/first/second/third/four
    </div>;
});

export default [
    {
        name: "setting",
        path: "/setting/first/second/third/four",
        component: SettingsFour
    },
    {
        name: "setting",
        path: "/setting/first/second/third",
        component: SettingsThree
    },
    {
        name: "setting",
        path: "/setting/first/second",
        component: SettingsTwo
    },
    {
        name: "setting",
        path: "/setting/first",
        component: SettingsFist
    },
    {
        name: "organisation",
        path: "/organisation/:id",
        component: OrganisationEdit
    },
   {
       name: "dashboard",
       path: "/dashboard",
       component: Dashboard
   },
    {
        name: "settings",
        path: "/settings",
        component: Settings
    },
    {
        name: "profile",
        path: "/profile",
        component: Profile
    },
    {
        name: "organisations",
        path: "/organisations",
        component: Organisations
    },
    {
        name: "holidays",
        path: "/holidays",
        component:  Holidays
    }
    ,
    {
        name: "task",
        path: "/task",
        component:  Task
    },
    {
        name: "all-employees",
        path: "/all-employees",
        component:  AllEmployee
    },
    {
        name: "employee-details",
        path: "/employee-details/:id",
        component:  EmployeeDetails
    }
]

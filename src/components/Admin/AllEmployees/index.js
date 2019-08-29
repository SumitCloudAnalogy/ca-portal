import React, {memo} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {All_USERS} from "../../../graphql/user";
import {Popconfirm, Skeleton, Table} from "antd";
import {NavLink} from "react-router-dom";
import {Base64} from "js-base64";
const AllEmployee = memo((props) => {
    const { loading, data, error } = useQuery(All_USERS);
    if (loading) {
        return null;
    }
    console.log("[AllEmployee.js] data:", data);

    const {user} = data;

    const userDetails = (id) =>{
        console.log("Id: ", id);
    };
    const columns = [
        {
            title: "First Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: text => <a>{text}</a>,
            sorter: (a, b) => a.email.length - b.email.length,
            sortDirections: ["descend", "ascend"]
        },
        {
            title: "Designation",
            dataIndex: "designation",
            key: "designation"
        }
        ,
        {
            title: "DOL",
            dataIndex: "date_of_leaving",
            key: "date_of_leaving"
        },
        {
            title: "DOJ",
            dataIndex: "date_of_joining",
            key: "date_of_joining"
        },
        {
            title: "Active",
            dataIndex: "active",
            key: "active"
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) =>
                user.length >= 1 ? (
                    <div onClick={() => userDetails(record)}>
                        <NavLink to={'/employee-details/' + record.id}>Details</NavLink>
                    </div>
                ) : null,
        },
    ];

    return loading ? (
        <Skeleton paragraph={{ rows: 8, width: "100%" }} active />
    ) : (
        <Table bordered dataSource={user} rowKey="Id" columns={columns}/>
    );
});

export default AllEmployee;

import React, {memo, useContext, useEffect, useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {USER_DETAILS} from "../../../../graphql/user";

import {Button, Checkbox, Col, Form, Icon, Input, Row, Tabs, Card} from 'antd';
import {EmployeeContext, EmployeeProvider} from "../../../../context/EmployeeContext";

const { TabPane } = Tabs;
const EmployeeDetails = Form.create({ name: "emp_profile_form" }) (memo((props) => {
    const employee = useContext(EmployeeContext);
    const { getFieldDecorator } = props.form;
    const {form} = props;
    useEffect(() => {
        if (employee.id) {
            form.setFieldsValue({
                id: employee.id,
                name: employee.name,
                email: employee.email,
                mobile: employee.mobile,
                phone: employee.phone,
                designation: employee.designation,
                bio: employee.bio,
                created_at: employee.created_at,
                date_of_birth: employee.date_of_birth,
                date_of_joining: employee.date_of_joining,
                date_of_leaving: employee.date_of_leaving,
                gender: employee.gender,
                active: employee.active,

            });
        }
    }, [employee]);

    const callback = (key) => {
        console.log(key);
    };
    const submitHandler = e => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                console.log("[Profile.js] submitHandler values:", values);
            }
        });
    };

    const gridStyle = {
        width: '100%',
        textAlign: 'left',
        padding: 7,
        borderRadius: '4px',
        marginBottom: '10px',
        overflow: 'auto',
    };
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return (
        <div>
            <div className="emp_profile_form">
                <Form onSubmit={submitHandler}>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Profile" key="1">
                            <Row type="flex" justify="center" align="middle">
                                <Col
                                    style={{
                                        justifyContent: "center"
                                    }}
                                    xs={22} sm={14} md={12} lg={10} xl={10}>
                                    <Form.Item label="Id">
                                        {getFieldDecorator("id", { rules: [] })(<Input
                                            prefix={<Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            disabled/>)}
                                    </Form.Item>
                                    <Form.Item label="Name">
                                        {getFieldDecorator("name", { rules: [] })(<Input
                                            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                                        />)}
                                    </Form.Item>
                                    <Form.Item label="Email">
                                        {getFieldDecorator("email", { rules: [] })(
                                            <Input
                                                   prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="Mobile">
                                        {getFieldDecorator("mobile", { rules: [] })(
                                            <Input
                                                prefix={<Icon type="mobile" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="Phone">
                                        {getFieldDecorator("phone", { rules: [] })(
                                            <Input
                                                prefix={<Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="Designation">
                                        {getFieldDecorator("designation", { rules: [] })(
                                            <Input
                                                prefix={<Icon type="profile" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="Bio">
                                        {getFieldDecorator("bio", { rules: [] })(
                                            <Input
                                                prefix={<Icon type="profile" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="Created_At">
                                        {getFieldDecorator("created_at", { rules: [] })(
                                            <Input
                                                prefix={<Icon type="profile" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="DOB">
                                        {getFieldDecorator("date_of_birth", { rules: [] })(
                                            <Input
                                                prefix={<Icon type="profile" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="DOJ">
                                        {getFieldDecorator("date_of_joining", { rules: [] })(
                                            <Input
                                                prefix={<Icon type="profile" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="DOL">
                                        {getFieldDecorator("date_of_leaving", { rules: [] })(
                                            <Input
                                                prefix={<Icon type="profile" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="Gender">
                                        {getFieldDecorator("gender", { rules: [] })(
                                            <Input
                                                prefix={<Icon type="profile" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator("active", {
                                            valuePropName: "checked",
                                            initialValue: employee.active,
                                            rules: []
                                        })(<Checkbox>Active</Checkbox>)}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button block type="primary" htmlType="submit" icon="save">
                                            Update Employee Record
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Attendance" key="2">
                            <Row type="flex" justify="center" align="middle">
                                <Col
                                    style={{
                                        justifyContent: "center"
                                    }}
                                    xs={22} sm={14} md={12} lg={10} xl={10}>
                                    {employee.attendances.map(item => (
                                        <Card.Grid style={gridStyle} key={item.id}>
                                            <div className="container">
                                                <span>{(new Date(item.created_at)).toLocaleDateString('en-US', DATE_OPTIONS)}</span>
                                                <div style={{
                                                    justifyContent: 'space-between',
                                                    display: 'flex'
                                                }}>
                                                    <span>{item.start}</span>
                                                    <span>{item.end}</span>
                                                </div>
                                            </div>
                                        </Card.Grid >
                                    ))}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Task" key="3">
                            <Row type="flex" justify="center" align="middle">
                                <Col
                                    style={{
                                        justifyContent: "center"
                                    }}
                                    xs={22} sm={14} md={12} lg={10} xl={10}>
                                    {employee.tasks.map(item => (
                                        <Card.Grid style={gridStyle} key={item.id}>
                                            <div className="container">
                                                <div style={{
                                                    justifyContent: 'space-between',
                                                    display: 'flex'
                                                }}>
                                                    <span>{item.title}</span>
                                                    <span>{(new Date(item.created_at)).toLocaleDateString('en-US', DATE_OPTIONS)}</span>
                                                </div>

                                                <span>{item.description}</span>
                                            </div>
                                        </Card.Grid >
                                    ))}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Organisation" key="4">
                            <Row type="flex" justify="center" align="middle">
                                <Col
                                    style={{
                                        justifyContent: "center"
                                    }}
                                    xs={22} sm={14} md={12} lg={10} xl={10}>
                                    {employee.organisations.map(item => (
                                        <Card.Grid style={gridStyle} key={item.id}>
                                            <div className="container">
                                                <div style={{
                                                    justifyContent: 'space-between',
                                                    display: 'flex'
                                                }}>
                                                    <span>{item.name}</span>
                                                    <a href={item.website_url}>{item.website_url}</a>
                                                </div>
                                            </div>
                                        </Card.Grid >
                                    ))}
                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </Form>
            </div>
        </div>
    );
})
);

const MainEmployeeWrapper = memo((props) => {
    const { loading, data, error } = useQuery(USER_DETAILS,{
        variables: {
            id: props.match.params.id
        }
    });
    if (loading) {
        return null;
    }
    console.log("[EmployeeDetails.js] data:", data);
    return data && data.user  ? <EmployeeProvider value={data.user[0]}><EmployeeDetails/></EmployeeProvider> : null;
});

export default MainEmployeeWrapper;

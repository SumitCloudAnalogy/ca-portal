import React, { memo, useContext, useEffect, useState } from "react";
import {Button, Checkbox, Col, Form, Icon, Input, message, Row} from "antd";
import { UserContext } from "../../context/UserContext";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER } from "../../graphql/user";
import showErrors from "../Utils/showErrors";

const Profile = memo(({ form }) => {
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const { getFieldDecorator } = form;
    const [updateUser] = useMutation(UPDATE_USER);

    useEffect(() => {
        if (user.id) {
            form.setFieldsValue({
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                phone: user.phone,
                designation: user.designation
            });
        }
    }, [user]);

    const submitHandler = e => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                console.log("[Profile.js] submitHandler values:", values);
                setLoading(true);
                const record = {
                    name: values.name,
                    mobile: values.mobile,
                    phone: values.phone,
                    designation: values.designation,
                };
                if (user.admin) {
                    record.email = values.email;
                }
                updateUserDetails(record).then();
            }
        });
    };

    const updateUserDetails = async record => {
        try {
            const updateUserResult = await updateUser({
                variables: {
                    id: user.id,
                    record
                },
                refetchQueries: ["getUserDetails"]
            });
            console.log("[Profile.js] updateUserResult:", updateUserResult);
            message.success("Profile General Settings updated successfully.");
        } catch (e) {
            showErrors(e);
            setLoading(false);
        }
    };

    const updateAdminProperty = e => {
        const admin = e.target.checked;
        console.log("updateAdminProperty admin:", admin);
        updateUserDetails({
            admin
        }).then();
    };

    return (
        <Row type="flex" justify="center" align="middle">
            <Col
                style={{
                    justifyContent: "center"
                }}
                xs={22} sm={14} md={12} lg={10} xl={10}>
                <div className="profile-form">
                    <Form onSubmit={submitHandler}>
                        <Form.Item label="Name">
                            {getFieldDecorator("name", { rules: [] })(<Input
                                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                            />)}
                        </Form.Item>
                        <Form.Item label="Email">
                            {getFieldDecorator("email", { rules: [] })(
                                <Input disabled={!user.admin}
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
                        <Form.Item>
                            {getFieldDecorator("admin", {
                                valuePropName: "checked",
                                initialValue: user.admin,
                                rules: []
                            })(<Checkbox onChange={updateAdminProperty}>Admin</Checkbox>)}
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" htmlType="submit" icon="save">
                                Update Settings
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>

        </Row>

    );
});

const ProfileWrapper = Form.create({ name: "profile_form" })(Profile);

export default ProfileWrapper;

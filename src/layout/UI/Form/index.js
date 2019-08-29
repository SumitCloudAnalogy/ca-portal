import React, {memo, useState} from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './index.scss'
import {Link} from "react-router-dom";
import {REGISTER} from "../../graphql/user";
import useReactRouter from "use-react-router";
import {useMutation} from "@apollo/react-hooks";

const Forms = Form.create({ name: "login_form" })(memo((props) =>  {
    const { history } = useReactRouter();
    const [loading, setLoading] = useState(false);
    const [register] = useMutation(REGISTER);

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                setLoading(true);
                registerUser({
                    name: values.username,
                    email: values.email,
                    password: values.password
                }).then();
            }
        });
    };
    const registerUser = async ({ name, email, password }) => {
        try {
            const registerResult = await register({
                variables: {
                    name,
                    email,
                    password
                }
            });
            if (registerResult && registerResult.data.register) {
                message.success("Successfully Registered. Please Login.");
                setLoading(false);
                history.replace("/login");
            } else {
                message.error("Something went wrong!!!");
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };
    const { getFieldDecorator } = props.form;
    let reg = '';
    if(props.type === "Register") {
        reg = (
             <Form.Item>
                {getFieldDecorator('email', {
                    rules: [{ type: 'email',
                        required: true, message: 'Please input your mail!' }],
                    initialValue: "sumit@gmail.com"
                })(
                    <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Mail"
                    />,
                )}
            </Form.Item>
        )

    }
    return(
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    initialValue: 'sumit'
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                    />,
                )}
            </Form.Item>
            {reg}
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                    initialValue: "123456789"
                })(
                    <Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                <Form.Item>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        <Icon type="login" />Log in
                    </Button>
                </Form.Item>

                <span style={{justifyContent: 'center',
                    display: 'flex'}}>Or</span>
                <Form.Item>
                    <Link to="/dashboard">
                        <Button type="primary"  className="login-form-button" component={Link} to="/dashboard">
                        <Icon type="solution" />Register
                    </Button>
                    </Link>
                </Form.Item>

            </Form.Item>
        </Form>
    );
}));

export default Forms;

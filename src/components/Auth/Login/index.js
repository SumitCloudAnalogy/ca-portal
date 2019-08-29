import React, { memo, useContext, useState } from "react";
import { Button, Checkbox, Form, Icon, Input, message } from "antd";
import { NavLink } from "react-router-dom";
import useReactRouter from "use-react-router";
import { AuthenticatedContext } from "../../../context/AuthenticatedContext";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../../graphql/user";
import showErrors from "../../Utils/showErrors";
import { subscriptionClient } from "../../../graphql/ApolloClient";

const Login = memo(({ form }) => {
  const { getFieldDecorator } = form;
  const { history } = useReactRouter();
  const [loading, setLoading] = useState(false);
  const { setAuthenticated } = useContext(AuthenticatedContext);
  const [login] = useMutation(LOGIN);

  const submitHandler = e => {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if (!errors) {
        setLoading(true);
        loginUser({
          email: values.email,
          password: values.password
        }).then();
      }
    });
  };

  const loginUser = async ({ email, password }) => {
    try {
      const loginResult = await login({
        variables: {
          email,
          password
        }
      });
      console.log("[Login.js] loginUser loginResult:", loginResult);
      if (loginResult.data.login.token) {
        const { token, user_id } = loginResult.data.login;
        await setAuthenticated(token, user_id);
        subscriptionClient.close(false);
        history.replace("/dashboard");
      } else {
        message.error("Something went wrong!!!");
        setLoading(false);
      }
    } catch (ex) {
      showErrors(ex);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Form onSubmit={submitHandler}>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              { required: true, message: "Please input your username!" },
              {
                type: "email",
                message: "The input is not valid E-mail!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item className="remember-forgot-form-item">
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <NavLink
            to={"/forgot-password"}
            className="login-form-forgot"
            href=""
          >
            Forgot password
          </NavLink>
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            icon="login"
            type="primary"
            htmlType="submit"
            block
          >
            Log in
          </Button>
        </Form.Item>
        <p
          style={{
            textAlign: "center"
          }}
        >
          OR
        </p>
        <Form.Item>
          <Button
            disabled={loading}
            icon="solution"
            type="primary"
            block
            onClick={() => history.replace("/register")}
          >
            Register now!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

const LoginWrapper = Form.create({ name: "login_form" })(Login);

export default LoginWrapper;

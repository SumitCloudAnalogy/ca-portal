import React, { memo, useState } from "react";
import { Button, Form, Icon, Input, message } from "antd";
import useReactRouter from "use-react-router";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER } from "../../../graphql/user";
import showErrors from "../../Utils/showErrors";

const Register = memo(({ form }) => {
  const { getFieldDecorator } = form;
  const { history } = useReactRouter();
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [register] = useMutation(REGISTER);

  const submitHandler = e => {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if (!errors) {
        setLoading(true);
        registerUser({
          name: values.name,
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
      showErrors(e);
      setLoading(false);
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm_password"], { force: true });
    }
    callback();
  };
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  const confirmBlurHandler = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  return (
    <div className="register-container">
      <Form onSubmit={submitHandler}>
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input your name!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Full Name"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "The input is not valid E-mail!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Please input your Password!" },
              {
                validator: validateToNextPassword
              }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("confirm_password", {
            rules: [
              { required: true, message: "Please input your Password!" },
              {
                validator: compareToFirstPassword
              }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Confirm Password"
              onBlur={confirmBlurHandler}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            icon="solution"
            type="primary"
            htmlType="submit"
            block
          >
            Register
          </Button>
        </Form.Item>
        <p
          style={{
            textAlign: "center"
          }}
        >
          Already registered?
        </p>
        <Form.Item>
          <Button
            disabled={loading}
            icon="login"
            type="primary"
            block
            onClick={() => history.replace("/login")}
          >
            Login here!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

const RegisterWrapper = Form.create({ name: "register_form" })(Register);

export default RegisterWrapper;

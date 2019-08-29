import React, {Fragment, memo, useContext} from 'react';
import {Button, Col, Form, Icon, Input, message, Row, Card} from 'antd';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_ALL_TASK, INSERT_TASK} from "../../graphql/task";
import showErrors from "../Utils/showErrors";
import {UserContext} from "../../context/UserContext";

const Task = memo(({ form }) => {
    const user = useContext(UserContext);
    const [insertTask] = useMutation(INSERT_TASK);
    const {loading, data, subscribeToMore1} = useQuery(GET_ALL_TASK, {
        variables:{
            id: user.id
        }
    });
    if (loading) {
        return null;
    }
    console.log("[Main.js] USER_SUBSCRIPTION data1:", data);
    const {task} = data;
    const gridStyle = {
        width: '100%',
        textAlign: 'left',
        padding: 7,
        borderRadius: '4px',
        marginBottom: '10px',
        overflow: 'auto',
    };
    const { getFieldDecorator } = form;
    const submitHandler = async e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                insertTaskDetails(values).then(
                    form.resetFields()
                );
            }

        });
    };

    const insertTaskDetails = async record => {
        try {
            const insertTaskResult = await insertTask({
                variables: {
                    id: user.id,
                    description: record.description,
                    title: record.title,
                    status: 'IN-Progress',
                    assigned_to: user.id
                },
                refetchQueries: ["getAllTask"]
            });
            console.log("[Profile.js] insertTaskResult:", insertTaskResult);
            message.success("Task successfully inserted!.");
        } catch (e) {
            showErrors(e);
            // setLoading(false);
        }
    };
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return (
        <Fragment>
            <Row type="flex" justify="center" align="middle">
                <Col
                    style={{
                        justifyContent: "center"
                    }}
                    xs={22} sm={14} md={12} lg={10} xl={10}>
                    <div className="task-form">
                        <Form onSubmit={submitHandler}>
                            <Form.Item label="Title">
                                {getFieldDecorator("title", {
                                    rules: [{ required: true, message: "Please input your title!" }] })(<Input
                                    prefix={<Icon type="container" style={{ color: "rgba(0,0,0,.25)" }} />}
                                    placeholder="Title"
                                />)}
                            </Form.Item>
                            <Form.Item label="Description">
                                {getFieldDecorator("description", {
                                    rules: [{ required: true, message: "Please input your description!" }] })(
                                    <Input
                                           prefix={<Icon type="form" style={{ color: "rgba(0,0,0,.25)" }} />}
                                           placeholder="Description"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button block type="primary" htmlType="submit" icon="save">
                                    Add Task
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
            <Row type="flex" justify="center" align="middle">
                <Col
                    style={{
                        justifyContent: "center"
                    }}
                    xs={22} sm={14} md={12} lg={10} xl={10}>
                    {task.map(item => (
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
        </Fragment>
    );
});
const TaskWrapper = Form.create({ name: "task-form" })(Task);

export default TaskWrapper;

import React, {memo, useContext, useEffect, Fragment, useState} from 'react';
import './index.scss';
import {AuthenticatedContext} from '../../context/AutContext';
import Forms from "../Form";
import FormHeader from "../FormHeader";
import Footer from "../Footer";
import {Col, Row, Tabs} from "antd";
import client  from'../../graphql/ApolloClient'
import logo from '../../assets/svg/bg.svg';
import gql from "graphql-tag";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {HELLO, REGISTER} from '../../graphql/user';
const { TabPane } = Tabs;
const Auth = memo((props) => {
    const auth = useContext(AuthenticatedContext);
    /*const setAuth =()=> {
        let token ="ASDFHKAJSHFDKJASKLDFHKJASHDFKJHAKSDFLJALSJDFKLAJSKDJFKSJDKLFJAKSDCFKJASH";
        auth.setAuthenticated(token, !auth.Authenticated)
    };*/
    const {loading, error , data } = useMutation(REGISTER, {
        variables: {
            email: "sumitkr@gmail.com",
            name: "sumit kumar sharma",
            password : "123345678"
        }
    });
    console.log("data: ", JSON.stringify(data));
    useEffect(()=>{
    });
    const callback = (key) => {
        console.log(key);
    };
    return (
        <div className="Layout-container">
            {/*{auth.Authenticated ? <h1>ON </h1> : <h1>OFF </h1>}
            <Button onClick={setAuth}> CLICK</Button>className="AuthContainer"*/}
            <Row type="flex" justify="center"
            style={{backgroundImage:'url('+logo+')'}}>
                <Col
                    xs={20}
                    sm={12}
                    md={10}
                    lg={8}
                    xl={6}
                    >

                    <div className="AuthContainer">
                        <FormHeader/>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Login" key="1">
                                <Forms type="Login"/>
                                <Footer/>
                            </TabPane>
                            <TabPane tab="Register" key="2">
                                <Forms type="Register"/>
                                <Footer/>
                            </TabPane>
                        </Tabs>

                    </div>
                </Col>
            </Row>

        </div>
    )
})

export default Auth;



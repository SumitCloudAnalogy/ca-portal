import React, { memo } from "react";
import "./index.scss";
import bg from "../../assets/svg/bg.svg";
import { Col, Layout, Row } from "antd";

import FormHeader from "../UI/Header/FormHeader";
import HeaderTitle from "../UI/Header/HeaderTitle";
import AppFooter from "../UI/Footer";

const { Content} = Layout;
const Auth = memo(({ children }) => {
    return (
        <div className="auth-container">
            <Layout
                style={{
                    backgroundImage: `url(${bg})`
                }}
            >
                <Content style={{ minHeight: "auto" }}>
                    <div className="form-container">
                        <Row type="flex" justify="center" align="middle">
                            <Col
                                style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                                xs={20}
                                sm={12}
                                md={10}
                                lg={8}
                                xl={6}
                                span={24}
                            >
                                <FormHeader/>
                            </Col>
                        </Row>
                        <Row
                            type="flex"
                            justify="center"
                            align="middle"
                            style={{ margin: "10px 0 20px" }}
                        >
                            <Col
                                xs={20}
                                sm={12}
                                md={10}
                                lg={8}
                                xl={6}
                                style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <HeaderTitle/>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" align="middle">
                            <Col xs={20} sm={12} md={10} lg={8} xl={6}>
                                {children}
                            </Col>
                        </Row>
                    </div>
                </Content>
                <AppFooter/>
            </Layout>
        </div>
    );
});

export default Auth;

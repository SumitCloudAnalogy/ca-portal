import React, { memo, useContext } from "react";
import { Card, Icon, Avatar, Row, Col, Button } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_ORGANISATIONS } from "../../graphql/organisations";
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import { Base64 } from "js-base64";

const { Meta } = Card;

const Organisations = memo(() => {
    const user = useContext(UserContext);
    const { loading, data, error } = useQuery(GET_ALL_ORGANISATIONS, {
        variables: {
            id: user.id
        }
    });

    if (loading) {
        return null;
    }

    console.log("[Organisations.js] data:", data);
    if (error) {
        console.log("[Organisations.js] error:", error);
    }

    const { organisation } = data;

    return (
        <div
            style={{
                padding: 20
            }}
        >
            <Row gutter={20} type="flex">
                <Col>
                    <Card
                        hoverable
                        style={{
                            width: 300,
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Button block icon="plus" size="large" type="link">
                            Add Organisation
                        </Button>
                    </Card>
                </Col>
                {organisation.map(organisation => (
                    <Col span={6} key={organisation.id}>
                        <Card
                            style={{ width: 300 }}
                            cover={<img alt="example" src={organisation.banner_url} height='180'/>}
                            actions={[
                                <Icon type="setting" key="setting" />,
                                <NavLink to={`/organisation/${Base64.encode(organisation.id)}`}>
                                    <Icon type="edit" key="edit" />
                                </NavLink>,
                                <Icon type="ellipsis" key="ellipsis" />
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src={organisation.logo_url} />}
                                title={organisation.name}
                                description={organisation.primary_email}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
});

export default Organisations;

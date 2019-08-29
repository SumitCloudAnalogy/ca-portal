import React, {memo, useContext} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {GET_ALL_Holidays} from "../../graphql/holidays";
import {UserContext} from "../../context/UserContext";
import {Card, Col, Row} from "antd";
const Holidays = memo((props) => {
    const user = useContext(UserContext);
    console.log(user.id);
    const { loading, data, error } = useQuery(GET_ALL_Holidays, {
        variables: {
            id: user.id
        }
    });

    if (loading) {
        return null;
    }
    const gridStyle = {
        width: '100%',
        textAlign: 'left',
        padding: 7,
        borderRadius: '4px',
        marginBottom: '10px',
        overflow: 'auto',
    };
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    console.log("[Holidays.js] data:", data);
    console.log("[Holidays.js] data:", error);
    const { holiday } = data;
    return (
        <Row type="flex" justify="center" align="middle">
            <Col
                style={{
                    justifyContent: "center",
                    marginTop: '2%'
                }}
                xs={22} sm={14} md={12} lg={10} xl={10}>
                {holiday.map(item => (
                    <Card.Grid style={gridStyle} key={item.id}>
                        <div className="container">
                            <p>{item.name}</p>
                            <p>{(new Date(item.date)).toLocaleDateString('en-US', DATE_OPTIONS)}</p>
                        </div>
                    </Card.Grid >
                ))}
            </Col>
        </Row>
    );
});

export default Holidays;

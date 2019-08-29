import React from 'react';
import {Typography} from "antd";
const { Text } = Typography;

const HeaderTitle = (props) => (
    <Text
        type="secondary"
        style={{
            textAlign: "center"
        }}
    >
        Cloudanalogy Management Portal.
    </Text>
);

export default HeaderTitle;

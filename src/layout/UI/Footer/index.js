import React from 'react';
import {Icon, Layout} from "antd";
const {Footer } = Layout;
const AppFooter = (props) => (
    <div>
        <Footer style={{
            textAlign: 'center'
        }}>
            <strong>CA-Portal</strong> <Icon type="copyright" /> 2019 Created by <a
            href="https://www.cloudanalogy.com" target="_blank" rel="noopener noreferrer">Cloudanalogy Softech Pvt
            Ltd</a>
        </Footer>
    </div>

);

export default AppFooter;

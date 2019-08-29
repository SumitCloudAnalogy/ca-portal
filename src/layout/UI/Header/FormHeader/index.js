import React from 'react';
import {logo} from '../../../assets/images/logo.svg'
import './index.scss'
const FormHeader = (props) => (
    <React.Fragment>
        <div className="FormHeader">
            <img src="https://www.pr-inside.com/images/uploads/pr/2018/97797/20181129_ca-logo_97797.png"
                 alt="CA-Portal Logo" style={{height: '60px'}}>
            </img>
            <h1 style={{
                display: 'flex',
                marginLeft: '20px',
                fontSize: '32px'}}>CA-Portal</h1>
        </div>
        <div style={{textAlign: 'center',
        color: 'rgba(0,0,0,.45)',
        marginTop: 5}}>
        </div>
        <br/>
    </React.Fragment>
);

export default FormHeader;

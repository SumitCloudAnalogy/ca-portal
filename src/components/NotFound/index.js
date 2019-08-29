import React, {useContext, useEffect, useState} from 'react';
import {AuthenticatedContext} from "../../context/AutContext";
import useReactRouter from "use-react-router";

const NotFound = (props) => {
/*
    const { authenticated } = useContext(AuthenticatedContext);
    const [loading, setLoading] =  useState(false);
    const { history } = useReactRouter();
    useEffect(() =>{
        getStatus();
    },[]);
   const getStatus =  () => {
     authenticated ? history.replace('/dashboard'): history.replace('/login');
    };
*/

    return (

        <div style={{
            textAlign: 'center'
        }}>
            <h3>The page you are looking for could not be found</h3>
        </div>
    );
}

export default NotFound;

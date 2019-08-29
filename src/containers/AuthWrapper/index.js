import React, {memo, useContext, useEffect, useState} from 'react';
import Routes from "../../routes";
import ls from "../../helpers/ls";

import {AuthenticatedContext} from "../../context/AutContext";

const AuthWrapper = memo(() => {
const { setAuthenticated } = useContext(AuthenticatedContext);
const [loading, setLoading] = useState(true);

useEffect(() => {
    setAuthenticated(ls.get("token"), ls.get("user_id"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
    setLoading(false);
}, []);

if (loading) {
    return null;
}
return <Routes />;
});

export default AuthWrapper;

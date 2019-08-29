import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "./graphql/ApolloClient";
import { ApolloProvider } from '@apollo/react-hooks';
import {AuthenticatedContextProvider} from "./context/AutContext";
import AuthWrapper from "./containers/AuthWrapper";


ReactDOM.render(
    <ApolloProvider client={ApolloClient}>
       <AuthenticatedContextProvider>
           <AuthWrapper/>
       </AuthenticatedContextProvider>
    </ApolloProvider>
    , document.getElementById('root'));
serviceWorker.unregister();

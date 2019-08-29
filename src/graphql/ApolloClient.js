import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SubscriptionClient } from "subscriptions-transport-ws";
import constants from "../helpers/constants";
import ls from "../helpers/ls";

const connectionParams = async () => {
  const token = await ls.get("token");
  console.log("[ApolloClient.js] token:", token);
  return {
    headers: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {}
  };
};

export const subscriptionClient = new SubscriptionClient(
  constants.GRAPHQL_ENDPOINT,
  {
    reconnect: true,
    connectionParams: connectionParams
  }
);

const wsLink = new WebSocketLink(subscriptionClient);

const apolloClient = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache()
});

export default apolloClient;

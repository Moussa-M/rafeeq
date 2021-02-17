import { environment } from '../environments/environment';
const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK,SERVER_PORT,BASE_URL,REDIRECT_URI } = environment;

export default {
  oidc: {
    clientId: `${CLIENT_ID}`,
    issuer: `${ISSUER}`,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    testing: {
      disableHttpsCheck: `${OKTA_TESTING_DISABLEHTTPSCHECK}`
    }
  },
  resourceServer: {
    baseUrl: `http://${BASE_URL}:${SERVER_PORT}/`,
    ordersUrl: `http://${BASE_URL}:${SERVER_PORT}/api/orders`,
    storesUrl: `http://${BASE_URL}:${SERVER_PORT}/api/stores`,
    productsUrl: `http://${BASE_URL}:${SERVER_PORT}/api/products`,
    usersUrl: `http://${BASE_URL}:${SERVER_PORT}/api/users`,
  },
};

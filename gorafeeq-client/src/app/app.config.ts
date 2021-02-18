import { environment } from '../environments/environment';
const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK,BASE_URL,REDIRECT_URI } = environment;

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
  
};

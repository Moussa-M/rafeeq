const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oa644sgxwmqIJ58e5d6',
  issuer: 'https://dev-38077570.okta.com/oauth2/default'
});

async function oktaAuth(req, res, next) {
  try {
    console.log(req);
    const token = req.token;
    if (!token) {
      return res.status(403).send('NOT_AUTHENTICATED');
    }
    const jwt = await oktaJwtVerifier.verifyAccessToken(token, ['api://default']);
    req.user = {
      uid: jwt.claims.uid,
      email: jwt.claims.sub
    };
    next();
  }
  catch (err) {
    console.log('AUTH ERROR: ', err);
    return res.status(401).send(err.message);
  }
}

module.exports = oktaAuth;
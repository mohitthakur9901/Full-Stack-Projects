const configAuth0 = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET as string,
  baseURL: process.env.BASE_URL as string,
  clientID: process.env.CLIENT_ID as string,
  issuerBaseURL: process.env.ISSUER_BASE_URL as string
};
export default configAuth0;
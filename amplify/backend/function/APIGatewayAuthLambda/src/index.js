

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

const userPoolId = 'eu-west-3_jQgU5pcS3'; // Reemplaza con tu User Pool ID de Cognito
const region = 'eu-west-3'; // Reemplaza con tu región de AWS
const iss = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;

exports.handler = async (event, context) => {
  const token = event.authorizationToken.replace('Bearer ', '');
  const sections = token.split('.');
  const header = JSON.parse(Buffer.from(sections[0], 'base64').toString('utf8'));
  const kid = header.kid;

  const jwksResponse = await fetchJwks();
  const jwk = jwksResponse.keys.find(key => key.kid === kid);
  const pem = jwkToPem(jwk);

  try {
    const decodedToken = jwt.verify(token, pem, { issuer: iss });
    const isMemberOfAIUsers = decodedToken['cognito:groups'] && decodedToken['cognito:groups'].includes('AI-Users');
    if (isMemberOfAIUsers) {
      context.succeed(generatePolicy(decodedToken.sub, 'Allow', event.methodArn));
    } else {
      context.fail('Unauthorized');
    }
  } catch (error) {
    context.fail('Unauthorized');
  }
};

async function fetchJwks() {
  const jwksUri = `${iss}/.well-known/jwks.json`;
  const response = await fetch(jwksUri, { method: 'GET' });
  return response.json();
}

function generatePolicy(principalId, effect, resource) {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
}

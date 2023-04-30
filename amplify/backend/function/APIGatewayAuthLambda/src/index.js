

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const fetch = require('node-fetch');

const userPoolId = 'eu-west-3_jQgU5pcS3'; // Reemplaza con tu User Pool ID de Cognito
const region = 'eu-west-3'; // Reemplaza con tu región de AWS
const iss = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;

exports.handler = async (event, context) => {
  const token = event.authorizationToken.replace('Bearer ', '');
  const sections = token.split('.');
  const header = JSON.parse(Buffer.from(sections[0], 'base64').toString('utf8'));
  const kid = header.kid;

  // Obtiene el JSON Web Key Set (JWKS) para verificar el token
  const jwksResponse = await fetchJwks();
  const jwk = jwksResponse.keys.find(key => key.kid === kid);
  const pem = jwkToPem(jwk);

  try {
    // Verifica el token y extrae su contenido
    const decodedToken = jwt.verify(token, pem, { issuer: iss });

    // Comprueba si el usuario pertenece al grupo "AI-Users"
    const isMemberOfAIUsers = decodedToken['cognito:groups'] && decodedToken['cognito:groups'].includes('AI-Users');

    // Si el usuario es miembro del grupo "AI-Users", permite el acceso
    if (isMemberOfAIUsers) {
      context.succeed(generatePolicy(decodedToken.sub, 'Allow', event.methodArn));
    } else {
      // Si el usuario no es miembro del grupo, deniega el acceso
      context.fail('Unauthorized');
    }
  } catch (error) {
    // Si la verificación del token falla, deniega el acceso
    context.fail('Unauthorized');
  }
};

async function fetchJwks() {
  // Construye la URL del JWKS y realiza una solicitud GET
  const jwksUri = `${iss}/.well-known/jwks.json`;
  const response = await fetch(jwksUri, { method: 'GET' });

  // Devuelve el JWKS como un objeto JSON
  return response.json();
}

function generatePolicy(principalId, effect, resource) {
  // Crea un objeto de respuesta de autorización vacío
  const authResponse = {};
  authResponse.principalId = principalId;

  // Si se proporcionan "effect" y "resource", crea un documento de política
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

  // Devuelve la respuesta de autorización
  return authResponse;
}

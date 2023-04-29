const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();
const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  const secretId = 'openai-api-key'; // Reemplaza con el nombre de tu secreto
  const secretValue = await secretsManager.getSecretValue({ SecretId: secretId }).promise();
  const apiKey = JSON.parse(secretValue.SecretString).OPENAI_API_KEY;

  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  let parsedEvent;
  if (typeof event === 'string') {
    // Si el evento es de tipo cadena, parsearlo como JSON
    parsedEvent = JSON.parse(event);
  } else {
    // Si el evento no es de tipo cadena, asumir que ya es un objeto
    parsedEvent = event;
  }
  const messages = parsedEvent.messages || [{"role": "user", "content": "Hello!"}];

  console.log('Evento recibido:', parsedEvent);
  console.log('Cuerpo del evento:', messages);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages, 
  });
  
 
  return {
    statusCode: 200,
    headers: {
    "Access-Control-Allow-Origin": "*", // Ajusta esto al dominio específico en producción
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
    body: JSON.stringify({ message: completion.data.choices[0].message.content.trim() }),
  };
};

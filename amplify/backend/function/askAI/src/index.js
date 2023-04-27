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
  // A continuación, usa el SDK de OpenAI para interactuar con la API de OpenAI
  // Aquí tienes un ejemplo para realizar una llamada a la API de completions

  // Obtén messages del evento o establece un valor predeterminado
  const messages = event.messages || [{"role": "user", "content": "Hello!"}];

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  
  //console.log(completion.data.choices[0].message);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: completion.data.choices[0].message.content.trim() }),
  };
};

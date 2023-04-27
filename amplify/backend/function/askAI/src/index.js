/* Amplify Params - DO NOT EDIT
	AUTH_ARTEMISACHAT_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const { Configuration, OpenAIApi } = require("openai");

// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import {
    SecretsManagerClient,
    GetSecretValueCommand,
  } from "@aws-sdk/client-secrets-manager";
  
  const secret_name = "openai-api-key";
  
  const client = new SecretsManagerClient({
    region: "eu-west-3",
  });
  
  let response;
  
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }
  
  const secret = response.SecretString;
  

exports.handler = async (event, context) => {
    const ssm = new AWS.SSM();
    const parameterName = process.env.openai_apikey;
    let openaiApiKey;
    try {
        const data = await ssm.getParameter({ Name: parameterName, WithDecryption: true }).promise();
        openaiApiKey = data.Parameter.Value;
    } catch (err) {
        console.log(`Error retrieving parameter: ${parameterName}`);
        return err;
    }

    
    
    const configuration = new Configuration({
      apiKey: secret,
    });
    const openai = new OpenAIApi(configuration);
    const { model, prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, stop } = event;

    try {
        const response = await openai.createCompletion({
            prompt: prompt,
            model: model,
            temperature: temperature,
            max_tokens: max_tokens,
            top_p: top_p,
            frequency_penalty: frequency_penalty,
            presence_penalty: presence_penalty,
            stop: stop
        });
        console.log(response.data.choices[0].text)
        return response.data.choices[0].text;
    } catch (err) {
        console.log(`Error generating response: ${err}`);
        return err;
    }
};

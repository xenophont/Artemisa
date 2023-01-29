/* Amplify Params - DO NOT EDIT
	AUTH_ARTEMISACHAT_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */const AWS = require('aws-sdk');
const openai = require('openai');

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
    openai.apiKey = openaiApiKey;
    const { model, prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, stop } = event;

    try {
        const response = await openai.Completion.create({
            prompt: prompt,
            model: model,
            temperature: temperature,
            max_tokens: max_tokens,
            top_p: top_p,
            frequency_penalty: frequency_penalty,
            presence_penalty: presence_penalty,
            stop: stop
        });
        console.log(response.choices[0].text)
        return response.choices[0].text;
    } catch (err) {
        console.log(`Error generating response: ${err}`);
        return err;
    }
};

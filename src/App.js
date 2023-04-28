import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { Configuration, OpenAIApi } from 'openai';
import { withAuthenticator } from '@aws-amplify/ui-react';
import OptionSelection from './Components/OptionSelection';
import Translation from './Components/Translation';
import { arrayItems } from './Options/list'; 
import artemisaLogo from './Assets/Artemisa-logo-clean.png';
import { Amplify } from 'aws-amplify';
import config from './aws-exports'
import { API } from 'aws-amplify';

import Layout from './Components/Layout';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';
import Home from './Pages/Home';

Amplify.configure(config);
const apiName = config.aws_cloud_logic_custom[0].name;

async function callAskAIStaging(messages) {
  try {
    const response = await API.post(apiName, '/askai-staging', {
      body: {
        messages: messages,
      },
    }); 

    // Maneja la respuesta de la función Lambda
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error al llamar a la función Lambda askAI-staging:', error);
  }
}


function App({ user, signOut }) {

  const messages = [
    { role: 'system', content: 'Estás chateando con un IA entrenada en una variedad de temas.' },
    { role: 'user', content: '¿Cuáles son los beneficios de la inteligencia artificial?' },
  ];

  const payload = {
    "messages": [
      {
        "role": "system",
        "content": "Estás chateando con un IA entrenada en una variedad de temas."
      },
      {
        "role": "user",
        "content": "¿Cuáles son los beneficios de la inteligencia artificial?"
      }
    ]
  }
    
  callAskAIStaging(payload).then((response) => {
    console.log('Respuesta de la función Lambda:', response);
  });
  

  //const askOpenai = 'https://zdnqgio3sm3rr4oil75xgvhtby0ptzpd.lambda-url.eu-west-3.on.aws/';
  const [selectedOption, setSelectedOption] = useState({});
  const [input, setInput] = useState(''); //input from user
  const [response, setResponse] = useState(""); //response from openai
  const selectOption = (selectedOption) => {
    setSelectedOption(selectedOption);
  }

  const doStuff = async () => {
    let object = {...selectedOption, prompt: input };
    console.log(selectedOption);
    /*
    const res = await fetch(askOpenai, {
      method: "POST",
      body: JSON.stringify(selectedOption)
    });
    const json = await res.json();
    setResponse(json.response);
    console.log(response);
    console.log(response.data.choices[0].text);
    */
  }

  return (
    <div className="App">
        <div className="userbar">
          <span>user: {user.attributes.email}</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      <header className="App-header">
        <img src={artemisaLogo} className="App-logo" alt="logo" />
        <h1>
          Welcome to ArtemisaChat
        </h1> 

        {/*if selectedOption is empty, show the option selection, otherwise show the translation*/}
        { Object.values(selectedOption).length === 0 ? (
            <OptionSelection arrayItems = { arrayItems } selectOption={selectOption}/> 
        ) : (
           <Translation doStuff={doStuff} setInput={setInput}/>
        )}

        <a
          className="App-link"
          //email link
          href="mailto:javier.deno@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      </header>
      <footer className='footer'>
        <p>Powered by OpenAI</p>
        <a className="App-link" href="/termsandservices.html">Privacy Policy</a>
        <a className="App-link"href="/termsandservices.html" >Terms and Services</a>
      </footer>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Privacy />} />
          <Route path="contact" element={<Terms />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default withAuthenticator(App)/*, {
  socialProviders: ['google']
});
*/

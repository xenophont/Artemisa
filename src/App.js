//standard frontent for react with a spining logo
import React, { useState } from 'react';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import OptionSelection from './Components/OptionSelection';
import Translation from './Components/Translation';
import { arrayItems } from './Options/list'; 
import artemisaLogo from './Assets/Artemisa-logo-clean.png';

function App({ user, signOut }) {

  const [selectedOption, setSelectedOption] = useState({});
  const [input, setInput] = useState(''); //input from user

  const selectOption = (option) => {
    setSelectedOption(option);
  }
  
  const doStuff = () => {
  };

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
    </div>
  );
}

export default withAuthenticator(App)/*, {
  socialProviders: ['google']
});
*/

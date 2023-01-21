//standard frontent for react with a spining logo
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import OptionSelection from './Components/OptionSelection';
import { arrayItems } from './Options/list'; 

function App({ user, signOut }) {
  return (
    <div className="App">
        <div className="userbar">
          <span>user: {user.attributes.email}</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Welcome to ArtemisaChat
        </h1>

        <OptionSelection arrayItems = { arrayItems } /> 

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

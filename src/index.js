import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@aws-amplify/ui-react/styles.css';
import { AmplifyProvider } from '@aws-amplify/ui-react';  
import { defaultDarkModeOverride } from '@aws-amplify/ui-react';




/*
const callLambdaFunction = async (messages) => {
  const lambda = new AWS.Lambda();

  const params = {
    FunctionName: 'askAI-staging', // Reemplaza con el nombre de tu función Lambda
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({ messages }),
  };

  try {
    const response = await lambda.invoke(params).promise();
    const responseBody = JSON.parse(response.Payload);
    console.log(responseBody);

    // Utiliza la respuesta de la función Lambda como desees
    // Por ejemplo, actualiza el estado de un componente de React o muestra la información en la UI
  } catch (error) {
    console.error('Error al llamar a la función Lambda:', error);
  }
};


// Llama a la función Lambda con un mensaje como entrada
const messages = [
  { role: 'system', content: 'Estás chateando con un IA entrenada en una variedad de temas.' },
  { role: 'user', content: '¿Cuáles son los beneficios de la inteligencia artificial?' },
];

//callLambdaFunction(messages);
*/

const theme = {
  name: 'myTheme',
  tokens: {
    colors: {
      font: {
        primary: { value: 'white' },
        secondary: { value: 'black' },
        placeholder: { value: 'black' }
      },
      background: {
        primary: '#00b159',
        secondary: '#009e4f'
      },
    }
  }
};


const theme2 = {
  name: 'terminal',
  tokens: {
    colors: {
      green: {
        10: { value: '#C7EFCA' },
        20: { value: '#9AE2A1' },
        40: { value: '#4CCB68' },
        60: { value: '#44AF5B' },
        80: { value: '#31703D' },
        90: { value: '#224226' },
        100: { value: '#013D09' },
      },
      brand: {
        primary: {
          10: { value: '{colors.green.10}' },
          20: { value: '{colors.green.20}' },
          40: { value: '{colors.green.40}' },
          60: { value: '{colors.green.60}' },
          80: { value: '{colors.green.80}' },
          90: { value: '{colors.green.90}' },
          100: { value: '{colors.green.100}' },
        },
        secondary: {
          10: { value: '{colors.green.10}' },
          20: { value: '{colors.green.20}' },
          40: { value: '{colors.green.40}' },
          60: { value: '{colors.green.60}' },
          80: { value: '{colors.green.80}' },
          90: { value: '{colors.green.90}' },
          100: { value: '{colors.green.100}' },
        },
      },
      border: {
        primary: { value: 'black' },
      },
    },
    shadows: {
      small: {
        value: {
          offsetX: '0px',
          offsetY: '2px',
          blurRadius: '4px',
          color: '{colors.shadow.tertiary.value}',
        },
      },
      medium: {
        value: {
          offsetX: '10px',
          offsetY: '10px',
          spreadRadius: '0px',
          blurRadius: '0',
          color: '{colors.shadow.secondary.value}',
        },
      },
      large: {
        value: {
          offsetX: '8px',
          offsetY: '30px',
          spreadRadius: '10px',
          blurRadius: '0',
          color: '{colors.shadow.primary.value}',
        },
      },
    },
    components: {
      card: {
        boxShadow: { value: '{shadows.medium.value}' },
      },
      radio: {
        button: {
          padding: { value: '{borderWidths.small}' },
          borderWidth: { value: '{borderWidths.small}' },
        },
      },
      heading: {
        1: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
        2: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
        3: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
        4: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
        5: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
        6: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
      },
      button: {
        primary: {
          backgroundColor: { value: '{colors.brand.primary.40.value}' },
          color: { value: '{colors.font.primary.value}' },
          borderColor: { value: '{colors.border.primary.value}' },
        },
      },
    },
    radii: {
      small: { value: '0' },
      medium: { value: '0' },
      large: { value: '0' },
    },
    space: {
      small: { value: '1rem' },
      medium: { value: '1.5rem' },
      large: { value: '2rem' },
    },
    borderWidths: {
      small: { value: '2px' },
      medium: { value: '4px' },
      large: { value: '8px' },
    },
  },
  overrides: [defaultDarkModeOverride],
};



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AmplifyProvider theme={theme2}>
    <App />
  </AmplifyProvider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

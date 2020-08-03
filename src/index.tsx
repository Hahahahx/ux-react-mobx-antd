import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from '@/components/Provider/Provider';
import { WebSocket } from '@/components/WebSocket/WebSocket';
import { wsList, config } from '@/config/websocketConfig';

ReactDOM.render(
  <Provider>
    <WebSocket wsList={wsList} config={config} >
        <App />
    </WebSocket>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

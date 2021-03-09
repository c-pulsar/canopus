import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FetchHttpClient } from './RestClient/FetchHttpClient';
import { RestClient } from './RestClient/RestClient';

var httpClient = new FetchHttpClient();
var restClient = new RestClient(httpClient, {
  bearerToken: "",
  onAuthFailed: op => Promise.resolve(true)
});

ReactDOM.render(
  <React.StrictMode>
    <App api={restClient} rootUri="http://localhost:3010/" />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

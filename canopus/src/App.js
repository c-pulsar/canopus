import logo from './logo.svg';
import './App.css';
import RootNavigation from './Components/RootNavigation';
import { FetchHttpClient } from './RestClient/FetchHttpClient';
import { RestClient } from './RestClient/RestClient';

function App() {

  const httpClient = FetchHttpClient;

  var restClient = RestClient(httpClient, {});

  //restClient.get

  

  return (
    <div className="App">
      <RootNavigation/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

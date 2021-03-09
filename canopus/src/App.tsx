import React from "react";
import { Representation } from "./RestClient/Representation";

import './App.css';
import { FetchHttpClient } from "./RestClient/FetchHttpClient";
import { RestClient } from "./RestClient/RestClient";
import RootContainer from "./Components/RootContainer";

type AppState = {
  rootRepresentation?: Representation
}

interface AppProps {
  rootUri: string
}

class App extends React.Component<AppProps, AppState> {

  private restClient: RestClient;

  constructor(props: AppProps) {
    super(props);

    var httpClient = new FetchHttpClient();
    this.restClient = new RestClient(httpClient, {
      bearerToken: "",
      onAuthFailed: op => Promise.resolve(true)
    });
  }

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.setState({ rootRepresentation: undefined });
  }

  // After the component did mount, we load api root
  componentDidMount() {
    this.restClient
      .get(this.props.rootUri)
      .then(x => this.setState({ rootRepresentation: x }));
  }

  render() {
    if (!this.state.rootRepresentation) {
      return <div className="App">Loading API...</div>;
    }

    return <RootContainer rootRepresentation={this.state.rootRepresentation} />
  }
}

export default App;

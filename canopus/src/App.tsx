import React from "react";
import { Representation } from "./RestClient/Representation";

import './App.css';
import { RestClient } from "./RestClient/RestClient";
import RootContainer from "./Components/RootContainer";
import { RestApi } from "./RestClient/RestApi";

type AppState = {
  rootRepresentation?: Representation
}

interface AppProps {
  rootUri: string,
  api: RestApi
}

class App extends React.Component<AppProps, AppState> {

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.setState({ rootRepresentation: undefined });
  }

  // After the component did mount, we load api root
  componentDidMount() {
    this.props.api
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

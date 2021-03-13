import React from "react";
import { Representation } from "./RestClient/Representation";
import RootContainer from "./Components/RootContainer";
import { RestApi } from "./RestClient/RestApi";

import "./custom.scss";

type AppState = {
  rootRepresentation?: Representation
}

interface AppProps {
  rootUri: string,
  api: RestApi
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.setState({ rootRepresentation: undefined });
  }

  componentDidMount() {
    this.props.api
      .get(this.props.rootUri)
      .then(x => this.setState({ rootRepresentation: x }));
  }

  render() {
    
    if (this.state && this.state.rootRepresentation) {
      return <RootContainer
        api={this.props.api}
        rootRepresentation={this.state.rootRepresentation} />
    }

    return <div className="App">Loading API...</div>;
  }
}

export default App;

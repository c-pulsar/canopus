import React from "react";
import { collectionOrUndefined, createFormOrUndefined, Representation } from "../RestClient/Representation";
import { RestApi } from "../RestClient/RestApi";
import CreateFormRepresentationView from "./CreateFormRepresentationView";
import RepresentationCollectionView from "./RepresentationCollectionView";
import RepresentationView from "./RepresentationView";

interface RepresentationSelectorProps {
  representation: Representation,
  onNavigate: (uri: string) => void,
  api: RestApi
}

class RepresentationSelector extends React.Component<RepresentationSelectorProps> {

  render() {

    var collection = collectionOrUndefined(this.props.representation);
    if (collection) {
      return <RepresentationCollectionView
        onNavigate={this.props.onNavigate}
        collection={collection} />;
    }

    var createForm = createFormOrUndefined(this.props.representation);
    if (createForm) {
      return <CreateFormRepresentationView
        api={this.props.api}
        onNavigate={this.props.onNavigate}
        createFormRepresentation={createForm} />;
    }

    return <RepresentationView
      api={this.props.api}
      onNavigate={this.props.onNavigate}
      representation={this.props.representation} />
  }
}

export default RepresentationSelector;
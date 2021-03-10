import React from "react";
import { collectionOrUndefined, Representation } from "../RestClient/Representation";
import { RestApi } from "../RestClient/RestApi";
import RepresentationCollectionView from "./RepresentationCollectionView";
import RepresentationView from "./RepresentationView";

interface RepresentationSelectorProps {
  representation: Representation,
  api: RestApi
}

class RepresentationSelector extends React.Component<RepresentationSelectorProps> {

  render() {

    var collection = collectionOrUndefined(this.props.representation);
    if (collection) {
      return <RepresentationCollectionView collection={collection} />;
    }

    return <RepresentationView api={this.props.api} representation={this.props.representation} />
  }
}

export default RepresentationSelector;
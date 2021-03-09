import React from "react";
import { collectionOrUndefined, Representation } from "../RestClient/Representation";
import RepresentationCollectionView from "./RepresentationCollectionView";
import RepresentationView from "./RepresentationView";

interface RepresentationSelectorProps {
  representation: Representation
}

class RepresentationSelector extends React.Component<RepresentationSelectorProps> {

  render() {

    var collection = collectionOrUndefined(this.props.representation);
    if (collection) {
      return <RepresentationCollectionView collection={collection} />;
    }

    return <RepresentationView representation={this.props.representation} />
  }
}

export default RepresentationSelector;
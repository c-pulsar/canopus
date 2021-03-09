import React from "react";
import { collectionOrUndefined, Representation } from "../RestClient/Representation";
import RepresentationCollectionView from "./RepresentationCollectionView";

interface RepresentationSelectorProps {
  representation: Representation
}

class RepresentationSelector extends React.Component<RepresentationSelectorProps> {

  render() {

    var collection = collectionOrUndefined(this.props.representation);
    if (collection) {
      return <RepresentationCollectionView collection={collection} />;
    }

    return <div>Selected Representation# {this.props.representation._title}</div>;
  }
}

export default RepresentationSelector;
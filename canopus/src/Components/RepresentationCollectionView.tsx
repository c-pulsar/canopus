import React from "react";
import { RepresentationCollection } from "../RestClient/Representation";

interface RepresentationCollectionViewProps {
  collection: RepresentationCollection
}

class RepresentationCollectionView extends React.Component<RepresentationCollectionViewProps> {
  
  render() {
    return <div>Selected Collection# {this.props.collection._title}</div>;
  }
}

export default RepresentationCollectionView;
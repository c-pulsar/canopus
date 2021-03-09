import React from "react";
import { collectionOrUndefined, Representation } from "../RestClient/Representation";

interface RepresentationSelectorProps {
  representation: Representation
}

class RepresentationSelector extends React.Component<RepresentationSelectorProps> {
  
  render() {
    
    var collection = collectionOrUndefined(this.props.representation);
    if (collection) {
      return <div>Selected Representation Collection# {collection._title}</div>;
    }
    
    return <div>Selected Representation# {this.props.representation._title}</div>;
  }
}

export default RepresentationSelector;
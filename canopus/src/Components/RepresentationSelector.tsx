import React from "react";
import { Representation } from "../RestClient/Representation";

interface RepresentationSelectorProps {
  representation: Representation
}

class RepresentationSelector extends React.Component<RepresentationSelectorProps> {
  render() {
    switch (this.props.representation._type) { 
      default : return <div>Selected Representation# {this.props.representation._title}</div>;
    }
  }
}

export default RepresentationSelector;
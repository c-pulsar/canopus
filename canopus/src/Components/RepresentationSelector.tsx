import React from "react";
import { collectionOrUndefined, createFormOrUndefined, editFormOrUndefined, Representation, searchFormOrUndefined } from "../RestClient/Representation";
import { RestApi } from "../RestClient/RestApi";
import CreateFormRepresentationView from "./CreateFormRepresentationView";
import EditFormRepresentationView from "./EditFormRepresentationView";
import RepresentationCollectionView from "./RepresentationCollectionView";
import RepresentationView from "./RepresentationView";
import SearchFormRepresentationView from "./SearchFormRepresentationView";

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
        representation={createForm} />;
    }

    var searchForm = searchFormOrUndefined(this.props.representation);
    if (searchForm) {
      return <SearchFormRepresentationView
        api={this.props.api}
        onNavigate={this.props.onNavigate}
        representation={searchForm} />;
    }

    var editForm = editFormOrUndefined(this.props.representation);
    if (editForm) {
      return <EditFormRepresentationView
        api={this.props.api}
        onNavigate={this.props.onNavigate}
        formRepresentation={editForm} />;
    }

    return <RepresentationView
      api={this.props.api}
      onNavigate={this.props.onNavigate}
      representation={this.props.representation} />
  }
}

export default RepresentationSelector;
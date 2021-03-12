import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { RepresentationCollection } from "../RestClient/Representation";

interface RepresentationCollectionViewProps {
  collection: RepresentationCollection,
  onNavigate: (uri: string) => void
}

class RepresentationCollectionView extends React.Component<RepresentationCollectionViewProps> {

  handleSelect = (uri: string | null) => {
    if (uri) {
      this.props.onNavigate(uri);
    }
  };

  render() {
    return (
      <Card border="secondary" bg="secondary" className="text-center" >
        <Card.Header as="h5">{this.props.collection._title}</Card.Header>
        <ListGroup className="list-group-flush" onSelect={this.handleSelect}>
          {
            this.props.collection._items.map(x =>
              <ListGroup.Item action eventKey={x.href} variant="secondary">
                {x.title}
              </ListGroup.Item>)
          }
        </ListGroup>
      </Card>
    );
  }
}

export default RepresentationCollectionView;
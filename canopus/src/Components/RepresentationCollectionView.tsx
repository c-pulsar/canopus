import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { RepresentationCollection } from "../RestClient/Representation";

interface RepresentationCollectionViewProps {
  collection: RepresentationCollection
}

class RepresentationCollectionView extends React.Component<RepresentationCollectionViewProps> {

  render() {
    return <Container fluid>
      <Row className="text-center">
        <Col>
          <p className="text-white bg-dark">
            {this.props.collection._title}
          </p>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <ListGroup>
            {this.props.collection._items.map(x =>
              <ListGroup.Item action variant="secondary">{x.title}</ListGroup.Item>)}
          </ListGroup>
        </Col>
      </Row>
    </Container>;
  }
}

export default RepresentationCollectionView;
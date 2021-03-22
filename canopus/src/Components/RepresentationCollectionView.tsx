import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { RepresentationCollection } from "../RestClient/Representation";
import NavigationToolbar from "./NavigationToolbar";

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
      <Card border="primary" bg="primary" className="text-center" >
        <Card.Header as="h5">{this.props.collection._title}</Card.Header>
        <NavigationToolbar
          links={this.props.collection._links}
          onNavigate={this.props.onNavigate} />
        <ListGroup onSelect={this.handleSelect}>
          {
            this.props.collection._items.map(x =>
              <ListGroup.Item key={x.href} href={`#${x.title}`} action eventKey={x.href} variant="primary">

                <Container>
                  <Row style={{ justifyContent: "center", alignItems: "center" }}>
                    <Col className="text-right">
                      <Image thumbnail src={x.image} height={100} width={100} />
                    </Col>
                    <Col className="text-left">
                      {x.title}
                    </Col>
                  </Row>
                </Container>
              </ListGroup.Item>)
          }
        </ListGroup>
      </Card>
    );
  }
}

export default RepresentationCollectionView;
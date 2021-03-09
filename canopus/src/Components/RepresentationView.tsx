import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Representation } from "../RestClient/Representation";

interface RepresentationViewProps {
  representation: Representation
}

class RepresentationView extends React.Component<RepresentationViewProps> {

  render() {
    return <Container fluid>
      <Row className="text-center">
        <Col>
          <p className="text-white bg-dark">
            {this.props.representation._title}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonGroup>
            {
              this.props.representation._links.map(x => <Button variant="outline-secondary" key={x.href}>{x.title}</Button>)
            }
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
        </Col>
      </Row>
    </Container>;
  }
}

export default RepresentationView;
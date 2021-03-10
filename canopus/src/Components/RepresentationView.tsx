import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Representation } from "../RestClient/Representation";
import { RestApi } from "../RestClient/RestApi";

type RepresentationViewState = {
  schema: any
}

interface RepresentationViewProps {
  representation: Representation,
  api: RestApi
}

class RepresentationView extends React.Component<RepresentationViewProps, RepresentationViewState> {

  componentDidMount() {
    this.props.api
      .getAny(this.props.representation._schema)
      .then(x => this.setState({ schema: x }));
  }

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
          {
            this.state &&
            this.state.schema &&
            <p>{JSON.stringify(this.state.schema)}</p>
          }
        </Col>
      </Row>
    </Container>;
  }
}

export default RepresentationView;
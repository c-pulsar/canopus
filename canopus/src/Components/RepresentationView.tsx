import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
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

  private titleOrDefault(propertyKey: string, propertySchema: any) {
    if (propertySchema.title) {
      return propertySchema.title;
    }

    return propertyKey;
  }

  private stringProperty(propertyKey: string, propertySchema: any, value: string) {
    return (
      <ListGroupItem>
        {this.titleOrDefault(propertyKey, propertySchema)}:
        <span>{value}</span>
      </ListGroupItem>
    );
  }

  private getFields() {

    if (this.state.schema.properties) {

      var result = [];

      for (var key in this.state.schema.properties) {
        var property = this.state.schema.properties[key];
        var value = (this.props.representation as any)[key];
        if (property) {
          result.push(this.stringProperty(key, property, value));
        }

      }

      return result;
    }

    return undefined;
  }

  render() {
    return (
      <Card border="secondary" bg="secondary" className="text-center">
        <Card.Header as="h5">{this.props.representation._title}</Card.Header>
        <ListGroup className="list-group-flush">
          {
            this.state &&
            this.state.schema &&
            this.getFields()
          }
        </ListGroup>
      </Card>
    );
  }

  // render2() {
  //   return <Container fluid>
  //     <Row className="text-center">
  //       <Col>
  //         <p className="text-white bg-dark">
  //           {this.props.representation._title}
  //         </p>
  //       </Col>
  //     </Row>
  //     <Row>
  //       <Col>
  //         <ButtonGroup>
  //           {
  //             this.props.representation._links.map(x => <Button variant="outline-secondary" key={x.href}>{x.title}</Button>)
  //           }
  //         </ButtonGroup>
  //       </Col>
  //     </Row>
  //     <Row>
  //       <Col className="text-center">
  //         <Container>
  //           {
  //             this.state &&
  //             this.state.schema &&
  //             this.getFields()
  //             // <p>{JSON.stringify(this.state.schema)}</p>
  //           }
  //         </Container>
  //       </Col>
  //     </Row>
  //   </Container>;
  // }
}

export default RepresentationView;
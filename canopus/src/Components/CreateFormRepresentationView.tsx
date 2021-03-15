import React, { FormEvent } from "react";
import { Button, ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { CreateFormRepresentation } from "../RestClient/Representation";
import { RestApi } from "../RestClient/RestApi";
import NavigationToolbar from "./NavigationToolbar";
import Ajv from "ajv";


type CreateFormRepresentationViewState = {
  schema: any
}

interface CreateFormRepresentationViewProps {
  representation: CreateFormRepresentation,
  onNavigate: (uri: string) => void,
  api: RestApi
}

class CreateFormRepresentationView extends React.Component<
  CreateFormRepresentationViewProps,
  CreateFormRepresentationViewState> {

  constructor(props: CreateFormRepresentationViewProps) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

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

  private stringProperty(propertyKey: string, propertySchema: any) {
    return (
      <Form.Group controlId={propertyKey} key={propertyKey} >
        <Form.Label className="text-primary">{this.titleOrDefault(propertyKey, propertySchema)}</Form.Label>
        <Form.Control name={propertyKey} type="text" isInvalid={false} />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </Form.Group>
    );
  }

  private getFields() {

    if (this.state.schema.properties) {

      var result = [];

      for (var key in this.state.schema.properties) {
        var property = this.state.schema.properties[key];
        if (property) {
          result.push(this.stringProperty(key, property));
        }
      }

      return result;
    }

    return undefined;
  }

  private onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const value = Object.fromEntries(data.entries());

    const ajv = new Ajv();
    const validate = ajv.compile(this.state.schema);

    const isValid = validate(value);
    if (isValid) {
      this.props.api
        .create(this.props.representation._postLocation, value)
        .then(location => this.props.onNavigate(location!));
    } else {
      validate.errors!.forEach(error => {
        //var form = event.target as Form;
        //event.currentTarget.
        
        alert("error: " + error.dataPath);
        //alert('nope: ' + JSON.stringify(validate.errors));  
      });
    }
  }

  //https://www.learnwithjason.dev/blog/get-form-values-as-json
  render() {

    return (
      <Card border="primary" bg="secondary" className="text-center">
        <Card.Header className="bg-primary" as="h5">{this.props.representation._title}</Card.Header>
        <NavigationToolbar
          links={this.props.representation._links}
          onNavigate={this.props.onNavigate} />

        <Container>
          <Row><Col><br /></Col></Row>
          <Row>
            <Col></Col>
            <Col xs={6} >
              <Form onSubmit={this.onFormSubmit} className="text-left">
                {
                  this.state &&
                  this.state.schema &&
                  this.getFields()
                }
                <Container>
                  <Row className="text-center">
                    <Col>
                      <ButtonGroup>
                        <Button variant="primary" type="submit" >Submit</Button>
                        <Button variant="primary" type="button" onClick={window.history.back} >Cancel</Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </Col>
            <Col></Col>
          </Row>
          <Row><Col><br /></Col></Row>
        </Container>
      </Card>
    );
  }
}

export default CreateFormRepresentationView;
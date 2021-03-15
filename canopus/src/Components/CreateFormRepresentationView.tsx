import React, { FormEvent } from "react";
import { Button, ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { CreateFormRepresentation } from "../RestClient/Representation";
import { RestApi } from "../RestClient/RestApi";
import NavigationToolbar from "./NavigationToolbar";
import Ajv from "ajv";
import { PropertyDefinition, PropertyType } from "./PropertyDefinition";
import { StringProperty } from "./StringProperty";


type CreateFormRepresentationViewState = {
  schema: any,
  validationErrors: any
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
      .then(x => this.setState({ schema: x, validationErrors: {}}));
  }

  private schemaProperties(schema: any, validationObject: any): JSX.Element[] {

    var result = [];

    if (schema.properties) {

      for (var key in schema.properties) {
        var propertySchema = schema.properties[key];
        if (propertySchema) {
          var propertyDefinition = new PropertyDefinition(key, propertySchema);
          switch (propertyDefinition.type()) {

            case PropertyType.String:
              result.push(<StringProperty
                propertyDefinition={propertyDefinition}
                validationErrors={validationObject[key]} />);
              break;

            default:
              result.push(<StringProperty
                propertyDefinition={propertyDefinition} validationErrors={validationObject[key]} />);
              break;
          }
        }
      }
    }

    return result;
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
        var el = event.currentTarget["searchText"];
        if (el) {
          //el.classList.add("is-invalid");
          this.setState({ ...this.state.schema, validationErrors: { searchText: [error.message] } });
        }

        //alert("error: " + error.dataPath + " => " + error.message);
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
                  this.schemaProperties(this.state.schema, this.state.validationErrors)
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
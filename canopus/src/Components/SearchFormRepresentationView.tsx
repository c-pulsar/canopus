import React, { FormEvent } from "react";
import { Button, ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { SearchFormRepresentation } from "../RestClient/Representation";
import { RestApi } from "../RestClient/RestApi";
import NavigationToolbar from "./NavigationToolbar";
import Ajv from "ajv";
import { PropertyDefinition, PropertyType } from "./PropertyDefinition";
import { StringProperty } from "./StringProperty";
import { collectionUri, manifestUri, selfUri } from "../RestClient/LinkRelations";

type SearchFormRepresentationViewState = {
  schema: any,
  forceValidation: boolean
}

interface SearchFormRepresentationViewProps {
  representation: SearchFormRepresentation,
  onNavigate: (uri: string) => void,
  api: RestApi
}

class SearchFormRepresentationView extends React.Component<
  SearchFormRepresentationViewProps,
  SearchFormRepresentationViewState> {

  constructor(props: SearchFormRepresentationViewProps) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.api
      .getAny(manifestUri(this.props.representation))
      .then(x => this.setState({ schema: x, forceValidation: false }));
  }

  private schemaProperties(schema: any): JSX.Element[] {

    var result = [];

    if (schema.properties) {

      for (var key in schema.properties) {
        var propertySchema = schema.properties[key];
        if (propertySchema) {
          var propertyDefinition = new PropertyDefinition(key, propertySchema);
          if (propertyDefinition.isReadOnly()) {
            break;
          }

          switch (propertyDefinition.type()) {

            case PropertyType.String:
              result.push(<StringProperty propertyDefinition={propertyDefinition} showValidation={this.state.forceValidation} />);
              break;

            default:
              result.push(<StringProperty propertyDefinition={propertyDefinition} showValidation={this.state.forceValidation} />);
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
        .create(selfUri(this.props.representation), value)
        .then(location => this.props.onNavigate(location!));
    } else {
      this.setState({ schema: this.state.schema, forceValidation: true });
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
                  this.schemaProperties(this.state.schema)
                }
                <Container>
                  <Row className="text-center">
                    <Col>
                      <ButtonGroup>
                        <Button variant="primary" type="submit" >Submit</Button>
                        <Button variant="primary" type="button"
                          onClick={x => this.props.onNavigate(collectionUri(this.props.representation))}>
                          Cancel
                        </Button>
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

export default SearchFormRepresentationView;
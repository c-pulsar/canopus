import React from "react";
import { Button, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Representation } from "../RestClient/Representation";
import { RestApi } from "../RestClient/RestApi";
import NavigationToolbar from "./NavigationToolbar";

type CreateFormRepresentationViewState = {
  schema: any
}

interface CreateFormRepresentationViewProps {
  createFormRepresentation: Representation,
  onNavigate: (uri: string) => void,
  api: RestApi
}

class CreateFormRepresentationView extends React.Component<
  CreateFormRepresentationViewProps,
  CreateFormRepresentationViewState> {

  componentDidMount() {
    this.props.api
      .getAny(this.props.createFormRepresentation._schema)
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
        <Form.Label>{this.titleOrDefault(propertyKey, propertySchema)}</Form.Label>
        <Form.Control name={propertyKey} type="text" />
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

  onSubmit(event: any) {
    event.preventDefault();
  
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());

    alert(JSON.stringify(value));
  }

  //https://www.learnwithjason.dev/blog/get-form-values-as-json
  render() {

    return (
      <Card border="primary" bg="primary" className="text-center">
        <Card.Header as="h5">{this.props.createFormRepresentation._title}</Card.Header>
        <NavigationToolbar
          links={this.props.createFormRepresentation._links}
          onNavigate={this.props.onNavigate} />

        <Form onSubmit={this.onSubmit} className="text-left">
          {
            this.state &&
            this.state.schema &&
            this.getFields()
          }
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Card>
    );
  }
}

export default CreateFormRepresentationView;
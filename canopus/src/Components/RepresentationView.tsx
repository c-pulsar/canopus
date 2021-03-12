import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { Representation } from "../RestClient/Representation";
import { RestApi } from "../RestClient/RestApi";
import NavigationToolbar from "./NavigationToolbar";

type RepresentationViewState = {
  schema: any
}

interface RepresentationViewProps {
  representation: Representation,
  onNavigate: (uri: string) => void,
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
        <span className="text-muted">{this.titleOrDefault(propertyKey, propertySchema)}</span>
        <span> : </span>
        <span className="text-muted">{value}</span>
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
        <NavigationToolbar 
          links={this.props.representation._links} 
          onNavigate={this.props.onNavigate} />
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
}

export default RepresentationView;
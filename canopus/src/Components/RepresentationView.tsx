import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { imageUriOrUndefined, manifestUri } from "../RestClient/LinkRelations";
import { Representation } from "../RestClient/Representation";
import { RestApi } from "../RestClient/RestApi";
import NavigationToolbar from "./NavigationToolbar";
import { Figure } from "react-bootstrap";

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
      .getAny(manifestUri(this.props.representation))
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
      <ListGroup.Item key={propertyKey} variant="primary">
        <span className="text-muted">{this.titleOrDefault(propertyKey, propertySchema)}</span>
        <span> : </span>
        <span className="text-muted">{value}</span>
      </ListGroup.Item>
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

    var imageUri = imageUriOrUndefined(this.props.representation);

    return (
      <Card border="primary" bg="primary" className="text-center">
        <Card.Header as="h5">{this.props.representation._title}</Card.Header>
        <NavigationToolbar
          links={this.props.representation._links}
          onNavigate={this.props.onNavigate} />
        <ListGroup className="list-group-flush">
          {
            imageUri &&
            <ListGroup.Item key="img" variant="primary">
              <Figure>
                <Figure.Image
                  width={300}
                  height={300}
                  src={imageUri}
                />
              </Figure>
            </ListGroup.Item>
          }
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
import React, { FormEvent } from "react";
import { Button, ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { EditFormRepresentation, Representation } from "../RestClient/Representation";
import { RestApi } from "../RestClient/RestApi";
import NavigationToolbar from "./NavigationToolbar";
import Ajv from "ajv";
import { PropertyDefinition, PropertyType } from "./PropertyDefinition";
import { StringProperty } from "./StringProperty";
import { aboutUri, collectionUri, manifestUri, selfUri } from "../RestClient/LinkRelations";
import ConfirmationModal from "./ConfirmationModal";

type EditFormRepresentationViewState = {
  schema: any,
  showModal: boolean,
  editedRepresentation: Representation,
  forceValidation: boolean
}

interface EditFormRepresentationViewProps {
  formRepresentation: EditFormRepresentation,
  onNavigate: (uri: string) => void,
  api: RestApi
}

class EditFormRepresentationView extends React.Component<
  EditFormRepresentationViewProps,
  EditFormRepresentationViewState> {

  constructor(props: EditFormRepresentationViewProps) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onDeleteConfirmed = this.onDeleteConfirmed.bind(this);
  }

  componentDidMount() {
    let manifest: any = undefined;
    this.props.api
      .getAny(manifestUri(this.props.formRepresentation))
      .then(x => manifest = x)
      .then(_ => this.props.api.get(aboutUri(this.props.formRepresentation)))
      .then(x => this.setState({
        schema: manifest,
        editedRepresentation: x,
        showModal: false,
        forceValidation: false
      }));
  }

  private schemaProperties(schema: any, representation: Representation): JSX.Element[] {

    var result = [];

    if (schema.properties) {

      for (var key in schema.properties) {
        var propertySchema = schema.properties[key];
        if (propertySchema) {
          var propertyDefinition = new PropertyDefinition(
            key, propertySchema, (representation as any)[key]);
          switch (propertyDefinition.type()) {

            case PropertyType.String:
              result.push(<StringProperty key={key} propertyDefinition={propertyDefinition} showValidation={this.state.forceValidation} />);
              break;

            default:
              result.push(<StringProperty key={key} propertyDefinition={propertyDefinition} showValidation={this.state.forceValidation} />);
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
        .update(aboutUri(this.props.formRepresentation), value)
        .then(_ => this.props.onNavigate(aboutUri(this.props.formRepresentation)));
    } else {
      this.setState({ schema: this.state.schema, forceValidation: true, showModal: false });
    }
  }

  private showModal(show: boolean) {
    var newState = {
      schema: this.state.schema,
      editedRepresentation: this.state.editedRepresentation,
      forceValidation: this.state.forceValidation,
      showModal: show
    };

    this.setState(newState);
  }

  private onDeleteConfirmed() {
    this.showModal(false);
    this.props.api
      .delete(selfUri(this.state.editedRepresentation))
      .then(() => this.props.onNavigate(collectionUri(this.state.editedRepresentation)));
  }

  //https://www.learnwithjason.dev/blog/get-form-values-as-json
  render() {

    return (
      <Card border="primary" bg="secondary" className="text-center">
        <Card.Header className="bg-primary" as="h5">{this.props.formRepresentation._title}</Card.Header>
        <NavigationToolbar
          links={this.props.formRepresentation._links}
          onNavigate={this.props.onNavigate} />
        <ConfirmationModal
          show={this.state && this.state.showModal}
          title="Confirmation"
          paragraphHeading="Delete Operation"
          question="This operation cannot be undone. Click confirm button to continue or cancel"
          onCancel={() => this.showModal(false)} 
          onConfirm={this.onDeleteConfirmed} />

        <Container>
          <Row><Col><br /></Col></Row>
          <Row>
            <Col></Col>
            <Col xs={6} >
              <Form onSubmit={this.onFormSubmit} className="text-left">
                {
                  this.state &&
                  this.state.schema &&
                  this.schemaProperties(this.state.schema, this.state.editedRepresentation)
                }
                <Container>
                  <Row className="text-center">
                    <Col>
                      <ButtonGroup>
                        <Button variant="primary" type="submit" >Submit</Button>
                        {
                          this.props.formRepresentation._deleteEnabled &&
                          <Button variant="danger" type="button" onClick={() => this.showModal(true)}>
                            Delete
                          </Button>
                        }
                        <Button variant="primary" type="button"
                          onClick={x => this.props.onNavigate(aboutUri(this.props.formRepresentation))}>
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

export default EditFormRepresentationView;
import React from "react";
import { Form } from "react-bootstrap";
import { PropertyDefinition } from "./PropertyDefinition";

interface StringPropertyProps {
  propertyDefinition: PropertyDefinition,
  validationErrors?: string[]
}

export class StringProperty extends React.Component<StringPropertyProps> {
  render() {
    return (
      this.props.propertyDefinition &&
      <Form.Group controlId={this.props.propertyDefinition.key} key={this.props.propertyDefinition.key} >
        <Form.Label className="text-primary">{this.props.propertyDefinition.titleOrDefault()}</Form.Label>
        {
          this.props.validationErrors
            ? this.props.validationErrors.length > 0
              ? <>
                <Form.Control name={this.props.propertyDefinition.key} type="text" isInvalid />
                {
                  this.props.validationErrors.map(x =>
                    <Form.Control.Feedback type="invalid">{x}</Form.Control.Feedback>)
                } </>
              : <Form.Control name={this.props.propertyDefinition.key} type="text" isValid />
            : <Form.Control name={this.props.propertyDefinition.key} type="text" />
        }

      </Form.Group>
    );
  }
}
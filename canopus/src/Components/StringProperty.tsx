import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { PropertyDefinition } from "./PropertyDefinition";
import Ajv from "ajv";

type StringPropertyState = {
  validationErrors: string[],
  propertyValue: string
  isValid: boolean,
  isInvalid: boolean,
  showValidation: boolean
}

interface StringPropertyProps {
  propertyDefinition: PropertyDefinition,
  showValidation: boolean
}

export class StringProperty extends
  React.Component<StringPropertyProps, StringPropertyState> {

  private readonly validate: Ajv.ValidateFunction;

  constructor(props: StringPropertyProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    const ajv = new Ajv();
    this.validate = ajv.compile(this.props.propertyDefinition.propertySchema);
  }

  private runValidation(value: string, showValidation: boolean): void {
    const isValid = this.validate(value);
    if (isValid) {
      this.setState({ validationErrors: [], isValid: true, isInvalid: false, propertyValue: value });
    } else {
      if (this.validate.errors) {
        let errors = this.validate.errors.map(x => x.message!);
        this.setState({
          validationErrors: errors,
          isValid: false,
          isInvalid: true,
          showValidation: showValidation,
          propertyValue: value
        });
      }
    }
  }

  private handleChange(event: ChangeEvent<any>): void {
    event.preventDefault(); 
    if (event && event.currentTarget) {
      this.runValidation(event.currentTarget.value, true);
    }
  }

  componentDidMount() {
    var value = this.props.propertyDefinition.value;
    this.runValidation(value, false);
  }

  render() {

    return (
      this.props.propertyDefinition &&
      <Form.Group controlId={this.props.propertyDefinition.key} key={this.props.propertyDefinition.key} >
        <Form.Label className="text-primary">{this.props.propertyDefinition.titleOrDefault()}</Form.Label>
        <Form.Control
          name={this.props.propertyDefinition.key}
          type="text"
          value={
            this.state && this.state.propertyValue
              ? this.state.propertyValue
              : ""
          }
          isValid={this.state && this.state.isValid && (this.props.showValidation || this.state.showValidation)}
          isInvalid={this.state && this.state.isInvalid && (this.props.showValidation || this.state.showValidation)}
          onChange={this.handleChange} />
        {
          this.state && this.state.validationErrors.length > 0 && (this.props.showValidation || this.state.showValidation) &&
          this.state.validationErrors.map((x, idx) =>
            <Form.Control.Feedback key={idx} type="invalid">Not valid ({x}).</Form.Control.Feedback>)
        }
      </Form.Group>
    );
  }
}
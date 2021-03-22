import React from "react";
import { Button, Modal } from "react-bootstrap";

type ConfirmationModalState = {

}

interface ConfirmationModalProps {
  show: boolean,
  title: string,
  question: string,
  paragraphHeading: string,
  onCancel: () => void,
  onConfirm: () => void
}

class ConfirmationModal extends React.Component<ConfirmationModalProps, ConfirmationModalState> {

  render() {
    return (
      <Modal show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={this.props.onCancel}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{this.props.paragraphHeading}</h4>
          <p>{this.props.question}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onConfirm}>Confirm</Button>
          <Button onClick={this.props.onCancel}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmationModal;
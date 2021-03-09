import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import React from "react";
import { Representation } from '../RestClient/Representation';

interface RootContainerProps {
  rootRepresentation: Representation
}

class RootContainer extends React.Component<RootContainerProps> {

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">{this.props.rootRepresentation._title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {this.props.rootRepresentation._links.map(x => <Nav.Link href={`#${x.rel}`}>{x.title}</Nav.Link>)}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default RootContainer;

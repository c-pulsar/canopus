import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React from "react";
import { Representation } from '../RestClient/Representation';
import RepresentationSelector from './RepresentationSelector'
import { RestApi } from '../RestClient/RestApi'

type RootContainerState = {
  selectedRepresentation?: Representation
}

interface RootContainerProps {
  rootRepresentation: Representation
  api: RestApi
}

class RootContainer extends React.Component<RootContainerProps, RootContainerState> {

  constructor(props: RootContainerProps) {
    super(props)
    this.setState({ selectedRepresentation: undefined });
  }

  componentDidMount() {
    this.setState({ selectedRepresentation: this.props.rootRepresentation });
  }

  handleSelect = (uri: string | null) => {
    if (uri) {
      this.navigate(uri);
    }
  };

  navigate = (uri: string) => {
    this.setState({ selectedRepresentation: undefined });
    this.props.api
      .get(uri)
      .then(x => this.setState({ selectedRepresentation: x }));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Navbar collapseOnSelect expand="lg" bg="secondary" className="text-center">
              <Navbar.Brand href="#home">{this.props.rootRepresentation._title}</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" onSelect={this.handleSelect}> {
                  this.props.rootRepresentation._links.map(x =>
                    <Nav.Link key={x.href} eventKey={x.href} href={`#${x.rel}`}>{x.title}</Nav.Link>)
                }
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
        <Row><Col><p></p></Col></Row>
        <Row>
          <Col style={{ justifyContent: "center", alignItems: "center" }}>
            {
              this.state &&
              this.state.selectedRepresentation &&
              <RepresentationSelector
                api={this.props.api}
                onNavigate={this.navigate}
                representation={this.state.selectedRepresentation} />
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RootContainer;

import React from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { Link } from "../RestClient/Representation";

interface NavigationToolbarProps {
  links: Link[],
  onNavigate: (uri: string) => void,
}

class NavigationToolbar extends React.Component<NavigationToolbarProps> {

  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <ButtonGroup>
              {
                this.props.links.map(x =>
                  <Button href={`#${x.rel}`} variant="primary" onClick={() => this.props.onNavigate(x.href)}>
                    {x.title}
                  </Button>)
              }
            </ButtonGroup>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default NavigationToolbar;
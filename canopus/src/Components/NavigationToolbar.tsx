import React from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { LinkRelations } from "../RestClient/LinkRelations";
import { Link } from "../RestClient/Representation";

interface NavigationToolbarProps {
  links: Link[],
  onNavigate: (uri: string) => void,
}

class NavigationToolbar extends React.Component<NavigationToolbarProps> {

  private isVisible(link: Link): boolean {
    return [ 
      LinkRelations.Self,
      LinkRelations.Image,
      LinkRelations.Manifest ].find(x => x === link.rel) === undefined;
  }

  render() {
    return (
      <Container fluid>
        <Row className="bg-primary">
          <Col></Col>
          <Col>
            <ButtonGroup>
              {
                this.props.links.filter(this.isVisible).map(x =>
                  <Button key={x.href} href={`#${x.rel}`} variant="primary" onClick={() => this.props.onNavigate(x.href)}>
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
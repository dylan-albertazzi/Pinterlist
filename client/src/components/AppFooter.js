import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
class AppFooter extends Component {
  render() {
    return (
      <Container fluid className="bg-green mt-auto py-3 text-white footer">
        <Row className="text-center">
          <Col>
            <p className="h6 m-0">© Pinterlist 2020</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AppFooter;

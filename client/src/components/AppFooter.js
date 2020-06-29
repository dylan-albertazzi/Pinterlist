import React, { Component } from "react";
import { Container } from "reactstrap";
class AppFooter extends Component {
  render() {
    return (
      <Container className="container-fluid mt-auto py-3 bg-dark text-white">
        <div className="container">Place sticky footer content here.</div>
      </Container>
    );
  }
}

export default AppFooter;

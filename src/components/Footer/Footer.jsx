import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6} className="fs-1 logo">
            SattaFoody
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <p>
              &copy; All Rights Reserved. Made By 
              <span className="copy"> Satta Family</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;

import React from "react";
import "../About/About.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const About = () => {
  return (
    <>
      <section className="home p-responsive animated-background">
        <Container fluid>
          <Row className="align-items-center g-lg-5 g-md-4 g-4">
            <Col lg={6} md={5} xs={12} className="text-center">
              <Image
                className="rounded-5 img-fluid img-about"
                src="https://thumbs.dreamstime.com/b/foodie-nourishment-restaurant-eating-buffet-concept-72008334.jpg"
                alt="about"
              />
            </Col>
            <Col lg={6} md={5}>
              <h1 className="title text-center">About us</h1>
              <div className="mt-3">
                <p className="about-lh">Welcome to our food section!</p>
                <p className="about-lh">
                  At our food website, we understand that food is not just fuel
                  for our bodies, but it is also a form of art and expression.
                  We believe that cooking and eating are essential parts of our
                  lives, and we want to provide a platform for people to connect
                  over their shared love of food. Our team is made up of a
                  diverse group of food enthusiasts who are committed to
                  creating a welcoming and inclusive community. We aim to
                  provide a space where people can learn, share, and celebrate
                  their own unique food traditions and experiences. We believe
                  that food is an essential part of our cultural identity and
                  heritage, and we strive to showcase the rich and varied
                  cuisines from around the world.
                </p>
              </div>
              <Link to="/allfood" style={{ textDecoration: "none" }}>
                <Button
                  variant="success"
                  className="shadow d-flex align-items-center p-2"
                >
                  Explore Our Food
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;

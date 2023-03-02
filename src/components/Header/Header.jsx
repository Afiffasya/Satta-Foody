import axios from "axios";
import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Header/Header.css";

const Header = () => {
  // eslint-disable-next-line
  const [username, setUserName] = useState();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/user`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: process.env.REACT_APP_APIKEY,
        },
      })
        .then((response) => {
          setUserName(response.data.user.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLogout = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/logout`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: process.env.REACT_APP_APIKEY,
      },
    })
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Navbar className="nav" expand="lg" sticky="top">
        <div className="container-fluid px-lg-5">
          <Navbar.Toggle aria-controls="navbarSupportContent" />
          <Navbar.Collapse id="navbarSupportContent">
            <Nav className="link">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/allfood">
                All Food
              </Nav.Link>
              {localStorage.getItem("token") && (
                <Nav.Link as={Link} to="/favorite">
                  Favorite
                </Nav.Link>
              )}
              {localStorage.getItem("role") === "admin" && (
                <Nav.Link as={Link} to="/add-food">
                  Add Food
                </Nav.Link>
              )}
            </Nav>
            <Navbar.Brand as={Link} to="/">
              <span className="mx-1 logo fs-1 text-focus-in">Sattafoody</span>
            </Navbar.Brand>
            <Nav className="link">
              {localStorage.getItem("token") ? (
                <NavDropdown title={username} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to={`/profile`}>
                    My Profile
                  </NavDropdown.Item>
                  {localStorage.getItem("role") === "admin" && (
                    <NavDropdown.Item as={Link} to="/all-users">
                      All User
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login" className="log">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default Header;



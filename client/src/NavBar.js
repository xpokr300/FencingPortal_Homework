import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Icon from "@mdi/react";
import { mdiFencing } from "@mdi/js";

function NavBar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container>
        <Navbar.Brand>
          <div style={brandStyle()} onClick={() => navigate("/")} >
            <Icon path={mdiFencing} size={1} color={"white"} />
            Fencing Portal
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return { backgroundColor: "#87CEFA" };
}

function brandStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "white",
  };
}

export default NavBar;

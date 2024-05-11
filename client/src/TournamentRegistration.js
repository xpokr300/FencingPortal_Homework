import { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function TournamentRegistration() {
  const navigate = useNavigate();
  //TODO - vytvoření formuláře pro přihlašování, použít tourmanetProvider

  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <h1>Tournament registration </h1>
        <h2>Page is in progress</h2>
      </div>

      <Form>
        <Button
          style={{
            margin: "5px",
            color: "white",
            background: "#87CEFA",
            border: "none",
          }}
          onClick={() => navigate("/")}
          type="submit"
        >
          Back to main page
        </Button>
      </Form>
    </Container>
  );
}

export default TournamentRegistration;

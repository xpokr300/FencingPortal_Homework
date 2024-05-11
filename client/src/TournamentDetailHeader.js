import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TournamentContext } from "./TournamentContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button.js";
import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";

function TournamentDetailHeader({ categories }) {
  const { tournament } = useContext(TournamentContext);
  const navigate = useNavigate();
  console.log(categories);

  return (
    <Container>
      {tournament ? (
        <>
          <div style={{ textAlign: "center" }}>
            <h3>{tournament.name}</h3>
          </div>
          <Row>
            <Col className="border">Date</Col>
            <Col className="border">{tournament.date}</Col>
          </Row>
          <Row>
            <Col className="border">Place</Col>
            <Col className="border">{tournament.place}</Col>
          </Row>
          <Row>
            <Col className="border">Organizer</Col>
            <Col className="border">{tournament.organizer}</Col>
          </Row>
          <Row>
            <Col className="border">Additional information</Col>
            <Col className="border">{tournament.additionalInformation}</Col>
          </Row>
          <Row>
            <Col className="border">Categories</Col>
            <Col className="border">
              {categories.map((c) => (
                <li>{c}</li>
              ))}
            </Col>
            <br />
          </Row>
        </>
      ) : (
        "loading..."
      )}
    </Container>
  );
}

export { TournamentDetailHeader };

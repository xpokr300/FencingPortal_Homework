import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TournamentListContext } from "./TournamentListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import TournamentCard from "./TournamentCard";
import Container from "react-bootstrap/esm/Container.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";

function TournamentList() {
  const { tournamentList } = useContext(TournamentListContext);
  const [showTournamentForm, setShowTournamentForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const navigate = useNavigate();

  return (
    <Container>
      <div style={{ textAlign: "right" }}>
        <Button
          onClick={() => navigate("/tournamentCreation")}
          style={{ color: "white", background: "#87CEFA", border: "none" }}
        >
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Create
          Tournament
        </Button>
      </div>
      <div style={{ textAlign: "center" }}>
        <h3>Tournaments</h3>
      </div>
      <div>
        <Container>
          <Row style={{ fontWeight: "bold" }}>
            <Col>No</Col>
            <Col>Name</Col>
            <Col>Date</Col>
            <Col></Col>
          </Row>
        </Container>
      </div>

      {tournamentList.map((tournament) => {
        return <TournamentCard key={tournament.id} tournament={tournament} />;
      })}
    </Container>
  );
}

export default TournamentList;

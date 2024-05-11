import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Icon from "@mdi/react";
import { mdiPencil, mdiEyeOutline } from "@mdi/js";

function TournamentCard({ tournament }) {
  const navigate = useNavigate();
  const dateToShow = new Date(tournament.date);

  return (
    <div className="card border-0 shadow rounded " style={componentStyle()}>
      {
        <Container>
          <Row>
            <Col>{tournament.index}</Col>
            <Col>
              <Button
                className="btn-light"
                onClick={() =>
                  navigate("/tournamentDetail?id=" + tournament.id)
                }
              >
                {tournament.name}
              </Button>
            </Col>
            <Col>{dateToShow.toDateString()}</Col>
            <Col>
              <Button   onClick={() => navigate("/tournamentRegistration?id=" + tournament.id)} style={{margin:"5px", color :"white" , background:"#87CEFA", border:"none"}}>
                  <Icon path={mdiPencil} size={0.7} color={"white"} /> Sign in
                </Button>     
            </Col>
          </Row>
        </Container>
      }
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "grid",
  };
}

export default TournamentCard;

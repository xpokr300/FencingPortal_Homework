import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//import EventDateTimeBadge from "./EventDateTimeBadge";
//import EventDetail from "./EventDetail";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil, mdiTrashCanOutline, mdiPlusBoxOutline} from "@mdi/js";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function TournamentCard({tournament}) {
  const navigate = useNavigate();
  const dateToShow = new Date(tournament.date);


  return (
    <div className="card border-0 shadow rounded " style={componentStyle()}>
      {
        <Container>
            <Row>
            <Col >
                {tournament.index}
              </Col>
              <Col>
              <a href=".">
                  {tournament.name}
                </a>
              </Col>
              <Col>
                {dateToShow.toDateString()}
              </Col>
              <Col>
                <Button  variant="info" onClick={() => navigate("/")} style={{color :"white"}}>
                  <Icon path={mdiPlusBoxOutline} size={0.7} color={"white"} /> Sign in
                </Button>    
              </Col>
            </Row>
        
        </Container>


      
      
      /* <EventDateTimeBadge event={event} />
      <EventDetail event={event} />
      <div
        style={{
          display: "grid",
          gap: "2px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => navigate("/eventDetail?id=" + event.id)}
          size={"sm"}
        >
          <Icon path={mdiEyeOutline} size={0.7} />
        </Button>
        <Button onClick={() => setShowEventForm(event)} size={"sm"}>
          <Icon path={mdiPencil} size={0.7} />
        </Button>
        <Button
          onClick={() => setShowConfirmDeleteDialog(event)}
          size={"sm"}
          variant="danger"
        >
          <Icon path={mdiTrashCanOutline} size={0.7} />
        </Button>
      </div> */}
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
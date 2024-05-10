import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TournamentContext } from "./TournamentContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button.js";
import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";


function TournamentDetailCategory({category}) {
  const { tournament } = useContext(TournamentContext);
  const navigate = useNavigate();

  return (
    <Container>
      {tournament ? (
          <>
            <Row>
              <Col>Category
              </Col>
              <Col>{category}
              </Col>
            </Row>              
          </>

          
      ): (
          "loading..."
        )}        
    </Container>
  );
}



export  {TournamentDetailCategory};

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TournamentContext } from "./TournamentContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button.js";
import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";


function TournamentDetailCategory({}) {
  const { tournament } = useContext(TournamentContext);
  const navigate = useNavigate();

  return (
    <Container>
      {tournament ? (
          <>
              Toto je komponenta ktera vzkresule detail categorie daneho turnaje
          </>
          
      ): (
          "loading..."
        )}        
    </Container>
  );
}



export  {TournamentDetailCategory};

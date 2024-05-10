import { useContext , useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { TournamentDetailHeader } from "./TournamentDetailHeader";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/esm/Button.js";
import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";
import TournamentProvider from "./TournamentProvider";
import { TournamentContext } from "./TournamentContext";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TournamentDetailCategory } from "./TournamentDetailCategory";


function TournamentDetail (){

  const { tournament } = useContext(TournamentContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (tournament) {
      const fetchedCategories = tournament.categoriesList.map((c) => c);
      setCategories(fetchedCategories);
    }
  }, [tournament]);

  console.log(categories);

    return (
      <Container>
        {tournament ? (
          <>
            <div style={{ textAlign: "right" }}>
              <Button
                onClick={() => navigate("/")}
                style={{
                  color: "white",
                  background: "#87CEFA",
                  border: "none",
                }}
              >
                <Icon path={mdiPencil} size={1} color={"white"} /> Sign in
              </Button>
            </div>
            <TournamentDetailHeader />
            <div>
              {categories.map((c) => {
                return(
                  <>
                  <Row>
                    <Col>Category</Col>
                    <Col>{c.categoryId}</Col>
                  </Row>
                  <TournamentDetailCategory/>

                  </>                  
                )
              })}
            </div>
          </>
        ) : (
          "loading..."
        )}
      </Container>
    );


}

export default TournamentDetail;
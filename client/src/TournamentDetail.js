import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TournamentDetailHeader } from "./TournamentDetailHeader";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button.js";
import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";
import TournamentProvider from "./TournamentProvider";
import { TournamentContext } from "./TournamentContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TournamentDetailCategory } from "./TournamentDetailCategory";
import { CategoryListContext } from "./CategoryListContext.js";

function TournamentDetail() {
  const { tournament } = useContext(TournamentContext);
  const { categoryList } = useContext(CategoryListContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (tournament && categoryList) {
      const categoriesNames = tournament.categoriesList.map(
        (tournamentCategory) => {
          const existingCategory = categoryList.find(
            (category) => category.id === tournamentCategory.categoryId
          );
          return existingCategory ? existingCategory.name : null;
        }
      );

      setCategories(categoriesNames.filter(Boolean)); // Odstraníme případné null hodnoty
    }
  }, [tournament, categoryList]);

  console.log(categories);

  return (
    <Container>
      {tournament ? (
        <>
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() =>
                navigate("/tournamentRegistration?id=" + tournament.id)
              }
              style={{
                margin: "5px",
                color: "white",
                background: "#87CEFA",
                border: "none",
              }}
            >
              <Icon path={mdiPencil} size={0.7} color={"white"} /> Sign in
            </Button>
          </div>
          <TournamentDetailHeader categories={categories} />
          <div>
            {categories.map((c) => {
              return (
                <>
                  <TournamentDetailCategory category={c} />
                </>
              );
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

import { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import { CategoryListContext } from "./CategoryListContext.js";
import { TournamentListContext } from "./TournamentListContext.js";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

function TournamentForm() {
  const { categoryList} = useContext(CategoryListContext);
  const {handlerMap } = useContext(TournamentListContext);


  const [namesOfCategories, setCategories] = useState([]);
  const [showAlert, setShowAlert] = useState("neco");

  useEffect(() => {
    if (categoryList) {
      const namesOfCategories = categoryList.map((c) => c.name);
      setCategories(namesOfCategories);
    }
  }, [categoryList]);

  return (
    <Container>
            <div style={{ textAlign: "center" }}>
        <h1>Tournament creation</h1>
      </div>


    <Form onSubmit={ async (e) => {
          console.log(e.target);
          e.preventDefault();
          e.stopPropagation();
          //tady jsem si musel pomoct Stackoverflow, protoze priklad od p.Miloty nefachčil. Netuším proč
          //https://stackoverflow.com/questions/56215041/formdata-returns-empty-data-on-form-submission-in-react
          const form = e.target;
          let data = {};
          for (let i=0; i < form.elements.length; i++) {
              const elem = form.elements[i];
              data[elem.name] = elem.value
          }
          console.log(data);

          //workaroud pro single vyber --todo
          let categoryName = data.category;
          let categoryId = categoryList.find(c=>c.name === categoryName)?.id
          console.log(categoryId);
          let categoriesList =[]
          let categoryToPush =  {
            "categoryId": categoryId
          }
          categoriesList.push(categoryToPush);
          data.categoriesList = categoriesList
          delete data.category;
          delete data[""];

          try {
              console.dir(data);
              await handlerMap.handleCreate(data);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
    >   


      <Form.Group className="mb-3" controlId="formName">
        <Form.Control type="text"  name= "name" placeholder="Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPlace">
        <Form.Control type="text" name= "place"  placeholder="Place" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formOrganizer">
        <Form.Control type="text" name= "organizer"  placeholder="Organizer" />
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formSchedule">
        <Form.Control
          type="text"
          as="textarea"
          name= "schedule" 
          style={{ height: "100px" }}
          placeholder="Schedule"
        />
      </Form.Group>
      <Form.Group className="mb-3 " name= "additionalInformation" controlId="formAdditionalInformation">
        <Form.Control
          type="text"
          as="textarea"
          name="additionalInformation"
          style={{ height: "100px" }}
          placeholder="Additional information"
        />
      </Form.Group>
      <Row>
        <Col>
          <Form.Group className="mb-3 " controlId="formDate">
            <Form.Label>Select date</Form.Label>
            <Form.Control name= "date" type="date" placeholder="Date" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3 " controlId="formCategory">
            <label for="selectCategory">Select category</label>
            <select class="form-control"  name= "category" id="selectCategory">
              {namesOfCategories.map((c) => {
                return (
                  <>
                    <option>{c}</option>
                  </>
                );
              })}
            </select>
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Confirm tournament creation
      </Button>
    </Form>
   </Container>
  );
}

export default TournamentForm;

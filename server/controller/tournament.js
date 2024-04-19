const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/tournament/getAbl");
const ListAbl = require("../abl/tournament/listAbl");
const CreateAbl = require("../abl/tournament/createAbl");
const UpdateAbl = require("../abl/tournament/updateAbl");
const DeleteAbl = require("../abl/tournament/deleteAbl");
const AddParticipantAbl = require("../abl/tournament/addParticipantAbl");
const GetDetailAbl = require("../abl/tournament/getDetailAbl");


router.get("/get", (req, res) => {
    GetAbl(req, res);
  });
  
  router.get("/list", (req, res) => {
    ListAbl(req, res);
  });
  
  router.post("/create", (req, res) => {
    CreateAbl(req, res);
  });
  
  router.post("/update", (req, res) => {
    UpdateAbl(req, res);
  });
  
  router.post("/delete", (req, res) => {
    DeleteAbl(req, res);
  });

  router.post("/addparticipant", (req, res) => {
    AddParticipantAbl(req, res);
  });

  router.get("/getdetail", (req, res) => {
    GetDetailAbl(req, res);
  });
  


module.exports = router;

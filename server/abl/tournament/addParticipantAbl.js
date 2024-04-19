const Ajv = require("ajv");
const ajv = new Ajv();

const tournamentDao = require("../../dao/tournament_dao.js");
const categoryDao = require("../../dao/category_dao.js");
const participantDao = require("../../dao/participant_dao.js");
const participantCreate = require("../participant/createAbl.js");

const schema = {
  type: "object",
  properties: {
    tournamentId: { type: "string" },
    categoryId: { type: "string" },
    participant: {
      type: "object",
      oneOf: [
        {
          required: ["participantId"],
          properties: {
            participantId: { type: "string" },
          },
        },
        {
          required: ["firstName", "lastName", "club"],
          properties: {
            firstName: { type: "string" },
            middleName: { type: "string" },
            lastName: { type: "string" },
            club: { type: "string" },
          },
        },
      ],
    },
  },
  required: ["categoryId", "tournamentId", "participant"],
  additionalProperties: false,
};

async function addParticipantAbl(req, res) {
  try {
    let registration = req.body;

    // validate input
    const valid = ajv.validate(schema, registration);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    //Control - tournament has to exist.
    const tournamentList = tournamentDao.list();
    const tournamentExists = tournamentList.some(
      (t) => t.id === registration.tournamentId
    );
    if (!tournamentExists) {
      res.status(404).json({
        code: "tournamentNotFound",
        message: `Tournament ${registration.tournamentId} not found`,
      });
      return;
    }

    //Control - category has to exist.
    const categoryList = categoryDao.list();
    const categoryExists = categoryList.some(
      (c) => c.id === registration.categoryId
    );
    if (!categoryExists) {
      res.status(404).json({
        code: "categoryNotFound",
        message: `Category ${registration.categoryId} not found`,
      });
      return;
    }

    //different behavior - new participant or existing one
    let participant;

    //user provides ID - existing one
    if (registration.participant.participantId) {
      participant = participantDao.get(registration.participant.participantId);
      if (!participant) {
        res.status(404).json({
          code: "participantNotFound",
          message: `Participant ${participant.id} not found`,
        });
        return;
      }
    }
    // user provides properties - the new one
    else {
      const participantList = participantDao.list();
      const participantExists = participantList.some((p) => {
        return (
          p.firstName === registration.participant.firstName &&
          p.middleName === participant.middleName &&
          p.lastName === registration.participant.lastName
        );
      });
      if (participantExists) {
        res.status(400).json({
          code: "participantAlreadyExists",
          message: `Participant with name ${registration.participant.firstName} ${registration.participant.lastName} already exists`,
        });
        return;
      }
      //participant creation
      participant = participantDao.create(registration.participant);
    }

    let participantRelation = {
      id: participant.id,
    };

    //creating tournament object for update
    let tournament = tournamentDao.get(registration.tournamentId);
    let indexOfCategory = 0;
    for (let i = 0; i < tournament.categoriesList.length; i++) {
      if (tournament.categoriesList[i].id === registration.categoryId) {
        indexOfCategory = i;
      }
    }

    const participantsList =
      tournament.categoriesList[indexOfCategory].participantsList;
    let participantExists = false;
    for (let i = 0; i < participantsList.length; i++) {
      if (participantsList[i].id === participant.id) {
        participantExists = true;
      }
    }

    if (participantExists) {
      res.status(400).json({
        code: "participantAlreadyRegistred",
        message: `Participant with name ${participant.firstName} ${participant.middleName} ${participant.lastName} already registred to this category`,
      });
      return;
    }

    tournament.categoriesList[indexOfCategory].participantsList.push(
      participantRelation
    );
    const updatedTournament = tournamentDao.update(tournament);

    res.json(updatedTournament);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = addParticipantAbl;

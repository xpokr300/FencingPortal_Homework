const Ajv = require("ajv");
const ajv = new Ajv();

const tournamentDao = require("../../dao/tournament_dao.js");
const categoryDao = require("../../dao/category_dao.js");


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
            participantId: { type: "string" }
          }
        },
        {
          required: ["firstName", "lastName", "club"],
          properties: {
            firstName: { type: "string" },
            middleName: { type: "string" },
            lastName: { type: "string" },
            club: { type: "string" }
          }
        }
      ]
    }
  },
  required: ["categoryId", "participantsList"],
  additionalProperties: false
};


async function addParticipantAbl(req, res) {
  try {
    let registration = req.body;

    // validate input
    const valid = ajv.validate(schema, tournament);
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
    const tournamentExists = tournamentList.some((t) => t.id === registration.tournamentId
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
    const categoryExists = categoryList.some((c) => c.id === registration.categoryId
    );
    if (!categoryExists) {
      res.status(404).json({
        code: "categoryNotFound",
        message: `Category ${registration.categoryId} not found`,
      });
      return;
    }

    //ted tu musim udelat logiku, existuje pak to jen pripojim, neexistuje, zalozim, vratim si novy id a pak pripojim 



    const updatedTournament = tournamentDao.update(tournament);
    if (!updatedTournament) {
      res.status(404).json({
        code: "tournamentNotFound",
        message: `Tournament ${tournament.id} not found`,
      });
      return;
    }


    if (!tournamentExists) {
      res.status(400).json({
        code: "tournamentAlreadyExists",
        message: `Tournament with name ${tournament.name} already exists`,
      });
      return;
    }

    res.json(updatedTournament);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = addParticipantAbl;

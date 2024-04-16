const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const tournamentDao = require("../../dao/tournament_dao.js");

const schema = {
  type: "object",
  properties: {
    id: {type: "string"},
    name: { type: "string" },
    place: { type: "string" },
    date: { type: "string" , format: "date-time"},
    organizer: { type: "string" },
    schedule: { type: "string" },
    additionalInformation: {type: "string"},
    categoriesList: {
      type: "array",
      items: {
        type:"object",
        properties:{
          categoryId:{ type: "string" },
          participantsList: {
            type: "array",
            items: {
              type: "object",
              properties: {
                participantId:{ type: "string" }
              }
            }
          }
        },
        required: ["categoryId", "participantsList"]
      }      
    }
  },
  required: ["id","name","place","date","organizer","schedule","categoriesList"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let tournament = req.body;

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

    const tournamentList = tournamentDao.list();
    const tournamentExists = tournamentList.some((t) => t.name === tournament.name &&t.id !== tournament.id
    );
    if (tournamentExists) {
      res.status(400).json({
        code: "tournamentAlreadyExists",
        message: `Tournament with name ${tournament.name} already exists`,
      });
      return;
    }

    const updatedTournament = tournamentDao.update(tournament);
    if (!updatedTournament) {
      res.status(404).json({
        code: "tournamentNotFound",
        message: `Tournament ${tournament.id} not found`,
      });
      return;
    }

    res.json(updatedTournament);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;

const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const tournamentDao = require("../../dao/tournament_dao.js");

const schema = {
  type: "object",
  properties: {
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
        },
        required: ["categoryId"],
        additionalProperties: false,
      }      
    }
  },
  required: ["name", "place","date","organizer","schedule","categoriesList"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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
    const tournamentExists = tournamentList.some((t) => t.name === tournament.name);
    if (tournamentExists) {
      res.status(400).json({
        code: "tournamentAlreadyExists",
        message: `Tournament with name ${tournament.name} already exists`,
      });
      return;
    }

    tournament = tournamentDao.create(tournament);
    res.json(tournament);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;

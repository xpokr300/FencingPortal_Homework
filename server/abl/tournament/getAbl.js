const Ajv = require("ajv");
const ajv = new Ajv();
const tournamentDao = require("../../dao/tournament_dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read tournament by given id
    const tournament = tournamentDao.get(reqParams.id);
    if (!tournament) {
      res.status(404).json({
        code: "tournamentNotFound",
        message: `Tournament ${reqParams.id} not found`,
      });
      return;
    }

    res.json(tournament);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;

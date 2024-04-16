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

async function DeleteAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.body;

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

    //TODO - overit jestli neni vazba na jine entity
    // const attendanceMap = attendanceDao.userMap();
    // if (attendanceMap[reqParams.id]) {
    //   res.status(400).json({
    //     code: "userHasAttendances",
    //     message: `User ${reqParams.id} has attendances`,
    //   });
    //   return;
    // }
    tournamentDao.remove(reqParams.id);

    res.json(tournamentDao.list());

    //res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;

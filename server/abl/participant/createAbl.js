const Ajv = require("ajv");
const ajv = new Ajv();

const participantDao = require("../../dao/participant_dao.js");

const schema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    middleName: { type: "string" },
    lastName: { type: "string" },
    club: { type: "string" },
  },
  required: ["firstName", "lastName", "club"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let participant = req.body;

    // validate input
    const valid = ajv.validate(schema, participant);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const participantList = participantDao.list();
    const participantExists = participantList.some(
      (p) =>
        p.firstName === participant.firstName &&
        p.lastName === participant.lastName &&
        p.middleName === participant.middleName
    );
    if (participantExists) {
      res.status(400).json({
        code: "participantAlreadyExists",
        message: `Participant with name ${participant.firstName} ${participant.middleName} ${participant.lastName} already exists`,
      });
      return;
    }

    participant = participantDao.create(participant);
    res.json(participant);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;

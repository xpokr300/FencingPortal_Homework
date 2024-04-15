const Ajv = require("ajv");
const ajv = new Ajv();


const participantDao = require("../../dao/participant_dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    firstName: { type: "string" },
    middleName: { type: "string" },
    lastName: { type: "string" },
    club: { type: "string" }
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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
      (p) => p.firstName === participant.firstName && p.lastName  === participant.lastName && p.id !== participant.id
    );
    if (participantExists) {
      res.status(400).json({
        code: "participantAlreadyExists",
        message: `Participant with name ${participant.name} ${participant.lastName} already exists`,
      });
      return;
    }

    const updatedParticipant = participantDao.update(participant);
    if (!updatedParticipant) {
      res.status(404).json({
        code: "participantNotFound",
        message: `Participant ${participant.id} not found`,
      });
      return;
    }

    res.json(updatedParticipant);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;

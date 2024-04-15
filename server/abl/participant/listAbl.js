const participantDao = require("../../dao/participant_dao.js");

async function ListAbl(req, res) {
  try {
    const participantList = participantDao.list();
    res.json(participantList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
 
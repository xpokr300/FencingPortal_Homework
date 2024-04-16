const tournamentDao = require("../../dao/tournament_dao.js");

async function ListAbl(req, res) {
  try {
    const tournamentList = tournamentDao.list();
    res.json(tournamentList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
 
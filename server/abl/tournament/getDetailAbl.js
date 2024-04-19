const Ajv = require("ajv");
const ajv = new Ajv();
const tournamentDao = require("../../dao/tournament_dao.js");
const participantDao = require("../../dao/participant_dao.js");
const categoryDao = require("../../dao/category_dao.js");



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
    let tournament = tournamentDao.get(reqParams.id);
    if (!tournament) {
      res.status(404).json({
        code: "tournamentNotFound",
        message: `Tournament ${reqParams.id} not found`,
      });
      return;
    }


    // adding info about the categories and participants

    let categoryCount = 0;
    let participantsCount = 0

    for (let i = 0; i < tournament.categoriesList.length; i++) {
      let categoryId = tournament.categoriesList[i].categoryId;
      let category = categoryDao.get(categoryId);
      if (!category) {
        res.status(404).json({
          code: "categoryNotFound",
          message: `Category ${categoryId} not found`,
        });
        return;
      }
      tournament.categoriesList[i].name = category.name;
      tournament.categoriesList[i].description = category.description;
      categoryCount ++;

      let participantCategoryCount = 0;

      for (let y = 0; y < tournament.categoriesList[i].participantsList.length; y++){
        let participantId = tournament.categoriesList[i].participantsList[y].id;
        let participant = participantDao.get(participantId);
        tournament.categoriesList[i].participantsList[y].firstName =
          participant.firstName;
        tournament.categoriesList[i].participantsList[y].middleName =
          participant.middleName;
        tournament.categoriesList[i].participantsList[y].lastName =
          participant.lastName;
        tournament.categoriesList[i].participantsList[y].club =
          participant.club;
        participantCategoryCount ++;
      }
      //adding count
      participantsCount = participantsCount+participantCategoryCount;
      tournament.categoriesList[i].participantCategoryCount = participantCategoryCount;
    }
    
    //adding counts
    tournament.categoriesCount = categoryCount;
    tournament.participantsCount = participantsCount;


    res.json(tournament);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;

const Ajv = require("ajv");
const ajv = new Ajv();
const categoryDao = require("../../dao/category_dao.js");


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

    //TODO - overit jestli neni vazba na kategorii
    // const attendanceMap = attendanceDao.userMap();
    // if (attendanceMap[reqParams.id]) {
    //   res.status(400).json({
    //     code: "userHasAttendances",
    //     message: `User ${reqParams.id} has attendances`,
    //   });
    //   return;
    // }
    categoryDao.remove(reqParams.id);

    res.json(categoryDao.list());

    //res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;

const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDao = require("../../dao/category_dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
  },
  required: ["name", "description"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let category = req.body;

    // validate input
    const valid = ajv.validate(schema, category);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const categoryList = categoryDao.list();
    const categoryExists = categoryList.some((c) => c.name === category.name);
    if (categoryExists) {
      res.status(400).json({
        code: "categoryAlreadyExists",
        message: `Category with name ${category.name} already exists`,
      });
      return;
    }

    category = categoryDao.create(category);
    res.json(category);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;

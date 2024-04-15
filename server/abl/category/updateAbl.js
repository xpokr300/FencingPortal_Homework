const Ajv = require("ajv");
const ajv = new Ajv();


const categoryDao = require("../../dao/category_dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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
    const categoryExists = categoryList.some(
      (c) => c.name === category.name && c.id !== category.id
    );
    if (categoryExists) {
      res.status(400).json({
        code: "categoryAlreadyExists",
        message: `Category with name ${category.name} already exists`,
      });
      return;
    }

    const updatedCategory = categoryDao.update(category);
    if (!updatedCategory) {
      res.status(404).json({
        code: "categoryNotFound",
        message: `Category ${category.id} not found`,
      });
      return;
    }

    res.json(updatedCategory);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;

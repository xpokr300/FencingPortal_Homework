const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const participantFolderPath = path.join(__dirname, "storage", "participantList");

// Method to read a participant from a file
function get(participantId) {
  try {
    const filePath = path.join(participantFolderPath, `${participantId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadParticipant", message: error.message };
  }
}

// Method to write an participant to a file
function create(participant) {
  try {
    participant.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(participantFolderPath, `${participant.id}.json`);
    const fileData = JSON.stringify(participant);
    fs.writeFileSync(filePath, fileData, "utf8");
    return participant;
  } catch (error) {
    throw { code: "failedToCreateParticipant", message: error.message };
  }
}

// Method to update participant in a file
function update(participant) {
  try {
    const currentCategory = get(participant.id);
    if (!currentCategory) return null;
    const newCategory = { ...currentCategory, ...participant };
    const filePath = path.join(participantFolderPath, `${participant.id}.json`);
    const fileData = JSON.stringify(newCategory);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newCategory;
  } catch (error) {
    throw { code: "failedToUpdateParticipant", message: error.message };
  }
}

// Method to remove an participant from a file
function remove(participantId) {
  try {
    const filePath = path.join(participantFolderPath, `${participantId}.json`);
    fs.unlinkSync(filePath);
    console.log(list());
    return JSON.stringify(list());
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveParticipant", message: error.message };
  }
}

// Method to list categories in a folder
function list() {
  try {
    const files = fs.readdirSync(participantFolderPath);
    const participantList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(participantFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return participantList;
  } catch (error) {
    throw { code: "failedToListParticipant", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};

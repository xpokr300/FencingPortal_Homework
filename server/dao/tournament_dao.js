const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const tournamentFolderPath = path.join(__dirname, "storage", "tournamentList");

// Method to read a tournament from a file
function get(tournamentId) {
  try {
    const filePath = path.join(tournamentFolderPath, `${tournamentId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadTournament", message: error.message };
  }
}

// Method to write an tournament to a file
function create(tournament) {
  try {
    tournament.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(tournamentFolderPath, `${tournament.id}.json`);
    const fileData = JSON.stringify(tournament);
    fs.writeFileSync(filePath, fileData, "utf8");
    return tournament;
  } catch (error) {
    throw { code: "failedToCreateTournament", message: error.message };
  }
}

// Method to update tournament in a file
function update(tournament) {
  try {
    const currentTournament = get(tournament.id);
    if (!currentTournament) return null;
    const newTournament = { ...currentTournament, ...tournament };
    const filePath = path.join(tournamentFolderPath, `${tournament.id}.json`);
    const fileData = JSON.stringify(newTournament);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newTournament;
  } catch (error) {
    throw { code: "failedToUpdateTournament", message: error.message };
  }
}

// Method to remove an tournament from a file
function remove(tournamentId) {
  try {
    const filePath = path.join(tournamentFolderPath, `${tournamentId}.json`);
    fs.unlinkSync(filePath);
    console.log(list());
    return JSON.stringify(list());
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveTournament", message: error.message };
  }
}

// Method to list categories in a folder
function list() {
  try {
    const files = fs.readdirSync(tournamentFolderPath);
    const tournamentList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(tournamentFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return tournamentList;
  } catch (error) {
    throw { code: "failedToListTournament", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};

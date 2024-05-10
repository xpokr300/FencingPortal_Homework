
const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3001",
};

const app = express();
app.use(cors(corsOptions));
const port = 3000

const categoryController = require("./controller/category");
const participantController = require("./controller/participant");
const tournamentController = require("./controller/tournament");


app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/category",categoryController)
app.use("/participant",participantController)
app.use("/tournament",tournamentController)


app.listen(port, () => {
  console.log(`Fencing Portal listening on port ${port}`)
})
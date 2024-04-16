const express = require('express')
const cors = require("cors");
const app = express()
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
  console.log(`Example app listening on port ${port}`)
})
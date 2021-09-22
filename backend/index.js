const express = require("express");
const connectMongoose = require("./db");
var cors = require('cors')

connectMongoose();

const app = express();
const port = 5000;

app.use(express.json());

 
app.use(cors())

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`I-Notebook App listening at http://localhost:${port}`);
});

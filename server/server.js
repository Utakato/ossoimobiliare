const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const compression = require("compression")
const apiRoutes = require("./router/api-routes.js")
const routes = require("./router/routes.js")

const PORT = process.env.PORT || 3000;
const app = express();

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@ossodev.fftes.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)

app.use(compression())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static( path.join(__dirname, '../client')));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/api", apiRoutes)
app.use("/", routes)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
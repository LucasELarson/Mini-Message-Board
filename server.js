const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const router = express.Router();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser());
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const messages = [
   { name: "dave", text: "hi", added: new Date() },
   { name: "paul", text: "welcome", added: new Date() },
];

app.get("/", function (req, res) {
   res.render("index", { title: "messages", messages });
});

app.get("/new", function (req, res) {
   res.render("index2");
});

app.post("/new", (req, res) => {
   const message = req.body.messageText;
   const author = req.body.messageUser;

   messages.push({
      text: message,
      name: author,
      added: new Date(),
   });
   res.redirect("/");
});

app.listen(8000, function () {
   console.log("heard on 8000");
});

module.exports = router;

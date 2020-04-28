const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const imdb = require('imdb-api')

const app = express();

app.set("view engine", "ejs");

const cli = new imdb.Client({ apiKey: '76d8afd2' });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ encoded: true }));

var result_title = [];
var titles = [];
var posters = [];

app.listen(process.env.PORT || 3000, function () {
    console.log("Running on port 3000.")
});

app.get("/", function (req, res) {
    //res.sendFile(__dirname + "/index.html");
    res.render("home");
});

app.get("/result", function (req, res) {
    res.render("result", { titles: result_title, posters: posters });
});

app.post("/", function (req, res) {
    console.log(req.body.search);
    result_title = [];
    posters = [];
    cli.search({ 'name': req.body.search }).then((search) => {
        for (const result of search.results) {
            result_title.push(result.title);
            posters.push(result.poster);
            console.log(posters);
        }
        res.redirect("result");
    });
});

//OMDB API KEY - 76d8afd2


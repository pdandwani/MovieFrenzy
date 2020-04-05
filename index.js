const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const imdb = require('imdb-api')

//const unirest = require("unirest");

const app = express();
const cli = new imdb.Client({ apiKey: '76d8afd2' });

//var imdb = unirest("GET", "https://movie-database-imdb-alternative.p.rapidapi.com/");
//var imdb = unirest("GET", "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/inception");
let sresult = ["", "", ""];
var i = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ encoded: true }));

app.listen(process.env.PORT || 3000, function () {
    console.log("Running on port 3000.")

});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.get("/result", function (req, res) {
    res.sendFile(__dirname + "/result.html");
});

app.post("/", function (req, res) {
    console.log(req.body.search);
    cli.search({ 'name': req.body.search }).then((search) => {
        for (const result of search.results) {
            sresult[i] = result.name;
            console.log(sresult[i]);
            i++;
        }
        var dataInJson = JSON.stringify(sresult);
        JSON.parse(dataInJson);
        res.redirect(307, '/result');
        res.send(dataInJson);
        //res.send("<h1>" + sresult[0] + "</h1>");
        //res.redirect("result");
    });
});
/*app.post("/result", function (req, res) {
    res.send("<h1>" + sresult[0] + "</h1>");
    //res.send();
});*/

//OMDB API KEY - 76d8afd2

/*imdb.query({
        "page": "1",
        "r": "json",
        "s": "req.body.search"
    });
    imdb.headers({
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "49edc59703msh5883bc29407a1b4p15d617jsn60f44a3e5680"
    });
    imdb.end(function (res1) {
        if (res1.error) throw new Error(res1.error);

        console.log(res1.body);
    });*/
/*imdb.headers({
    "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
    "x-rapidapi-key": "49edc59703msh5883bc29407a1b4p15d617jsn60f44a3e5680"
});


imdb.end(function (res1) {
    if (res1.error) throw new Error(res1.error);

    console.log(res1.body.titles[0].title);
    var Json = JSON.stringify(res1.body);
    JSON.parse(Json);
//var data = JSON.parse(res1.body);
//var title = data.titles.title;
//console.log(data);
});*/
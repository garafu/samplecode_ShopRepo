var { URL, DATABASE, OPTIONS } = require("../config/mongodb.config.js");
var router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;

router.get("/", (request, response) => {
  var keyword = request.query.keyword || "";

  MongoClient.connect(URL, OPTIONS, (error, client) => {
    var db = client.db(DATABASE);
    db.collection("shops")
      .find(
        { name: new RegExp(keyword, "g") },
        { name: 1, categories: 1, score: 1 }
      ).toArray()
      .then((results) => {
        response.render("./search/list.ejs", { keyword, results });
      }).catch((error) => {
        console.log(error);
      }).then(() => {
        client.close();
      })
  });
});

module.exports = router;
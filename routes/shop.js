var { URL, DATABASE, OPTIONS } = require("../config/mongodb.config.js");
var router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;

router.get("/:id", (request, response) => {
  var _id = request.params.id;
  var query = { _id };

  MongoClient.connect(URL, OPTIONS, (error, client) => {
    var db = client.db(DATABASE);
    db.collection("shops").find(query).toArray()
      .then((results) => {
        response.render("./shop/index.ejs", results[0]);
      }).catch((error) => {
        console.log(error);
      }).then(() => {
        client.close();
      });
  })

});

router.get("/:id/review/regist", (request, response)=>{
  response.render("./shop/review/regist-form.ejs")
});

module.exports = router;
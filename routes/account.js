var { URL, DATABASE, OPTIONS } = require("../config/mongodb.config.js");
var { round } = require("../lib/math.js");
var router = require("express").Router();
var { MongoClient, ObjectId } = require("mongodb");

var validateReviewData = function (request) {
  var body = request.body;
  var isValid = true, error = {};

  if (!body.user) {
    isValid = false;
    error.user = "ユーザー名が指定されていません。";
  }

  if (body.visit && (new RegExp("\\d{4}/\\d{1,2}/\\d{1,2}")).test(body.visit) === false) {
    isValid = false;
    error.visit = "日付の形式が不正です。"
  }

  if (isValid) {
    return undefined;
  }
  return error;
};

var createReviewData = function (request) {
  var body = request.body;
  return {
    id: request.params.id,
    user: body.user,
    score: parseFloat(body.score),
    visit: ((body.visit && (new RegExp("\\d{4}/\\d{1,2}/\\d{1,2}")).test(body.visit)) ? new Date(body.visit) : null),
    post: new Date(),
    description: body.description
  }
};

router.get("/review/regist", (request, response) => {
// ------- PROGRAMING -START- --------------------

// ------- PROGRAMING - END - --------------------
});

router.post("/review/regist/input", (request, response) => {
  var review = createReviewData(request);
  var shopId = request.body.shopId;
  var shopName = request.body.shopName;
  response.render("./account/review/regist-form.ejs", { shopId, shopName, review });
});

router.post("/review/regist/confirm", (request, response) => {
// ------- PROGRAMING -START- --------------------

// ------- PROGRAMING - END - --------------------
});

router.post("/review/regist/execute", (request, response) => {
  var error = validateReviewData(request);
  var review = createReviewData(request);
  var shopId = request.body.shopId
  var shopName = request.body.shopName;

  if (error) {
    response.render("./account/review/regist-form.ejs", { error, shopId, shopName, review });
    return;
  }

// ------- PROGRAMING -START- --------------------

// ------- PROGRAMING - END - --------------------
});

router.get("/review/regist/complete", (request, response) => {
// ------- PROGRAMING -START- --------------------

// ------- PROGRAMING - END - --------------------
});

router.get("/review/:id/edit", (request, response) => {
  var shopId = request.query.shop;
  var reviewId = request.params.id;

  MongoClient.connect(URL, OPTIONS, (error, client) => {
    var db = client.db(DATABASE);
    db.collection("shops").aggregate([{
      $match: { _id: shopId }
    }, {
      $unwind: "$reviews"
    }, {
      $match: { "reviews.id": ObjectId(reviewId) }
    }]).toArray()
      .then((shops) => {
        var shopId = shops[0]._id;
        var shopName = shops[0].name;
        var review = shops[0].reviews;
        response.render("./account/review/edit-form.ejs", { shopId, shopName, review });
      }).catch((error) => {
        console.log(error);
      }).then(() => {
        client.close();
      });
  });
});

router.post("/review/:id/edit/input", (request, response) => {
  var shopId = request.body.shopId;
  var shopName = request.body.shopName;
  var review = createReviewData(request);
  var error = validateReviewData(request);
  response.render("./account/review/edit-form.ejs", { error, shopId, shopName, review });
});

router.post("/review/:id/edit/confirm", (request, response) => {
  var shopId = request.body.shopId;
  var shopName = request.body.shopName;
  var review = createReviewData(request);
  var error = validateReviewData(request);
  if (error) {
    response.render("./account/review/edit-form.ejs", { error, shopId, shopName, review });
    return;
  }
  response.render("./account/review/edit-confirm.ejs", { shopId, shopName, review });
});

router.post("/review/:id/edit/execute", (request, response) => {
  var shopId = request.body.shopId;
  var shopName = request.body.shopName;
  var review = createReviewData(request);
  var error = validateReviewData(request);
  if (error) {
    response.render("./account/review/edit-form.ejs", { error, shopId, shopName, review });
    return;
  }

  MongoClient.connect(URL, OPTIONS, (error, client) => {
    var db = client.db(DATABASE);
    db.collection("shops").aggregate([{
      $match: { _id: shopId }
    }, {
      $project: { score: { $sum: "$reviews.score" }, count: { $size: "$reviews" } }
    }]).toArray().then((docs) => {
      var score = round((docs[0].score + review.score) / (docs[0].count + 1), 2);
      db.collection("shops").updateOne(
        { _id: shopId },
        {
          $set: {
            score: score,
            "reviews.$[review].user": review.user,
            "reviews.$[review].score": review.score,
            "reviews.$[review].visit": review.visit,
            "reviews.$[review].description": review.description
          }
        },
        { arrayFilters: [{ "review.id": ObjectId(review.id) }] }
      ).then(() => {
        response.redirect(`/account/review/${review.id}/edit/complete?shop=${shopId}`);
      }).catch((error) => {
        console.log(error);
      }).then(() => {
        client.close();
      });
    });
  });
});

router.get("/review/:id/edit/complete", (request, response) => {
  var shopId = request.query.shop;
  response.render("./account/review/edit-complete.ejs", { shopId });
});

router.get("/review/:id/delete", (request, response) => {
  var shopId = request.query.shop;
  var reviewId = request.params.id;

  MongoClient.connect(URL, OPTIONS, (error, client) => {
    var db = client.db(DATABASE);
    db.collection("shops").aggregate([{
      $match: { _id: shopId }
    }, {
      $unwind: "$reviews"
    }, {
      $match: { "reviews.id": ObjectId(reviewId) }
    }]).toArray().then((shops) => {
      var shopName = shops[0].name;
      var review = shops[0].reviews;
      response.render("./account/review/delete-confirm.ejs", { shopId, shopName, review });
    }).catch((error) => {
      console.log(error);
    }).then(() => {
      client.close();
    });
  });
});

router.post("/review/:id/delete/execute", (request, response) => {
  var shopId = request.body.shopId;
  var reviewId = request.params.id;
  MongoClient.connect(URL, OPTIONS, (error, client) => {
    var db = client.db(DATABASE);
    db.collection("shops").aggregate([{
      $match: { _id: shopId }
    }, {
      $unwind: "$reviews"
    }, {
      $match: { "reviews.id": { $ne: ObjectId(reviewId) } }
    }, {
      $group: {
        _id: 0,
        avg: { $avg: "$reviews.score" }
      }
    }]).toArray().then((docs) => {
      var score = round(docs[0].avg, 2);
      db.collection("shops").updateOne(
        { _id: shopId },
        {
          $set: { score: score },
          $pull: { reviews: { id: ObjectId(reviewId) } }
        }
      ).then(() => {
        response.redirect(`/account/review/${reviewId}/delete/complete?shop=${shopId}`);
      }).catch((error) => {
        console.log(error);
      }).then(() => {
        client.close();
      });
    });
  });
});

router.get("/review/:id/delete/complete", (request, response) => {
  var shopId = request.query.shop;
  response.render("./account/review/delete-complete.ejs", { shopId });
});

module.exports = router;
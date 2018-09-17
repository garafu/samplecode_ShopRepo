db.shops.insertMany([{
  _id: "d20cbc9d",
  name: "日本料理 蔵",
  categories: ["割烹・小料理"],
  tel: "03-1111-xxxx",
  address: "東京都港区赤坂",
  holiday: "月曜",
  seats: 10,
  score: 4.25,
  reviews: [{
    id: ObjectId("5b9d0d5703b540fdf79e9827"),
    user: "tanaka",
    score: 4.0,
    visit: ISODate("2018-08-15T00:00:00+09:00"),
    post: ISODate("2018-08-16T00:00:00+09:00"),
    description: "大変おいしかったです。"
  }, {
    id: ObjectId("5b9d0d6b03b540fdf79e9828"),
    user: "sato",
    score: 4.5,
    visit: ISODate("2018-08-15T00:00:00+09:00"),
    post: ISODate("2018-08-16T00:00:00+09:00"),
    description: "すてきな時間を過ごせました。"
  }]
}, {
  _id: "fd17aae9",
  name: "炭火焼鳥 鶏々",
  categories: ["和食", "焼鳥", "居酒屋", "鳥料理"],
  tel: "03-2222-xxxx",
  address: "東京都渋谷区東",
  holiday: "月曜",
  seats: 20,
  score: 3.00,
  reviews: [{
    id: ObjectId("5b9d0d7d03b540fdf79e9829"),
    user: "tanaka",
    score: 3.0,
    visit: ISODate("2018-07-15T00:00:00+09:00"),
    post: ISODate("2018-07-16T00:00:00+09:00"),
    description: "普通。。"
  }]
}, {
  _id: "af553cf4",
  name: "トラットリア アヴァンティ",
  categories: ["イタリアン", "ダイニングバー", "ワインバー"],
  tel: "03-3333-xxxx",
  address: "東京都中央区銀座",
  holiday: "月曜",
  seats: 14,
  score: 3.50,
  reviews: [{
    id: ObjectId("5b9d0d9103b540fdf79e982a"),
    user: "suzuki",
    score: 3.5,
    visit: ISODate("2018-07-21T00:00:00+09:00"),
    post: ISODate("2018-07-22T00:00:00+09:00"),
    description: "大変おいしかったです。"
  }]
}, {
  _id: "39bd32c6",
  name: "ビストロ アルバ",
  categories: ["イタリアン", "ダイニングバー", "ワインバー"],
  tel: "03-4444-xxxx",
  address: "東京都中央区銀座",
  holiday: "月曜",
  seats: 8,
  score: 4.50,
  reviews: [{
    id: ObjectId("5b9d0d9103b540fdf79e982b"),
    user: "saito",
    score: 4.5,
    visit: ISODate("2018-08-12T00:00:00+09:00"),
    post: ISODate("2018-08-13T00:00:00+09:00"),
    description: "お店の雰囲気、料理、ともに最高でした！"
  }]
}, {
  _id: "6aad518b",
  name: "麺屋 幸太郎",
  categories: ["ラーメン", "つけ麺", "餃子"],
  tel: "03-4444-xxxx",
  address: "東京都中央区銀座",
  holiday: "月曜",
  seats: 8,
  score: 2.00,
  reviews: [{
    id: ObjectId("5b9d0d9103b540fdf79e982c"),
    user: "yamada",
    score: 2.0,
    visit: ISODate("2018-08-12T00:00:00+09:00"),
    post: ISODate("2018-08-13T00:00:00+09:00"),
    description: "味が薄く、麺ものびており、微妙でした。"
  }]
}]);

db.peoples.insertMany([
{
  "_id" : 1,
  "name" : "Tanya Jordan",
  "friends" : [ "Shirley Soto", "Terry Hawkins", "Carole Hale" ],
  "hobbies" : [ "tennis", "unicycling", "golf" ]
},
{
  "_id" : 2,
  "name" : "Carole Hale",
  "friends" : [ "Joseph Dennis", "Tanya Jordan", "Terry Hawkins" ],
  "hobbies" : [ "archery", "golf", "woodworking" ]
},
{
  "_id" : 3,
  "name" : "Terry Hawkins",
  "friends" : [ "Tanya Jordan", "Carole Hale", "Angelo Ward" ],
  "hobbies" : [ "knitting", "frisbee" ]
},
{
  "_id" : 4,
  "name" : "Joseph Dennis",
  "friends" : [ "Angelo Ward", "Carole Hale" ],
  "hobbies" : [ "tennis", "golf", "topiary" ]
},
{
  "_id" : 5,
  "name" : "Angelo Ward",
  "friends" : [ "Terry Hawkins", "Shirley Soto", "Joseph Dennis" ],
  "hobbies" : [ "travel", "ceramics", "golf" ]
},
{
   "_id" : 6,
   "name" : "Shirley Soto",
   "friends" : [ "Angelo Ward", "Tanya Jordan", "Carole Hale" ],
   "hobbies" : [ "frisbee", "set theory" ]
 }
 ]);

db.c

db.people.aggregate( [
  { $match: { "name": "Tanya Jordan" } },
  { $graphLookup: {
      from: "people",
      startWith: "$friends",
      connectFromField: "friends",
      connectToField: "name",
      as: "golfers",
      restrictSearchWithMatch: { "hobbies" : "golf" }
    }
  },
  { $project: {
      "name": 1,
      "friends": 1,
      "connections who play golf": "$golfers.name"
    }
  }
] );



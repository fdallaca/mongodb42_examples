// within a single collection

db.employees.insertMany([{ "_id" : 1, "name" : "Dev" }, { "_id" : 2, "name" : "Eliot", "reportsTo" : "Dev" }, { "_id" : 3, "name" : "Ron", "reportsTo" : "Eliot" }, { "_id" : 4, "name" : "Andrew", "reportsTo" : "Eliot" }, { "_id" : 5, "name" : "Asya", "reportsTo" : "Ron" }, { "_id" : 6, "name" : "Dan", "reportsTo" : "Andrew" }]);

db.employees.aggregate( [
   {
      $graphLookup: {
         from: "employees",
         startWith: "$reportsTo",
         connectFromField: "reportsTo",
         connectToField: "name",
         as: "reportingHierarchy"
      }
   }
] );


// from two collection
db.airports.insertMany([
{ "_id" : 0, "airport" : "JFK", "connects" : [ "BOS", "ORD" ] },
{ "_id" : 1, "airport" : "BOS", "connects" : [ "JFK", "PWM" ] },
{ "_id" : 2, "airport" : "ORD", "connects" : [ "JFK" ] },
{ "_id" : 3, "airport" : "PWM", "connects" : [ "BOS", "LHR" ] },
{ "_id" : 4, "airport" : "LHR", "connects" : [ "PWM" ] }
]);

db.travelers.insertMany([
{ "_id" : 1, "name" : "Dev", "nearestAirport" : "JFK" },
{ "_id" : 2, "name" : "Eliot", "nearestAirport" : "JFK" },
{ "_id" : 3, "name" : "Jeff", "nearestAirport" : "BOS" }
]);

db.travelers.aggregate( [
   {
      $graphLookup: {
         from: "airports",
         startWith: "$nearestAirport",
         connectFromField: "connects",
         connectToField: "airport",
         maxDepth: 2,
         depthField: "numConnections",
         as: "destinations"
      }
   }
] );

// With filters

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



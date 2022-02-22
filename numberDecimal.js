db.numbers.insertMany([
{ "_id" : 1, "val" : NumberDecimal( "9.99" ), "description" : "Decimal" },
{ "_id" : 2, "val" : 9.99, "description" : "Double" },
{ "_id" : 3, "val" : 10, "description" : "Double" },
{ "_id" : 4, "val" : NumberLong(10), "description" : "Long" },
{ "_id" : 5, "val" : NumberDecimal( "10.0" ), "description" : "Decimal" }
    ]);

db.numbers.find({ val: 9.99 });
db.numbers.find({ val: NumberDecimal( "9.99" ) });
db.numbers.find({ val: 10 });
db.numbers.find({ val: NumberDecimal( "10" ) });

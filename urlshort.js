var express = require("express");
var app = express();
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var url = "mongodb://obinnaeye:" + process.env.PASS + "@ds145188.mlab.com:45188/urlshorter";


//Set the server homepage route
app.get("/", function(req, res){
    res.send("Ok");
});

var host = "https://urlshortener-obinnaeye.c9users.io/";


//Set the /:url route
app.get("/:url", function(req, res){
    var uri = req.params.url;
    
    var obj = {
        originalURL: host + uri,
        shortURL : host + 6
    };
    
    
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;
        var urls = db.collections("urls");
        res.send(urls.find({originalURL: "just an example"}).toArray());
        db.close()
    });

});




app.listen(process.env.PORT, function(){
    console.log("Server Running at: ", process.env.PORT, url);
});
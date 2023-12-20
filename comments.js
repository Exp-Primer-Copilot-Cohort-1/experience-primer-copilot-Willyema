//Create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require("fs");

var comments = require('./comments.json');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Get comments
app.get('/comments', function(req, res) {
    res.json(comments);
});

//Post comments
app.post('/comments', function(req, res) {
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.json(comments);
});

//Delete comments
app.delete('/comments/:id', function(req, res) {
    comments.splice(req.params.id, 1);
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.json(comments);
});

//Update comments
app.put('/comments/:id', function(req, res) {
    comments[req.params.id] = req.body;
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.json(comments);
});

//Start server
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
});
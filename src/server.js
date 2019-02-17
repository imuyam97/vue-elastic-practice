// server.jsS

const express = require('express');
const app = express();
const elasticsearch = require('elasticsearch');
const fs = require('fs');

const PORT = 5000;

const client = new elasticsearch.Client({
    host: '192.168.100.100:9200',
    log: 'error'
 });

 client.ping({ requestTimeout: 30000 }, function(error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});

app.listen(PORT, function() {
    console.log('Your node.js server is running on PORT:',PORT);
});

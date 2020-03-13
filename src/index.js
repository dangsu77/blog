'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const realm = require('realm');
const app = express();
const port = 3000;

let PostSchema = {
    name: 'Post',
    properties: {
        timestamp: 'date',
        title: 'string',
        content: 'string'
    }
};

const blogRealm = new Realm({
    path: 'blog.realm',
    schema: [PostSchema]
});

app.use(bodyParser.urlencoded({extended:true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let posts = blogRealm.objects('Post').sorted('timestamp', true);
    res.render('index.ejs', {posts: posts});
});

app.get('/write', (req, res) => {
    res.sendFile(__dirname + '/write.html');
});

app.post('/write', (req, res) => {
    let title = req.body['title'],
        content = req.body['content'],
        timestamp = new Date();
    blogRealm.write( () => {
        blogRealm.create('Post', {title: title, content: content, timestamp: timestamp});
    });
    //res.send(req.body);
    res.sendFile(__dirname + '/write-complete.html');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
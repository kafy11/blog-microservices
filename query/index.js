const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}

const handleEvent = (type, data) => {
    if(type === 'PostCreated'){
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    } else if(type === 'CommentCreated'){
        const { postId, ...comment } = data;
        posts[postId].comments.push(comment);
    } else if(type === 'CommentUpdated'){
        const { postId, id, status, content } = data;
        
        const comments = posts[postId].comments;
        const comment = comments.find((comment) => comment.id === id);
        
        comment.status = status;
        comment.content = content;
    }
};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', ({ body: { type, data }}, res) => {
    console.log('Received Event:', type);

    handleEvent(type, data);

    res.send({});
});

app.listen(4002, async () => {
    console.log('Listening on 4002');

    const res = await axios.get('http://event-bus-srv:4005/events');

    for(let event of res.data){
        const { type, data } = event;
        console.log('Processing event:', type);
        handleEvent(type, data);
    }
});
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async ({ body: { type, data }}, res) => {
    console.log('Received Event:', type);

    if(type === 'CommentCreated'){
        const { content, id, postId } = data;
        const status = content.includes('orange') ? 'rejected' : 'approved';
        
        await axios.post('http://event-bus-srv:4005/events', { 
            type: 'CommentModerated',
            data: { id, postId, status }
        })
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Listening on 4003');
});
const express = require('express');

const cors = require('cors');
const path = require("path");
var cookies = require("cookie-parser");
var app = express();
require('./database')
require('dotenv').config()

const Comments = require('./models/commentModel')
app.use(express.json());
app.use(cookies());
app.use(cors());
app.use(require('morgan')('dev'));


const io = require('socket.io')(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on('connection', client => {
   
  client.on('createComment', async data => { 

    const {username, content, product_id, createdAt} = data

  
    const newComment = new Comments({
      username, content, product_id ,createdAt
  })
    await newComment.save()

  });

  client.on('createCommentmulter', async data => { 

    const {username, content, product_id, createdAt} = data

    const comment = await Comments.findById(product_id)
    if(comment){
      comment.reply.push({ product_id, username, content, createdAt})

      await comment.save()
   
  }

 
  });


  client.on('disconnect', () => { /* … */ });
});

app.set('port', 8000);
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api", require('./router/Hang'))

app.use("/api", require('./router/Sanpham'))

app.use("/api", require('./router/User'))

app.use("/api/conversations", require('./router/iduserchatuser'))


app.listen(app.get('port'), function () {
    console.log('oke ' + app.get('port'));
  });
  
const express = require('express');
const bodyparser = require('body-parser');
const route = require('./route/route.js');
const mongoose = require('mongoose');

const app = express();

app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:true}));

mongoose
  .connect(
    "mongodb+srv://soumya123:M7Oyc7PZRPkKCvNY@cluster0.6ita8.mongodb.net/group23Database",
    {
      useNewUrlParser: true,
    }
  )
.then(()=>console.log('MongoDB is connected'))
.catch(err => console.log(err));

app.use('/',route)
app.listen(process.env.PORT || 3000, function(){
    console.log('express app running on PORT' + (process.env.PORT || 3000))
});




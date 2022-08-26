const express = require('express');
const cors = require('cors');
const path = require('path');
const usersRouter = require('./routes/users/users.router')

const morgan = require('morgan')

const app = express();

app.use(express.json());
app.use(cors({
    options:{
        origin:'http://localhost:3000'
    }
}))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(morgan('combined'));
app.use('/users',usersRouter);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

module.exports = app;
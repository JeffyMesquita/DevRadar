const express = require('express');
const mongoose = require('mongoose');
const routes = require('../src/routes');

const app = express();

// MongoDB (Não-Relacional)
mongoose.connect('mongodb+srv://omnistack:omnistack@devradar-uhsgi.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);





app.listen(3333);


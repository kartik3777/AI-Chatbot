const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { findBestMatch } = require('./faq_model');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const userQuestion = req.body.question;
  const answer = findBestMatch(userQuestion);
  res.json({ answer });
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
const natural = require('natural');
const fs = require('fs');
const faqs = require('./faqs.json');

const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

faqs.forEach((faq, index) => tfidf.addDocument(faq.question));

function findBestMatch(userQuestion) {
  const scores = [];
  tfidf.tfidfs(userQuestion, (i, measure) => {
    scores.push({ index: i, score: measure });
  });
  scores.sort((a, b) => b.score - a.score);
  const best = scores[0];

  if (best.score < 0.1) {
    fs.appendFileSync('unanswered.json', JSON.stringify({ question: userQuestion }) + '\n');
    return "Sorry, I don’t know the answer to that yet.";
  }

  return faqs[best.index].answer;
}

module.exports = { findBestMatch };
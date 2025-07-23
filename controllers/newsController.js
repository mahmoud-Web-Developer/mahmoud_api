const { news } = require('../data/dummyData');
 
exports.getNews = (req, res) => {
  res.json(news);
}; 
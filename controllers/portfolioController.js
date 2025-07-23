const { portfolio } = require('../data/dummyData');
 
exports.getPortfolio = (req, res) => {
  res.json(portfolio);
}; 
const { portfolio } = require('../data/dummyData');
 
// دالة جلب جميع عناصر البورتفوليو
exports.getPortfolio = (req, res) => {
  res.json(portfolio);
}; 
const { dashboard } = require('../data/dummyData');
 
exports.getDashboard = (req, res) => {
  res.json(dashboard);
}; 
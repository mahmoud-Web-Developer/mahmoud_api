const { services } = require('../data/dummyData');
 
exports.getServices = (req, res) => {
  res.json(services);
}; 
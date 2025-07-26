const { dashboard } = require('../data/dummyData');
 
// دالة جلب بيانات لوحة التحكم
exports.getDashboard = (req, res) => {
  res.json(dashboard);
}; 
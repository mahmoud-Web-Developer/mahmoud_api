const { news } = require('../data/dummyData');
 
// دالة جلب جميع الأخبار
exports.getNews = (req, res) => {
  res.json(news);
}; 
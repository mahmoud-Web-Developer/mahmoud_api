const { news } = require('../data/dummyData');
 
exports.getNews = (req, res) => {
  try {
    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الأخبار'
    });
  }
}; 
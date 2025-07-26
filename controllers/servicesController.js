const { services } = require('../data/dummyData');
 
exports.getServices = (req, res) => {
  try {
    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الخدمات'
    });
  }
}; 
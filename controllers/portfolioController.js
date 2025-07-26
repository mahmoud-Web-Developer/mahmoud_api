const { portfolio } = require('../data/dummyData');
 
exports.getPortfolio = (req, res) => {
  try {
    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب البورتفوليو'
    });
  }
}; 
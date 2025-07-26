const { briefs } = require('../data/dummyData');

// دالة استقبال Brief جديد وحفظه في القائمة
exports.submitBrief = (req, res) => {
  const { service, details } = req.body;
  if (!service || !details) {
    return res.status(400).json({ message: 'Service and details are required' });
  }
  // إنشاء brief جديد وإضافته للمصفوفة
  const newBrief = {
    id: briefs.length + 1,
    service,
    details
  };
  briefs.push(newBrief);
  res.status(201).json({ message: 'Brief submitted successfully' });
}; 
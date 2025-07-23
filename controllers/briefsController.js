const { briefs } = require('../data/dummyData');

exports.submitBrief = (req, res) => {
  const { service, details } = req.body;
  if (!service || !details) {
    return res.status(400).json({ message: 'Service and details are required' });
  }
  const newBrief = {
    id: briefs.length + 1,
    service,
    details
  };
  briefs.push(newBrief);
  res.status(201).json({ message: 'Brief submitted successfully' });
}; 
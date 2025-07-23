const { requests } = require('../data/dummyData');

exports.newContactRequest = (req, res) => {
  const { fullName, phoneNumber, purpose } = req.body;
  if (!fullName || !phoneNumber || !purpose) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const newRequest = {
    id: requests.length + 1,
    type: 'contact',
    fullName,
    phoneNumber,
    purpose
  };
  requests.push(newRequest);
  res.status(201).json({ message: 'Contact request started' });
};

exports.newMeetingRequest = (req, res) => {
  const { slot, name } = req.body;
  if (!slot || !name) {
    return res.status(400).json({ message: 'Slot and name are required' });
  }
  const newRequest = {
    id: requests.length + 1,
    type: 'meeting',
    slot,
    name
  };
  requests.push(newRequest);
  res.status(201).json({ message: 'Meeting request started' });
};

exports.newBriefRequest = (req, res) => {
  const { service, details } = req.body;
  if (!service || !details) {
    return res.status(400).json({ message: 'Service and details are required' });
  }
  const newRequest = {
    id: requests.length + 1,
    type: 'brief',
    service,
    details
  };
  requests.push(newRequest);
  res.status(201).json({ message: 'Brief request started' });
}; 
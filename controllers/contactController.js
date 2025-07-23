const { contactRequests } = require('../data/dummyData');

exports.createContactRequest = (req, res) => {
  const { fullName, phoneNumber, purpose } = req.body;
  if (!fullName || !phoneNumber || !purpose) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const newRequest = {
    id: contactRequests.length + 1,
    fullName,
    phoneNumber,
    purpose
  };
  contactRequests.push(newRequest);
  res.status(201).json({ message: 'Your request has been received. We’ll contact you shortly.' });
}; 
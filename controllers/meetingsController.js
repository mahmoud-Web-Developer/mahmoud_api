const { meetings } = require('../data/dummyData');

const availableSlots = [
  '2024-07-24T10:00:00Z',
  '2024-07-24T14:00:00Z',
  '2024-07-25T09:00:00Z'
];

exports.getAvailableSlots = (req, res) => {
  res.json(availableSlots);
};

exports.scheduleMeeting = (req, res) => {
  const { slot, name } = req.body;
  if (!slot || !name) {
    return res.status(400).json({ message: 'Slot and name are required' });
  }
  if (!availableSlots.includes(slot)) {
    return res.status(400).json({ message: 'Slot not available' });
  }
  const meeting = { id: meetings.length + 1, slot, name };
  meetings.push(meeting);
  res.status(201).json({ message: 'Meeting scheduled successfully' });
}; 
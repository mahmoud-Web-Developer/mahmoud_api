const { meetings } = require('../data/dummyData');

// قائمة الأوقات المتاحة للاجتماعات (يمكن تعديلها حسب الحاجة)
const availableSlots = [
  '2024-07-24T10:00:00Z',
  '2024-07-24T14:00:00Z',
  '2024-07-25T09:00:00Z'
];

// دالة جلب جميع الأوقات المتاحة
exports.getAvailableSlots = (req, res) => {
  res.json(availableSlots);
};

// دالة حجز اجتماع جديد
exports.scheduleMeeting = (req, res) => {
  const { slot, name } = req.body;
  if (!slot || !name) {
    return res.status(400).json({ message: 'Slot and name are required' });
  }
  // التحقق من توفر الوقت المطلوب
  if (!availableSlots.includes(slot)) {
    return res.status(400).json({ message: 'Slot not available' });
  }
  // إنشاء اجتماع جديد وإضافته للمصفوفة
  const meeting = { id: meetings.length + 1, slot, name };
  meetings.push(meeting);
  res.status(201).json({ message: 'Meeting scheduled successfully' });
}; 
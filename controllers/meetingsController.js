const { meetings } = require('../data/dummyData');

// دالة إنشاء أوقات متاحة ديناميكية
const generateAvailableSlots = () => {
  const slots = [];
  const now = new Date();
  
  // إنشاء أوقات متاحة للأسبوع القادم
  for (let i = 1; i <= 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    
    // أوقات الصباح (9 صباحاً - 12 ظهراً)
    for (let hour = 9; hour <= 12; hour++) {
      const slot = new Date(date);
      slot.setHours(hour, 0, 0, 0);
      slots.push(slot.toISOString());
    }
    
    // أوقات المساء (2 ظهراً - 6 مساءً)
    for (let hour = 14; hour <= 18; hour++) {
      const slot = new Date(date);
      slot.setHours(hour, 0, 0, 0);
      slots.push(slot.toISOString());
    }
  }
  
  return slots;
};

// دالة جلب جميع الأوقات المتاحة
exports.getAvailableSlots = (req, res) => {
  try {
    const { date, startDate, endDate } = req.query;
    
    let availableSlots = generateAvailableSlots();
    
    // تصفية حسب التاريخ المحدد
    if (date) {
      const targetDate = new Date(date);
      availableSlots = availableSlots.filter(slot => {
        const slotDate = new Date(slot);
        return slotDate.toDateString() === targetDate.toDateString();
      });
    }
    
    // تصفية حسب نطاق التاريخ
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      availableSlots = availableSlots.filter(slot => {
        const slotDate = new Date(slot);
        return slotDate >= start && slotDate <= end;
      });
    }
    
    // إزالة الأوقات المحجوزة مسبقاً
    const bookedSlots = meetings.map(meeting => meeting.slot);
    availableSlots = availableSlots.filter(slot => !bookedSlots.includes(slot));
    
    res.json({
      success: true,
      data: availableSlots,
      count: availableSlots.length
    });
  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الأوقات المتاحة'
    });
  }
};

// دالة حجز اجتماع جديد
exports.scheduleMeeting = (req, res) => {
  try {
    const { 
      slot, 
      name, 
      email, 
      phone, 
      subject, 
      description,
      duration = 60 // مدة الاجتماع بالدقائق
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!slot || !name || !email) {
      return res.status(400).json({
        success: false,
        message: 'الوقت والاسم والبريد الإلكتروني مطلوبة'
      });
    }
    
    // التحقق من صحة التاريخ والوقت
    const slotDate = new Date(slot);
    if (isNaN(slotDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'التاريخ والوقت غير صحيح'
      });
  }
    
    // التحقق من أن الوقت في المستقبل
    const now = new Date();
    if (slotDate <= now) {
      return res.status(400).json({
        success: false,
        message: 'يجب أن يكون الوقت في المستقبل'
      });
    }
    
    // التحقق من أن الوقت متاح
    const availableSlots = generateAvailableSlots();
    const bookedSlots = meetings.map(meeting => meeting.slot);
    const freeSlots = availableSlots.filter(slot => !bookedSlots.includes(slot));
    
    if (!freeSlots.includes(slot)) {
      return res.status(400).json({
        success: false,
        message: 'هذا الوقت غير متاح للحجز'
      });
    }
    
    // إنشاء اجتماع جديد
    const newMeeting = {
      id: meetings.length > 0 ? Math.max(...meetings.map(m => m.id)) + 1 : 1,
      slot: slot,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      subject: subject ? subject.trim() : null,
      description: description ? description.trim() : null,
      duration: duration,
      status: 'scheduled',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // إضافة الاجتماع إلى المصفوفة
    meetings.push(newMeeting);
    
    res.status(201).json({
      success: true,
      message: 'تم حجز الاجتماع بنجاح',
      data: newMeeting
    });
  } catch (error) {
    console.error('Schedule meeting error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حجز الاجتماع'
    });
  }
};

// دالة جلب جميع الاجتماعات
exports.getAllMeetings = (req, res) => {
  try {
    const { page = 1, limit = 10, status, date } = req.query;
    
    let filteredMeetings = [...meetings];
    
    // تصفية حسب الحالة
    if (status) {
      filteredMeetings = filteredMeetings.filter(meeting => meeting.status === status);
    }
    
    // تصفية حسب التاريخ
    if (date) {
      const targetDate = new Date(date);
      filteredMeetings = filteredMeetings.filter(meeting => {
        const meetingDate = new Date(meeting.slot);
        return meetingDate.toDateString() === targetDate.toDateString();
      });
    }
    
    // ترتيب النتائج
    filteredMeetings.sort((a, b) => new Date(b.slot) - new Date(a.slot));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedMeetings = filteredMeetings.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedMeetings,
      count: paginatedMeetings.length,
      total: filteredMeetings.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredMeetings.length / limit)
    });
  } catch (error) {
    console.error('Get all meetings error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الاجتماعات'
    });
  }
};

// دالة تحديث حالة الاجتماع
exports.updateMeetingStatus = (req, res) => {
  try {
    const meetingId = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'حالة الاجتماع مطلوبة'
      });
    }
    
    const meetingIndex = meetings.findIndex(m => m.id === meetingId);
    
    if (meetingIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'الاجتماع غير موجود'
      });
    }
    
    meetings[meetingIndex].status = status;
    meetings[meetingIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث حالة الاجتماع بنجاح',
      data: meetings[meetingIndex]
    });
  } catch (error) {
    console.error('Update meeting status error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث حالة الاجتماع'
    });
  }
};

// دالة حذف الاجتماع
exports.deleteMeeting = (req, res) => {
  try {
    const meetingId = parseInt(req.params.id);
    const meetingIndex = meetings.findIndex(m => m.id === meetingId);
    
    if (meetingIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'الاجتماع غير موجود'
      });
    }
    
    const deletedMeeting = meetings.splice(meetingIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'تم حذف الاجتماع بنجاح',
      data: deletedMeeting
    });
  } catch (error) {
    console.error('Delete meeting error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف الاجتماع'
    });
  }
}; 
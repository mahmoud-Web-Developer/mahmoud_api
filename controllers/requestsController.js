/**
 * Requests Controller
 * تحكم في الطلبات للربط بين النماذج والداشبورد
 */

const { 
  contactRequests, 
  meetings, 
  briefs,
  requests
} = require('../data/dummyData');

// ===== طلبات التواصل =====
exports.createContactRequest = (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      subject, 
      message,
      preferredContact = 'email'
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'الاسم والبريد الإلكتروني والرسالة مطلوبة'
      });
    }
    
    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني غير صحيح'
      });
    }
    
    // إنشاء طلب تواصل جديد
    const newContactRequest = {
      id: contactRequests.length > 0 ? Math.max(...contactRequests.map(c => c.id)) + 1 : 1,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      subject: subject ? subject.trim() : 'طلب تواصل جديد',
      message: message.trim(),
      preferredContact: preferredContact,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    contactRequests.push(newContactRequest);
    
    // إضافة إلى الطلبات العامة
    const generalRequest = {
      id: requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1,
      type: 'contact',
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      subject: subject ? subject.trim() : 'طلب تواصل جديد',
      description: message.trim(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    requests.push(generalRequest);
    
    res.status(201).json(newContactRequest);
  } catch (error) {
    console.error('Create contact request error:', error);
    res.status(500).json({ error: 'حدث خطأ في إرسال طلب التواصل' });
  }
};

exports.getAllContactRequests = (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    let filteredRequests = [...contactRequests];
    
    // تصفية حسب الحالة
    if (status) {
      filteredRequests = filteredRequests.filter(r => r.status === status);
    }
    
    // ترتيب حسب تاريخ الإنشاء
    filteredRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedRequests = filteredRequests.slice(startIndex, endIndex);
    
    res.json(paginatedRequests);
  } catch (error) {
    console.error('Get all contact requests error:', error);
    res.status(500).json({ error: 'حدث خطأ في جلب طلبات التواصل' });
  }
};

exports.updateContactRequestStatus = (req, res) => {
  try {
    const requestId = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'حالة الطلب مطلوبة'
      });
    }
    
    const requestIndex = contactRequests.findIndex(r => r.id === requestId);
    
    if (requestIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'طلب التواصل غير موجود'
      });
    }
    
    contactRequests[requestIndex].status = status;
    contactRequests[requestIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث حالة طلب التواصل بنجاح',
      data: contactRequests[requestIndex]
    });
  } catch (error) {
    console.error('Update contact request status error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث حالة طلب التواصل'
    });
  }
};

// ===== حجز الاجتماعات =====
exports.createMeetingRequest = (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      subject, 
      description,
      preferredDate,
      preferredTime,
      duration = 60,
      attendees = []
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!name || !email || !subject || !preferredDate) {
      return res.status(400).json({
        success: false,
        message: 'الاسم والبريد الإلكتروني والموضوع وتاريخ الاجتماع مطلوبة'
      });
    }
    
    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني غير صحيح'
      });
    }
    
    // التحقق من صحة التاريخ
    const meetingDate = new Date(preferredDate);
    if (isNaN(meetingDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'تاريخ الاجتماع غير صحيح'
      });
    }
    
    // إنشاء طلب اجتماع جديد
    const newMeetingRequest = {
      id: meetings.length > 0 ? Math.max(...meetings.map(m => m.id)) + 1 : 1,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      subject: subject.trim(),
      description: description ? description.trim() : null,
      preferredDate: meetingDate,
      preferredTime: preferredTime ? preferredTime.trim() : null,
      duration: parseInt(duration),
      attendees: Array.isArray(attendees) ? attendees : [],
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    meetings.push(newMeetingRequest);
    
    // إضافة إلى الطلبات العامة
    const generalRequest = {
      id: requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1,
      type: 'meeting',
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      subject: subject.trim(),
      description: description ? description.trim() : null,
      preferredDate: meetingDate,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    requests.push(generalRequest);
    
    res.status(201).json(newMeetingRequest);
  } catch (error) {
    console.error('Create meeting request error:', error);
    res.status(500).json({ error: 'حدث خطأ في إرسال طلب الاجتماع' });
  }
};

exports.getAllMeetingRequests = (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    let filteredMeetings = [...meetings];
    
    // تصفية حسب الحالة
    if (status) {
      filteredMeetings = filteredMeetings.filter(m => m.status === status);
    }
    
    // ترتيب حسب تاريخ الإنشاء
    filteredMeetings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedMeetings = filteredMeetings.slice(startIndex, endIndex);
    
    res.json(paginatedMeetings);
  } catch (error) {
    console.error('Get all meeting requests error:', error);
    res.status(500).json({ error: 'حدث خطأ في جلب طلبات الاجتماعات' });
  }
};

exports.updateMeetingRequestStatus = (req, res) => {
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
        message: 'طلب الاجتماع غير موجود'
      });
    }
    
    meetings[meetingIndex].status = status;
    meetings[meetingIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث حالة طلب الاجتماع بنجاح',
      data: meetings[meetingIndex]
    });
  } catch (error) {
    console.error('Update meeting request status error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث حالة طلب الاجتماع'
    });
  }
};

// ===== تقديم Briefs =====
exports.createBriefRequest = (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      projectName, 
      description,
      requirements,
      budget,
      timeline,
      targetAudience,
      competitors,
      additionalInfo
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!name || !email || !projectName || !description) {
      return res.status(400).json({
        success: false,
        message: 'الاسم والبريد الإلكتروني واسم المشروع والوصف مطلوبة'
      });
    }
    
    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني غير صحيح'
      });
    }
    
    // إنشاء brief جديد
    const newBrief = {
      id: briefs.length > 0 ? Math.max(...briefs.map(b => b.id)) + 1 : 1,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      projectName: projectName.trim(),
      description: description.trim(),
      requirements: requirements ? requirements.trim() : null,
      budget: budget ? budget.trim() : null,
      timeline: timeline ? timeline.trim() : null,
      targetAudience: targetAudience ? targetAudience.trim() : null,
      competitors: competitors ? competitors.trim() : null,
      additionalInfo: additionalInfo ? additionalInfo.trim() : null,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    briefs.push(newBrief);
    
    // إضافة إلى الطلبات العامة
    const generalRequest = {
      id: requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1,
      type: 'brief',
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      subject: projectName.trim(),
      description: description.trim(),
      requirements: requirements ? requirements.trim() : null,
      budget: budget ? budget.trim() : null,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    requests.push(generalRequest);
    
    res.status(201).json(newBrief);
  } catch (error) {
    console.error('Create brief request error:', error);
    res.status(500).json({ error: 'حدث خطأ في إرسال Brief' });
  }
};

exports.getAllBriefRequests = (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    let filteredBriefs = [...briefs];
    
    // تصفية حسب الحالة
    if (status) {
      filteredBriefs = filteredBriefs.filter(b => b.status === status);
    }
    
    // ترتيب حسب تاريخ الإنشاء
    filteredBriefs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedBriefs = filteredBriefs.slice(startIndex, endIndex);
    
    res.json(paginatedBriefs);
  } catch (error) {
    console.error('Get all brief requests error:', error);
    res.status(500).json({ error: 'حدث خطأ في جلب Briefs' });
  }
};

exports.updateBriefRequestStatus = (req, res) => {
  try {
    const briefId = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'حالة Brief مطلوبة'
      });
    }
    
    const briefIndex = briefs.findIndex(b => b.id === briefId);
    
    if (briefIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Brief غير موجود'
      });
    }
    
    briefs[briefIndex].status = status;
    briefs[briefIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث حالة Brief بنجاح',
      data: briefs[briefIndex]
    });
  } catch (error) {
    console.error('Update brief request status error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث حالة Brief'
    });
  }
};

// ===== إحصائيات الطلبات =====
exports.getRequestsStats = (req, res) => {
  try {
    const stats = {
      total: requests.length,
      contact: contactRequests.length,
      meetings: meetings.length,
      briefs: briefs.length,
      pending: requests.filter(r => r.status === 'pending').length,
      completed: requests.filter(r => r.status === 'completed').length,
      inProgress: requests.filter(r => r.status === 'in-progress').length
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Get requests stats error:', error);
    res.status(500).json({ error: 'حدث خطأ في جلب إحصائيات الطلبات' });
  }
}; 
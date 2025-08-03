const { contactRequests } = require('../data/dummyData');
const { validateContactRequestExists, validateContactRequestData } = require('../utils/dataValidator');

// دالة استقبال طلب تواصل جديد وحفظه في القائمة
exports.createContactRequest = (req, res) => {
  try {
    const validation = validateContactRequestData(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }
    
    // إنشاء طلب جديد وإضافته للمصفوفة
    const newRequest = {
      id: contactRequests.length + 1,
      ...req.body,
      createdAt: new Date(),
      status: 'pending'
    };
    
    contactRequests.push(newRequest);
    
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Create contact request error:', error);
    res.status(500).json({ error: 'حدث خطأ في إرسال الطلب' });
  }
};

// الحصول على جميع طلبات التواصل
exports.getContactRequests = (req, res) => {
  try {
    res.json(contactRequests);
  } catch (error) {
    console.error('Get contact requests error:', error);
    res.status(500).json({ error: 'حدث خطأ في جلب طلبات التواصل' });
  }
};

// الحصول على طلب تواصل واحد بواسطة ID
exports.getContactRequestById = (req, res) => {
  try {
    const { id } = req.params;
    const validation = validateContactRequestExists(id);
    
    if (!validation.exists) {
      return res.status(404).json({
        success: false,
        message: 'طلب التواصل غير موجود'
      });
    }
    
    res.json({
      success: true,
      data: validation.data
    });
  } catch (error) {
    console.error('Get contact request by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب طلب التواصل'
    });
  }
};

// تحديث حالة طلب التواصل
exports.updateContactRequestStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validation = validateContactRequestExists(id);
    
    if (!validation.exists) {
      return res.status(404).json({
        success: false,
        message: 'طلب التواصل غير موجود'
      });
    }
    
    if (!status || !['pending', 'in-progress', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'حالة غير صحيحة. الحالات المتاحة: pending, in-progress, completed, cancelled'
      });
    }
    
    const requestIndex = contactRequests.findIndex(r => r.id === parseInt(id));
    contactRequests[requestIndex].status = status;
    contactRequests[requestIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث حالة الطلب بنجاح',
      data: contactRequests[requestIndex]
    });
  } catch (error) {
    console.error('Update contact request status error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث حالة الطلب'
    });
  }
};

// حذف طلب تواصل
exports.deleteContactRequest = (req, res) => {
  try {
    const { id } = req.params;
    const validation = validateContactRequestExists(id);
    
    if (!validation.exists) {
      return res.status(404).json({
        success: false,
        message: 'طلب التواصل غير موجود'
      });
    }
    
    const requestIndex = contactRequests.findIndex(r => r.id === parseInt(id));
    contactRequests.splice(requestIndex, 1);
    
    res.json({
      success: true,
      message: 'تم حذف طلب التواصل بنجاح'
    });
  } catch (error) {
    console.error('Delete contact request error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف طلب التواصل'
    });
  }
};

// الحصول على طلبات التواصل حسب الحالة
exports.getContactRequestsByStatus = (req, res) => {
  try {
    const { status } = req.params;
    
    if (!['pending', 'in-progress', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'حالة غير صحيحة. الحالات المتاحة: pending, in-progress, completed, cancelled'
      });
    }
    
    const filteredRequests = contactRequests.filter(request => request.status === status);
    
    res.json({
      success: true,
      data: filteredRequests,
      count: filteredRequests.length
    });
  } catch (error) {
    console.error('Get contact requests by status error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب طلبات التواصل'
    });
  }
}; 
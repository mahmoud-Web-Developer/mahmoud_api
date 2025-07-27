const { services } = require('../data/dummyData');
const { validateServiceExists, validateServiceData } = require('../utils/dataValidator');
 
// الحصول على جميع الخدمات
exports.getServices = (req, res) => {
  try {
    res.json({
      success: true,
      data: services,
      count: services.length
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الخدمات'
    });
  }
};

// الحصول على خدمة واحدة بواسطة ID
exports.getServiceById = (req, res) => {
  try {
    const { id } = req.params;
    const validation = validateServiceExists(id);
    
    if (!validation.exists) {
      return res.status(404).json({
        success: false,
        message: 'الخدمة غير موجودة'
      });
    }
    
    res.json({
      success: true,
      data: validation.data
    });
  } catch (error) {
    console.error('Get service by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الخدمة'
    });
  }
};

// إنشاء خدمة جديدة
exports.createService = (req, res) => {
  try {
    const validation = validateServiceData(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: validation.errors
      });
    }
    
    const newService = {
      id: services.length + 1,
      ...req.body,
      createdAt: new Date(),
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    };
    
    services.push(newService);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء الخدمة بنجاح',
      data: newService
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في إنشاء الخدمة'
    });
  }
};

// تحديث خدمة موجودة
exports.updateService = (req, res) => {
  try {
    const { id } = req.params;
    const validation = validateServiceExists(id);
    
    if (!validation.exists) {
      return res.status(404).json({
        success: false,
        message: 'الخدمة غير موجودة'
      });
    }
    
    const dataValidation = validateServiceData(req.body);
    if (!dataValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: dataValidation.errors
      });
    }
    
    const serviceIndex = services.findIndex(s => s.id === parseInt(id));
    const updatedService = {
      ...services[serviceIndex],
      ...req.body,
      updatedAt: new Date()
    };
    
    services[serviceIndex] = updatedService;
    
    res.json({
      success: true,
      message: 'تم تحديث الخدمة بنجاح',
      data: updatedService
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث الخدمة'
    });
  }
};

// حذف خدمة
exports.deleteService = (req, res) => {
  try {
    const { id } = req.params;
    const validation = validateServiceExists(id);
    
    if (!validation.exists) {
      return res.status(404).json({
        success: false,
        message: 'الخدمة غير موجودة'
      });
    }
    
    const serviceIndex = services.findIndex(s => s.id === parseInt(id));
    services.splice(serviceIndex, 1);
    
    res.json({
      success: true,
      message: 'تم حذف الخدمة بنجاح'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف الخدمة'
    });
  }
};

// الحصول على الخدمات النشطة فقط
exports.getActiveServices = (req, res) => {
  try {
    const activeServices = services.filter(service => service.isActive);
    
    res.json({
      success: true,
      data: activeServices,
      count: activeServices.length
    });
  } catch (error) {
    console.error('Get active services error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الخدمات النشطة'
    });
  }
}; 
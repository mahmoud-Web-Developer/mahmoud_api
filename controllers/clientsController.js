const { clients } = require('../data/dummyData');

// دالة الحصول على جميع العملاء
exports.getAllClients = (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    let filteredClients = [...clients];
    
    // ترتيب النتائج
    filteredClients.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedClients = filteredClients.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedClients,
      count: paginatedClients.length,
      total: filteredClients.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredClients.length / limit)
    });
  } catch (error) {
    console.error('Get all clients error:', error);
    res.status(500).json({ error: 'حدث خطأ في الخادم' });
  }
};

// دالة الحصول على عميل واحد بالـ ID
exports.getClientById = (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const client = clients.find(c => c.id === clientId);
    
    if (!client) {
      return res.status(404).json({ error: 'العميل غير موجود' });
    }
    
    res.json({
      success: true,
      data: client
    });
  } catch (error) {
    console.error('Get client by ID error:', error);
    res.status(500).json({ error: 'حدث خطأ في الخادم' });
  }
};

// دالة إنشاء عميل جديد
exports.createClient = (req, res) => {
  try {
    const { companyName, contactPerson, mobileNumber } = req.body;
    if (!companyName || !contactPerson || !mobileNumber) {
      return res.status(400).json({ error: 'اسم الشركة والشخص المسؤول ورقم الهاتف مطلوبة' });
    }
    const newClient = {
      id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      mobileNumber: mobileNumber.trim(),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    clients.push(newClient);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ في الخادم' });
  }
};

// دالة تحديث العميل
exports.updateClient = (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const clientIndex = clients.findIndex(c => c.id === clientId);
    
    if (clientIndex === -1) {
      return res.status(404).json({ error: 'العميل غير موجود' });
    }
    
    const {
      companyName,
      businessSector,
      contactPerson,
      mobileNumber,
      email,
      website,
      socialMediaAccounts,
      address,
      notes
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!companyName || !contactPerson || !mobileNumber) {
      return res.status(400).json({ error: 'اسم الشركة والشخص المسؤول ورقم الهاتف مطلوبة' });
    }
    
    // التحقق من صحة البريد الإلكتروني
    if (email && !isValidEmail(email)) {
      return res.status(400).json({ error: 'البريد الإلكتروني غير صحيح' });
    }
    
    // التحقق من صحة رقم الهاتف
    if (!isValidPhoneNumber(mobileNumber)) {
      return res.status(400).json({ error: 'رقم الهاتف غير صحيح' });
    }
    
    // تحديث بيانات العميل
    const updatedClient = {
      ...clients[clientIndex],
      companyName: companyName.trim(),
      businessSector: businessSector || '',
      contactPerson: contactPerson.trim(),
      mobileNumber: mobileNumber.trim(),
      email: email ? email.trim() : null,
      website: website ? website.trim() : null,
      socialMediaAccounts: socialMediaAccounts ? socialMediaAccounts.trim() : null,
      address: address ? address.trim() : null,
      notes: notes ? notes.trim() : null,
      updatedAt: new Date()
    };
    
    clients[clientIndex] = updatedClient;
    
    res.status(200).json(updatedClient);
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({ error: 'حدث خطأ في تحديث العميل' });
  }
};

// دالة حذف العميل
exports.deleteClient = (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const clientIndex = clients.findIndex(c => c.id === clientId);
    
    if (clientIndex === -1) {
      return res.status(404).json({ error: 'العميل غير موجود' });
    }
    
    const deletedClient = clients.splice(clientIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'تم حذف العميل بنجاح',
      data: deletedClient
    });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({ error: 'حدث خطأ في الخادم' });
  }
};

// دالة تحديث حالة العميل
exports.updateClientStatus = (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const { isActive } = req.body;
    
    if (isActive === undefined) {
      return res.status(400).json({ error: 'حالة العميل مطلوبة' });
    }
    
    const clientIndex = clients.findIndex(c => c.id === clientId);
    
    if (clientIndex === -1) {
      return res.status(404).json({ error: 'العميل غير موجود' });
    }
    
    clients[clientIndex].isActive = isActive;
    clients[clientIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: `تم ${isActive ? 'تفعيل' : 'تعطيل'} العميل بنجاح`,
      data: clients[clientIndex]
    });
  } catch (error) {
    console.error('Update client status error:', error);
    res.status(500).json({ error: 'حدث خطأ في الخادم' });
  }
};

// دالة البحث عن العملاء
exports.searchClients = (req, res) => {
  try {
    const { query, businessSector, isActive, page = 1, limit = 10 } = req.query;
    
    let filteredClients = [...clients];
    
    // البحث بالكلمة المفتاحية
    if (query) {
      const searchQuery = query.toLowerCase();
      filteredClients = filteredClients.filter(client => 
        client.companyName.toLowerCase().includes(searchQuery) ||
        client.contactPerson.toLowerCase().includes(searchQuery) ||
        (client.email && client.email.toLowerCase().includes(searchQuery)) ||
        client.mobileNumber.includes(searchQuery)
      );
    }
    
    // تصفية حسب القطاع
    if (businessSector) {
      filteredClients = filteredClients.filter(client => 
        client.businessSector.toLowerCase().includes(businessSector.toLowerCase())
      );
    }
    
    // تصفية حسب الحالة
    if (isActive !== undefined) {
      const activeStatus = isActive === 'true';
      filteredClients = filteredClients.filter(client => client.isActive === activeStatus);
    }
    
    // ترتيب النتائج
    filteredClients.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedClients = filteredClients.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedClients,
      count: paginatedClients.length,
      total: filteredClients.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredClients.length / limit)
    });
  } catch (error) {
    console.error('Search clients error:', error);
    res.status(500).json({ error: 'حدث خطأ في الخادم' });
  }
};

// دوال مساعدة للتحقق من صحة البيانات
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phone) {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
} 
const { services, portfolio, news } = require('../data/dummyData');

// ===== إدارة الخدمات =====

// دالة الحصول على جميع الخدمات
exports.getAllServices = (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    let filteredServices = [...services];
    
    // ترتيب النتائج
    filteredServices.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedServices = filteredServices.slice(startIndex, endIndex);
    
    res.json({
      data: paginatedServices,
      count: paginatedServices.length,
      total: filteredServices.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredServices.length / limit)
    });
  } catch (error) {
    console.error('Get all services error:', error);
    res.status(500).json({ error: 'حدث خطأ في الخادم' });
  }
};

// دالة إنشاء خدمة جديدة
exports.createService = (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      icon,
      image,
      features,
      price,
      duration,
      category,
      isActive = true
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!title || !subtitle || !description) {
      return res.status(400).json({
        success: false,
        message: 'العنوان والنص الفرعي والوصف مطلوبة'
      });
    }
    
    // التحقق من صحة الصور
    if (image && !isValidImageUrl(image)) {
      return res.status(400).json({
        success: false,
        message: 'رابط الصورة غير صحيح'
      });
    }
    
    if (icon && !isValidImageUrl(icon)) {
      return res.status(400).json({
        success: false,
        message: 'رابط الأيقونة غير صحيح'
      });
    }
    
    // إنشاء الخدمة الجديدة
    const newService = {
      id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      icon: icon ? icon.trim() : null,
      image: image ? image.trim() : null,
      features: features || [],
      price: price || null,
      duration: duration || null,
      category: category || 'عام',
      isActive,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // إضافة الخدمة إلى المصفوفة
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
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة تحديث الخدمة
exports.updateService = (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const serviceIndex = services.findIndex(s => s.id === serviceId);
    
    if (serviceIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'الخدمة غير موجودة'
      });
    }
    
    const {
      title,
      subtitle,
      description,
      icon,
      image,
      features,
      price,
      duration,
      category,
      isActive
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!title || !subtitle || !description) {
      return res.status(400).json({
        success: false,
        message: 'العنوان والنص الفرعي والوصف مطلوبة'
      });
    }
    
    // التحقق من صحة الصور
    if (image && !isValidImageUrl(image)) {
      return res.status(400).json({
        success: false,
        message: 'رابط الصورة غير صحيح'
      });
    }
    
    if (icon && !isValidImageUrl(icon)) {
      return res.status(400).json({
        success: false,
        message: 'رابط الأيقونة غير صحيح'
      });
    }
    
    // تحديث بيانات الخدمة
    const updatedService = {
      ...services[serviceIndex],
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      icon: icon ? icon.trim() : null,
      image: image ? image.trim() : null,
      features: features || services[serviceIndex].features,
      price: price !== undefined ? price : services[serviceIndex].price,
      duration: duration !== undefined ? duration : services[serviceIndex].duration,
      category: category || services[serviceIndex].category,
      isActive: isActive !== undefined ? isActive : services[serviceIndex].isActive,
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
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة حذف الخدمة
exports.deleteService = (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const serviceIndex = services.findIndex(s => s.id === serviceId);
    
    if (serviceIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'الخدمة غير موجودة'
      });
    }
    
    const deletedService = services.splice(serviceIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'تم حذف الخدمة بنجاح',
      data: deletedService
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// ===== إدارة المشاريع =====

// دالة الحصول على جميع المشاريع
exports.getAllPortfolio = (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    let filteredPortfolio = [...portfolio];
    
    // ترتيب النتائج
    filteredPortfolio.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedPortfolio = filteredPortfolio.slice(startIndex, endIndex);
    
    res.json({
      data: paginatedPortfolio,
      count: paginatedPortfolio.length,
      total: filteredPortfolio.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredPortfolio.length / limit)
    });
  } catch (error) {
    console.error('Get all portfolio error:', error);
    res.status(500).json({ error: 'حدث خطأ في الخادم' });
  }
};

// دالة إنشاء مشروع جديد
exports.createPortfolio = (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      image,
      category,
      technologies,
      client,
      duration,
      budget,
      status = 'published',
      isActive = true
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!title || !subtitle || !description || !image) {
      return res.status(400).json({
        success: false,
        message: 'العنوان والنص الفرعي والوصف والصورة مطلوبة'
      });
    }
    
    // التحقق من صحة الصورة
    if (!isValidImageUrl(image)) {
      return res.status(400).json({
        success: false,
        message: 'رابط الصورة غير صحيح'
      });
    }
    
    // إنشاء المشروع الجديد
    const newPortfolio = {
      id: portfolio.length > 0 ? Math.max(...portfolio.map(p => p.id)) + 1 : 1,
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      image: image.trim(),
      category: category || 'عام',
      technologies: technologies || [],
      client: client || null,
      duration: duration || null,
      budget: budget || null,
      status,
      isActive,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // إضافة المشروع إلى المصفوفة
    portfolio.push(newPortfolio);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء المشروع بنجاح',
      data: newPortfolio
    });
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة تحديث المشروع
exports.updatePortfolio = (req, res) => {
  try {
    const portfolioId = parseInt(req.params.id);
    const portfolioIndex = portfolio.findIndex(p => p.id === portfolioId);
    
    if (portfolioIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'المشروع غير موجود'
      });
    }
    
    const {
      title,
      subtitle,
      description,
      image,
      category,
      technologies,
      client,
      duration,
      budget,
      status,
      isActive
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!title || !subtitle || !description || !image) {
      return res.status(400).json({
        success: false,
        message: 'العنوان والنص الفرعي والوصف والصورة مطلوبة'
      });
    }
    
    // التحقق من صحة الصورة
    if (!isValidImageUrl(image)) {
      return res.status(400).json({
        success: false,
        message: 'رابط الصورة غير صحيح'
      });
    }
    
    // تحديث بيانات المشروع
    const updatedPortfolio = {
      ...portfolio[portfolioIndex],
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      image: image.trim(),
      category: category || portfolio[portfolioIndex].category,
      technologies: technologies || portfolio[portfolioIndex].technologies,
      client: client !== undefined ? client : portfolio[portfolioIndex].client,
      duration: duration !== undefined ? duration : portfolio[portfolioIndex].duration,
      budget: budget !== undefined ? budget : portfolio[portfolioIndex].budget,
      status: status || portfolio[portfolioIndex].status,
      isActive: isActive !== undefined ? isActive : portfolio[portfolioIndex].isActive,
      updatedAt: new Date()
    };
    
    portfolio[portfolioIndex] = updatedPortfolio;
    
    res.json({
      success: true,
      message: 'تم تحديث المشروع بنجاح',
      data: updatedPortfolio
    });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة حذف المشروع
exports.deletePortfolio = (req, res) => {
  try {
    const portfolioId = parseInt(req.params.id);
    const portfolioIndex = portfolio.findIndex(p => p.id === portfolioId);
    
    if (portfolioIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'المشروع غير موجود'
      });
    }
    
    const deletedPortfolio = portfolio.splice(portfolioIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'تم حذف المشروع بنجاح',
      data: deletedPortfolio
    });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// ===== إدارة الأخبار =====

// دالة الحصول على جميع الأخبار
exports.getAllNews = (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    let filteredNews = [...news];
    
    // ترتيب النتائج
    filteredNews.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedNews = filteredNews.slice(startIndex, endIndex);
    
    res.json({
      data: paginatedNews,
      count: paginatedNews.length,
      total: filteredNews.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredNews.length / limit)
    });
  } catch (error) {
    console.error('Get all news error:', error);
    res.status(500).json({ error: 'حدث خطأ في الخادم' });
  }
};

// دالة إنشاء خبر جديد
exports.createNews = (req, res) => {
  try {
    const {
      title,
      subtitle,
      content,
      image,
      author,
      category,
      tags,
      status = 'published',
      isActive = true
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!title || !subtitle || !content) {
      return res.status(400).json({
        success: false,
        message: 'العنوان والنص الفرعي والمحتوى مطلوبة'
      });
    }
    
    // التحقق من صحة الصورة
    if (image && !isValidImageUrl(image)) {
      return res.status(400).json({
        success: false,
        message: 'رابط الصورة غير صحيح'
      });
    }
    
    // إنشاء الخبر الجديد
    const newNews = {
      id: news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1,
      title: title.trim(),
      subtitle: subtitle.trim(),
      content: content.trim(),
      image: image ? image.trim() : null,
      author: author || 'النظام',
      category: category || 'عام',
      tags: tags || [],
      status,
      isActive,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // إضافة الخبر إلى المصفوفة
    news.push(newNews);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء الخبر بنجاح',
      data: newNews
    });
  } catch (error) {
    console.error('Create news error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة تحديث الخبر
exports.updateNews = (req, res) => {
  try {
    const newsId = parseInt(req.params.id);
    const newsIndex = news.findIndex(n => n.id === newsId);
    
    if (newsIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'الخبر غير موجود'
      });
    }
    
    const {
      title,
      subtitle,
      content,
      image,
      author,
      category,
      tags,
      status,
      isActive
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!title || !subtitle || !content) {
      return res.status(400).json({
        success: false,
        message: 'العنوان والنص الفرعي والمحتوى مطلوبة'
      });
    }
    
    // التحقق من صحة الصورة
    if (image && !isValidImageUrl(image)) {
      return res.status(400).json({
        success: false,
        message: 'رابط الصورة غير صحيح'
      });
    }
    
    // تحديث بيانات الخبر
    const updatedNews = {
      ...news[newsIndex],
      title: title.trim(),
      subtitle: subtitle.trim(),
      content: content.trim(),
      image: image ? image.trim() : null,
      author: author || news[newsIndex].author,
      category: category || news[newsIndex].category,
      tags: tags || news[newsIndex].tags,
      status: status || news[newsIndex].status,
      isActive: isActive !== undefined ? isActive : news[newsIndex].isActive,
      updatedAt: new Date()
    };
    
    news[newsIndex] = updatedNews;
    
    res.json({
      success: true,
      message: 'تم تحديث الخبر بنجاح',
      data: updatedNews
    });
  } catch (error) {
    console.error('Update news error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة حذف الخبر
exports.deleteNews = (req, res) => {
  try {
    const newsId = parseInt(req.params.id);
    const newsIndex = news.findIndex(n => n.id === newsId);
    
    if (newsIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'الخبر غير موجود'
      });
    }
    
    const deletedNews = news.splice(newsIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'تم حذف الخبر بنجاح',
      data: deletedNews
    });
  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// ===== دوال مساعدة =====

// التحقق من صحة رابط الصورة
function isValidImageUrl(url) {
  if (!url) return false;
  
  // التحقق من أن الرابط يبدأ بـ http أو https
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false;
  }
  
  // التحقق من أن الرابط يحتوي على امتداد صورة
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const hasImageExtension = imageExtensions.some(ext => 
    url.toLowerCase().includes(ext)
  );
  
  return hasImageExtension;
} 
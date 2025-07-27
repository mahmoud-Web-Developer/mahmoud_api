/**
 * Content Management Controller
 * تحكم في المحتوى للربط بين الويب سايت والداشبورد
 */

const { 
  services, 
  portfolio, 
  news, 
  clients,
  contactRequests,
  meetings,
  briefs
} = require('../data/dummyData');

// ===== إدارة الخدمات =====
exports.getAllServices = (req, res) => {
  try {
    const { page = 1, limit = 10, status, category } = req.query;
    
    let filteredServices = [...services];
    
    // تصفية حسب الحالة
    if (status) {
      filteredServices = filteredServices.filter(s => s.status === status);
    }
    
    // تصفية حسب الفئة
    if (category) {
      filteredServices = filteredServices.filter(s => s.category === category);
    }
    
    // ترتيب حسب تاريخ الإنشاء
    filteredServices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedServices = filteredServices.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedServices,
      count: paginatedServices.length,
      total: filteredServices.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredServices.length / limit)
    });
  } catch (error) {
    console.error('Get all services error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الخدمات'
    });
  }
};

exports.createService = (req, res) => {
  try {
    const { 
      title, 
      subtitle, 
      description, 
      icon, 
      image,
      category,
      features = [],
      price,
      duration,
      status = 'active'
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'العنوان والوصف مطلوبان'
      });
    }
    
    // التحقق من صحة URL الصورة
    if (image && !isValidImageUrl(image)) {
      return res.status(400).json({
        success: false,
        message: 'رابط الصورة غير صحيح'
      });
    }
    
    // إنشاء خدمة جديدة
    const newService = {
      id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
      title: title.trim(),
      subtitle: subtitle ? subtitle.trim() : null,
      description: description.trim(),
      icon: icon ? icon.trim() : null,
      image: image ? image.trim() : null,
      category: category ? category.trim() : 'general',
      features: Array.isArray(features) ? features : [],
      price: price ? parseFloat(price) : null,
      duration: duration ? duration.trim() : null,
      status: status,
      createdAt: new Date(),
      updatedAt: new Date()
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

exports.updateService = (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const { 
      title, 
      subtitle, 
      description, 
      icon, 
      image,
      category,
      features,
      price,
      duration,
      status
    } = req.body;
    
    const serviceIndex = services.findIndex(s => s.id === serviceId);
    
    if (serviceIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'الخدمة غير موجودة'
      });
    }
    
    // تحديث البيانات
    if (title) services[serviceIndex].title = title.trim();
    if (subtitle !== undefined) services[serviceIndex].subtitle = subtitle ? subtitle.trim() : null;
    if (description) services[serviceIndex].description = description.trim();
    if (icon !== undefined) services[serviceIndex].icon = icon ? icon.trim() : null;
    if (image !== undefined) {
      if (image && !isValidImageUrl(image)) {
        return res.status(400).json({
          success: false,
          message: 'رابط الصورة غير صحيح'
        });
      }
      services[serviceIndex].image = image ? image.trim() : null;
    }
    if (category) services[serviceIndex].category = category.trim();
    if (features !== undefined) services[serviceIndex].features = Array.isArray(features) ? features : [];
    if (price !== undefined) services[serviceIndex].price = price ? parseFloat(price) : null;
    if (duration !== undefined) services[serviceIndex].duration = duration ? duration.trim() : null;
    if (status) services[serviceIndex].status = status;
    
    services[serviceIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث الخدمة بنجاح',
      data: services[serviceIndex]
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث الخدمة'
    });
  }
};

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
      message: 'حدث خطأ في حذف الخدمة'
    });
  }
};

// ===== إدارة المشاريع (Portfolio) =====
exports.getAllPortfolio = (req, res) => {
  try {
    const { page = 1, limit = 10, status, category } = req.query;
    
    let filteredPortfolio = [...portfolio];
    
    // تصفية حسب الحالة
    if (status) {
      filteredPortfolio = filteredPortfolio.filter(p => p.status === status);
    }
    
    // تصفية حسب الفئة
    if (category) {
      filteredPortfolio = filteredPortfolio.filter(p => p.category === category);
    }
    
    // ترتيب حسب تاريخ الإنشاء
    filteredPortfolio.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedPortfolio = filteredPortfolio.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedPortfolio,
      count: paginatedPortfolio.length,
      total: filteredPortfolio.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredPortfolio.length / limit)
    });
  } catch (error) {
    console.error('Get all portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب المشاريع'
    });
  }
};

exports.createPortfolio = (req, res) => {
  try {
    const { 
      title, 
      subtitle, 
      description, 
      image, 
      category,
      client,
      technologies = [],
      projectUrl,
      githubUrl,
      status = 'published'
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'العنوان والوصف مطلوبان'
      });
    }
    
    // التحقق من صحة URL الصورة
    if (image && !isValidImageUrl(image)) {
      return res.status(400).json({
        success: false,
        message: 'رابط الصورة غير صحيح'
      });
    }
    
    // إنشاء مشروع جديد
    const newPortfolio = {
      id: portfolio.length > 0 ? Math.max(...portfolio.map(p => p.id)) + 1 : 1,
      title: title.trim(),
      subtitle: subtitle ? subtitle.trim() : null,
      description: description.trim(),
      image: image ? image.trim() : null,
      category: category ? category.trim() : 'web',
      client: client ? client.trim() : null,
      technologies: Array.isArray(technologies) ? technologies : [],
      projectUrl: projectUrl ? projectUrl.trim() : null,
      githubUrl: githubUrl ? githubUrl.trim() : null,
      status: status,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
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
      message: 'حدث خطأ في إنشاء المشروع'
    });
  }
};

exports.updatePortfolio = (req, res) => {
  try {
    const portfolioId = parseInt(req.params.id);
    const { 
      title, 
      subtitle, 
      description, 
      image, 
      category,
      client,
      technologies,
      projectUrl,
      githubUrl,
      status
    } = req.body;
    
    const portfolioIndex = portfolio.findIndex(p => p.id === portfolioId);
    
    if (portfolioIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'المشروع غير موجود'
      });
    }
    
    // تحديث البيانات
    if (title) portfolio[portfolioIndex].title = title.trim();
    if (subtitle !== undefined) portfolio[portfolioIndex].subtitle = subtitle ? subtitle.trim() : null;
    if (description) portfolio[portfolioIndex].description = description.trim();
    if (image !== undefined) {
      if (image && !isValidImageUrl(image)) {
        return res.status(400).json({
          success: false,
          message: 'رابط الصورة غير صحيح'
        });
      }
      portfolio[portfolioIndex].image = image ? image.trim() : null;
    }
    if (category) portfolio[portfolioIndex].category = category.trim();
    if (client !== undefined) portfolio[portfolioIndex].client = client ? client.trim() : null;
    if (technologies !== undefined) portfolio[portfolioIndex].technologies = Array.isArray(technologies) ? technologies : [];
    if (projectUrl !== undefined) portfolio[portfolioIndex].projectUrl = projectUrl ? projectUrl.trim() : null;
    if (githubUrl !== undefined) portfolio[portfolioIndex].githubUrl = githubUrl ? githubUrl.trim() : null;
    if (status) portfolio[portfolioIndex].status = status;
    
    portfolio[portfolioIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث المشروع بنجاح',
      data: portfolio[portfolioIndex]
    });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث المشروع'
    });
  }
};

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
      message: 'حدث خطأ في حذف المشروع'
    });
  }
};

// ===== إدارة الأخبار =====
exports.getAllNews = (req, res) => {
  try {
    const { page = 1, limit = 10, status, category } = req.query;
    
    let filteredNews = [...news];
    
    // تصفية حسب الحالة
    if (status) {
      filteredNews = filteredNews.filter(n => n.status === status);
    }
    
    // تصفية حسب الفئة
    if (category) {
      filteredNews = filteredNews.filter(n => n.category === category);
    }
    
    // ترتيب حسب تاريخ الإنشاء
    filteredNews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedNews = filteredNews.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedNews,
      count: paginatedNews.length,
      total: filteredNews.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredNews.length / limit)
    });
  } catch (error) {
    console.error('Get all news error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الأخبار'
    });
  }
};

exports.createNews = (req, res) => {
  try {
    const { 
      title, 
      subtitle, 
      content, 
      image, 
      category,
      author,
      tags = [],
      status = 'published'
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'العنوان والمحتوى مطلوبان'
      });
    }
    
    // التحقق من صحة URL الصورة
    if (image && !isValidImageUrl(image)) {
      return res.status(400).json({
        success: false,
        message: 'رابط الصورة غير صحيح'
      });
    }
    
    // إنشاء خبر جديد
    const newNews = {
      id: news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1,
      title: title.trim(),
      subtitle: subtitle ? subtitle.trim() : null,
      content: content.trim(),
      image: image ? image.trim() : null,
      category: category ? category.trim() : 'general',
      author: author ? author.trim() : 'Admin',
      tags: Array.isArray(tags) ? tags : [],
      status: status,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
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
      message: 'حدث خطأ في إنشاء الخبر'
    });
  }
};

exports.updateNews = (req, res) => {
  try {
    const newsId = parseInt(req.params.id);
    const { 
      title, 
      subtitle, 
      content, 
      image, 
      category,
      author,
      tags,
      status
    } = req.body;
    
    const newsIndex = news.findIndex(n => n.id === newsId);
    
    if (newsIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'الخبر غير موجود'
      });
    }
    
    // تحديث البيانات
    if (title) news[newsIndex].title = title.trim();
    if (subtitle !== undefined) news[newsIndex].subtitle = subtitle ? subtitle.trim() : null;
    if (content) news[newsIndex].content = content.trim();
    if (image !== undefined) {
      if (image && !isValidImageUrl(image)) {
        return res.status(400).json({
          success: false,
          message: 'رابط الصورة غير صحيح'
        });
      }
      news[newsIndex].image = image ? image.trim() : null;
    }
    if (category) news[newsIndex].category = category.trim();
    if (author !== undefined) news[newsIndex].author = author ? author.trim() : 'Admin';
    if (tags !== undefined) news[newsIndex].tags = Array.isArray(tags) ? tags : [];
    if (status) news[newsIndex].status = status;
    
    news[newsIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث الخبر بنجاح',
      data: news[newsIndex]
    });
  } catch (error) {
    console.error('Update news error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث الخبر'
    });
  }
};

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
      message: 'حدث خطأ في حذف الخبر'
    });
  }
};

// ===== دوال مساعدة =====
function isValidImageUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
} 
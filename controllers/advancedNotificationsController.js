/**
 * Advanced Notifications Controller
 * تحكم متقدم في الإشعارات مع ميزات إضافية
 */

const { notifications } = require('../data/dummyData');

// ===== إدارة الإشعارات المتقدمة =====

// تصنيف الإشعارات حسب النوع والأولوية
exports.categorizeNotifications = (req, res) => {
  try {
    const { type, priority } = req.query;
    
    let filteredNotifications = [...notifications];
    
    // فلتر حسب النوع
    if (type) {
      filteredNotifications = filteredNotifications.filter(n => n.type === type);
    }
    
    // فلتر حسب الأولوية
    if (priority) {
      filteredNotifications = filteredNotifications.filter(n => n.priority === priority);
    }
    
    // تصنيف حسب الحالة
    const categorized = {
      unread: filteredNotifications.filter(n => !n.isRead),
      read: filteredNotifications.filter(n => n.isRead),
      high: filteredNotifications.filter(n => n.priority === 'high'),
      normal: filteredNotifications.filter(n => n.priority === 'normal'),
      low: filteredNotifications.filter(n => n.priority === 'low')
    };
    
    res.json({
      success: true,
      data: categorized,
      stats: {
        unread: categorized.unread.length,
        read: categorized.read.length,
        high: categorized.high.length,
        normal: categorized.normal.length,
        low: categorized.low.length,
        total: filteredNotifications.length
      }
    });
  } catch (error) {
    console.error('Categorize notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تصنيف الإشعارات'
    });
  }
};

// البحث في الإشعارات
exports.searchNotifications = (req, res) => {
  try {
    const { 
      query, 
      type, 
      priority, 
      isRead,
      dateFrom, 
      dateTo,
      page = 1,
      limit = 20
    } = req.query;
    
    let filteredNotifications = [...notifications];
    
    // البحث النصي
    if (query) {
      const searchTerm = query.toLowerCase();
      filteredNotifications = filteredNotifications.filter(n => 
        n.title?.toLowerCase().includes(searchTerm) ||
        n.message?.toLowerCase().includes(searchTerm)
      );
    }
    
    // فلتر النوع
    if (type) {
      filteredNotifications = filteredNotifications.filter(n => n.type === type);
    }
    
    // فلتر الأولوية
    if (priority) {
      filteredNotifications = filteredNotifications.filter(n => n.priority === priority);
    }
    
    // فلتر حالة القراءة
    if (isRead !== undefined) {
      filteredNotifications = filteredNotifications.filter(n => n.isRead === (isRead === 'true'));
    }
    
    // فلتر التاريخ
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filteredNotifications = filteredNotifications.filter(n => new Date(n.createdAt) >= fromDate);
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      filteredNotifications = filteredNotifications.filter(n => new Date(n.createdAt) <= toDate);
    }
    
    // ترتيب حسب التاريخ
    filteredNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedNotifications,
      count: paginatedNotifications.length,
      total: filteredNotifications.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredNotifications.length / limit)
    });
  } catch (error) {
    console.error('Search notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في البحث في الإشعارات'
    });
  }
};

// تحديث حالة متعددة للإشعارات
exports.bulkUpdateNotifications = (req, res) => {
  try {
    const { notificationIds, action } = req.body;
    
    if (!notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'معرفات الإشعارات مطلوبة'
      });
    }
    
    if (!action || !['mark-read', 'mark-unread', 'delete'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'الإجراء غير صحيح'
      });
    }
    
    let updatedCount = 0;
    
    for (const notificationId of notificationIds) {
      const notificationIndex = notifications.findIndex(n => n.id === notificationId);
      
      if (notificationIndex !== -1) {
        switch (action) {
          case 'mark-read':
            notifications[notificationIndex].isRead = true;
            break;
          case 'mark-unread':
            notifications[notificationIndex].isRead = false;
            break;
          case 'delete':
            notifications.splice(notificationIndex, 1);
            break;
        }
        
        if (action !== 'delete') {
          notifications[notificationIndex].updatedAt = new Date();
        }
        
        updatedCount++;
      }
    }
    
    res.json({
      success: true,
      message: `تم ${action === 'mark-read' ? 'تحديد' : action === 'mark-unread' ? 'إلغاء تحديد' : 'حذف'} ${updatedCount} إشعار بنجاح`,
      updatedCount
    });
  } catch (error) {
    console.error('Bulk update notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث الإشعارات'
    });
  }
};

// إحصائيات متقدمة للإشعارات
exports.getAdvancedNotificationStats = (req, res) => {
  try {
    const { period = '30' } = req.query; // عدد الأيام
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));
    
    // فلترة الإشعارات حسب الفترة
    const recentNotifications = notifications.filter(n => new Date(n.createdAt) >= daysAgo);
    
    // إحصائيات متقدمة
    const stats = {
      period: `${period} يوم`,
      total: {
        all: notifications.length,
        unread: notifications.filter(n => !n.isRead).length,
        read: notifications.filter(n => n.isRead).length
      },
      recent: {
        all: recentNotifications.length,
        unread: recentNotifications.filter(n => !n.isRead).length,
        read: recentNotifications.filter(n => n.isRead).length
      },
      byType: {
        contact: notifications.filter(n => n.type === 'contact').length,
        meeting: notifications.filter(n => n.type === 'meeting').length,
        brief: notifications.filter(n => n.type === 'brief').length,
        system: notifications.filter(n => n.type === 'system').length
      },
      byPriority: {
        high: notifications.filter(n => n.priority === 'high').length,
        normal: notifications.filter(n => n.priority === 'normal').length,
        low: notifications.filter(n => n.priority === 'low').length
      },
      trends: {
        daily: getNotificationDailyTrends(parseInt(period)),
        weekly: getNotificationWeeklyTrends(parseInt(period)),
        monthly: getNotificationMonthlyTrends(parseInt(period))
      }
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get advanced notification stats error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب إحصائيات الإشعارات المتقدمة'
    });
  }
};

// إعدادات الإشعارات
exports.getNotificationSettings = (req, res) => {
  try {
    const settings = {
      email: {
        enabled: true,
        contact: true,
        meeting: true,
        brief: true,
        system: false
      },
      push: {
        enabled: true,
        contact: true,
        meeting: true,
        brief: true,
        system: true
      },
      sound: {
        enabled: true,
        volume: 0.7
      },
      autoRead: {
        enabled: false,
        delay: 5000 // 5 seconds
      },
      retention: {
        days: 30,
        autoDelete: true
      }
    };
    
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Get notification settings error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب إعدادات الإشعارات'
    });
  }
};

exports.updateNotificationSettings = (req, res) => {
  try {
    const { settings } = req.body;
    
    if (!settings) {
      return res.status(400).json({
        success: false,
        message: 'الإعدادات مطلوبة'
      });
    }
    
    // هنا يمكن حفظ الإعدادات في قاعدة البيانات
    // حالياً نعيد الإعدادات كما هي
    
    res.json({
      success: true,
      message: 'تم تحديث إعدادات الإشعارات بنجاح',
      data: settings
    });
  } catch (error) {
    console.error('Update notification settings error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث إعدادات الإشعارات'
    });
  }
};

// تنظيف الإشعارات القديمة
exports.cleanupOldNotifications = (req, res) => {
  try {
    const { days = 30 } = req.query;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));
    
    const oldNotifications = notifications.filter(n => new Date(n.createdAt) < cutoffDate);
    const deletedCount = oldNotifications.length;
    
    // حذف الإشعارات القديمة
    for (const notification of oldNotifications) {
      const index = notifications.findIndex(n => n.id === notification.id);
      if (index !== -1) {
        notifications.splice(index, 1);
      }
    }
    
    res.json({
      success: true,
      message: `تم حذف ${deletedCount} إشعار قديم بنجاح`,
      deletedCount,
      remainingCount: notifications.length
    });
  } catch (error) {
    console.error('Cleanup old notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تنظيف الإشعارات القديمة'
    });
  }
};

// ===== دوال مساعدة =====

// الحصول على الاتجاهات اليومية للإشعارات
function getNotificationDailyTrends(days) {
  const trends = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);
    
    const dayNotifications = notifications.filter(n => {
      const notificationDate = new Date(n.createdAt);
      return notificationDate >= dayStart && notificationDate <= dayEnd;
    }).length;
    
    trends.push({
      date: date.toISOString().split('T')[0],
      count: dayNotifications
    });
  }
  
  return trends;
}

// الحصول على الاتجاهات الأسبوعية للإشعارات
function getNotificationWeeklyTrends(days) {
  const trends = [];
  const today = new Date();
  
  for (let i = Math.floor(days / 7); i >= 0; i--) {
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - (i * 7));
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    const weekNotifications = notifications.filter(n => {
      const notificationDate = new Date(n.createdAt);
      return notificationDate >= weekStart && notificationDate <= weekEnd;
    }).length;
    
    trends.push({
      week: `Week ${i + 1}`,
      startDate: weekStart.toISOString().split('T')[0],
      endDate: weekEnd.toISOString().split('T')[0],
      count: weekNotifications
    });
  }
  
  return trends;
}

// الحصول على الاتجاهات الشهرية للإشعارات
function getNotificationMonthlyTrends(days) {
  const trends = [];
  const today = new Date();
  
  for (let i = Math.floor(days / 30); i >= 0; i--) {
    const monthStart = new Date(today);
    monthStart.setMonth(monthStart.getMonth() - i);
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    
    const monthEnd = new Date(monthStart);
    monthEnd.setMonth(monthEnd.getMonth() + 1);
    monthEnd.setDate(0);
    monthEnd.setHours(23, 59, 59, 999);
    
    const monthNotifications = notifications.filter(n => {
      const notificationDate = new Date(n.createdAt);
      return notificationDate >= monthStart && notificationDate <= monthEnd;
    }).length;
    
    trends.push({
      month: monthStart.toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' }),
      startDate: monthStart.toISOString().split('T')[0],
      endDate: monthEnd.toISOString().split('T')[0],
      count: monthNotifications
    });
  }
  
  return trends;
} 
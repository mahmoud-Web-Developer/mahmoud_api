/**
 * Notifications Controller
 * تحكم في الإشعارات لإعلام المشرفين بالطلبات الجديدة
 */

const { notifications = [] } = require('../data/dummyData');

// ===== إنشاء إشعار جديد =====
exports.createNotification = (req, res) => {
  try {
    const { 
      type, 
      title, 
      message, 
      recipientId, 
      relatedId,
      priority = 'normal'
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!type || !title || !message) {
      return res.status(400).json({
        success: false,
        message: 'نوع الإشعار والعنوان والرسالة مطلوبة'
      });
    }
    
    // إنشاء إشعار جديد
    const newNotification = {
      id: notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1,
      type: type.trim(),
      title: title.trim(),
      message: message.trim(),
      recipientId: recipientId || null,
      relatedId: relatedId || null,
      priority: priority,
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    notifications.push(newNotification);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء الإشعار بنجاح',
      data: newNotification
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في إنشاء الإشعار'
    });
  }
};

// ===== جلب جميع الإشعارات =====
exports.getAllNotifications = (req, res) => {
  try {
    const { page = 1, limit = 20, type, isRead, recipientId } = req.query;
    
    let filteredNotifications = [...notifications];
    
    // تصفية حسب النوع
    if (type) {
      filteredNotifications = filteredNotifications.filter(n => n.type === type);
    }
    
    // تصفية حسب حالة القراءة
    if (isRead !== undefined) {
      filteredNotifications = filteredNotifications.filter(n => n.isRead === (isRead === 'true'));
    }
    
    // تصفية حسب المستلم
    if (recipientId) {
      filteredNotifications = filteredNotifications.filter(n => n.recipientId === parseInt(recipientId));
    }
    
    // ترتيب حسب تاريخ الإنشاء
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
    console.error('Get all notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الإشعارات'
    });
  }
};

// ===== تحديث حالة الإشعار =====
exports.updateNotificationStatus = (req, res) => {
  try {
    const notificationId = parseInt(req.params.id);
    const { isRead } = req.body;
    
    const notificationIndex = notifications.findIndex(n => n.id === notificationId);
    
    if (notificationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'الإشعار غير موجود'
      });
    }
    
    notifications[notificationIndex].isRead = isRead;
    notifications[notificationIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث حالة الإشعار بنجاح',
      data: notifications[notificationIndex]
    });
  } catch (error) {
    console.error('Update notification status error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث حالة الإشعار'
    });
  }
};

// ===== حذف إشعار =====
exports.deleteNotification = (req, res) => {
  try {
    const notificationId = parseInt(req.params.id);
    const notificationIndex = notifications.findIndex(n => n.id === notificationId);
    
    if (notificationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'الإشعار غير موجود'
      });
    }
    
    const deletedNotification = notifications.splice(notificationIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'تم حذف الإشعار بنجاح',
      data: deletedNotification
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف الإشعار'
    });
  }
};

// ===== إحصائيات الإشعارات =====
exports.getNotificationsStats = (req, res) => {
  try {
    const stats = {
      total: notifications.length,
      unread: notifications.filter(n => !n.isRead).length,
      read: notifications.filter(n => n.isRead).length,
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
      }
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get notifications stats error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب إحصائيات الإشعارات'
    });
  }
};

// ===== دوال مساعدة لإنشاء إشعارات تلقائية =====

// إشعار طلب تواصل جديد
exports.notifyNewContactRequest = (contactRequest) => {
  try {
    const notification = {
      id: notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1,
      type: 'contact',
      title: 'طلب تواصل جديد',
      message: `طلب تواصل جديد من ${contactRequest.name} (${contactRequest.email})`,
      recipientId: null, // لجميع المشرفين
      relatedId: contactRequest.id,
      priority: 'normal',
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    notifications.push(notification);
    return notification;
  } catch (error) {
    console.error('Notify new contact request error:', error);
  }
};

// إشعار طلب اجتماع جديد
exports.notifyNewMeetingRequest = (meetingRequest) => {
  try {
    const notification = {
      id: notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1,
      type: 'meeting',
      title: 'طلب اجتماع جديد',
      message: `طلب اجتماع جديد من ${meetingRequest.name} - ${meetingRequest.subject}`,
      recipientId: null, // لجميع المشرفين
      relatedId: meetingRequest.id,
      priority: 'high',
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    notifications.push(notification);
    return notification;
  } catch (error) {
    console.error('Notify new meeting request error:', error);
  }
};

// إشعار Brief جديد
exports.notifyNewBriefRequest = (briefRequest) => {
  try {
    const notification = {
      id: notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1,
      type: 'brief',
      title: 'Brief جديد',
      message: `Brief جديد من ${briefRequest.name} - ${briefRequest.projectName}`,
      recipientId: null, // لجميع المشرفين
      relatedId: briefRequest.id,
      priority: 'high',
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    notifications.push(notification);
    return notification;
  } catch (error) {
    console.error('Notify new brief request error:', error);
  }
};

// إشعار تحديث حالة طلب
exports.notifyRequestStatusUpdate = (request, newStatus) => {
  try {
    const statusText = {
      'pending': 'في الانتظار',
      'in-progress': 'قيد التنفيذ',
      'completed': 'مكتمل',
      'cancelled': 'ملغي'
    };
    
    const notification = {
      id: notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1,
      type: 'system',
      title: 'تحديث حالة طلب',
      message: `تم تحديث حالة الطلب إلى: ${statusText[newStatus] || newStatus}`,
      recipientId: null,
      relatedId: request.id,
      priority: 'normal',
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    notifications.push(notification);
    return notification;
  } catch (error) {
    console.error('Notify request status update error:', error);
  }
}; 
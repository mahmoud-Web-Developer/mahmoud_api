const { dashboard, services, portfolio, news, contactRequests, meetings, briefs, users } = require('../data/dummyData');
 
// دالة جلب بيانات لوحة التحكم الرئيسية
exports.getDashboard = (req, res) => {
  try {
    // حساب الإحصائيات
    const stats = {
      totalServices: services.length,
      totalPortfolio: portfolio.length,
      totalNews: news.length,
      totalContactRequests: contactRequests.length,
      totalMeetings: meetings.length,
      totalBriefs: briefs.length,
      totalUsers: users ? users.length : 0,
      recentActivity: getRecentActivity()
    };

    res.json({
      success: true,
      data: {
        stats,
        workStatus: dashboard.workStatus,
        reports: dashboard.reports,
        workLibrary: dashboard.workLibrary
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب بيانات لوحة التحكم'
    });
  }
};

// دالة جلب إحصائيات مفصلة
exports.getStats = (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    const stats = {
      period,
      services: {
        total: services.length,
        active: services.filter(s => s.isActive !== false).length,
        inactive: services.filter(s => s.isActive === false).length
      },
      portfolio: {
        total: portfolio.length,
        published: portfolio.filter(p => p.status === 'published').length,
        draft: portfolio.filter(p => p.status === 'draft').length
      },
      requests: {
        total: contactRequests.length + meetings.length + briefs.length,
        contact: contactRequests.length,
        meetings: meetings.length,
        briefs: briefs.length,
        pending: getPendingRequests(),
        completed: getCompletedRequests()
      },
      users: {
        total: users ? users.length : 0,
        active: users ? users.filter(u => u.isActive).length : 0,
        inactive: users ? users.filter(u => !u.isActive).length : 0
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الإحصائيات'
    });
  }
};

// دالة جلب النشاطات الأخيرة
exports.getRecentActivity = (req, res) => {
  try {
    const activities = getRecentActivity();
    
    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Recent activity error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب النشاطات الأخيرة'
    });
  }
};

// دالة جلب التقارير
exports.getReports = (req, res) => {
  try {
    const { type, period } = req.query;
    
    let reports = [];
    
    switch (type) {
      case 'requests':
        reports = generateRequestsReport(period);
        break;
      case 'users':
        reports = generateUsersReport(period);
        break;
      case 'content':
        reports = generateContentReport(period);
        break;
      default:
        reports = generateGeneralReport(period);
    }

    res.json({
      success: true,
      data: reports
    });
  } catch (error) {
    console.error('Reports error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب التقارير'
    });
  }
};

// دالة تحديث إعدادات لوحة التحكم
exports.updateDashboardSettings = (req, res) => {
  try {
    const { workStatus, reports, workLibrary } = req.body;
    
    // تحديث الإعدادات
    if (workStatus) dashboard.workStatus = workStatus;
    if (reports) dashboard.reports = reports;
    if (workLibrary) dashboard.workLibrary = workLibrary;
    
    res.json({
      success: true,
      message: 'تم تحديث إعدادات لوحة التحكم بنجاح',
      data: dashboard
    });
  } catch (error) {
    console.error('Update dashboard settings error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث الإعدادات'
    });
  }
};

// دوال مساعدة
function getRecentActivity() {
  const activities = [];
  
  // إضافة نشاطات من الطلبات
  contactRequests.slice(-5).forEach(request => {
    activities.push({
      type: 'contact_request',
      title: `طلب تواصل جديد من ${request.name}`,
      date: request.createdAt || new Date(),
      status: request.status || 'pending'
    });
  });
  
  meetings.slice(-5).forEach(meeting => {
    activities.push({
      type: 'meeting',
      title: `اجتماع جديد: ${meeting.title}`,
      date: meeting.createdAt || new Date(),
      status: meeting.status || 'pending'
    });
  });
  
  briefs.slice(-5).forEach(brief => {
    activities.push({
      type: 'brief',
      title: `Brief جديد: ${brief.title}`,
      date: brief.createdAt || new Date(),
      status: brief.status || 'pending'
    });
  });
  
  // ترتيب النشاطات حسب التاريخ
  return activities.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
}

function getPendingRequests() {
  return contactRequests.filter(r => r.status === 'pending').length +
         meetings.filter(m => m.status === 'pending').length +
         briefs.filter(b => b.status === 'pending').length;
}

function getCompletedRequests() {
  return contactRequests.filter(r => r.status === 'completed').length +
         meetings.filter(m => m.status === 'completed').length +
         briefs.filter(b => b.status === 'completed').length;
}

function generateRequestsReport(period) {
  // تقرير الطلبات حسب الفترة المحددة
  return {
    period,
    total: contactRequests.length + meetings.length + briefs.length,
    contact: contactRequests.length,
    meetings: meetings.length,
    briefs: briefs.length,
    pending: getPendingRequests(),
    completed: getCompletedRequests()
  };
}

function generateUsersReport(period) {
  // تقرير المستخدمين
  return {
    period,
    total: users ? users.length : 0,
    active: users ? users.filter(u => u.isActive).length : 0,
    inactive: users ? users.filter(u => !u.isActive).length : 0,
    newThisPeriod: users ? users.filter(u => {
      const userDate = new Date(u.createdAt);
      const now = new Date();
      const diffDays = (now - userDate) / (1000 * 60 * 60 * 24);
      return diffDays <= (period === 'week' ? 7 : period === 'month' ? 30 : 365);
    }).length : 0
  };
}

function generateContentReport(period) {
  // تقرير المحتوى
  return {
    period,
    services: {
      total: services.length,
      active: services.filter(s => s.isActive !== false).length
    },
    portfolio: {
      total: portfolio.length,
      published: portfolio.filter(p => p.status === 'published').length
    },
    news: {
      total: news.length,
      published: news.filter(n => n.status === 'published').length
    }
  };
}

function generateGeneralReport(period) {
  // تقرير عام
  return {
    period,
    requests: generateRequestsReport(period),
    users: generateUsersReport(period),
    content: generateContentReport(period)
  };
} 
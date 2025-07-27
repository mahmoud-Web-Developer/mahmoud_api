/**
 * Advanced Requests Controller
 * تحكم متقدم في الطلبات مع ميزات إضافية
 */

const { 
  contactRequests, 
  meetings, 
  briefs,
  requests,
  notifications
} = require('../data/dummyData');

// ===== إدارة الطلبات المتقدمة =====

// تصنيف الطلبات حسب الأولوية
exports.categorizeRequests = (req, res) => {
  try {
    const { type } = req.query;
    
    let allRequests = [];
    
    if (type === 'contact' || !type) {
      allRequests = allRequests.concat(contactRequests.map(r => ({ ...r, requestType: 'contact' })));
    }
    
    if (type === 'meeting' || !type) {
      allRequests = allRequests.concat(meetings.map(m => ({ ...m, requestType: 'meeting' })));
    }
    
    if (type === 'brief' || !type) {
      allRequests = allRequests.concat(briefs.map(b => ({ ...b, requestType: 'brief' })));
    }
    
    // تصنيف حسب الأولوية
    const categorized = {
      high: allRequests.filter(r => r.priority === 'high' || r.status === 'pending'),
      normal: allRequests.filter(r => r.priority === 'normal' && r.status !== 'pending'),
      low: allRequests.filter(r => r.priority === 'low' && r.status !== 'pending')
    };
    
    res.json({
      success: true,
      data: categorized,
      stats: {
        high: categorized.high.length,
        normal: categorized.normal.length,
        low: categorized.low.length,
        total: allRequests.length
      }
    });
  } catch (error) {
    console.error('Categorize requests error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تصنيف الطلبات'
    });
  }
};

// البحث المتقدم في الطلبات
exports.searchRequests = (req, res) => {
  try {
    const { 
      query, 
      type, 
      status, 
      dateFrom, 
      dateTo,
      page = 1,
      limit = 10
    } = req.query;
    
    let allRequests = [];
    
    // جمع جميع الطلبات
    if (type === 'contact' || !type) {
      allRequests = allRequests.concat(contactRequests.map(r => ({ ...r, requestType: 'contact' })));
    }
    
    if (type === 'meeting' || !type) {
      allRequests = allRequests.concat(meetings.map(m => ({ ...m, requestType: 'meeting' })));
    }
    
    if (type === 'brief' || !type) {
      allRequests = allRequests.concat(briefs.map(b => ({ ...b, requestType: 'brief' })));
    }
    
    // تطبيق الفلاتر
    let filteredRequests = allRequests;
    
    // البحث النصي
    if (query) {
      const searchTerm = query.toLowerCase();
      filteredRequests = filteredRequests.filter(r => 
        r.name?.toLowerCase().includes(searchTerm) ||
        r.email?.toLowerCase().includes(searchTerm) ||
        r.subject?.toLowerCase().includes(searchTerm) ||
        r.message?.toLowerCase().includes(searchTerm) ||
        r.description?.toLowerCase().includes(searchTerm)
      );
    }
    
    // فلتر الحالة
    if (status) {
      filteredRequests = filteredRequests.filter(r => r.status === status);
    }
    
    // فلتر التاريخ
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filteredRequests = filteredRequests.filter(r => new Date(r.createdAt) >= fromDate);
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      filteredRequests = filteredRequests.filter(r => new Date(r.createdAt) <= toDate);
    }
    
    // ترتيب حسب التاريخ
    filteredRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedRequests = filteredRequests.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedRequests,
      count: paginatedRequests.length,
      total: filteredRequests.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredRequests.length / limit)
    });
  } catch (error) {
    console.error('Search requests error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في البحث في الطلبات'
    });
  }
};

// تحليل الطلبات وإحصائيات متقدمة
exports.getAdvancedStats = (req, res) => {
  try {
    const { period = '30' } = req.query; // عدد الأيام
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));
    
    // فلترة الطلبات حسب الفترة
    const recentContactRequests = contactRequests.filter(r => new Date(r.createdAt) >= daysAgo);
    const recentMeetings = meetings.filter(m => new Date(m.createdAt) >= daysAgo);
    const recentBriefs = briefs.filter(b => new Date(b.createdAt) >= daysAgo);
    
    // إحصائيات متقدمة
    const stats = {
      period: `${period} يوم`,
      total: {
        contact: contactRequests.length,
        meetings: meetings.length,
        briefs: briefs.length,
        all: contactRequests.length + meetings.length + briefs.length
      },
      recent: {
        contact: recentContactRequests.length,
        meetings: recentMeetings.length,
        briefs: recentBriefs.length,
        all: recentContactRequests.length + recentMeetings.length + recentBriefs.length
      },
      status: {
        pending: contactRequests.filter(r => r.status === 'pending').length +
                meetings.filter(m => m.status === 'pending').length +
                briefs.filter(b => b.status === 'pending').length,
        inProgress: contactRequests.filter(r => r.status === 'in-progress').length +
                   meetings.filter(m => m.status === 'in-progress').length +
                   briefs.filter(b => b.status === 'in-progress').length,
        completed: contactRequests.filter(r => r.status === 'completed').length +
                  meetings.filter(m => m.status === 'completed').length +
                  briefs.filter(b => b.status === 'completed').length,
        cancelled: contactRequests.filter(r => r.status === 'cancelled').length +
                  meetings.filter(m => m.status === 'cancelled').length +
                  briefs.filter(b => b.status === 'cancelled').length
      },
      trends: {
        daily: getDailyTrends(parseInt(period)),
        weekly: getWeeklyTrends(parseInt(period)),
        monthly: getMonthlyTrends(parseInt(period))
      }
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get advanced stats error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الإحصائيات المتقدمة'
    });
  }
};

// تصدير الطلبات
exports.exportRequests = (req, res) => {
  try {
    const { type, format = 'json', dateFrom, dateTo } = req.query;
    
    let allRequests = [];
    
    // جمع الطلبات حسب النوع
    if (type === 'contact' || !type) {
      allRequests = allRequests.concat(contactRequests.map(r => ({ ...r, requestType: 'contact' })));
    }
    
    if (type === 'meeting' || !type) {
      allRequests = allRequests.concat(meetings.map(m => ({ ...m, requestType: 'meeting' })));
    }
    
    if (type === 'brief' || !type) {
      allRequests = allRequests.concat(briefs.map(b => ({ ...b, requestType: 'brief' })));
    }
    
    // فلتر التاريخ
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      allRequests = allRequests.filter(r => new Date(r.createdAt) >= fromDate);
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      allRequests = allRequests.filter(r => new Date(r.createdAt) <= toDate);
    }
    
    // ترتيب حسب التاريخ
    allRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    if (format === 'csv') {
      // تصدير CSV
      const csvData = convertToCSV(allRequests);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=requests.csv');
      res.send(csvData);
    } else {
      // تصدير JSON
      res.json({
        success: true,
        data: allRequests,
        count: allRequests.length,
        exportedAt: new Date()
      });
    }
  } catch (error) {
    console.error('Export requests error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تصدير الطلبات'
    });
  }
};

// ===== دوال مساعدة =====

// تحويل البيانات إلى CSV
function convertToCSV(data) {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // إضافة العناوين
  csvRows.push(headers.join(','));
  
  // إضافة البيانات
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      return typeof value === 'string' ? `"${value}"` : value;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
}

// الحصول على الاتجاهات اليومية
function getDailyTrends(days) {
  const trends = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);
    
    const dayRequests = contactRequests.filter(r => {
      const requestDate = new Date(r.createdAt);
      return requestDate >= dayStart && requestDate <= dayEnd;
    }).length;
    
    trends.push({
      date: date.toISOString().split('T')[0],
      count: dayRequests
    });
  }
  
  return trends;
}

// الحصول على الاتجاهات الأسبوعية
function getWeeklyTrends(days) {
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
    
    const weekRequests = contactRequests.filter(r => {
      const requestDate = new Date(r.createdAt);
      return requestDate >= weekStart && requestDate <= weekEnd;
    }).length;
    
    trends.push({
      week: `Week ${i + 1}`,
      startDate: weekStart.toISOString().split('T')[0],
      endDate: weekEnd.toISOString().split('T')[0],
      count: weekRequests
    });
  }
  
  return trends;
}

// الحصول على الاتجاهات الشهرية
function getMonthlyTrends(days) {
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
    
    const monthRequests = contactRequests.filter(r => {
      const requestDate = new Date(r.createdAt);
      return requestDate >= monthStart && requestDate <= monthEnd;
    }).length;
    
    trends.push({
      month: monthStart.toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' }),
      startDate: monthStart.toISOString().split('T')[0],
      endDate: monthEnd.toISOString().split('T')[0],
      count: monthRequests
    });
  }
  
  return trends;
} 
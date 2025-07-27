/**
 * Check No Dummy Data Test
 * اختبار التأكد من عدم وجود بيانات وهمية
 */

const { 
  services, 
  portfolio, 
  news, 
  contactRequests, 
  meetings, 
  briefs, 
  users, 
  dashboard, 
  requests 
} = require('../data/dummyData');

console.log('=== اختبار عدم وجود بيانات وهمية ===\n');

// اختبار 1: فحص الخدمات
console.log('1. فحص الخدمات:');
if (services.length === 0) {
  console.log('✅ مصفوفة الخدمات فارغة');
} else {
  console.log(`❌ مصفوفة الخدمات تحتوي على ${services.length} عنصر`);
  services.forEach((service, index) => {
    console.log(`   - ${index + 1}. ${service.name || 'خدمة بدون اسم'}`);
  });
}

// اختبار 2: فحص طلبات التواصل
console.log('\n2. فحص طلبات التواصل:');
if (contactRequests.length === 0) {
  console.log('✅ مصفوفة طلبات التواصل فارغة');
} else {
  console.log(`❌ مصفوفة طلبات التواصل تحتوي على ${contactRequests.length} عنصر`);
  contactRequests.forEach((request, index) => {
    console.log(`   - ${index + 1}. ${request.fullName || 'طلب بدون اسم'}`);
  });
}

// اختبار 3: فحص المستخدمين
console.log('\n3. فحص المستخدمين:');
if (users.length === 0) {
  console.log('✅ مصفوفة المستخدمين فارغة (في ملف dummyData.js)');
} else {
  console.log(`❌ مصفوفة المستخدمين تحتوي على ${users.length} عنصر`);
  users.forEach((user, index) => {
    console.log(`   - ${index + 1}. ${user.username || 'مستخدم بدون اسم'}`);
  });
}

// اختبار 4: فحص الاجتماعات
console.log('\n4. فحص الاجتماعات:');
if (meetings.length === 0) {
  console.log('✅ مصفوفة الاجتماعات فارغة');
} else {
  console.log(`❌ مصفوفة الاجتماعات تحتوي على ${meetings.length} عنصر`);
  meetings.forEach((meeting, index) => {
    console.log(`   - ${index + 1}. ${meeting.title || 'اجتماع بدون عنوان'}`);
  });
}

// اختبار 5: فحص المشاريع (Briefs)
console.log('\n5. فحص المشاريع (Briefs):');
if (briefs.length === 0) {
  console.log('✅ مصفوفة المشاريع فارغة');
} else {
  console.log(`❌ مصفوفة المشاريع تحتوي على ${briefs.length} عنصر`);
  briefs.forEach((brief, index) => {
    console.log(`   - ${index + 1}. ${brief.title || 'مشروع بدون عنوان'}`);
  });
}

// اختبار 6: فحص الأخبار
console.log('\n6. فحص الأخبار:');
if (news.length === 0) {
  console.log('✅ مصفوفة الأخبار فارغة');
} else {
  console.log(`❌ مصفوفة الأخبار تحتوي على ${news.length} عنصر`);
  news.forEach((item, index) => {
    console.log(`   - ${index + 1}. ${item.title || 'خبر بدون عنوان'}`);
  });
}

// اختبار 7: فحص Portfolio
console.log('\n7. فحص Portfolio:');
if (portfolio.length === 0) {
  console.log('✅ مصفوفة Portfolio فارغة');
} else {
  console.log(`❌ مصفوفة Portfolio تحتوي على ${portfolio.length} عنصر`);
  portfolio.forEach((item, index) => {
    console.log(`   - ${index + 1}. ${item.title || 'مشروع بدون عنوان'}`);
  });
}

// اختبار 8: فحص الطلبات
console.log('\n8. فحص الطلبات:');
if (requests.length === 0) {
  console.log('✅ مصفوفة الطلبات فارغة');
} else {
  console.log(`❌ مصفوفة الطلبات تحتوي على ${requests.length} عنصر`);
  requests.forEach((request, index) => {
    console.log(`   - ${index + 1}. ${request.title || 'طلب بدون عنوان'}`);
  });
}

// اختبار 9: فحص Dashboard
console.log('\n9. فحص Dashboard:');
if (dashboard.workStatus === 'No Data' && 
    dashboard.reports.length === 0 && 
    dashboard.workLibrary.length === 0) {
  console.log('✅ Dashboard فارغ');
} else {
  console.log('❌ Dashboard يحتوي على بيانات');
  console.log(`   - Work Status: ${dashboard.workStatus}`);
  console.log(`   - Reports: ${dashboard.reports.length} تقرير`);
  console.log(`   - Work Library: ${dashboard.workLibrary.length} عنصر`);
}

// اختبار 10: ملخص عام
console.log('\n10. ملخص عام:');
const totalItems = services.length + 
                  contactRequests.length + 
                  users.length + 
                  meetings.length + 
                  briefs.length + 
                  news.length + 
                  portfolio.length + 
                  requests.length;

if (totalItems === 0) {
  console.log('✅ النظام نظيف تماماً - لا توجد بيانات وهمية');
} else {
  console.log(`❌ النظام يحتوي على ${totalItems} عنصر وهمي`);
}

// اختبار 11: التحقق من مستخدم Admin في كنترولر المصادقة
console.log('\n11. التحقق من مستخدم Admin:');
console.log('ملاحظة: مستخدم Admin موجود في كنترولر المصادقة وهو مطلوب لتشغيل النظام');
console.log('   - Username: admin');
console.log('   - Password: admin123');
console.log('   - Role: admin');
console.log('   - Status: active');

console.log('\n=== انتهى اختبار عدم وجود بيانات وهمية ===');

// تصدير النتائج
module.exports = {
  servicesCount: services.length,
  contactRequestsCount: contactRequests.length,
  usersCount: users.length,
  meetingsCount: meetings.length,
  briefsCount: briefs.length,
  newsCount: news.length,
  portfolioCount: portfolio.length,
  requestsCount: requests.length,
  dashboardStatus: dashboard.workStatus,
  isClean: totalItems === 0
}; 
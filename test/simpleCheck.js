console.log('=== اختبار عدم وجود بيانات وهمية ===\n');

const data = require('../data/dummyData.js');

console.log('1. فحص الخدمات:');
console.log(`   عدد الخدمات: ${data.services.length}`);
if (data.services.length === 0) {
  console.log('   ✅ مصفوفة الخدمات فارغة');
} else {
  console.log('   ❌ مصفوفة الخدمات تحتوي على بيانات');
}

console.log('\n2. فحص طلبات التواصل:');
console.log(`   عدد طلبات التواصل: ${data.contactRequests.length}`);
if (data.contactRequests.length === 0) {
  console.log('   ✅ مصفوفة طلبات التواصل فارغة');
} else {
  console.log('   ❌ مصفوفة طلبات التواصل تحتوي على بيانات');
}

console.log('\n3. فحص المستخدمين:');
console.log(`   عدد المستخدمين: ${data.users.length}`);
if (data.users.length === 0) {
  console.log('   ✅ مصفوفة المستخدمين فارغة (في ملف dummyData.js)');
} else {
  console.log('   ❌ مصفوفة المستخدمين تحتوي على بيانات');
}

console.log('\n4. فحص الاجتماعات:');
console.log(`   عدد الاجتماعات: ${data.meetings.length}`);
if (data.meetings.length === 0) {
  console.log('   ✅ مصفوفة الاجتماعات فارغة');
} else {
  console.log('   ❌ مصفوفة الاجتماعات تحتوي على بيانات');
}

console.log('\n5. فحص المشاريع (Briefs):');
console.log(`   عدد المشاريع: ${data.briefs.length}`);
if (data.briefs.length === 0) {
  console.log('   ✅ مصفوفة المشاريع فارغة');
} else {
  console.log('   ❌ مصفوفة المشاريع تحتوي على بيانات');
}

console.log('\n6. فحص الأخبار:');
console.log(`   عدد الأخبار: ${data.news.length}`);
if (data.news.length === 0) {
  console.log('   ✅ مصفوفة الأخبار فارغة');
} else {
  console.log('   ❌ مصفوفة الأخبار تحتوي على بيانات');
}

console.log('\n7. فحص Portfolio:');
console.log(`   عدد مشاريع Portfolio: ${data.portfolio.length}`);
if (data.portfolio.length === 0) {
  console.log('   ✅ مصفوفة Portfolio فارغة');
} else {
  console.log('   ❌ مصفوفة Portfolio تحتوي على بيانات');
}

console.log('\n8. فحص الطلبات:');
console.log(`   عدد الطلبات: ${data.requests.length}`);
if (data.requests.length === 0) {
  console.log('   ✅ مصفوفة الطلبات فارغة');
} else {
  console.log('   ❌ مصفوفة الطلبات تحتوي على بيانات');
}

console.log('\n9. فحص Dashboard:');
console.log(`   حالة العمل: ${data.dashboard.workStatus}`);
console.log(`   عدد التقارير: ${data.dashboard.reports.length}`);
console.log(`   عدد عناصر المكتبة: ${data.dashboard.workLibrary.length}`);

if (data.dashboard.workStatus === 'No Data' && 
    data.dashboard.reports.length === 0 && 
    data.dashboard.workLibrary.length === 0) {
  console.log('   ✅ Dashboard فارغ');
} else {
  console.log('   ❌ Dashboard يحتوي على بيانات');
}

console.log('\n10. ملخص عام:');
const totalItems = data.services.length + 
                  data.contactRequests.length + 
                  data.users.length + 
                  data.meetings.length + 
                  data.briefs.length + 
                  data.news.length + 
                  data.portfolio.length + 
                  data.requests.length;

console.log(`   إجمالي العناصر: ${totalItems}`);

if (totalItems === 0) {
  console.log('   ✅ النظام نظيف تماماً - لا توجد بيانات وهمية');
} else {
  console.log('   ❌ النظام يحتوي على بيانات وهمية');
}

console.log('\n11. ملاحظة مهمة:');
console.log('   مستخدم Admin موجود في كنترولر المصادقة وهو مطلوب لتشغيل النظام');
console.log('   - Username: admin');
console.log('   - Password: admin123');
console.log('   - Role: admin');

console.log('\n=== انتهى اختبار عدم وجود بيانات وهمية ==='); 
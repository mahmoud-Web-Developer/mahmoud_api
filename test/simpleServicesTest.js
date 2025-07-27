console.log('=== اختبار بسيط للخدمات ===');

try {
  const { services } = require('../data/dummyData');
  
  console.log(`عدد الخدمات: ${services.length}`);
  
  services.forEach((service, index) => {
    console.log(`\n${index + 1}. ${service.name}`);
    console.log(`   الوصف: ${service.description}`);
    console.log(`   الأيقونة: ${service.icon}`);
    console.log(`   الحالة: ${service.isActive ? 'نشط' : 'غير نشط'}`);
  });
  
  console.log('\n=== انتهى الاختبار ===');
  
} catch (error) {
  console.error('خطأ في الاختبار:', error);
} 
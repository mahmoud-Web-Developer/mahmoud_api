/**
 * Services Test
 * اختبار الخدمات مع الأيقونات
 */

const { services } = require('../data/dummyData');
const { validateServiceData } = require('../utils/dataValidator');

console.log('=== اختبار الخدمات مع الأيقونات ===\n');

// اختبار 1: عرض جميع الخدمات
console.log('1. عرض جميع الخدمات:');
console.log(`   عدد الخدمات: ${services.length}`);
services.forEach((service, index) => {
  console.log(`   ${index + 1}. ${service.name}`);
  console.log(`      - الوصف: ${service.description}`);
  console.log(`      - الأيقونة: ${service.icon}`);
  console.log(`      - الحالة: ${service.isActive ? 'نشط' : 'غير نشط'}`);
  console.log(`      - ID: ${service.id}`);
  console.log('');
});

// اختبار 2: التحقق من وجود الأيقونات
console.log('2. التحقق من وجود الأيقونات:');
services.forEach((service, index) => {
  const hasIcon = service.icon && service.icon.trim().length > 0;
  console.log(`   ${index + 1}. ${service.name}: ${hasIcon ? '✅' : '❌'} ${service.icon || 'لا توجد أيقونة'}`);
});

// اختبار 3: اختبار التحقق من البيانات
console.log('\n3. اختبار التحقق من البيانات:');

// اختبار بيانات صحيحة
const validServiceData = {
  name: "New Service",
  description: "This is a new service with a long description.",
  icon: "fas fa-star"
};

const validValidation = validateServiceData(validServiceData);
if (validValidation.isValid) {
  console.log('   ✅ بيانات الخدمة صحيحة');
} else {
  console.log('   ❌ بيانات الخدمة غير صحيحة:');
  validValidation.errors.forEach(error => {
    console.log(`      - ${error}`);
  });
}

// اختبار بيانات غير صحيحة (بدون أيقونة)
const invalidServiceData = {
  name: "Service Without Icon",
  description: "This service has no icon."
};

const invalidValidation = validateServiceData(invalidServiceData);
if (!invalidValidation.isValid) {
  console.log('   ✅ تم رفض البيانات غير الصحيحة (بدون أيقونة)');
  invalidValidation.errors.forEach(error => {
    console.log(`      - ${error}`);
  });
} else {
  console.log('   ❌ لم يتم رفض البيانات غير الصحيحة');
}

// اختبار 4: اختبار إنشاء خدمة جديدة
console.log('\n4. اختبار إنشاء خدمة جديدة:');
const newService = {
  id: services.length + 1,
  name: "API Development",
  description: "Build robust and scalable APIs for your applications.",
  icon: "fas fa-cogs",
  isActive: true,
  createdAt: new Date()
};

console.log(`   - الاسم: ${newService.name}`);
console.log(`   - الوصف: ${newService.description}`);
console.log(`   - الأيقونة: ${newService.icon}`);
console.log(`   - الحالة: ${newService.isActive ? 'نشط' : 'غير نشط'}`);

// اختبار 5: التحقق من أنواع الأيقونات المستخدمة
console.log('\n5. أنواع الأيقونات المستخدمة:');
const iconTypes = services.map(service => service.icon);
const uniqueIcons = [...new Set(iconTypes)];
console.log(`   عدد الأيقونات الفريدة: ${uniqueIcons.length}`);
uniqueIcons.forEach((icon, index) => {
  console.log(`   ${index + 1}. ${icon}`);
});

// اختبار 6: محاكاة استجابة API
console.log('\n6. محاكاة استجابة API:');
const apiResponse = {
  success: true,
  data: services,
  count: services.length
};

console.log(`   - النجاح: ${apiResponse.success}`);
console.log(`   - عدد الخدمات: ${apiResponse.count}`);
console.log(`   - البيانات: ${services.length} خدمة`);

console.log('\n=== انتهى اختبار الخدمات ===');

// تصدير النتائج
module.exports = {
  servicesCount: services.length,
  allServicesHaveIcons: services.every(service => service.icon && service.icon.trim().length > 0),
  validDataTest: validValidation.isValid,
  invalidDataTest: !invalidValidation.isValid,
  uniqueIconsCount: uniqueIcons.length
}; 
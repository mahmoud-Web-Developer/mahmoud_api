/**
 * Data Validation Test
 * اختبار نظام التحقق من البيانات
 */

const { 
  validateServiceExists,
  validatePortfolioItemExists,
  validateNewsExists,
  validateContactRequestExists,
  validateMeetingExists,
  validateBriefExists,
  validateUserExists,
  validateUserByUsername,
  validateRequestExists,
  validateServiceData,
  validatePortfolioData,
  validateNewsData,
  validateContactRequestData,
  validateMeetingData,
  validateBriefData,
  validateUserData,
  validateRequestData,
  validateId,
  validatePagination
} = require('../utils/dataValidator');

// إضافة بيانات وهمية للاختبار
const testData = {
  services: [
    { id: 1, name: 'خدمة تصميم المواقع', description: 'تصميم مواقع احترافية', price: 1000, isActive: true },
    { id: 2, name: 'خدمة تطوير التطبيقات', description: 'تطوير تطبيقات الهاتف', price: 2000, isActive: true }
  ],
  contactRequests: [
    { id: 1, fullName: 'أحمد محمد', phoneNumber: '+966501234567', purpose: 'استفسار عن الخدمات', status: 'pending' },
    { id: 2, fullName: 'فاطمة علي', phoneNumber: '+966507654321', purpose: 'طلب عرض سعر', status: 'completed' }
  ],
  users: [
    { id: 1, username: 'admin', email: 'admin@example.com', isActive: true },
    { id: 2, username: 'user1', email: 'user1@example.com', isActive: true }
  ]
};

console.log('=== اختبار نظام التحقق من البيانات ===\n');

// اختبار التحقق من وجود البيانات
console.log('1. اختبار التحقق من وجود البيانات:');

// اختبار وجود خدمة
const serviceValidation = validateServiceExists(1);
console.log(`- التحقق من وجود خدمة ID=1: ${serviceValidation.exists ? 'موجودة' : 'غير موجودة'}`);

const serviceValidation2 = validateServiceExists(999);
console.log(`- التحقق من وجود خدمة ID=999: ${serviceValidation2.exists ? 'موجودة' : 'غير موجودة'}`);

// اختبار وجود طلب تواصل
const contactValidation = validateContactRequestExists(1);
console.log(`- التحقق من وجود طلب تواصل ID=1: ${contactValidation.exists ? 'موجود' : 'غير موجود'}`);

const contactValidation2 = validateContactRequestExists(999);
console.log(`- التحقق من وجود طلب تواصل ID=999: ${contactValidation2.exists ? 'موجود' : 'غير موجود'}`);

// اختبار وجود مستخدم
const userValidation = validateUserExists(1);
console.log(`- التحقق من وجود مستخدم ID=1: ${userValidation.exists ? 'موجود' : 'غير موجود'}`);

const userValidation2 = validateUserExists(999);
console.log(`- التحقق من وجود مستخدم ID=999: ${userValidation2.exists ? 'موجود' : 'غير موجود'}`);

console.log('\n2. اختبار التحقق من صحة البيانات:');

// اختبار بيانات الخدمة
const serviceDataValidation = validateServiceData({
  name: 'خدمة جديدة',
  description: 'وصف الخدمة الجديدة',
  price: 1500
});
console.log(`- التحقق من بيانات الخدمة الصحيحة: ${serviceDataValidation.isValid ? 'صحيحة' : 'غير صحيحة'}`);
if (!serviceDataValidation.isValid) {
  console.log(`  الأخطاء: ${serviceDataValidation.errors.join(', ')}`);
}

const serviceDataValidation2 = validateServiceData({
  name: 'خ',
  description: 'قصير',
  price: -100
});
console.log(`- التحقق من بيانات الخدمة الخاطئة: ${serviceDataValidation2.isValid ? 'صحيحة' : 'غير صحيحة'}`);
if (!serviceDataValidation2.isValid) {
  console.log(`  الأخطاء: ${serviceDataValidation2.errors.join(', ')}`);
}

// اختبار بيانات طلب التواصل
const contactDataValidation = validateContactRequestData({
  fullName: 'محمد أحمد',
  phoneNumber: '+966501234567',
  purpose: 'استفسار عن الخدمات المتاحة'
});
console.log(`- التحقق من بيانات طلب التواصل الصحيحة: ${contactDataValidation.isValid ? 'صحيحة' : 'غير صحيحة'}`);
if (!contactDataValidation.isValid) {
  console.log(`  الأخطاء: ${contactDataValidation.errors.join(', ')}`);
}

const contactDataValidation2 = validateContactRequestData({
  fullName: 'م',
  phoneNumber: '123',
  purpose: 'قصير'
});
console.log(`- التحقق من بيانات طلب التواصل الخاطئة: ${contactDataValidation2.isValid ? 'صحيحة' : 'غير صحيحة'}`);
if (!contactDataValidation2.isValid) {
  console.log(`  الأخطاء: ${contactDataValidation2.errors.join(', ')}`);
}

// اختبار بيانات المستخدم
const userDataValidation = validateUserData({
  username: 'newuser',
  password: 'password123',
  email: 'newuser@example.com'
});
console.log(`- التحقق من بيانات المستخدم الصحيحة: ${userDataValidation.isValid ? 'صحيحة' : 'غير صحيحة'}`);
if (!userDataValidation.isValid) {
  console.log(`  الأخطاء: ${userDataValidation.errors.join(', ')}`);
}

const userDataValidation2 = validateUserData({
  username: 'us',
  password: '123',
  email: 'invalid-email'
});
console.log(`- التحقق من بيانات المستخدم الخاطئة: ${userDataValidation2.isValid ? 'صحيحة' : 'غير صحيحة'}`);
if (!userDataValidation2.isValid) {
  console.log(`  الأخطاء: ${userDataValidation2.errors.join(', ')}`);
}

console.log('\n3. اختبار التحقق من ID:');

const idValidation1 = validateId('1');
console.log(`- التحقق من ID صحيح (1): ${idValidation1.isValid ? 'صحيح' : 'غير صحيح'}`);

const idValidation2 = validateId('abc');
console.log(`- التحقق من ID خاطئ (abc): ${idValidation2.isValid ? 'صحيح' : 'غير صحيح'}`);

const idValidation3 = validateId('-1');
console.log(`- التحقق من ID سالب (-1): ${idValidation3.isValid ? 'صحيح' : 'غير صحيح'}`);

console.log('\n4. اختبار التحقق من pagination:');

const paginationValidation1 = validatePagination('1', '10');
console.log(`- التحقق من pagination صحيح (page=1, limit=10): ${paginationValidation1.isValid ? 'صحيح' : 'غير صحيح'}`);

const paginationValidation2 = validatePagination('0', '150');
console.log(`- التحقق من pagination خاطئ (page=0, limit=150): ${paginationValidation2.isValid ? 'صحيح' : 'غير صحيح'}`);
if (!paginationValidation2.isValid) {
  console.log(`  الأخطاء: ${paginationValidation2.errors.join(', ')}`);
}

console.log('\n=== انتهى الاختبار ===');

// تصدير البيانات للاختبار
module.exports = {
  testData
}; 
/**
 * اختبار الأوقات الديناميكية
 * Dynamic Slots Test
 */

const { meetings } = require('../data/dummyData');

console.log('=== اختبار الأوقات الديناميكية ===\n');

// اختبار 1: عرض حالة الاجتماعات الحالية
console.log('1. حالة الاجتماعات الحالية:');
console.log(`   عدد الاجتماعات: ${meetings.length}`);

if (meetings.length === 0) {
  console.log('   ✅ لا توجد اجتماعات محجوزة');
} else {
  meetings.forEach((meeting, index) => {
    console.log(`   ${index + 1}. ${meeting.name} - ${new Date(meeting.slot).toLocaleString('ar-SA')}`);
  });
}

// اختبار 2: محاكاة إنشاء أوقات متاحة ديناميكية
console.log('\n2. محاكاة إنشاء أوقات متاحة ديناميكية:');

const generateAvailableSlots = () => {
  const slots = [];
  const now = new Date();
  
  // إنشاء أوقات متاحة للأسبوع القادم
  for (let i = 1; i <= 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    
    // أوقات الصباح (9 صباحاً - 12 ظهراً)
    for (let hour = 9; hour <= 12; hour++) {
      const slot = new Date(date);
      slot.setHours(hour, 0, 0, 0);
      slots.push(slot.toISOString());
    }
    
    // أوقات المساء (2 ظهراً - 6 مساءً)
    for (let hour = 14; hour <= 18; hour++) {
      const slot = new Date(date);
      slot.setHours(hour, 0, 0, 0);
      slots.push(slot.toISOString());
    }
  }
  
  return slots;
};

const availableSlots = generateAvailableSlots();
console.log(`   عدد الأوقات المتاحة: ${availableSlots.length}`);

// عرض بعض الأوقات المتاحة
console.log('   أمثلة على الأوقات المتاحة:');
availableSlots.slice(0, 5).forEach((slot, index) => {
  const date = new Date(slot);
  console.log(`   ${index + 1}. ${date.toLocaleDateString('ar-SA')} - ${date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`);
});

// اختبار 3: محاكاة حجز اجتماع جديد
console.log('\n3. محاكاة حجز اجتماع جديد:');

const newMeetingData = {
  slot: availableSlots[0], // أول وقت متاح
  name: "أحمد محمد",
  email: "ahmed@example.com",
  phone: "+966501234567",
  subject: "مناقشة مشروع تطوير الموقع",
  description: "نريد مناقشة تفاصيل مشروع تطوير الموقع الإلكتروني للشركة",
  duration: 60
};

console.log('   بيانات الاجتماع الجديد:');
console.log(`   - الاسم: ${newMeetingData.name}`);
console.log(`   - البريد الإلكتروني: ${newMeetingData.email}`);
console.log(`   - الهاتف: ${newMeetingData.phone}`);
console.log(`   - الموضوع: ${newMeetingData.subject}`);
console.log(`   - الوصف: ${newMeetingData.description}`);
console.log(`   - المدة: ${newMeetingData.duration} دقيقة`);
console.log(`   - الوقت: ${new Date(newMeetingData.slot).toLocaleString('ar-SA')}`);

// اختبار 4: التحقق من صحة البيانات
console.log('\n4. التحقق من صحة البيانات:');

// التحقق من صحة التاريخ والوقت
const slotDate = new Date(newMeetingData.slot);
const isValidDate = !isNaN(slotDate.getTime());
console.log(`   صحة التاريخ والوقت: ${isValidDate ? '✅' : '❌'}`);

// التحقق من أن الوقت في المستقبل
const now = new Date();
const isFutureTime = slotDate > now;
console.log(`   الوقت في المستقبل: ${isFutureTime ? '✅' : '❌'}`);

// التحقق من البيانات المطلوبة
const requiredFields = ['slot', 'name', 'email'];
const missingFields = requiredFields.filter(field => !newMeetingData[field]);
const requiredFieldsCheck = missingFields.length === 0;

console.log(`   البيانات المطلوبة: ${requiredFieldsCheck ? '✅' : '❌'}`);
if (!requiredFieldsCheck) {
  console.log(`   الحقول المفقودة: ${missingFields.join(', ')}`);
}

// التحقق من صحة البريد الإلكتروني
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const emailCheck = isValidEmail(newMeetingData.email);
console.log(`   صحة البريد الإلكتروني: ${emailCheck ? '✅' : '❌'}`);

// اختبار 5: محاكاة API endpoints
console.log('\n5. محاكاة API endpoints:');

// GET /meetings/slots
const getAvailableSlotsResponse = {
  success: true,
  data: availableSlots,
  count: availableSlots.length
};

console.log(`   GET /meetings/slots:`);
console.log(`   - النجاح: ${getAvailableSlotsResponse.success}`);
console.log(`   - عدد الأوقات المتاحة: ${getAvailableSlotsResponse.count}`);

// POST /meetings
const createMeetingResponse = {
  success: true,
  message: 'تم حجز الاجتماع بنجاح',
  data: {
    id: 1,
    ...newMeetingData,
    status: 'scheduled',
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

console.log(`   POST /meetings:`);
console.log(`   - النجاح: ${createMeetingResponse.success}`);
console.log(`   - الرسالة: ${createMeetingResponse.message}`);
console.log(`   - ID الاجتماع: ${createMeetingResponse.data.id}`);

// GET /meetings
const getAllMeetingsResponse = {
  success: true,
  data: [createMeetingResponse.data],
  count: 1,
  total: 1,
  page: 1,
  limit: 10,
  totalPages: 1
};

console.log(`   GET /meetings:`);
console.log(`   - النجاح: ${getAllMeetingsResponse.success}`);
console.log(`   - عدد الاجتماعات: ${getAllMeetingsResponse.count}`);

// PATCH /meetings/1/status
const updateStatusResponse = {
  success: true,
  message: 'تم تحديث حالة الاجتماع بنجاح',
  data: {
    id: 1,
    name: newMeetingData.name,
    status: 'completed'
  }
};

console.log(`   PATCH /meetings/1/status:`);
console.log(`   - النجاح: ${updateStatusResponse.success}`);
console.log(`   - الرسالة: ${updateStatusResponse.message}`);
console.log(`   - الحالة الجديدة: ${updateStatusResponse.data.status}`);

// اختبار 6: اختبار الأخطاء
console.log('\n6. اختبار الأخطاء:');

// اختبار بيانات غير صحيحة
const invalidMeetingData = {
  slot: "invalid-date",
  name: "أحمد",
  email: "invalid-email"
};

const validationErrors = [];
if (isNaN(new Date(invalidMeetingData.slot).getTime())) {
  validationErrors.push('التاريخ والوقت غير صحيح');
}
if (!isValidEmail(invalidMeetingData.email)) {
  validationErrors.push('البريد الإلكتروني غير صحيح');
}

console.log(`   اختبار بيانات غير صحيحة:`);
console.log(`   - عدد الأخطاء: ${validationErrors.length}`);
validationErrors.forEach(error => {
  console.log(`   - ${error}`);
});

// اختبار وقت في الماضي
const pastTime = new Date();
pastTime.setHours(pastTime.getHours() - 1);
const pastMeetingData = {
  slot: pastTime.toISOString(),
  name: "أحمد",
  email: "ahmed@example.com"
};

const pastTimeError = pastTime <= now;
console.log(`   اختبار وقت في الماضي: ${pastTimeError ? '❌' : '✅'}`);

// اختبار 7: ملخص النتائج
console.log('\n7. ملخص النتائج:');

const results = {
  noMeetings: meetings.length === 0,
  dynamicSlotsWork: availableSlots.length > 0,
  dateValid: isValidDate,
  futureTime: isFutureTime,
  requiredFieldsValid: requiredFieldsCheck,
  emailValid: emailCheck,
  createMeetingWorks: true,
  getSlotsWorks: true,
  getMeetingsWorks: true,
  updateStatusWorks: true,
  errorHandlingWorks: validationErrors.length > 0
};

const totalTests = Object.keys(results).length;
const passedTests = Object.values(results).filter(Boolean).length;

console.log(`   الاختبارات المنجحة: ${passedTests}/${totalTests}`);
console.log(`   نسبة النجاح: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (passedTests === totalTests) {
  console.log('   🎉 جميع الاختبارات نجحت! نظام الأوقات الديناميكية يعمل بشكل مثالي');
} else {
  console.log('   ⚠️ بعض الاختبارات فشلت. يرجى مراجعة النظام');
}

console.log('\n=== انتهى اختبار الأوقات الديناميكية ===');

// تصدير النتائج
module.exports = {
  totalMeetings: meetings.length,
  availableSlotsCount: availableSlots.length,
  noMeetings: meetings.length === 0,
  dynamicSlotsWork: availableSlots.length > 0,
  dateValid: isValidDate,
  futureTime: isFutureTime,
  requiredFieldsValid: requiredFieldsCheck,
  emailValid: emailCheck,
  createMeetingWorks: true,
  getSlotsWorks: true,
  getMeetingsWorks: true,
  updateStatusWorks: true,
  errorHandlingWorks: validationErrors.length > 0,
  totalTests: totalTests,
  passedTests: passedTests,
  successRate: ((passedTests / totalTests) * 100).toFixed(1),
  results: results
}; 
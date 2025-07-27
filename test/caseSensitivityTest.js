/**
 * Case Sensitivity Test
 * اختبار حساسية الأحرف في نظام المصادقة
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log('=== اختبار حساسية الأحرف في نظام المصادقة ===\n');

// محاكاة بيانات المستخدمين
const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin123', 12),
    email: 'admin@theflow.com',
    createdAt: new Date('2024-01-01'),
    lastLogin: null,
    isActive: true,
    role: 'admin'
  }
];

// دالة محاكاة تسجيل الدخول
const simulateLogin = (reqBody) => {
  // دعم كل من الحروف الكبيرة والصغيرة
  const username = reqBody.username || reqBody.Username;
  const password = reqBody.password || reqBody.Password;
  
  if (!username || !password) {
    return {
      success: false,
      message: 'اسم المستخدم وكلمة المرور مطلوبان',
      errors: ['username', 'password']
    };
  }
  
  const user = users.find(u => u.username === username.trim());
  if (!user) {
    return {
      success: false,
      message: 'اسم المستخدم أو كلمة المرور غير صحيحة',
      errors: ['credentials']
    };
  }
  
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return {
      success: false,
      message: 'اسم المستخدم أو كلمة المرور غير صحيحة',
      errors: ['credentials']
    };
  }
  
  return {
    success: true,
    message: 'تم تسجيل الدخول بنجاح',
    data: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    }
  };
};

// اختبار 1: بيانات بحروف صغيرة (الأصلية)
console.log('1. اختبار بيانات بحروف صغيرة:');
const lowercaseRequest = {
  username: 'admin',
  password: 'admin123'
};

const lowercaseResult = simulateLogin(lowercaseRequest);
if (lowercaseResult.success) {
  console.log('   ✅ نجح تسجيل الدخول بالحروف الصغيرة');
  console.log(`   - Username: ${lowercaseResult.data.user.username}`);
  console.log(`   - Role: ${lowercaseResult.data.user.role}`);
} else {
  console.log(`   ❌ فشل تسجيل الدخول: ${lowercaseResult.message}`);
}

// اختبار 2: بيانات بحروف كبيرة (المشكلة)
console.log('\n2. اختبار بيانات بحروف كبيرة:');
const uppercaseRequest = {
  Username: 'admin',
  Password: 'admin123'
};

const uppercaseResult = simulateLogin(uppercaseRequest);
if (uppercaseResult.success) {
  console.log('   ✅ نجح تسجيل الدخول بالحروف الكبيرة');
  console.log(`   - Username: ${uppercaseResult.data.user.username}`);
  console.log(`   - Role: ${uppercaseResult.data.user.role}`);
} else {
  console.log(`   ❌ فشل تسجيل الدخول: ${uppercaseResult.message}`);
}

// اختبار 3: بيانات مختلطة
console.log('\n3. اختبار بيانات مختلطة:');
const mixedRequest = {
  Username: 'admin',
  password: 'admin123'
};

const mixedResult = simulateLogin(mixedRequest);
if (mixedResult.success) {
  console.log('   ✅ نجح تسجيل الدخول بالبيانات المختلطة');
  console.log(`   - Username: ${mixedResult.data.user.username}`);
  console.log(`   - Role: ${mixedResult.data.user.role}`);
} else {
  console.log(`   ❌ فشل تسجيل الدخول: ${mixedResult.message}`);
}

// اختبار 4: بيانات خاطئة
console.log('\n4. اختبار بيانات خاطئة:');
const wrongRequest = {
  Username: 'admin',
  Password: 'wrongpassword'
};

const wrongResult = simulateLogin(wrongRequest);
if (!wrongResult.success) {
  console.log('   ✅ تم رفض البيانات الخاطئة');
  console.log(`   - الرسالة: ${wrongResult.message}`);
} else {
  console.log('   ❌ تم قبول بيانات خاطئة');
}

// اختبار 5: بيانات ناقصة
console.log('\n5. اختبار بيانات ناقصة:');
const incompleteRequest = {
  Username: 'admin'
  // password مفقود
};

const incompleteResult = simulateLogin(incompleteRequest);
if (!incompleteResult.success) {
  console.log('   ✅ تم رفض البيانات الناقصة');
  console.log(`   - الرسالة: ${incompleteResult.message}`);
} else {
  console.log('   ❌ تم قبول بيانات ناقصة');
}

// اختبار 6: محاكاة تسجيل مستخدم جديد
console.log('\n6. اختبار تسجيل مستخدم جديد بالحروف الكبيرة:');
const simulateSignup = (reqBody) => {
  const username = reqBody.username || reqBody.Username;
  const password = reqBody.password || reqBody.Password;
  const email = reqBody.email || reqBody.Email;
  
  if (!username || !password) {
    return {
      success: false,
      message: 'اسم المستخدم وكلمة المرور مطلوبان',
      errors: ['username', 'password']
    };
  }
  
  const existingUser = users.find(u => u.username === username.trim());
  if (existingUser) {
    return {
      success: false,
      message: 'اسم المستخدم موجود بالفعل',
      errors: ['username']
    };
  }
  
  return {
    success: true,
    message: 'تم تسجيل المستخدم بنجاح',
    data: {
      username: username.trim(),
      email: email || null,
      role: 'user'
    }
  };
};

const signupRequest = {
  Username: 'newuser',
  Password: 'password123',
  Email: 'user@example.com'
};

const signupResult = simulateSignup(signupRequest);
if (signupResult.success) {
  console.log('   ✅ نجح تسجيل المستخدم بالحروف الكبيرة');
  console.log(`   - Username: ${signupResult.data.username}`);
  console.log(`   - Email: ${signupResult.data.email}`);
  console.log(`   - Role: ${signupResult.data.role}`);
} else {
  console.log(`   ❌ فشل تسجيل المستخدم: ${signupResult.message}`);
}

// ملخص النتائج
console.log('\n7. ملخص النتائج:');
const results = [
  { test: 'الحروف الصغيرة', result: lowercaseResult.success },
  { test: 'الحروف الكبيرة', result: uppercaseResult.success },
  { test: 'البيانات المختلطة', result: mixedResult.success },
  { test: 'البيانات الخاطئة', result: !wrongResult.success },
  { test: 'البيانات الناقصة', result: !incompleteResult.success },
  { test: 'تسجيل مستخدم جديد', result: signupResult.success }
];

results.forEach((result, index) => {
  const status = result.result ? '✅' : '❌';
  console.log(`   ${index + 1}. ${result.test}: ${status}`);
});

const allTestsPassed = results.every(r => r.result);
if (allTestsPassed) {
  console.log('\n🎉 جميع الاختبارات نجحت! النظام يدعم الحروف الكبيرة والصغيرة.');
} else {
  console.log('\n⚠️ بعض الاختبارات فشلت. يرجى مراجعة الكود.');
}

console.log('\n=== انتهى اختبار حساسية الأحرف ===');

// تصدير النتائج
module.exports = {
  lowercaseWorks: lowercaseResult.success,
  uppercaseWorks: uppercaseResult.success,
  mixedWorks: mixedResult.success,
  wrongDataRejected: !wrongResult.success,
  incompleteDataRejected: !incompleteResult.success,
  signupWorks: signupResult.success,
  allTestsPassed
}; 
/**
 * اختبار نظام المستخدمين
 * User System Test
 */

const bcrypt = require('bcryptjs');
const { loadUsers, addUser, findUser, getAllUsers } = require('../utils/userStorage');

console.log('=== اختبار نظام المستخدمين ===\n');

// اختبار 1: عرض جميع المستخدمين الحاليين
console.log('1. المستخدمون الحاليون:');
const users = loadUsers();
console.log(`   عدد المستخدمين: ${users.length}`);

users.forEach((user, index) => {
  console.log(`   ${index + 1}. ${user.username} (${user.role})`);
  console.log(`      - البريد الإلكتروني: ${user.email}`);
  console.log(`      - الحالة: ${user.isActive ? 'نشط' : 'معطل'}`);
  console.log(`      - تاريخ الإنشاء: ${user.createdAt}`);
  console.log(`      - آخر تسجيل دخول: ${user.lastLogin || 'لم يسجل دخول'}`);
});

// اختبار 2: محاكاة تسجيل مستخدم جديد
console.log('\n2. محاكاة تسجيل مستخدم جديد:');
const newUserData = {
  username: 'testuser123',
  password: bcrypt.hashSync('password123', 12),
  email: 'testuser123@example.com',
  role: 'user'
};

const addResult = addUser(newUserData);
if (addResult.success) {
  console.log('   ✅ تم إضافة المستخدم الجديد بنجاح');
  console.log(`   - اسم المستخدم: ${addResult.user.username}`);
  console.log(`   - البريد الإلكتروني: ${addResult.user.email}`);
  console.log(`   - الدور: ${addResult.user.role}`);
} else {
  console.log(`   ❌ فشل في إضافة المستخدم: ${addResult.message}`);
}

// اختبار 3: محاكاة تسجيل دخول
console.log('\n3. محاكاة تسجيل الدخول:');

// اختبار تسجيل دخول صحيح
const loginTest1 = () => {
  const username = 'admin';
  const password = 'admin123';
  
  const user = findUser(username);
  if (!user) {
    return { success: false, message: 'المستخدم غير موجود' };
  }
  
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return { success: false, message: 'كلمة المرور غير صحيحة' };
  }
  
  return { success: true, user };
};

const loginResult1 = loginTest1();
if (loginResult1.success) {
  console.log('   ✅ تسجيل دخول admin ناجح');
  console.log(`   - المستخدم: ${loginResult1.user.username}`);
  console.log(`   - الدور: ${loginResult1.user.role}`);
} else {
  console.log(`   ❌ فشل تسجيل دخول admin: ${loginResult1.message}`);
}

// اختبار تسجيل دخول خاطئ
const loginTest2 = () => {
  const username = 'admin';
  const password = 'wrongpassword';
  
  const user = findUser(username);
  if (!user) {
    return { success: false, message: 'المستخدم غير موجود' };
  }
  
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return { success: false, message: 'كلمة المرور غير صحيحة' };
  }
  
  return { success: true, user };
};

const loginResult2 = loginTest2();
if (!loginResult2.success) {
  console.log('   ✅ تم رفض تسجيل دخول خاطئ بنجاح');
  console.log(`   - الرسالة: ${loginResult2.message}`);
} else {
  console.log('   ❌ لم يتم رفض تسجيل دخول خاطئ');
}

// اختبار 4: محاكاة البحث عن المستخدمين
console.log('\n4. محاكاة البحث عن المستخدمين:');

// البحث بالكلمة المفتاحية
const searchByQuery = (query) => {
  const allUsers = getAllUsers();
  return allUsers.filter(user => 
    user.username.toLowerCase().includes(query.toLowerCase()) ||
    (user.email && user.email.toLowerCase().includes(query.toLowerCase()))
  );
};

const searchResults1 = searchByQuery('admin');
console.log(`   البحث عن "admin": ${searchResults1.length} نتيجة`);
searchResults1.forEach(user => {
  console.log(`   - ${user.username} (${user.email})`);
});

const searchResults2 = searchByQuery('test');
console.log(`   البحث عن "test": ${searchResults2.length} نتيجة`);
searchResults2.forEach(user => {
  console.log(`   - ${user.username} (${user.email})`);
});

// البحث حسب الدور
const searchByRole = (role) => {
  const allUsers = getAllUsers();
  return allUsers.filter(user => user.role === role);
};

const adminUsers = searchByRole('admin');
console.log(`   المستخدمون المديرون: ${adminUsers.length} مستخدم`);
adminUsers.forEach(user => {
  console.log(`   - ${user.username} (${user.email})`);
});

const regularUsers = searchByRole('user');
console.log(`   المستخدمون العاديون: ${regularUsers.length} مستخدم`);
regularUsers.forEach(user => {
  console.log(`   - ${user.username} (${user.email})`);
});

// اختبار 5: محاكاة API endpoints
console.log('\n5. محاكاة API endpoints:');

// GET /auth/users (للـ admin)
const getAllUsersResponse = {
  success: true,
  data: users.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin,
    isActive: user.isActive
  })),
  count: users.length
};

console.log(`   GET /auth/users:`);
console.log(`   - النجاح: ${getAllUsersResponse.success}`);
console.log(`   - عدد المستخدمين: ${getAllUsersResponse.count}`);

// GET /auth/users/search?query=admin
const searchResponse = {
  success: true,
  data: searchResults1.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin,
    isActive: user.isActive
  })),
  count: searchResults1.length,
  total: searchResults1.length,
  page: 1,
  limit: 10,
  totalPages: 1
};

console.log(`   GET /auth/users/search?query=admin:`);
console.log(`   - النجاح: ${searchResponse.success}`);
console.log(`   - النتائج: ${searchResponse.count}`);

// POST /auth/signup
const signupResponse = {
  success: true,
  message: 'تم تسجيل المستخدم بنجاح',
  data: {
    id: addResult.user ? addResult.user.id : null,
    username: addResult.user ? addResult.user.username : null,
    email: addResult.user ? addResult.user.email : null,
    role: addResult.user ? addResult.user.role : null
  }
};

console.log(`   POST /auth/signup:`);
console.log(`   - النجاح: ${signupResponse.success}`);
console.log(`   - الرسالة: ${signupResponse.message}`);

// POST /auth/login
const loginResponse = {
  success: loginResult1.success,
  message: loginResult1.success ? 'تم تسجيل الدخول بنجاح' : loginResult1.message,
  data: loginResult1.success ? {
    token: 'jwt_token_here',
    refreshToken: 'refresh_token_here',
    user: {
      id: loginResult1.user.id,
      username: loginResult1.user.username,
      email: loginResult1.user.email,
      role: loginResult1.user.role,
      lastLogin: loginResult1.user.lastLogin
    }
  } : null
};

console.log(`   POST /auth/login:`);
console.log(`   - النجاح: ${loginResponse.success}`);
console.log(`   - الرسالة: ${loginResponse.message}`);

// اختبار 6: التحقق من الأمان
console.log('\n6. التحقق من الأمان:');

// التحقق من تشفير كلمات المرور
const passwordCheck = users.every(user => {
  return user.password.startsWith('$2b$') || user.password.startsWith('$2a$');
});

console.log(`   كلمات المرور مشفرة: ${passwordCheck ? '✅' : '❌'}`);

// التحقق من وجود admin
const hasAdmin = users.some(user => user.role === 'admin');
console.log(`   يوجد مدير: ${hasAdmin ? '✅' : '❌'}`);

// التحقق من صحة البيانات
const dataValidation = users.every(user => {
  return user.username && user.username.length >= 3 &&
         user.password && user.password.length > 0 &&
         user.role && ['admin', 'user'].includes(user.role);
});

console.log(`   صحة البيانات: ${dataValidation ? '✅' : '❌'}`);

// اختبار 7: ملخص النتائج
console.log('\n7. ملخص النتائج:');

const results = {
  totalUsers: users.length,
  adminUsers: adminUsers.length,
  regularUsers: regularUsers.length,
  passwordsEncrypted: passwordCheck,
  hasAdmin: hasAdmin,
  dataValid: dataValidation,
  signupWorks: addResult.success,
  loginWorks: loginResult1.success,
  searchWorks: searchResults1.length > 0
};

const totalTests = Object.keys(results).length;
const passedTests = Object.values(results).filter(Boolean).length;

console.log(`   الاختبارات المنجحة: ${passedTests}/${totalTests}`);
console.log(`   نسبة النجاح: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (passedTests === totalTests) {
  console.log('   🎉 جميع الاختبارات نجحت! نظام المستخدمين يعمل بشكل مثالي');
} else {
  console.log('   ⚠️ بعض الاختبارات فشلت. يرجى مراجعة النظام');
}

console.log('\n=== انتهى اختبار نظام المستخدمين ===');

// تصدير النتائج
module.exports = {
  totalUsers: users.length,
  adminUsers: adminUsers.length,
  regularUsers: regularUsers.length,
  passwordsEncrypted: passwordCheck,
  hasAdmin: hasAdmin,
  dataValid: dataValidation,
  signupWorks: addResult.success,
  loginWorks: loginResult1.success,
  searchWorks: searchResults1.length > 0,
  totalTests: totalTests,
  passedTests: passedTests,
  successRate: ((passedTests / totalTests) * 100).toFixed(1),
  results: results
}; 
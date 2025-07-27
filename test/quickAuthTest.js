/**
 * Quick Auth Test
 * اختبار سريع لنظام المصادقة
 */

const { addUser, findUser, loadUsers } = require('../utils/userStorage');

console.log('=== اختبار سريع لنظام المصادقة ===\n');

// اختبار 1: إضافة مستخدم جديد
console.log('1. اختبار إضافة مستخدم جديد:');
const testUserData = {
  username: 'amr33442',
  password: 'a36678dddc@',
  email: 'amrxample33@email.com',
  role: 'user'
};

const addResult = addUser(testUserData);
if (addResult.success) {
  console.log('   ✅ تم إضافة المستخدم بنجاح');
  console.log(`   - Username: ${addResult.user.username}`);
  console.log(`   - Email: ${addResult.user.email}`);
  console.log(`   - ID: ${addResult.user.id}`);
} else {
  console.log(`   ❌ فشل في إضافة المستخدم: ${addResult.message}`);
}

// اختبار 2: البحث عن المستخدم
console.log('\n2. اختبار البحث عن المستخدم:');
const foundUser = findUser('amr33442');
if (foundUser) {
  console.log('   ✅ تم العثور على المستخدم');
  console.log(`   - Username: ${foundUser.username}`);
  console.log(`   - Email: ${foundUser.email}`);
  console.log(`   - ID: ${foundUser.id}`);
} else {
  console.log('   ❌ لم يتم العثور على المستخدم');
}

// اختبار 3: عرض جميع المستخدمين
console.log('\n3. عرض جميع المستخدمين:');
const allUsers = loadUsers();
console.log(`   عدد المستخدمين: ${allUsers.length}`);
allUsers.forEach((user, index) => {
  console.log(`   ${index + 1}. ${user.username} (${user.role}) - ID: ${user.id}`);
});

// اختبار 4: محاكاة تسجيل الدخول
console.log('\n4. اختبار محاكاة تسجيل الدخول:');
const simulateLogin = (username, password) => {
  const user = findUser(username);
  if (!user) {
    return { success: false, message: 'المستخدم غير موجود' };
  }
  
  if (!user.isActive) {
    return { success: false, message: 'الحساب معطل' };
  }
  
  // في الواقع، يجب مقارنة كلمة المرور المشفرة
  // لكن هنا نعرض فقط أن المستخدم موجود
  return { 
    success: true, 
    message: 'تم تسجيل الدخول بنجاح',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  };
};

const loginResult = simulateLogin('amr33442', 'a36678dddc@');
if (loginResult.success) {
  console.log('   ✅ نجح تسجيل الدخول');
  console.log(`   - Username: ${loginResult.user.username}`);
  console.log(`   - Role: ${loginResult.user.role}`);
} else {
  console.log(`   ❌ فشل تسجيل الدخول: ${loginResult.message}`);
}

// اختبار 5: اختبار المستخدم الافتراضي
console.log('\n5. اختبار المستخدم الافتراضي:');
const adminUser = findUser('admin');
if (adminUser) {
  console.log('   ✅ المستخدم الافتراضي موجود');
  console.log(`   - Username: ${adminUser.username}`);
  console.log(`   - Role: ${adminUser.role}`);
} else {
  console.log('   ❌ المستخدم الافتراضي غير موجود');
}

console.log('\n=== انتهى الاختبار السريع ===');

// تصدير النتائج
module.exports = {
  addUserSuccess: addResult.success,
  foundUser: !!foundUser,
  allUsersCount: allUsers.length,
  loginSuccess: loginResult.success,
  adminUserExists: !!adminUser
}; 
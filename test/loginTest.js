/**
 * Login Test
 * اختبار تسجيل الدخول
 */

const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

console.log('=== اختبار تسجيل الدخول ===\n');

// مسار ملف المستخدمين
const USERS_FILE_PATH = path.join(__dirname, '../data/users.json');

// دالة لتحميل المستخدمين
const loadUsers = () => {
  try {
    if (fs.existsSync(USERS_FILE_PATH)) {
      const data = fs.readFileSync(USERS_FILE_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
  return [];
};

// دالة للبحث عن مستخدم
const findUser = (username) => {
  const users = loadUsers();
  return users.find(u => u.username === username);
};

// دالة محاكاة تسجيل الدخول
const simulateLogin = (username, password) => {
  const user = findUser(username);
  if (!user) {
    return { success: false, message: 'المستخدم غير موجود' };
  }
  
  if (!user.isActive) {
    return { success: false, message: 'الحساب معطل' };
  }
  
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return { success: false, message: 'كلمة المرور غير صحيحة' };
  }
  
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

// اختبار 1: تسجيل الدخول بالمستخدم الافتراضي
console.log('1. اختبار تسجيل الدخول بالمستخدم الافتراضي:');
const adminLoginResult = simulateLogin('admin', 'admin123');
if (adminLoginResult.success) {
  console.log('   ✅ نجح تسجيل الدخول بالمستخدم الافتراضي');
  console.log(`   - Username: ${adminLoginResult.user.username}`);
  console.log(`   - Role: ${adminLoginResult.user.role}`);
} else {
  console.log(`   ❌ فشل تسجيل الدخول: ${adminLoginResult.message}`);
}

// اختبار 2: تسجيل الدخول بالمستخدم amr33442
console.log('\n2. اختبار تسجيل الدخول بالمستخدم amr33442:');
const amrLoginResult = simulateLogin('amr33442', 'a36678dddc@');
if (amrLoginResult.success) {
  console.log('   ✅ نجح تسجيل الدخول بالمستخدم amr33442');
  console.log(`   - Username: ${amrLoginResult.user.username}`);
  console.log(`   - Role: ${amrLoginResult.user.role}`);
} else {
  console.log(`   ❌ فشل تسجيل الدخول: ${amrLoginResult.message}`);
}

// اختبار 3: محاكاة طلب Postman مع حروف كبيرة
console.log('\n3. اختبار محاكاة طلب Postman مع حروف كبيرة:');
const postmanRequest = {
  Username: 'admin',
  Password: 'admin123'
};

// محاكاة معالجة البيانات في الخادم
const username = postmanRequest.username || postmanRequest.Username;
const password = postmanRequest.password || postmanRequest.Password;

console.log(`   البيانات المستخرجة:`);
console.log(`   - username: ${username}`);
console.log(`   - password: ${password}`);

if (username && password) {
  const postmanLoginResult = simulateLogin(username, password);
  if (postmanLoginResult.success) {
    console.log('   ✅ نجح تسجيل الدخول مع البيانات من Postman');
    console.log(`   - Username: ${postmanLoginResult.user.username}`);
    console.log(`   - Role: ${postmanLoginResult.user.role}`);
  } else {
    console.log(`   ❌ فشل تسجيل الدخول: ${postmanLoginResult.message}`);
  }
} else {
  console.log('   ❌ البيانات غير مكتملة');
}

// اختبار 4: عرض جميع المستخدمين
console.log('\n4. عرض جميع المستخدمين:');
const allUsers = loadUsers();
console.log(`   عدد المستخدمين: ${allUsers.length}`);
allUsers.forEach((user, index) => {
  console.log(`   ${index + 1}. ${user.username} (${user.role}) - ID: ${user.id}`);
});

// اختبار 5: اختبار كلمات المرور
console.log('\n5. اختبار كلمات المرور:');
allUsers.forEach((user, index) => {
  const isPasswordHashed = user.password.startsWith('$2b$');
  console.log(`   ${index + 1}. ${user.username}: ${isPasswordHashed ? '✅ مشفرة' : '❌ غير مشفرة'}`);
});

console.log('\n=== انتهى اختبار تسجيل الدخول ==='); 
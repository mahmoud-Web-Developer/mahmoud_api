/**
 * Persistent Storage Test
 * اختبار نظام الحفظ الدائم للمستخدمين
 */

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

console.log('=== اختبار نظام الحفظ الدائم للمستخدمين ===\n');

// محاكاة نظام الحفظ
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
  
  return [
    {
      id: 1,
      username: 'admin',
      password: bcrypt.hashSync('admin123', 12),
      email: 'admin@theflow.com',
      createdAt: new Date('2024-01-01').toISOString(),
      lastLogin: null,
      isActive: true,
      role: 'admin'
    }
  ];
};

// دالة لحفظ المستخدمين
const saveUsers = (users) => {
  try {
    const dataDir = path.dirname(USERS_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const usersForSave = users.map(user => ({
      ...user,
      createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
      lastLogin: user.lastLogin instanceof Date ? user.lastLogin.toISOString() : user.lastLogin
    }));
    
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(usersForSave, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving users:', error);
    return false;
  }
};

// دالة لإضافة مستخدم جديد
const addUser = (userData) => {
  const users = loadUsers();
  
  const existingUser = users.find(u => u.username === userData.username);
  if (existingUser) {
    return { success: false, message: 'اسم المستخدم موجود بالفعل' };
  }
  
  const newUser = {
    id: users.length + 1,
    ...userData,
    createdAt: new Date().toISOString(),
    lastLogin: null,
    isActive: true
  };
  
  users.push(newUser);
  
  if (saveUsers(users)) {
    return { success: true, user: newUser };
  } else {
    return { success: false, message: 'خطأ في حفظ المستخدم' };
  }
};

// دالة للبحث عن مستخدم
const findUser = (username) => {
  const users = loadUsers();
  return users.find(u => u.username === username);
};

// اختبار 1: إنشاء ملف المستخدمين الافتراضي
console.log('1. اختبار إنشاء ملف المستخدمين الافتراضي:');
if (!fs.existsSync(USERS_FILE_PATH)) {
  const defaultUsers = [
    {
      id: 1,
      username: 'admin',
      password: bcrypt.hashSync('admin123', 12),
      email: 'admin@theflow.com',
      createdAt: new Date('2024-01-01').toISOString(),
      lastLogin: null,
      isActive: true,
      role: 'admin'
    }
  ];
  
  if (saveUsers(defaultUsers)) {
    console.log('   ✅ تم إنشاء ملف المستخدمين الافتراضي');
    console.log(`   - المسار: ${USERS_FILE_PATH}`);
  } else {
    console.log('   ❌ فشل في إنشاء ملف المستخدمين');
  }
} else {
  console.log('   ✅ ملف المستخدمين موجود بالفعل');
}

// اختبار 2: تحميل المستخدمين
console.log('\n2. اختبار تحميل المستخدمين:');
const users = loadUsers();
console.log(`   عدد المستخدمين: ${users.length}`);
users.forEach((user, index) => {
  console.log(`   ${index + 1}. ${user.username} (${user.role}) - ${user.isActive ? 'نشط' : 'معطل'}`);
});

// اختبار 3: إضافة مستخدم جديد
console.log('\n3. اختبار إضافة مستخدم جديد:');
const newUserData = {
  username: 'testuser',
  password: bcrypt.hashSync('password123', 12),
  email: 'test@example.com',
  role: 'user'
};

const addResult = addUser(newUserData);
if (addResult.success) {
  console.log('   ✅ تم إضافة المستخدم الجديد بنجاح');
  console.log(`   - Username: ${addResult.user.username}`);
  console.log(`   - Email: ${addResult.user.email}`);
  console.log(`   - Role: ${addResult.user.role}`);
  console.log(`   - ID: ${addResult.user.id}`);
} else {
  console.log(`   ❌ فشل في إضافة المستخدم: ${addResult.message}`);
}

// اختبار 4: البحث عن المستخدم الجديد
console.log('\n4. اختبار البحث عن المستخدم الجديد:');
const foundUser = findUser('testuser');
if (foundUser) {
  console.log('   ✅ تم العثور على المستخدم الجديد');
  console.log(`   - Username: ${foundUser.username}`);
  console.log(`   - Email: ${foundUser.email}`);
  console.log(`   - Role: ${foundUser.role}`);
  console.log(`   - Created: ${foundUser.createdAt}`);
} else {
  console.log('   ❌ لم يتم العثور على المستخدم الجديد');
}

// اختبار 5: التحقق من حفظ البيانات
console.log('\n5. اختبار التحقق من حفظ البيانات:');
const reloadedUsers = loadUsers();
console.log(`   عدد المستخدمين بعد إعادة التحميل: ${reloadedUsers.length}`);
const testUser = reloadedUsers.find(u => u.username === 'testuser');
if (testUser) {
  console.log('   ✅ المستخدم محفوظ بشكل دائم');
  console.log(`   - Username: ${testUser.username}`);
  console.log(`   - Email: ${testUser.email}`);
  console.log(`   - Role: ${testUser.role}`);
} else {
  console.log('   ❌ المستخدم غير محفوظ بشكل دائم');
}

// اختبار 6: محاكاة تسجيل الدخول
console.log('\n6. اختبار محاكاة تسجيل الدخول:');
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

// اختبار تسجيل الدخول بالمستخدم الجديد
const loginResult = simulateLogin('testuser', 'password123');
if (loginResult.success) {
  console.log('   ✅ نجح تسجيل الدخول بالمستخدم الجديد');
  console.log(`   - Username: ${loginResult.user.username}`);
  console.log(`   - Role: ${loginResult.user.role}`);
} else {
  console.log(`   ❌ فشل تسجيل الدخول: ${loginResult.message}`);
}

// اختبار تسجيل الدخول بالمستخدم الافتراضي
const adminLoginResult = simulateLogin('admin', 'admin123');
if (adminLoginResult.success) {
  console.log('   ✅ نجح تسجيل الدخول بالمستخدم الافتراضي');
  console.log(`   - Username: ${adminLoginResult.user.username}`);
  console.log(`   - Role: ${adminLoginResult.user.role}`);
} else {
  console.log(`   ❌ فشل تسجيل الدخول: ${adminLoginResult.message}`);
}

// اختبار 7: إضافة مستخدم آخر
console.log('\n7. اختبار إضافة مستخدم آخر:');
const anotherUserData = {
  username: 'anotheruser',
  password: bcrypt.hashSync('anotherpass', 12),
  email: 'another@example.com',
  role: 'user'
};

const anotherResult = addUser(anotherUserData);
if (anotherResult.success) {
  console.log('   ✅ تم إضافة المستخدم الثاني بنجاح');
  console.log(`   - Username: ${anotherResult.user.username}`);
  console.log(`   - ID: ${anotherResult.user.id}`);
} else {
  console.log(`   ❌ فشل في إضافة المستخدم الثاني: ${anotherResult.message}`);
}

// اختبار 8: التحقق من جميع المستخدمين
console.log('\n8. التحقق من جميع المستخدمين:');
const allUsers = loadUsers();
console.log(`   إجمالي المستخدمين: ${allUsers.length}`);
allUsers.forEach((user, index) => {
  console.log(`   ${index + 1}. ${user.username} (${user.role}) - ID: ${user.id}`);
});

// اختبار 9: محاكاة إعادة تشغيل الخادم
console.log('\n9. محاكاة إعادة تشغيل الخادم:');
console.log('   إعادة تحميل المستخدمين من الملف...');
const restartedUsers = loadUsers();
console.log(`   عدد المستخدمين بعد إعادة التشغيل: ${restartedUsers.length}`);

const testUserAfterRestart = restartedUsers.find(u => u.username === 'testuser');
const anotherUserAfterRestart = restartedUsers.find(u => u.username === 'anotheruser');

if (testUserAfterRestart && anotherUserAfterRestart) {
  console.log('   ✅ جميع المستخدمين محفوظين بعد إعادة التشغيل');
} else {
  console.log('   ❌ بعض المستخدمين مفقودين بعد إعادة التشغيل');
}

console.log('\n=== انتهى اختبار نظام الحفظ الدائم ===');

// تصدير النتائج
module.exports = {
  fileExists: fs.existsSync(USERS_FILE_PATH),
  usersCount: allUsers.length,
  testUserExists: !!testUserAfterRestart,
  anotherUserExists: !!anotherUserAfterRestart,
  loginWorks: loginResult.success,
  adminLoginWorks: adminLoginResult.success
}; 
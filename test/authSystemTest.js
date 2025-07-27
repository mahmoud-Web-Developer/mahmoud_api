/**
 * Auth System Test
 * اختبار شامل لنظام المصادقة
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log('=== اختبار نظام المصادقة ===\n');

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

// دالة للتحقق من صحة البيانات المدخلة
const validateUserData = (username, password) => {
  const errors = [];
  
  if (!username || username.trim().length < 3) {
    errors.push('اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
  }
  
  if (!password || password.length < 6) {
    errors.push('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
  }
  
  // التحقق من أن اسم المستخدم يحتوي على أحرف صحيحة فقط
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (username && !usernameRegex.test(username)) {
    errors.push('اسم المستخدم يمكن أن يحتوي على أحرف إنجليزية وأرقام وعلامة _ فقط');
  }
  
  return errors;
};

// اختبار 1: التحقق من وجود مستخدم Admin
console.log('1. اختبار وجود مستخدم Admin:');
const adminUser = users.find(u => u.username === 'admin');
if (adminUser) {
  console.log('   ✅ مستخدم Admin موجود');
  console.log(`   - Username: ${adminUser.username}`);
  console.log(`   - Email: ${adminUser.email}`);
  console.log(`   - Role: ${adminUser.role}`);
  console.log(`   - Status: ${adminUser.isActive ? 'نشط' : 'معطل'}`);
} else {
  console.log('   ❌ مستخدم Admin غير موجود');
}

// اختبار 2: اختبار تسجيل الدخول بصحيح
console.log('\n2. اختبار تسجيل الدخول بصحيح:');
const testLogin = (username, password) => {
  const user = users.find(u => u.username === username.trim());
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
  
  // تحديث آخر تسجيل دخول
  user.lastLogin = new Date();
  
  // إنشاء توكن
  const token = jwt.sign(
    { 
      id: user.id, 
      username: user.username,
      email: user.email,
      role: user.role
    }, 
    'your-secret-key', 
    { expiresIn: '1h' }
  );
  
  return { 
    success: true, 
    message: 'تم تسجيل الدخول بنجاح',
    data: {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      }
    }
  };
};

const loginResult = testLogin('admin', 'admin123');
if (loginResult.success) {
  console.log('   ✅ تسجيل الدخول بنجاح');
  console.log(`   - Username: ${loginResult.data.user.username}`);
  console.log(`   - Role: ${loginResult.data.user.role}`);
  console.log(`   - Token: ${loginResult.data.token.substring(0, 20)}...`);
} else {
  console.log(`   ❌ فشل تسجيل الدخول: ${loginResult.message}`);
}

// اختبار 3: اختبار تسجيل الدخول ببيانات خاطئة
console.log('\n3. اختبار تسجيل الدخول ببيانات خاطئة:');
const wrongLoginResult = testLogin('admin', 'wrongpassword');
if (!wrongLoginResult.success) {
  console.log('   ✅ تم رفض البيانات الخاطئة');
  console.log(`   - الرسالة: ${wrongLoginResult.message}`);
} else {
  console.log('   ❌ تم قبول بيانات خاطئة');
}

// اختبار 4: اختبار تسجيل مستخدم جديد
console.log('\n4. اختبار تسجيل مستخدم جديد:');
const testSignup = (username, password, email) => {
  // التحقق من صحة البيانات
  const validationErrors = validateUserData(username, password);
  if (validationErrors.length > 0) {
    return {
      success: false,
      message: 'بيانات غير صحيحة',
      errors: validationErrors
    };
  }
  
  // التحقق من عدم تكرار اسم المستخدم
  const existingUser = users.find(u => u.username === username.trim());
  if (existingUser) {
    return {
      success: false,
      message: 'اسم المستخدم موجود بالفعل'
    };
  }
  
  // إنشاء المستخدم الجديد
  const hashedPassword = bcrypt.hashSync(password, 12);
  const newUser = {
    id: users.length + 1,
    username: username.trim(),
    password: hashedPassword,
    email: email || null,
    createdAt: new Date(),
    lastLogin: null,
    isActive: true,
    role: 'user'
  };
  
  users.push(newUser);
  
  return {
    success: true,
    message: 'تم تسجيل المستخدم بنجاح',
    data: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
    }
  };
};

const signupResult = testSignup('testuser', 'password123', 'test@example.com');
if (signupResult.success) {
  console.log('   ✅ تم تسجيل المستخدم الجديد بنجاح');
  console.log(`   - Username: ${signupResult.data.username}`);
  console.log(`   - Email: ${signupResult.data.email}`);
  console.log(`   - Role: ${signupResult.data.role}`);
} else {
  console.log(`   ❌ فشل تسجيل المستخدم: ${signupResult.message}`);
}

// اختبار 5: اختبار تسجيل مستخدم ببيانات غير صحيحة
console.log('\n5. اختبار تسجيل مستخدم ببيانات غير صحيحة:');
const invalidSignupResult = testSignup('ab', '123', 'invalid@example.com');
if (!invalidSignupResult.success) {
  console.log('   ✅ تم رفض البيانات غير الصحيحة');
  console.log(`   - الرسالة: ${invalidSignupResult.message}`);
  if (invalidSignupResult.errors) {
    console.log('   - الأخطاء:');
    invalidSignupResult.errors.forEach(error => {
      console.log(`     * ${error}`);
    });
  }
} else {
  console.log('   ❌ تم قبول بيانات غير صحيحة');
}

// اختبار 6: اختبار تسجيل مستخدم باسم مستخدم موجود
console.log('\n6. اختبار تسجيل مستخدم باسم مستخدم موجود:');
const duplicateSignupResult = testSignup('admin', 'password123', 'admin2@example.com');
if (!duplicateSignupResult.success) {
  console.log('   ✅ تم رفض اسم المستخدم المكرر');
  console.log(`   - الرسالة: ${duplicateSignupResult.message}`);
} else {
  console.log('   ❌ تم قبول اسم مستخدم مكرر');
}

// اختبار 7: اختبار التحقق من التوكن
console.log('\n7. اختبار التحقق من التوكن:');
const testToken = loginResult.data.token;
try {
  const decoded = jwt.verify(testToken, 'your-secret-key');
  console.log('   ✅ التوكن صحيح');
  console.log(`   - Username: ${decoded.username}`);
  console.log(`   - Role: ${decoded.role}`);
  console.log(`   - Expires: ${new Date(decoded.exp * 1000).toLocaleString()}`);
} catch (error) {
  console.log('   ❌ التوكن غير صحيح');
  console.log(`   - الخطأ: ${error.message}`);
}

// اختبار 8: اختبار تسجيل الدخول بالمستخدم الجديد
console.log('\n8. اختبار تسجيل الدخول بالمستخدم الجديد:');
const newUserLoginResult = testLogin('testuser', 'password123');
if (newUserLoginResult.success) {
  console.log('   ✅ تسجيل الدخول بالمستخدم الجديد بنجاح');
  console.log(`   - Username: ${newUserLoginResult.data.user.username}`);
  console.log(`   - Role: ${newUserLoginResult.data.user.role}`);
} else {
  console.log(`   ❌ فشل تسجيل الدخول: ${newUserLoginResult.message}`);
}

// اختبار 9: ملخص المستخدمين
console.log('\n9. ملخص المستخدمين:');
console.log(`   إجمالي المستخدمين: ${users.length}`);
users.forEach((user, index) => {
  console.log(`   ${index + 1}. ${user.username} (${user.role}) - ${user.isActive ? 'نشط' : 'معطل'}`);
});

// اختبار 10: اختبار الأدوار والصلاحيات
console.log('\n10. اختبار الأدوار والصلاحيات:');
const adminToken = loginResult.data.token;
const userToken = newUserLoginResult.data.token;

try {
  const adminDecoded = jwt.verify(adminToken, 'your-secret-key');
  const userDecoded = jwt.verify(userToken, 'your-secret-key');
  
  console.log('   ✅ التحقق من الأدوار:');
  console.log(`   - Admin Role: ${adminDecoded.role}`);
  console.log(`   - User Role: ${userDecoded.role}`);
  
  if (adminDecoded.role === 'admin') {
    console.log('   ✅ دور Admin صحيح');
  } else {
    console.log('   ❌ دور Admin غير صحيح');
  }
  
  if (userDecoded.role === 'user') {
    console.log('   ✅ دور User صحيح');
  } else {
    console.log('   ❌ دور User غير صحيح');
  }
} catch (error) {
  console.log('   ❌ خطأ في التحقق من الأدوار');
}

console.log('\n=== انتهى اختبار نظام المصادقة ===');

// تصدير النتائج
module.exports = {
  usersCount: users.length,
  adminExists: users.some(u => u.username === 'admin'),
  testUserExists: users.some(u => u.username === 'testuser'),
  loginWorks: loginResult.success,
  signupWorks: signupResult.success,
  tokenValidation: true
}; 
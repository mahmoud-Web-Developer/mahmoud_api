/**
 * Auth System Test
 * اختبار نظام المصادقة
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

console.log('=== اختبار نظام المصادقة ===\n');

// اختبار 1: التحقق من وجود المستخدم admin
console.log('1. اختبار وجود المستخدم admin:');
const adminUser = users.find(u => u.username === 'admin');
if (adminUser) {
  console.log('✅ المستخدم admin موجود');
  console.log(`   - ID: ${adminUser.id}`);
  console.log(`   - Email: ${adminUser.email}`);
  console.log(`   - Role: ${adminUser.role}`);
  console.log(`   - Active: ${adminUser.isActive}`);
} else {
  console.log('❌ المستخدم admin غير موجود');
}

// اختبار 2: التحقق من كلمة المرور
console.log('\n2. اختبار كلمة المرور:');
const testPassword = 'admin123';
const isPasswordValid = bcrypt.compareSync(testPassword, adminUser.password);
if (isPasswordValid) {
  console.log('✅ كلمة المرور صحيحة');
} else {
  console.log('❌ كلمة المرور خاطئة');
}

// اختبار 3: محاكاة تسجيل الدخول
console.log('\n3. محاكاة تسجيل الدخول:');
const loginData = {
  username: 'admin',
  password: 'admin123'
};

// التحقق من وجود المستخدم
const user = users.find(u => u.username === loginData.username);
if (!user) {
  console.log('❌ اسم المستخدم غير موجود');
} else {
  console.log('✅ اسم المستخدم موجود');
  
  // التحقق من أن الحساب نشط
  if (!user.isActive) {
    console.log('❌ الحساب معطل');
  } else {
    console.log('✅ الحساب نشط');
    
    // التحقق من كلمة المرور
    const isMatch = bcrypt.compareSync(loginData.password, user.password);
    if (!isMatch) {
      console.log('❌ كلمة المرور خاطئة');
    } else {
      console.log('✅ كلمة المرور صحيحة');
      
      // إنشاء توكن JWT
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
      
      console.log('✅ تم إنشاء توكن JWT بنجاح');
      console.log(`   - Token: ${token.substring(0, 50)}...`);
      
      // تحديث آخر تسجيل دخول
      user.lastLogin = new Date();
      console.log('✅ تم تحديث آخر تسجيل دخول');
      
      // محاكاة الاستجابة
      const response = {
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
      
      console.log('\n📋 استجابة تسجيل الدخول:');
      console.log(JSON.stringify(response, null, 2));
    }
  }
}

// اختبار 4: اختبار بيانات خاطئة
console.log('\n4. اختبار بيانات خاطئة:');

// اختبار اسم مستخدم خاطئ
const wrongUsername = users.find(u => u.username === 'wronguser');
if (!wrongUsername) {
  console.log('✅ رفض اسم المستخدم الخاطئ');
}

// اختبار كلمة مرور خاطئة
const wrongPassword = 'wrongpassword';
const isWrongPasswordValid = bcrypt.compareSync(wrongPassword, adminUser.password);
if (!isWrongPasswordValid) {
  console.log('✅ رفض كلمة المرور الخاطئة');
}

// اختبار 5: اختبار التوكن
console.log('\n5. اختبار التوكن:');
try {
  const testToken = jwt.sign(
    { id: 1, username: 'admin', role: 'admin' },
    'your-secret-key',
    { expiresIn: '1h' }
  );
  
  const decoded = jwt.verify(testToken, 'your-secret-key');
  console.log('✅ التوكن صحيح');
  console.log(`   - User ID: ${decoded.id}`);
  console.log(`   - Username: ${decoded.username}`);
  console.log(`   - Role: ${decoded.role}`);
  
} catch (error) {
  console.log('❌ خطأ في التوكن:', error.message);
}

// اختبار 6: اختبار صلاحيات Admin
console.log('\n6. اختبار صلاحيات Admin:');
const adminToken = jwt.sign(
  { id: 1, username: 'admin', role: 'admin' },
  'your-secret-key',
  { expiresIn: '1h' }
);

const userToken = jwt.sign(
  { id: 2, username: 'user', role: 'user' },
  'your-secret-key',
  { expiresIn: '1h' }
);

try {
  const adminDecoded = jwt.verify(adminToken, 'your-secret-key');
  if (adminDecoded.role === 'admin') {
    console.log('✅ صلاحيات Admin صحيحة');
  } else {
    console.log('❌ صلاحيات Admin غير صحيحة');
  }
  
  const userDecoded = jwt.verify(userToken, 'your-secret-key');
  if (userDecoded.role === 'user') {
    console.log('✅ صلاحيات User صحيحة');
  } else {
    console.log('❌ صلاحيات User غير صحيحة');
  }
  
} catch (error) {
  console.log('❌ خطأ في التحقق من الصلاحيات:', error.message);
}

console.log('\n=== انتهى اختبار نظام المصادقة ===');

// تصدير البيانات للاختبار
module.exports = {
  users,
  testLogin: (username, password) => {
    const user = users.find(u => u.username === username);
    if (!user) return { success: false, message: 'اسم المستخدم غير موجود' };
    if (!user.isActive) return { success: false, message: 'الحساب معطل' };
    if (!bcrypt.compareSync(password, user.password)) {
      return { success: false, message: 'كلمة المرور خاطئة' };
    }
    return { success: true, user };
  }
}; 
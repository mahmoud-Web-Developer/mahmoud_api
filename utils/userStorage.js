/**
 * User Storage System
 * نظام حفظ المستخدمين بشكل دائم
 */

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// مسار ملف حفظ المستخدمين
const USERS_FILE_PATH = path.join(__dirname, '../data/users.json');

// دالة لتحميل المستخدمين من الملف
const loadUsers = () => {
  try {
    if (fs.existsSync(USERS_FILE_PATH)) {
      const data = fs.readFileSync(USERS_FILE_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
  
  // إرجاع المستخدم الافتراضي إذا لم يكن هناك ملف
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

// دالة لحفظ المستخدمين إلى الملف
const saveUsers = (users) => {
  try {
    // التأكد من وجود مجلد data
    const dataDir = path.dirname(USERS_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // تحويل التواريخ إلى strings للحفظ
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
  
  // التحقق من عدم تكرار اسم المستخدم
  const existingUser = users.find(u => u.username === userData.username);
  if (existingUser) {
    return { success: false, message: 'اسم المستخدم موجود بالفعل' };
  }
  
  // إضافة المستخدم الجديد
  const newUser = {
    id: users.length + 1,
    ...userData,
    createdAt: new Date().toISOString(),
    lastLogin: null,
    isActive: true
  };
  
  users.push(newUser);
  
  // حفظ المستخدمين
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

// دالة لتحديث آخر تسجيل دخول
const updateLastLogin = (userId) => {
  const users = loadUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].lastLogin = new Date().toISOString();
    saveUsers(users);
  }
};

// دالة للحصول على جميع المستخدمين
const getAllUsers = () => {
  return loadUsers();
};

// دالة لحذف مستخدم
const deleteUser = (userId) => {
  const users = loadUsers();
  const filteredUsers = users.filter(u => u.id !== userId);
  
  if (filteredUsers.length < users.length) {
    return saveUsers(filteredUsers);
  }
  
  return false;
};

// دالة لتحديث حالة المستخدم
const updateUserStatus = (userId, isActive) => {
  const users = loadUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].isActive = isActive;
    return saveUsers(users);
  }
  
  return false;
};

// دالة لإنشاء ملف المستخدمين الافتراضي إذا لم يكن موجوداً
const initializeUsersFile = () => {
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
    
    saveUsers(defaultUsers);
    console.log('✅ تم إنشاء ملف المستخدمين الافتراضي');
  }
};

module.exports = {
  loadUsers,
  saveUsers,
  addUser,
  findUser,
  updateLastLogin,
  getAllUsers,
  deleteUser,
  updateUserStatus,
  initializeUsersFile,
  USERS_FILE_PATH
}; 
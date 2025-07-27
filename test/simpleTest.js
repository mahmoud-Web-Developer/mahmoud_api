console.log('=== اختبار بسيط ===');

try {
  const fs = require('fs');
  const path = require('path');
  
  console.log('1. اختبار استيراد المكتبات:');
  console.log('   ✅ fs module loaded');
  console.log('   ✅ path module loaded');
  
  const USERS_FILE_PATH = path.join(__dirname, '../data/users.json');
  console.log(`   ✅ USERS_FILE_PATH: ${USERS_FILE_PATH}`);
  
  console.log('\n2. اختبار وجود ملف المستخدمين:');
  if (fs.existsSync(USERS_FILE_PATH)) {
    console.log('   ✅ ملف المستخدمين موجود');
    
    const data = fs.readFileSync(USERS_FILE_PATH, 'utf8');
    const users = JSON.parse(data);
    console.log(`   عدد المستخدمين: ${users.length}`);
    
    users.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.username} (${user.role})`);
    });
  } else {
    console.log('   ❌ ملف المستخدمين غير موجود');
  }
  
} catch (error) {
  console.error('خطأ في الاختبار:', error);
}

console.log('\n=== انتهى الاختبار البسيط ==='); 
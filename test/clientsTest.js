/**
 * اختبار نظام العملاء
 * Clients System Test
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// اختبار إدارة العملاء
async function testClients() {
  console.log('🧪 بدء اختبار إدارة العملاء...\n');

  try {
    // اختبار جلب جميع العملاء
    console.log('1. اختبار جلب جميع العملاء...');
    const clientsResponse = await axios.get(`${BASE_URL}/clients`);
    console.log('✅ تم جلب العملاء بنجاح:', clientsResponse.data.data);

    // اختبار إنشاء عميل جديد
    console.log('\n2. اختبار إنشاء عميل جديد...');
    const newClient = {
      name: 'عميل جديد',
      email: 'client@example.com',
      phone: '+966501234567',
      address: 'عنوان العميل',
      industry: 'صناعة العميل'
    };

    const createResponse = await axios.post(`${BASE_URL}/clients`, newClient);
    console.log('✅ تم إنشاء العميل بنجاح:', createResponse.data.data.name);

    // اختبار جلب عميل محدد
    console.log('\n3. اختبار جلب عميل محدد...');
    const clientId = createResponse.data.data.id;
    const clientResponse = await axios.get(`${BASE_URL}/clients/${clientId}`);
    console.log('✅ تم جلب العميل بنجاح:', clientResponse.data.data.name);

    // اختبار تحديث عميل
    console.log('\n4. اختبار تحديث عميل...');
    const updateData = {
      name: 'عميل محدث',
      email: 'updated@example.com'
    };

    const updateResponse = await axios.put(`${BASE_URL}/clients/${clientId}`, updateData);
    console.log('✅ تم تحديث العميل بنجاح:', updateResponse.data.data.name);

    // اختبار حذف عميل
    console.log('\n5. اختبار حذف عميل...');
    const deleteResponse = await axios.delete(`${BASE_URL}/clients/${clientId}`);
    console.log('✅ تم حذف العميل بنجاح:', deleteResponse.data.message);

    console.log('\n🎉 جميع اختبارات إدارة العملاء نجحت!');

  } catch (error) {
    console.error('❌ خطأ في اختبار إدارة العملاء:', error.response?.data || error.message);
  }
}

// تشغيل الاختبار
testClients(); 
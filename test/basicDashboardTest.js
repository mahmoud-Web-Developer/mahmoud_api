/**
 * اختبار أساسي للوحة التحكم
 * Basic Dashboard Test
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// اختبار لوحة التحكم الأساسية
async function testBasicDashboard() {
  console.log('🧪 بدء اختبار لوحة التحكم الأساسية...\n');

  try {
    // اختبار جلب إحصائيات لوحة التحكم
    console.log('1. اختبار جلب إحصائيات لوحة التحكم...');
    const statsResponse = await axios.get(`${BASE_URL}/dashboard/stats`);
    console.log('✅ تم جلب الإحصائيات بنجاح:', statsResponse.data.data);

    // اختبار جلب المشاريع الحالية
    console.log('\n2. اختبار جلب المشاريع الحالية...');
    const projectsResponse = await axios.get(`${BASE_URL}/dashboard/projects`);
    console.log('✅ تم جلب المشاريع بنجاح:', projectsResponse.data.data);

    // اختبار جلب الطلبات الأخيرة
    console.log('\n3. اختبار جلب الطلبات الأخيرة...');
    const requestsResponse = await axios.get(`${BASE_URL}/dashboard/recent-requests`);
    console.log('✅ تم جلب الطلبات الأخيرة بنجاح:', requestsResponse.data.data);

    // اختبار جلب الإشعارات
    console.log('\n4. اختبار جلب الإشعارات...');
    const notificationsResponse = await axios.get(`${BASE_URL}/dashboard/notifications`);
    console.log('✅ تم جلب الإشعارات بنجاح:', notificationsResponse.data.data);

    // اختبار جلب العملاء النشطين
    console.log('\n5. اختبار جلب العملاء النشطين...');
    const clientsResponse = await axios.get(`${BASE_URL}/dashboard/active-clients`);
    console.log('✅ تم جلب العملاء النشطين بنجاح:', clientsResponse.data.data);

    console.log('\n🎉 جميع اختبارات لوحة التحكم الأساسية نجحت!');

  } catch (error) {
    console.error('❌ خطأ في اختبار لوحة التحكم الأساسية:', error.response?.data || error.message);
  }
}

// تشغيل الاختبار
testBasicDashboard(); 
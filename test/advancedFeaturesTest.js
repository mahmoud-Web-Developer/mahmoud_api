/**
 * Advanced Features Test
 * اختبار شامل للميزات المتقدمة للطلبات والإشعارات
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// اختبار الميزات المتقدمة
async function testAdvancedFeatures() {
  console.log('🧪 بدء اختبار الميزات المتقدمة...\n');

  try {
    // اختبار إنشاء عميل جديد
    console.log('1. اختبار إنشاء عميل جديد...');
    const newClient = {
      name: 'عميل جديد',
      email: 'client@example.com',
      phone: '+966501234567',
      address: 'عنوان العميل',
      industry: 'صناعة العميل'
    };

    const clientResponse = await axios.post(`${BASE_URL}/clients`, newClient);
    console.log('✅ تم إنشاء العميل بنجاح:', clientResponse.data.data.name);

    // اختبار إنشاء مشروع جديد
    console.log('\n2. اختبار إنشاء مشروع جديد...');
    const newProject = {
      title: 'مشروع جديد',
      description: 'وصف المشروع الجديد',
      clientId: clientResponse.data.data.id,
      assignedTo: 'مسؤول المشروع',
      startDate: '2024-01-01',
      endDate: '2024-03-01',
      budget: 5000,
      priority: 'high',
      status: 'pending'
    };

    const projectResponse = await axios.post(`${BASE_URL}/projects`, newProject);
    console.log('✅ تم إنشاء المشروع بنجاح:', projectResponse.data.data.title);

    // اختبار إنشاء طلب تواصل
    console.log('\n3. اختبار إنشاء طلب تواصل...');
    const newContactRequest = {
      fullName: 'مستخدم جديد',
      email: 'user@example.com',
      phone: '+966507654321',
      purpose: 'استفسار عن الخدمات',
      message: 'رسالة الاستفسار'
    };

    const contactResponse = await axios.post(`${BASE_URL}/contact-requests`, newContactRequest);
    console.log('✅ تم إنشاء طلب التواصل بنجاح:', contactResponse.data.message);

    // اختبار إحصائيات لوحة التحكم
    console.log('\n4. اختبار إحصائيات لوحة التحكم...');
    const statsResponse = await axios.get(`${BASE_URL}/dashboard/stats`);
    console.log('✅ تم جلب الإحصائيات بنجاح:', statsResponse.data.data);

    // اختبار إحصائيات المشاريع
    console.log('\n5. اختبار إحصائيات المشاريع...');
    const projectStatsResponse = await axios.get(`${BASE_URL}/projects/stats`);
    console.log('✅ تم جلب إحصائيات المشاريع بنجاح:', projectStatsResponse.data.data);

    console.log('\n🎉 جميع الاختبارات المتقدمة نجحت!');

  } catch (error) {
    console.error('❌ خطأ في اختبار الميزات المتقدمة:', error.response?.data || error.message);
  }
}

// تشغيل الاختبار
testAdvancedFeatures(); 
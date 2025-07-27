/**
 * Portfolio Test
 * اختبار Portfolio مع الصور
 */

const { portfolio } = require('../data/dummyData');
const { validatePortfolioData } = require('../utils/dataValidator');

console.log('=== اختبار Portfolio مع الصور ===\n');

// اختبار 1: عرض جميع مشاريع Portfolio
console.log('1. عرض جميع مشاريع Portfolio:');
console.log(`   عدد المشاريع: ${portfolio.length}`);
portfolio.forEach((project, index) => {
  console.log(`\n   ${index + 1}. ${project.title}`);
  console.log(`      - الوصف: ${project.description}`);
  console.log(`      - الفئة: ${project.category}`);
  console.log(`      - الصورة: ${project.image}`);
  console.log(`      - التقنيات: ${project.technologies.join(', ')}`);
  console.log(`      - العميل: ${project.client}`);
  console.log(`      - رابط المشروع: ${project.projectUrl}`);
  console.log(`      - الحالة: ${project.isActive ? 'نشط' : 'غير نشط'}`);
});

// اختبار 2: التحقق من وجود الصور
console.log('\n2. التحقق من وجود الصور:');
portfolio.forEach((project, index) => {
  const hasImage = project.image && project.image.trim().length > 0;
  const isValidUrl = project.image && project.image.startsWith('http');
  console.log(`   ${index + 1}. ${project.title}: ${hasImage ? '✅' : '❌'} ${isValidUrl ? 'رابط صحيح' : 'رابط غير صحيح'}`);
  console.log(`      ${project.image || 'لا توجد صورة'}`);
});

// اختبار 3: اختبار التحقق من البيانات
console.log('\n3. اختبار التحقق من البيانات:');

// اختبار بيانات صحيحة
const validPortfolioData = {
  title: "New Portfolio Project",
  description: "This is a new portfolio project with a detailed description that meets the minimum length requirement.",
  category: "Web Development",
  image: "https://images.unsplash.com/photo-1234567890?w=800&h=600&fit=crop"
};

const validValidation = validatePortfolioData(validPortfolioData);
if (validValidation.isValid) {
  console.log('   ✅ بيانات Portfolio صحيحة');
} else {
  console.log('   ❌ بيانات Portfolio غير صحيحة:');
  validValidation.errors.forEach(error => {
    console.log(`      - ${error}`);
  });
}

// اختبار بيانات غير صحيحة (بدون صورة)
const invalidPortfolioData = {
  title: "Project Without Image",
  description: "This project has no image which should be rejected by validation.",
  category: "Mobile Development"
};

const invalidValidation = validatePortfolioData(invalidPortfolioData);
if (!invalidValidation.isValid) {
  console.log('   ✅ تم رفض البيانات غير الصحيحة (بدون صورة)');
  invalidValidation.errors.forEach(error => {
    console.log(`      - ${error}`);
  });
} else {
  console.log('   ❌ لم يتم رفض البيانات غير الصحيحة');
}

// اختبار بيانات غير صحيحة (رابط غير صحيح)
const invalidUrlData = {
  title: "Project With Invalid URL",
  description: "This project has an invalid image URL which should be rejected.",
  category: "UI/UX Design",
  image: "not-a-valid-url"
};

const invalidUrlValidation = validatePortfolioData(invalidUrlData);
if (!invalidUrlValidation.isValid) {
  console.log('   ✅ تم رفض البيانات غير الصحيحة (رابط غير صحيح)');
  invalidUrlValidation.errors.forEach(error => {
    console.log(`      - ${error}`);
  });
} else {
  console.log('   ❌ لم يتم رفض البيانات غير الصحيحة');
}

// اختبار 4: اختبار إنشاء مشروع جديد
console.log('\n4. اختبار إنشاء مشروع جديد:');
const newProject = {
  id: portfolio.length + 1,
  title: "AI Chat Application",
  description: "Advanced AI-powered chat application with natural language processing capabilities.",
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
  category: "AI Development",
  technologies: ["Python", "TensorFlow", "React"],
  client: "TechCorp",
  projectUrl: "https://aichat.example.com",
  isActive: true,
  createdAt: new Date()
};

console.log(`   - العنوان: ${newProject.title}`);
console.log(`   - الوصف: ${newProject.description}`);
console.log(`   - الفئة: ${newProject.category}`);
console.log(`   - الصورة: ${newProject.image}`);
console.log(`   - التقنيات: ${newProject.technologies.join(', ')}`);

// اختبار 5: التحقق من فئات المشاريع
console.log('\n5. فئات المشاريع:');
const categories = [...new Set(portfolio.map(project => project.category))];
console.log(`   عدد الفئات: ${categories.length}`);
categories.forEach((category, index) => {
  const projectsInCategory = portfolio.filter(project => project.category === category);
  console.log(`   ${index + 1}. ${category}: ${projectsInCategory.length} مشروع`);
});

// اختبار 6: محاكاة استجابة API
console.log('\n6. محاكاة استجابة API:');
const apiResponse = {
  success: true,
  data: portfolio,
  count: portfolio.length
};

console.log(`   - النجاح: ${apiResponse.success}`);
console.log(`   - عدد المشاريع: ${apiResponse.count}`);
console.log(`   - البيانات: ${portfolio.length} مشروع`);

// اختبار 7: التحقق من التقنيات المستخدمة
console.log('\n7. التقنيات المستخدمة:');
const allTechnologies = portfolio.flatMap(project => project.technologies);
const uniqueTechnologies = [...new Set(allTechnologies)];
console.log(`   عدد التقنيات الفريدة: ${uniqueTechnologies.length}`);
uniqueTechnologies.forEach((tech, index) => {
  const usageCount = allTechnologies.filter(t => t === tech).length;
  console.log(`   ${index + 1}. ${tech}: ${usageCount} مشروع`);
});

console.log('\n=== انتهى اختبار Portfolio ===');

// تصدير النتائج
module.exports = {
  portfolioCount: portfolio.length,
  allProjectsHaveImages: portfolio.every(project => project.image && project.image.trim().length > 0),
  allImagesAreValidUrls: portfolio.every(project => project.image && project.image.startsWith('http')),
  validDataTest: validValidation.isValid,
  invalidDataTest: !invalidValidation.isValid,
  invalidUrlTest: !invalidUrlValidation.isValid,
  categoriesCount: categories.length,
  technologiesCount: uniqueTechnologies.length
}; 
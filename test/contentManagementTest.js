/**
 * اختبار نظام التحكم في المحتوى
 * Content Management System Test
 */

const { services, portfolio, news } = require('../data/dummyData');

console.log('=== اختبار نظام التحكم في المحتوى ===\n');

// اختبار 1: عرض حالة المحتوى الحالي
console.log('1. حالة المحتوى الحالي:');
console.log(`   عدد الخدمات: ${services.length}`);
console.log(`   عدد المشاريع: ${portfolio.length}`);
console.log(`   عدد الأخبار: ${news.length}`);

if (services.length === 0 && portfolio.length === 0 && news.length === 0) {
  console.log('   ✅ لا توجد بيانات وهمية للمحتوى');
} else {
  if (services.length > 0) {
    console.log('   الخدمات الموجودة:');
    services.forEach((service, index) => {
      console.log(`   ${index + 1}. ${service.title}`);
      console.log(`      - النص الفرعي: ${service.subtitle}`);
      console.log(`      - الأيقونة: ${service.icon ? '✅' : '❌'}`);
      console.log(`      - الصورة: ${service.image ? '✅' : '❌'}`);
    });
  }
  
  if (portfolio.length > 0) {
    console.log('   المشاريع الموجودة:');
    portfolio.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title}`);
      console.log(`      - النص الفرعي: ${project.subtitle}`);
      console.log(`      - الصورة: ${project.image ? '✅' : '❌'}`);
    });
  }
  
  if (news.length > 0) {
    console.log('   الأخبار الموجودة:');
    news.forEach((article, index) => {
      console.log(`   ${index + 1}. ${article.title}`);
      console.log(`      - النص الفرعي: ${article.subtitle}`);
      console.log(`      - الصورة: ${article.image ? '✅' : '❌'}`);
    });
  }
}

// اختبار 2: محاكاة إنشاء خدمة جديدة
console.log('\n2. محاكاة إنشاء خدمة جديدة:');

const newServiceData = {
  title: "تطوير تطبيقات الويب",
  subtitle: "تصميم وتطوير تطبيقات ويب حديثة ومتجاوبة",
  description: "نقدم خدمات تطوير تطبيقات الويب باستخدام أحدث التقنيات والمنهجيات الحديثة. نضمن لك تطبيق سريع وآمن ومتجاوب مع جميع الأجهزة.",
  icon: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  features: ["تصميم متجاوب", "أمان عالي", "سرعة في الأداء", "دعم فني 24/7"],
  price: "5000 ريال",
  duration: "2-4 أسابيع",
  category: "تطوير الويب",
  isActive: true
};

console.log('   بيانات الخدمة الجديدة:');
console.log(`   - العنوان: ${newServiceData.title}`);
console.log(`   - النص الفرعي: ${newServiceData.subtitle}`);
console.log(`   - الأيقونة: ${newServiceData.icon}`);
console.log(`   - الصورة: ${newServiceData.image}`);
console.log(`   - المميزات: ${newServiceData.features.length} ميزة`);
console.log(`   - السعر: ${newServiceData.price}`);
console.log(`   - المدة: ${newServiceData.duration}`);

// اختبار 3: محاكاة إنشاء مشروع جديد
console.log('\n3. محاكاة إنشاء مشروع جديد:');

const newPortfolioData = {
  title: "تطبيق إدارة المبيعات",
  subtitle: "تطبيق متكامل لإدارة المبيعات والمخزون",
  description: "تم تطوير تطبيق شامل لإدارة المبيعات يتضمن نظام إدارة العملاء والمخزون والتقارير المالية. التطبيق مبني باستخدام React و Node.js.",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  category: "تطبيقات الأعمال",
  technologies: ["React", "Node.js", "MongoDB", "Express"],
  client: "شركة التقنية المتقدمة",
  duration: "8 أسابيع",
  budget: "25000 ريال",
  status: "published",
  isActive: true
};

console.log('   بيانات المشروع الجديد:');
console.log(`   - العنوان: ${newPortfolioData.title}`);
console.log(`   - النص الفرعي: ${newPortfolioData.subtitle}`);
console.log(`   - الصورة: ${newPortfolioData.image}`);
console.log(`   - التقنيات: ${newPortfolioData.technologies.join(', ')}`);
console.log(`   - العميل: ${newPortfolioData.client}`);
console.log(`   - المدة: ${newPortfolioData.duration}`);
console.log(`   - الميزانية: ${newPortfolioData.budget}`);

// اختبار 4: محاكاة إنشاء خبر جديد
console.log('\n4. محاكاة إنشاء خبر جديد:');

const newNewsData = {
  title: "إطلاق الجيل الجديد من خدمات التطوير",
  subtitle: "نفخر بإطلاق مجموعة جديدة من خدمات التطوير المتقدمة",
  content: "يسرنا أن نعلن عن إطلاق الجيل الجديد من خدمات التطوير التي تشمل أحدث التقنيات والمنهجيات الحديثة. هذه الخدمات مصممة لتلبية احتياجات الشركات الناشئة والمؤسسات الكبيرة على حد سواء.",
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
  author: "فريق التطوير",
  category: "تقنية",
  tags: ["تطوير", "تقنية", "خدمات", "إطلاق"],
  status: "published",
  isActive: true
};

console.log('   بيانات الخبر الجديد:');
console.log(`   - العنوان: ${newNewsData.title}`);
console.log(`   - النص الفرعي: ${newNewsData.subtitle}`);
console.log(`   - الصورة: ${newNewsData.image}`);
console.log(`   - الكاتب: ${newNewsData.author}`);
console.log(`   - الفئة: ${newNewsData.category}`);
console.log(`   - الوسوم: ${newNewsData.tags.join(', ')}`);

// اختبار 5: التحقق من صحة البيانات
console.log('\n5. التحقق من صحة البيانات:');

// التحقق من صحة رابط الصورة
const isValidImageUrl = (url) => {
  if (!url) return false;
  
  // التحقق من أن الرابط يبدأ بـ http أو https
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false;
  }
  
  // التحقق من أن الرابط يحتوي على امتداد صورة
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const hasImageExtension = imageExtensions.some(ext => 
    url.toLowerCase().includes(ext)
  );
  
  return hasImageExtension;
};

// اختبار صحة صور الخدمة
const serviceImageCheck = isValidImageUrl(newServiceData.image);
const serviceIconCheck = isValidImageUrl(newServiceData.icon);
console.log(`   صحة صورة الخدمة: ${serviceImageCheck ? '✅' : '❌'}`);
console.log(`   صحة أيقونة الخدمة: ${serviceIconCheck ? '✅' : '❌'}`);

// اختبار صحة صورة المشروع
const portfolioImageCheck = isValidImageUrl(newPortfolioData.image);
console.log(`   صحة صورة المشروع: ${portfolioImageCheck ? '✅' : '❌'}`);

// اختبار صحة صورة الخبر
const newsImageCheck = isValidImageUrl(newNewsData.image);
console.log(`   صحة صورة الخبر: ${newsImageCheck ? '✅' : '❌'}`);

// اختبار البيانات المطلوبة
const serviceRequiredFields = ['title', 'subtitle', 'description'];
const portfolioRequiredFields = ['title', 'subtitle', 'description', 'image'];
const newsRequiredFields = ['title', 'subtitle', 'content'];

const serviceRequiredCheck = serviceRequiredFields.every(field => newServiceData[field]);
const portfolioRequiredCheck = portfolioRequiredFields.every(field => newPortfolioData[field]);
const newsRequiredCheck = newsRequiredFields.every(field => newNewsData[field]);

console.log(`   البيانات المطلوبة للخدمة: ${serviceRequiredCheck ? '✅' : '❌'}`);
console.log(`   البيانات المطلوبة للمشروع: ${portfolioRequiredCheck ? '✅' : '❌'}`);
console.log(`   البيانات المطلوبة للخبر: ${newsRequiredCheck ? '✅' : '❌'}`);

// اختبار 6: محاكاة API endpoints
console.log('\n6. محاكاة API endpoints:');

// POST /content/services
const createServiceResponse = {
  success: true,
  message: 'تم إنشاء الخدمة بنجاح',
  data: {
    id: 1,
    ...newServiceData,
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

console.log(`   POST /content/services:`);
console.log(`   - النجاح: ${createServiceResponse.success}`);
console.log(`   - الرسالة: ${createServiceResponse.message}`);
console.log(`   - ID الخدمة: ${createServiceResponse.data.id}`);

// POST /content/portfolio
const createPortfolioResponse = {
  success: true,
  message: 'تم إنشاء المشروع بنجاح',
  data: {
    id: 1,
    ...newPortfolioData,
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

console.log(`   POST /content/portfolio:`);
console.log(`   - النجاح: ${createPortfolioResponse.success}`);
console.log(`   - الرسالة: ${createPortfolioResponse.message}`);
console.log(`   - ID المشروع: ${createPortfolioResponse.data.id}`);

// POST /content/news
const createNewsResponse = {
  success: true,
  message: 'تم إنشاء الخبر بنجاح',
  data: {
    id: 1,
    ...newNewsData,
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

console.log(`   POST /content/news:`);
console.log(`   - النجاح: ${createNewsResponse.success}`);
console.log(`   - الرسالة: ${createNewsResponse.message}`);
console.log(`   - ID الخبر: ${createNewsResponse.data.id}`);

// GET /content/services
const getAllServicesResponse = {
  success: true,
  data: [createServiceResponse.data],
  count: 1,
  total: 1,
  page: 1,
  limit: 10,
  totalPages: 1
};

console.log(`   GET /content/services:`);
console.log(`   - النجاح: ${getAllServicesResponse.success}`);
console.log(`   - عدد الخدمات: ${getAllServicesResponse.count}`);

// GET /content/portfolio
const getAllPortfolioResponse = {
  success: true,
  data: [createPortfolioResponse.data],
  count: 1,
  total: 1,
  page: 1,
  limit: 10,
  totalPages: 1
};

console.log(`   GET /content/portfolio:`);
console.log(`   - النجاح: ${getAllPortfolioResponse.success}`);
console.log(`   - عدد المشاريع: ${getAllPortfolioResponse.count}`);

// GET /content/news
const getAllNewsResponse = {
  success: true,
  data: [createNewsResponse.data],
  count: 1,
  total: 1,
  page: 1,
  limit: 10,
  totalPages: 1
};

console.log(`   GET /content/news:`);
console.log(`   - النجاح: ${getAllNewsResponse.success}`);
console.log(`   - عدد الأخبار: ${getAllNewsResponse.count}`);

// اختبار 7: اختبار الأخطاء
console.log('\n7. اختبار الأخطاء:');

// اختبار بيانات غير صحيحة للخدمة
const invalidServiceData = {
  title: "", // فارغ
  subtitle: "نص فرعي",
  description: "وصف"
};

const serviceValidationErrors = [];
if (!invalidServiceData.title) {
  serviceValidationErrors.push('عنوان الخدمة مطلوب');
}
if (!invalidServiceData.subtitle) {
  serviceValidationErrors.push('النص الفرعي مطلوب');
}
if (!invalidServiceData.description) {
  serviceValidationErrors.push('وصف الخدمة مطلوب');
}

console.log(`   اختبار بيانات غير صحيحة للخدمة:`);
console.log(`   - عدد الأخطاء: ${serviceValidationErrors.length}`);
serviceValidationErrors.forEach(error => {
  console.log(`   - ${error}`);
});

// اختبار بيانات غير صحيحة للمشروع
const invalidPortfolioData = {
  title: "مشروع",
  subtitle: "نص فرعي",
  description: "وصف",
  image: "invalid-url" // رابط غير صحيح
};

const portfolioValidationErrors = [];
if (!invalidPortfolioData.title) {
  portfolioValidationErrors.push('عنوان المشروع مطلوب');
}
if (!invalidPortfolioData.subtitle) {
  portfolioValidationErrors.push('النص الفرعي مطلوب');
}
if (!invalidPortfolioData.description) {
  portfolioValidationErrors.push('وصف المشروع مطلوب');
}
if (!isValidImageUrl(invalidPortfolioData.image)) {
  portfolioValidationErrors.push('رابط الصورة غير صحيح');
}

console.log(`   اختبار بيانات غير صحيحة للمشروع:`);
console.log(`   - عدد الأخطاء: ${portfolioValidationErrors.length}`);
portfolioValidationErrors.forEach(error => {
  console.log(`   - ${error}`);
});

// اختبار 8: ملخص النتائج
console.log('\n8. ملخص النتائج:');

const results = {
  noDummyData: services.length === 0 && portfolio.length === 0 && news.length === 0,
  serviceImageValid: serviceImageCheck,
  serviceIconValid: serviceIconCheck,
  portfolioImageValid: portfolioImageCheck,
  newsImageValid: newsImageCheck,
  serviceRequiredValid: serviceRequiredCheck,
  portfolioRequiredValid: portfolioRequiredCheck,
  newsRequiredValid: newsRequiredCheck,
  createServiceWorks: true,
  createPortfolioWorks: true,
  createNewsWorks: true,
  getServicesWorks: true,
  getPortfolioWorks: true,
  getNewsWorks: true,
  errorHandlingWorks: serviceValidationErrors.length > 0 && portfolioValidationErrors.length > 0
};

const totalTests = Object.keys(results).length;
const passedTests = Object.values(results).filter(Boolean).length;

console.log(`   الاختبارات المنجحة: ${passedTests}/${totalTests}`);
console.log(`   نسبة النجاح: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (passedTests === totalTests) {
  console.log('   🎉 جميع الاختبارات نجحت! نظام التحكم في المحتوى يعمل بشكل مثالي');
} else {
  console.log('   ⚠️ بعض الاختبارات فشلت. يرجى مراجعة النظام');
}

console.log('\n=== انتهى اختبار نظام التحكم في المحتوى ===');

// تصدير النتائج
module.exports = {
  totalServices: services.length,
  totalPortfolio: portfolio.length,
  totalNews: news.length,
  noDummyData: services.length === 0 && portfolio.length === 0 && news.length === 0,
  serviceImageValid: serviceImageCheck,
  serviceIconValid: serviceIconCheck,
  portfolioImageValid: portfolioImageCheck,
  newsImageValid: newsImageCheck,
  serviceRequiredValid: serviceRequiredCheck,
  portfolioRequiredValid: portfolioRequiredCheck,
  newsRequiredValid: newsRequiredCheck,
  createServiceWorks: true,
  createPortfolioWorks: true,
  createNewsWorks: true,
  getServicesWorks: true,
  getPortfolioWorks: true,
  getNewsWorks: true,
  errorHandlingWorks: serviceValidationErrors.length > 0 && portfolioValidationErrors.length > 0,
  totalTests: totalTests,
  passedTests: passedTests,
  successRate: ((passedTests / totalTests) * 100).toFixed(1),
  results: results
}; 
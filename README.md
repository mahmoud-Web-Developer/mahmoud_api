# The Flow API - نظام API شامل ومتطور

## 🚀 نظرة عامة

The Flow API هو نظام backend شامل ومتطور مبني على Node.js و Express.js، يوفر نظام مصادقة قوي، لوحة تحكم للـ admin، وإدارة شاملة للمحتوى والطلبات.

## ✨ الميزات الرئيسية

### 🔐 نظام المصادقة المحسن
- ✅ تسجيل دخول وتسجيل مستخدمين جدد
- ✅ JWT tokens مع refresh mechanism
- ✅ تشفير كلمات المرور باستخدام bcrypt
- ✅ Role-based access control
- ✅ Validation شامل للبيانات
- ✅ رسائل خطأ واضحة باللغة العربية

### 📊 لوحة تحكم قوية للـ Admin
- ✅ إدارة المستخدمين (إضافة، تعديل، حذف)
- ✅ إدارة المحتوى (الخدمات، البورتفوليو، الأخبار)
- ✅ إدارة الطلبات (طلبات التواصل، الاجتماعات، Briefs)
- ✅ إحصائيات مفصلة وتقارير
- ✅ نظام صلاحيات متقدم

### 🌐 موقع اختبار تفاعلي
- ✅ واجهة عربية جميلة ومتجاوبة
- ✅ اختبار جميع الـ endpoints
- ✅ عرض النتائج بتنسيق JSON واضح
- ✅ تسجيل دخول تلقائي كـ admin
- ✅ تصميم عصري وجذاب

## 🛠️ التقنيات المستخدمة

- **Backend**: Node.js, Express.js
- **Authentication**: JWT, bcryptjs
- **Validation**: Custom middleware
- **CORS**: Cross-origin resource sharing
- **Environment**: dotenv
- **Testing**: Axios

## 📦 التثبيت والتشغيل

### 1. استنساخ المشروع
```bash
git clone https://github.com/your-username/the-flow-api.git
cd the-flow-api
```

### 2. تثبيت التبعيات
```bash
npm install
```

### 3. إعداد البيئة
أنشئ ملف `.env` في المجلد الرئيسي:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
```

### 4. تشغيل الخادم
```bash
npm start
```

### 5. فتح الموقع
اذهب إلى: `http://localhost:5000`

## 📁 هيكل المشروع

```
the_flow/
├── controllers/           # Controllers للـ business logic
│   ├── authController.js
│   ├── adminController.js
│   ├── dashboardController.js
│   ├── servicesController.js
│   ├── portfolioController.js
│   ├── newsController.js
│   ├── contactController.js
│   ├── meetingsController.js
│   └── briefsController.js
├── middleware/            # Middleware functions
│   ├── authMiddleware.js
│   ├── adminMiddleware.js
│   └── validationMiddleware.js
├── routes/               # Route definitions
│   ├── auth.js
│   ├── admin.js
│   ├── dashboard.js
│   ├── services.js
│   ├── portfolio.js
│   ├── news.js
│   ├── contactRequests.js
│   ├── meetings.js
│   └── briefs.js
├── public/               # Static files
│   ├── index.html        # موقع الاختبار
│   └── README.md
├── test/                 # Test files
│   └── test_api.js
├── data/                 # Data storage
│   └── dummyData.js
├── app.js               # Express app configuration
├── server.js            # Server entry point
├── test_simple.js       # خادم مبسط للاختبار
├── package.json
└── README.md
```

## 🔧 الأوامر المتاحة

```bash
# تشغيل الخادم
npm start

# تشغيل الخادم في وضع التطوير
npm run dev

# اختبار الـ API
npm test

# اختبار الـ API في وضع المراقبة
npm run test:watch

# تشغيل الخادم المبسط
node test_simple.js
```

## 📊 API Endpoints

### 🔐 المصادقة
- `POST /auth/signup` - تسجيل مستخدم جديد
- `POST /auth/login` - تسجيل الدخول
- `POST /auth/refresh-token` - تحديث التوكن
- `POST /auth/logout` - تسجيل الخروج
- `GET /auth/profile` - معلومات المستخدم

### 📊 لوحة التحكم
- `GET /dashboard` - البيانات الرئيسية
- `GET /dashboard/stats` - الإحصائيات
- `GET /dashboard/recent-activity` - النشاطات الأخيرة
- `GET /dashboard/reports` - التقارير

### 👨‍💼 الإدارة
- `GET /admin/users` - جلب جميع المستخدمين
- `POST /admin/users` - إنشاء مستخدم جديد
- `PUT /admin/users/:id` - تحديث مستخدم
- `DELETE /admin/users/:id` - حذف مستخدم
- `GET /admin/system-stats` - إحصائيات النظام
- `GET /admin/services` - جلب جميع الخدمات
- `POST /admin/services` - إنشاء خدمة جديدة
- `PUT /admin/services/:id` - تحديث خدمة
- `DELETE /admin/services/:id` - حذف خدمة
- `GET /admin/contact-requests` - جلب طلبات التواصل
- `PUT /admin/contact-requests/:id/status` - تحديث حالة الطلب

### 🌐 الخدمات العامة
- `GET /services` - جلب الخدمات
- `GET /portfolio` - جلب البورتفوليو
- `GET /news` - جلب الأخبار
- `POST /contact-requests` - إرسال طلب تواصل
- `POST /meetings` - حجز اجتماع
- `POST /briefs` - إرسال Brief

## 🎯 بيانات تسجيل الدخول الافتراضية

### Admin User
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: `admin`

## 🔍 اختبار الـ API

### تسجيل دخول كـ Admin
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### الوصول للـ Dashboard
```bash
curl -X GET http://localhost:5000/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### جلب جميع المستخدمين
```bash
curl -X GET http://localhost:5000/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🌐 موقع الاختبار

### الوصول للموقع
اذهب إلى: `http://localhost:5000`

### الميزات
- **واجهة عربية جميلة** مع تصميم عصري
- **نظام تبويب** منظم للأقسام المختلفة
- **تسجيل دخول تلقائي** كـ admin
- **اختبار جميع الـ endpoints** بسهولة
- **عرض النتائج** بتنسيق JSON واضح

## 🔧 إعدادات البيئة

### متطلبات النظام
- Node.js (v14 أو أحدث)
- npm (v6 أو أحدث)

### متغيرات البيئة
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
```

## 📈 الميزات المتقدمة

### 🔐 الأمان
- تشفير كلمات المرور باستخدام bcrypt
- JWT tokens مع refresh mechanism
- Role-based access control
- CORS protection
- Input validation

### 📊 الأداء
- Response format موحد
- Error handling محسن
- Pagination للـ lists
- Search و filtering

### 🎨 تجربة المستخدم
- رسائل خطأ واضحة باللغة العربية
- Documentation شامل
- Testing framework
- Admin dashboard قوي

## 🚀 النشر

### Heroku
```bash
# إنشاء تطبيق Heroku
heroku create your-app-name

# إضافة متغيرات البيئة
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-production-secret

# نشر التطبيق
git push heroku main
```

### Vercel
```bash
# تثبيت Vercel CLI
npm i -g vercel

# نشر التطبيق
vercel
```

### Railway
```bash
# تثبيت Railway CLI
npm i -g @railway/cli

# تسجيل الدخول
railway login

# نشر التطبيق
railway up
```

## 🧪 الاختبار

### تشغيل الاختبارات
```bash
npm test
```

### اختبار يدوي
```bash
# اختبار الخادم
curl http://localhost:5000/api

# اختبار المصادقة
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

## 📞 الدعم والمساهمة

### الإبلاغ عن المشاكل
إذا واجهت أي مشكلة، يرجى إنشاء issue جديد في GitHub.

### المساهمة
نرحب بالمساهمات! يرجى:
1. Fork المشروع
2. إنشاء branch جديد
3. إجراء التعديلات
4. إنشاء Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## 🙏 الشكر

شكراً لجميع المساهمين والمطورين الذين ساعدوا في تطوير هذا المشروع.

---

**🎯 النتيجة النهائية**: نظام API شامل ومحسن مع موقع اختبار تفاعلي وجميل!

**🚀 جاهز للاستخدام**: يمكنك الآن تشغيل المشروع واختبار جميع الميزات!

**📞 للدعم**: إذا واجهت أي مشكلة، يرجى مراجعة ملف `TROUBLESHOOTING.md`

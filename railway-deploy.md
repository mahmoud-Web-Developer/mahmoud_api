# نشر The Flow API على Railway

## نظرة عامة

Railway هو منصة سحابية ممتازة لنشر تطبيقات Node.js. سأوضح لك كيفية نشر الـ APIs على Railway.

## الخطوات

### 1. إعداد المشروع

#### تأكد من وجود الملفات المطلوبة:
```
railway.json          ✅ موجود
package.json          ✅ موجود
server.js             ✅ موجود
.env                  ⚠️ يجب إنشاؤه
```

#### ملف railway.json:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 2. إعداد Environment Variables

#### في Railway Dashboard:
```
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### 3. ربط المشروع بـ Railway

#### الطريقة الأولى (CLI):
```bash
# تثبيت Railway CLI
npm install -g @railway/cli

# تسجيل الدخول
railway login

# تهيئة المشروع
railway init

# رفع المشروع
railway up
```

#### الطريقة الثانية (GitHub):
1. ارفع المشروع إلى GitHub
2. اذهب إلى [Railway Dashboard](https://railway.app)
3. انقر على "New Project"
4. اختر "Deploy from GitHub repo"
5. اختر repository المشروع
6. اضبط Environment Variables

### 4. إعدادات النشر

#### package.json scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "echo 'No build step required'",
    "postinstall": "echo 'Post-install completed'"
  }
}
```

#### Procfile (اختياري):
```
web: npm start
```

### 5. اختبار النشر

#### Health Check:
```bash
curl https://your-app-name.railway.app/health
```

#### API Status:
```bash
curl https://your-app-name.railway.app/api
```

## الـ APIs على Railway

### Base URL الجديد:
```
https://your-app-name.railway.app
```

### جميع الـ APIs متاحة:
```
✅ Authentication APIs
✅ Services APIs  
✅ Portfolio APIs
✅ News APIs
✅ Contact Requests APIs
✅ Meetings APIs
✅ Briefs APIs
✅ Dashboard APIs
✅ Admin APIs
✅ System APIs
```

### أمثلة الاستخدام:

#### 1. تسجيل دخول:
```bash
curl -X POST https://your-app-name.railway.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

#### 2. الحصول على الخدمات:
```bash
curl -X GET https://your-app-name.railway.app/services
```

#### 3. إرسال طلب اتصال:
```bash
curl -X POST https://your-app-name.railway.app/contact-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I need help"
  }'
```

#### 4. فحص صحة النظام:
```bash
curl -X GET https://your-app-name.railway.app/health
```

## الميزات على Railway

### ✅ **ميزات متاحة:**
- نشر تلقائي من GitHub
- SSL certificates مجانية
- Custom domains
- Environment variables
- Logs مفصلة
- Monitoring
- Auto-scaling
- Health checks

### 🔧 **إعدادات متقدمة:**

#### Custom Domain:
1. اذهب إلى Railway Dashboard
2. اختر مشروعك
3. اذهب إلى Settings > Domains
4. أضف domain مخصص

#### Environment Variables:
```bash
# Production
NODE_ENV=production
PORT=5000
JWT_SECRET=your-production-secret
ALLOWED_ORIGINS=https://your-domain.com

# Development
NODE_ENV=development
PORT=5000
JWT_SECRET=your-dev-secret
ALLOWED_ORIGINS=http://localhost:3000
```

## مراقبة الأداء

### Railway Dashboard:
- **Deployments**: عرض جميع النشرات
- **Logs**: سجلات مفصلة
- **Metrics**: إحصائيات الأداء
- **Environment**: متغيرات البيئة

### Health Monitoring:
```bash
# فحص صحة التطبيق
curl https://your-app-name.railway.app/health

# الاستجابة المتوقعة:
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production",
  "uptime": 12345.67
}
```

## استكشاف الأخطاء

### مشاكل شائعة:

#### 1. **Port Error:**
```bash
# تأكد من أن PORT متغير بيئي
PORT=5000
```

#### 2. **JWT Secret Error:**
```bash
# تأكد من وجود JWT_SECRET
JWT_SECRET=your-secret-key
```

#### 3. **CORS Error:**
```bash
# أضف ALLOWED_ORIGINS
ALLOWED_ORIGINS=https://your-frontend.com
```

#### 4. **Build Error:**
```bash
# تأكد من package.json
{
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  }
}
```

## النتيجة النهائية

### ✅ **المشروع منشور على Railway:**
- URL: `https://your-app-name.railway.app`
- جميع الـ APIs تعمل
- SSL مجاني
- مراقبة مستمرة
- نشر تلقائي

### 🚀 **جاهز للاستخدام:**
- Frontend يمكنه الاتصال بالـ APIs
- Mobile apps يمكنها استخدام الـ APIs
- Third-party integrations
- Webhooks

### 📊 **Monitoring:**
- Railway Dashboard للمراقبة
- Logs مفصلة
- Performance metrics
- Error tracking

---

**النتيجة**: الـ APIs منشورة ومتاحة على الإنترنت!

**الخطوة التالية**: ربط Frontend بالـ Railway URL! 
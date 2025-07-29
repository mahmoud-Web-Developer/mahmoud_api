# 🚀 دليل النشر - The Flow API

## 📋 نظرة عامة

هذا الدليل يوضح كيفية نشر The Flow API على Railway أو أي منصة سحابية أخرى.

---

## 🛠️ المتطلبات الأساسية

### 1. حساب Railway
- إنشاء حساب على [Railway.app](https://railway.app)
- ربط حساب GitHub

### 2. إعدادات المشروع
- Node.js 14+ 
- npm أو yarn
- Git

---

## 🚀 النشر على Railway

### 1. رفع الكود إلى GitHub
```bash
# إضافة جميع الملفات
git add .

# عمل commit
git commit -m "Prepare for deployment"

# رفع إلى GitHub
git push origin main
```

### 2. ربط المشروع بـ Railway
1. اذهب إلى [Railway Dashboard](https://railway.app/dashboard)
2. انقر على "New Project"
3. اختر "Deploy from GitHub repo"
4. اختر repository المشروع
5. انتظر حتى يكتمل النشر

### 3. إعداد المتغيرات البيئية
في Railway Dashboard، اذهب إلى Variables tab وأضف:

#### المتغيرات المطلوبة:
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-here
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://your-admin-domain.com
```

#### المتغيرات الاختيارية:
```env
JWT_EXPIRES_IN=24h
MAX_FILE_SIZE=10485760
LOG_LEVEL=info
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. إعادة النشر
بعد إعداد المتغيرات:
1. اذهب إلى Deployments tab
2. انقر على "Redeploy"
3. انتظر حتى يكتمل النشر

---

## 🔧 إعدادات النشر

### ملف railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 30,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10,
    "numReplicas": 1
  }
}
```

### ملف package.json
```json
{
  "name": "the-flow-api",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
```

### ملف Procfile
```
web: npm start
```

---

## 🧪 اختبار النشر

### 1. اختبار الاتصال الأساسي
```bash
curl https://your-railway-app.railway.app/health
```

**الاستجابة المتوقعة:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "environment": "production",
  "uptime": 123.456
}
```

### 2. اختبار API Status
```bash
curl https://your-railway-app.railway.app/api
```

**الاستجابة المتوقعة:**
```json
{
  "message": "API is running",
  "version": "1.0.0",
  "environment": "production"
}
```

### 3. اختبار تسجيل الدخول
```bash
curl -X POST https://your-railway-app.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### 4. اختبار إنشاء طلب
```bash
curl -X POST https://your-railway-app.railway.app/api/requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "phone": "+966501234567",
    "service": "تصميم موقع",
    "message": "أريد موقع احترافي",
    "budget": 10000
  }'
```

---

## 🔄 إعادة النشر

### الطريقة الأولى: من Railway Dashboard
1. اذهب إلى Railway Dashboard
2. اختر المشروع
3. اذهب إلى Deployments tab
4. انقر على "Redeploy"

### الطريقة الثانية: من GitHub
```bash
# تحديث الكود
git add .
git commit -m "Update for redeployment"
git push origin main
```

### الطريقة الثالثة: من Terminal
```bash
# تثبيت Railway CLI
npm install -g @railway/cli

# تسجيل الدخول
railway login

# ربط المشروع
railway link

# النشر
railway up
```

---

## 🚨 حل المشاكل الشائعة

### 1. خطأ في البناء (Build Error)
**المشكلة:** فشل في تثبيت التبعيات
**الحل:**
- تأكد من صحة package.json
- تحقق من إصدار Node.js
- راجع Railway logs

### 2. خطأ في التشغيل (Runtime Error)
**المشكلة:** فشل في بدء التطبيق
**الحل:**
- تحقق من المتغيرات البيئية
- راجع Railway logs
- تأكد من صحة نقطة البداية

### 3. خطأ في Health Check
**المشكلة:** فشل في health check
**الحل:**
- تأكد من صحة المسار `/health`
- تحقق من إعدادات healthcheckPath
- راجع Railway logs

### 4. خطأ في CORS
**المشكلة:** مشاكل في Cross-Origin
**الحل:**
- تأكد من إعداد ALLOWED_ORIGINS
- تحقق من إعدادات CORS في الكود

---

## 📊 مراقبة الأداء

### Railway Metrics
- **CPU Usage**: مراقبة استخدام المعالج
- **Memory Usage**: مراقبة استخدام الذاكرة
- **Network**: مراقبة حركة الشبكة
- **Logs**: مراجعة السجلات

### Health Monitoring
```bash
# اختبار دوري للـ health check
curl https://your-railway-app.railway.app/health
```

---

## 🔐 الأمان

### 1. JWT Secret
- استخدم secret قوي ومعقد
- لا تشارك JWT_SECRET في الكود
- استخدم متغيرات بيئية

### 2. CORS
- حدد ALLOWED_ORIGINS بدقة
- لا تستخدم "*" في الإنتاج

### 3. Rate Limiting
- فعّل rate limiting
- اضبط الحدود المناسبة

---

## 📞 الدعم

### Railway Support
- [Railway Documentation](https://docs.railway.app/)
- [Railway Discord](https://discord.gg/railway)

### المشروع
- راجع ملفات التوثيق
- تحقق من Railway logs
- راجع GitHub issues

---

## 🔄 التحديثات المستقبلية

### إعادة النشر التلقائي
1. ربط GitHub repository
2. تفعيل auto-deploy
3. كل push سيؤدي إلى إعادة نشر تلقائي

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Railway
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: railway/deploy@v1
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
```

---

*آخر تحديث: يناير 2024* 
# دليل النشر - The Flow API

## 🚀 خيارات النشر

### 1. Heroku (موصى به للمبتدئين)

#### التثبيت
```bash
# تثبيت Heroku CLI
npm install -g heroku

# تسجيل الدخول
heroku login
```

#### النشر
```bash
# إنشاء تطبيق جديد
heroku create your-app-name

# إضافة متغيرات البيئة
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-production-secret-key
heroku config:set PORT=5000

# نشر التطبيق
git push heroku main

# فتح التطبيق
heroku open
```

#### إعدادات إضافية
```bash
# إضافة addon للـ database (اختياري)
heroku addons:create mongolab:sandbox

# مراقبة الـ logs
heroku logs --tail
```

### 2. Vercel (سريع وسهل)

#### التثبيت
```bash
# تثبيت Vercel CLI
npm install -g vercel
```

#### النشر
```bash
# تسجيل الدخول
vercel login

# نشر التطبيق
vercel

# أو للنشر في production
vercel --prod
```

#### إعدادات Vercel
أنشئ ملف `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

### 3. Railway (مجاني للمشاريع الصغيرة)

#### التثبيت
```bash
# تثبيت Railway CLI
npm install -g @railway/cli
```

#### النشر
```bash
# تسجيل الدخول
railway login

# ربط المشروع
railway link

# نشر التطبيق
railway up

# فتح التطبيق
railway open
```

### 4. Render (مجاني ومتطور)

#### النشر عبر GitHub
1. ارفع المشروع إلى GitHub
2. اذهب إلى [render.com](https://render.com)
3. اربط حساب GitHub
4. اختر "New Web Service"
5. اختر repository المشروع
6. إعدادات النشر:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV=production`
     - `JWT_SECRET=your-secret-key`

### 5. DigitalOcean App Platform

#### النشر
1. اذهب إلى [DigitalOcean](https://digitalocean.com)
2. اختر "Apps"
3. اربط GitHub repository
4. إعدادات النشر:
   - **Source**: GitHub
   - **Branch**: main
   - **Build Command**: `npm install`
   - **Run Command**: `npm start`

## 🔧 إعدادات البيئة

### متغيرات البيئة المطلوبة
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Database (إذا كنت تستخدم قاعدة بيانات)
DATABASE_URL=your-database-url

# CORS (اختياري)
CORS_ORIGIN=https://your-frontend-domain.com
```

### إعدادات الأمان
```env
# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security Headers
HELMET_ENABLED=true
CORS_ENABLED=true
```

## 📊 مراقبة الأداء

### Heroku
```bash
# مراقبة الـ logs
heroku logs --tail

# مراقبة الأداء
heroku addons:open scout

# مراقبة الأخطاء
heroku addons:open papertrail
```

### Vercel
```bash
# مراقبة الـ logs
vercel logs

# مراقبة الأداء
vercel analytics
```

### Railway
```bash
# مراقبة الـ logs
railway logs

# مراقبة الأداء
railway status
```

## 🔍 اختبار النشر

### اختبار الـ API
```bash
# اختبار الخادم
curl https://your-app-name.herokuapp.com/api

# اختبار المصادقة
curl -X POST https://your-app-name.herokuapp.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### اختبار الموقع
افتح المتصفح واذهب إلى:
```
https://your-app-name.herokuapp.com
```

## 🛠️ استكشاف الأخطاء

### مشاكل شائعة

#### 1. الخادم لا يبدأ
```bash
# تحقق من الـ logs
heroku logs --tail

# تحقق من متغيرات البيئة
heroku config
```

#### 2. خطأ في الـ build
```bash
# تحقق من package.json
npm install

# تحقق من الـ dependencies
npm audit
```

#### 3. مشاكل في الـ CORS
```javascript
// في app.js
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
```

#### 4. مشاكل في الـ JWT
```bash
# تأكد من وجود JWT_SECRET
heroku config:get JWT_SECRET

# إعادة تعيين JWT_SECRET
heroku config:set JWT_SECRET=new-secret-key
```

## 📈 تحسين الأداء

### 1. Compression
```bash
npm install compression
```

```javascript
// في app.js
const compression = require('compression');
app.use(compression());
```

### 2. Caching
```javascript
// في app.js
app.use(express.static('public', {
  maxAge: '1d',
  etag: true
}));
```

### 3. Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
// في app.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

## 🔒 الأمان

### 1. Helmet
```bash
npm install helmet
```

```javascript
// في app.js
const helmet = require('helmet');
app.use(helmet());
```

### 2. HTTPS
```javascript
// في server.js
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

### 3. Environment Variables
```bash
# تأكد من عدم رفع .env
echo ".env" >> .gitignore

# إضافة متغيرات البيئة في المنصة
heroku config:set NODE_ENV=production
```

## 📞 الدعم

### Heroku
- [Heroku Documentation](https://devcenter.heroku.com/)
- [Heroku Support](https://help.heroku.com/)

### Vercel
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

### Railway
- [Railway Documentation](https://docs.railway.app/)
- [Railway Support](https://railway.app/support)

---

**🎯 تذكر**: اختر المنصة التي تناسب احتياجاتك وميزانيتك. Heroku و Vercel خيارات ممتازة للمبتدئين! 
# دليل حل المشاكل - The Flow API

## 🚨 المشاكل الشائعة وحلولها

### المشكلة: الخادم لا يبدأ
**الحل:**
1. تأكد من تثبيت Node.js
2. قم بتشغيل: `npm install`
3. استخدم الملف المبسط: `node test_simple.js`

### المشكلة: الموقع لا يفتح
**الحل:**
1. تأكد من أن الخادم يعمل على port 5000
2. افتح المتصفح واذهب إلى: `http://localhost:5000`
3. تحقق من console للـ errors

### المشكلة: API لا يستجيب
**الحل:**
1. تحقق من أن جميع الـ dependencies مثبتة
2. تأكد من صحة الـ routes
3. تحقق من الـ CORS settings

## 🔧 خطوات التشغيل السريع

### 1. تشغيل الخادم المبسط
```bash
node test_simple.js
```

### 2. تشغيل الخادم الكامل
```bash
node server.js
```

### 3. تشغيل باستخدام npm
```bash
npm start
```

## 📋 فحص المتطلبات

### 1. تأكد من تثبيت Node.js
```bash
node --version
npm --version
```

### 2. تأكد من تثبيت التبعيات
```bash
npm install
```

### 3. تحقق من وجود الملفات المطلوبة
- ✅ `package.json`
- ✅ `server.js`
- ✅ `app.js`
- ✅ `public/index.html`
- ✅ `controllers/`
- ✅ `routes/`
- ✅ `middleware/`

## 🛠️ حل المشاكل خطوة بخطوة

### الخطوة 1: فحص Node.js
```bash
node --version
```
إذا لم يعمل، قم بتثبيت Node.js من: https://nodejs.org/

### الخطوة 2: تثبيت التبعيات
```bash
npm install
```

### الخطوة 3: تشغيل الخادم المبسط
```bash
node test_simple.js
```

### الخطوة 4: فتح الموقع
اذهب إلى: `http://localhost:5000`

### الخطوة 5: اختبار الـ API
اذهب إلى: `http://localhost:5000/api/test`

## 🔍 فحص الأخطاء

### 1. تحقق من console
افتح Developer Tools في المتصفح وانتقل إلى Console

### 2. تحقق من Network tab
تحقق من الـ requests في Network tab

### 3. تحقق من Terminal
انظر إلى الـ output في الـ terminal

## 📞 رسائل الخطأ الشائعة

### "Cannot find module"
**الحل:** قم بتشغيل `npm install`

### "Port already in use"
**الحل:** 
1. أوقف الخادم: `Ctrl + C`
2. أو استخدم port آخر: `PORT=3000 node server.js`

### "CORS error"
**الحل:** تأكد من أن CORS middleware مفعل في `app.js`

## 🎯 اختبار سريع

### 1. اختبار الخادم
```bash
curl http://localhost:5000/api/test
```

### 2. اختبار الموقع
افتح: `http://localhost:5000`

### 3. اختبار الـ API
افتح: `http://localhost:5000/api/test`

## 📱 تشغيل على الهاتف

### 1. معرفة IP الكمبيوتر
```bash
ipconfig
```

### 2. تشغيل الخادم على جميع الـ interfaces
```javascript
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3. الوصول من الهاتف
اذهب إلى: `http://YOUR_IP:5000`

## 🚀 نصائح للتطوير

### 1. استخدم nodemon للتطوير
```bash
npm install -g nodemon
nodemon server.js
```

### 2. استخدم Postman لاختبار الـ API
- قم بتحميل Postman
- أنشئ requests للـ endpoints
- اختبر الـ responses

### 3. استخدم Browser DevTools
- افتح Developer Tools
- انتقل إلى Network tab
- راقب الـ requests والـ responses

## 📞 الدعم

إذا استمرت المشكلة:

1. **تحقق من الـ logs** في الـ terminal
2. **افتح console** في المتصفح
3. **تحقق من الـ network** في DevTools
4. **أعد تشغيل الخادم** بعد التعديلات

---

**🎯 تذكر**: الخادم المبسط `test_simple.js` مصمم للاختبار السريع. استخدمه إذا واجهت مشاكل مع الخادم الكامل. 
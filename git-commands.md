# 🚀 أوامر Git الجاهزة لرفع المشروع

## 📋 الأوامر الأساسية

### 1. تهيئة المشروع
```bash
# تهيئة Git
git init

# إضافة جميع الملفات
git add .

# إنشاء commit أولي
git commit -m "Initial commit: The Flow API - نظام API شامل ومتطور"

# تغيير اسم الفرع إلى main
git branch -M main
```

### 2. ربط المشروع بـ GitHub
```bash
# إضافة remote origin (استبدل YOUR_USERNAME باسم المستخدم)
git remote add origin https://github.com/YOUR_USERNAME/the-flow-api.git

# رفع المشروع
git push -u origin main
```

## 🔧 أوامر مفيدة

### عرض حالة المشروع
```bash
git status
```

### عرض التغييرات
```bash
git diff
```

### عرض الـ commits
```bash
git log --oneline
```

### عرض الـ remote
```bash
git remote -v
```

## 📝 أوامر التحديث

### إضافة تغييرات جديدة
```bash
# إضافة جميع التغييرات
git add .

# إنشاء commit
git commit -m "Update: وصف التحديث"

# رفع التغييرات
git push
```

### إضافة ملف واحد
```bash
# إضافة ملف محدد
git add filename.js

# إنشاء commit
git commit -m "feat: إضافة ملف جديد"

# رفع التغييرات
git push
```

## 🌿 أوامر الـ Branches

### إنشاء branch جديد
```bash
# إنشاء branch جديد
git checkout -b feature/new-feature

# رفع branch جديد
git push -u origin feature/new-feature
```

### التبديل بين branches
```bash
# التبديل إلى main
git checkout main

# التبديل إلى branch آخر
git checkout feature/new-feature
```

### دمج branch
```bash
# التبديل إلى main
git checkout main

# دمج branch
git merge feature/new-feature

# رفع التغييرات
git push
```

## 🔄 أوامر التحديث

### جلب التحديثات
```bash
# جلب التحديثات من GitHub
git pull origin main
```

### إعادة تعيين المشروع
```bash
# حذف Git وإعادة تهيئة
rm -rf .git
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/the-flow-api.git
git push -u origin main
```

## 🛠️ أوامر الإعداد

### تكوين Git
```bash
# تعيين اسم المستخدم
git config --global user.name "Your Name"

# تعيين البريد الإلكتروني
git config --global user.email "your-email@example.com"

# عرض الإعدادات
git config --list
```

### إعداد Authentication
```bash
# حفظ credentials
git config --global credential.helper store

# أو استخدام cache
git config --global credential.helper cache
```

## 🚨 أوامر الطوارئ

### إلغاء آخر commit
```bash
git reset --soft HEAD~1
```

### إلغاء التغييرات في ملف
```bash
git checkout -- filename.js
```

### إلغاء جميع التغييرات
```bash
git reset --hard HEAD
```

### حذف ملف من Git
```bash
git rm filename.js
git commit -m "Remove: حذف ملف"
git push
```

## 📊 أوامر المعلومات

### عرض معلومات Repository
```bash
# عرض الـ remote URLs
git remote -v

# عرض الـ branches
git branch -a

# عرض الـ tags
git tag
```

### عرض الـ history
```bash
# عرض الـ commits مع التفاصيل
git log

# عرض الـ commits بشكل مختصر
git log --oneline

# عرض الـ commits مع الرسوم البيانية
git log --graph --oneline --all
```

## 🎯 أوامر متقدمة

### إنشاء tag
```bash
# إنشاء tag للإصدار
git tag v1.0.0

# رفع tags
git push origin --tags
```

### Stash التغييرات
```bash
# حفظ التغييرات مؤقتاً
git stash

# عرض الـ stashes
git stash list

# تطبيق آخر stash
git stash pop
```

### Cherry-pick
```bash
# تطبيق commit محدد
git cherry-pick commit-hash
```

## 📝 أمثلة عملية

### مثال 1: رفع تحديث بسيط
```bash
git add .
git commit -m "feat: إضافة نظام المصادقة المحسن"
git push
```

### مثال 2: إنشاء feature جديد
```bash
git checkout -b feature/admin-dashboard
# قم بالتعديلات
git add .
git commit -m "feat: إضافة لوحة تحكم للـ admin"
git push -u origin feature/admin-dashboard
```

### مثال 3: إصلاح bug
```bash
git checkout -b fix/login-issue
# قم بالإصلاحات
git add .
git commit -m "fix: إصلاح مشكلة في تسجيل الدخول"
git push -u origin fix/login-issue
```

## 🔍 استكشاف الأخطاء

### مشكلة في الـ authentication
```bash
# إعادة إعداد credentials
git config --global credential.helper store
git push
# أدخل username و token
```

### مشكلة في الـ remote
```bash
# إعادة إضافة remote
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/the-flow-api.git
git push -u origin main
```

### مشكلة في الـ merge
```bash
# حل conflicts
git pull origin main
# حل الـ conflicts يدوياً
git add .
git commit -m "fix: حل conflicts"
git push
```

---

**🎯 تذكر**: استبدل `YOUR_USERNAME` باسم المستخدم الحقيقي على GitHub!

**🚀 جاهز للاستخدام**: انسخ الأوامر التي تحتاجها وعدل المعلومات المطلوبة! 
#!/bin/bash

# 🚀 سكريبت إعادة النشر - The Flow API
# هذا السكريبت يقوم بإعداد وإعادة نشر المشروع على Railway

echo "🚀 بدء عملية إعادة النشر..."

# التحقق من وجود Git
if ! command -v git &> /dev/null; then
    echo "❌ Git غير مثبت. يرجى تثبيت Git أولاً."
    exit 1
fi

# التحقق من وجود Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً."
    exit 1
fi

# التحقق من وجود npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm غير مثبت. يرجى تثبيت npm أولاً."
    exit 1
fi

echo "✅ التحقق من المتطلبات الأساسية مكتمل"

# تثبيت التبعيات
echo "📦 تثبيت التبعيات..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ فشل في تثبيت التبعيات"
    exit 1
fi

echo "✅ تم تثبيت التبعيات بنجاح"

# اختبار التطبيق محلياً
echo "🧪 اختبار التطبيق محلياً..."
npm start &
SERVER_PID=$!

# انتظار بدء الخادم
sleep 5

# اختبار الاتصال
if curl -s http://localhost:5000/health > /dev/null; then
    echo "✅ التطبيق يعمل محلياً بنجاح"
else
    echo "❌ فشل في تشغيل التطبيق محلياً"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# إيقاف الخادم المحلي
kill $SERVER_PID 2>/dev/null

# إضافة التغييرات إلى Git
echo "📝 إضافة التغييرات إلى Git..."
git add .

# عمل commit
echo "💾 عمل commit..."
git commit -m "Update for redeployment - $(date)"

# رفع إلى GitHub
echo "⬆️ رفع إلى GitHub..."
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ فشل في رفع الكود إلى GitHub"
    exit 1
fi

echo "✅ تم رفع الكود إلى GitHub بنجاح"

# التحقق من وجود Railway CLI
if command -v railway &> /dev/null; then
    echo "🚂 إعادة النشر باستخدام Railway CLI..."
    railway up
else
    echo "ℹ️ Railway CLI غير مثبت. يرجى إعادة النشر يدوياً من Railway Dashboard"
    echo "🔗 اذهب إلى: https://railway.app/dashboard"
fi

echo "🎉 عملية إعادة النشر مكتملة!"
echo "📋 الخطوات التالية:"
echo "1. انتظر حتى يكتمل النشر على Railway"
echo "2. تحقق من المتغيرات البيئية في Railway Dashboard"
echo "3. اختبر التطبيق باستخدام:"
echo "   curl https://your-railway-app.railway.app/health"
echo "4. راجع Railway logs إذا واجهت أي مشاكل" 
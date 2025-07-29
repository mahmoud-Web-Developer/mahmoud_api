# 🚀 دليل سريع للـ APIs

## 📋 ملخص سريع لجميع الـ Endpoints

### 🔐 المصادقة (Authentication)
| الطريقة | المسار | الوصف | المصادقة |
|---------|--------|-------|----------|
| POST | `/auth/signup` | تسجيل مستخدم جديد | ❌ |
| POST | `/auth/login` | تسجيل الدخول | ❌ |
| POST | `/auth/refresh-token` | تحديث التوكن | ❌ |
| POST | `/auth/logout` | تسجيل الخروج | ✅ |
| GET | `/auth/profile` | الملف الشخصي | ✅ |
| GET | `/auth/users` | جميع المستخدمين | ✅ |
| GET | `/auth/users/search` | البحث في المستخدمين | ✅ |
| GET | `/auth/users/:id` | مستخدم محدد | ✅ |
| PATCH | `/auth/users/:id/status` | تحديث حالة المستخدم | ✅ |
| DELETE | `/auth/users/:id` | حذف مستخدم | ✅ |

### 📊 لوحة التحكم (Dashboard)
| الطريقة | المسار | الوصف | المصادقة |
|---------|--------|-------|----------|
| GET | `/dashboard/stats` | إحصائيات لوحة التحكم | ✅ |
| GET | `/dashboard/projects` | المشاريع الحالية | ✅ |
| POST | `/dashboard/projects` | إنشاء مشروع جديد | ✅ |
| PUT | `/dashboard/projects/:id` | تحديث مشروع | ✅ |
| DELETE | `/dashboard/projects/:id` | حذف مشروع | ✅ |
| GET | `/dashboard/users` | جميع المستخدمين | ✅ |
| POST | `/dashboard/users` | إنشاء مستخدم جديد | ✅ |
| PUT | `/dashboard/users/:id` | تحديث مستخدم | ✅ |
| DELETE | `/dashboard/users/:id` | حذف مستخدم | ✅ |
| GET | `/dashboard/requests` | جميع الطلبات | ✅ |
| POST | `/dashboard/requests` | إنشاء طلب جديد | ❌ |
| GET | `/dashboard/activity` | النشاطات الأخيرة | ✅ |
| GET | `/dashboard/settings` | إعدادات لوحة التحكم | ✅ |
| PUT | `/dashboard/settings` | تحديث الإعدادات | ✅ |

### 📝 إدارة المحتوى (Content Management)
| الطريقة | المسار | الوصف | المصادقة |
|---------|--------|-------|----------|
| GET | `/content/services` | جميع الخدمات | ❌ |
| POST | `/content/services` | إنشاء خدمة جديدة | ✅ |
| PUT | `/content/services/:id` | تحديث خدمة | ✅ |
| DELETE | `/content/services/:id` | حذف خدمة | ✅ |
| GET | `/content/portfolio` | جميع المشاريع | ❌ |
| POST | `/content/portfolio` | إنشاء مشروع جديد | ✅ |
| PUT | `/content/portfolio/:id` | تحديث مشروع | ✅ |
| DELETE | `/content/portfolio/:id` | حذف مشروع | ✅ |
| GET | `/content/news` | جميع الأخبار | ❌ |
| POST | `/content/news` | إنشاء خبر جديد | ✅ |
| PUT | `/content/news/:id` | تحديث خبر | ✅ |
| DELETE | `/content/news/:id` | حذف خبر | ✅ |

### 📋 إدارة الطلبات (Requests Management)
| الطريقة | المسار | الوصف | المصادقة |
|---------|--------|-------|----------|
| GET | `/requests` | جميع الطلبات | ✅ |
| POST | `/requests` | إنشاء طلب جديد | ❌ |
| GET | `/requests/:id` | طلب محدد | ✅ |
| PUT | `/requests/:id` | تحديث طلب | ✅ |
| DELETE | `/requests/:id` | حذف طلب | ✅ |
| GET | `/requests/search` | البحث في الطلبات | ✅ |

### 👥 إدارة العملاء (Clients Management)
| الطريقة | المسار | الوصف | المصادقة |
|---------|--------|-------|----------|
| GET | `/clients` | جميع العملاء | ✅ |
| POST | `/clients` | إضافة عميل جديد | ✅ |
| GET | `/clients/:id` | عميل محدد | ✅ |
| PUT | `/clients/:id` | تحديث عميل | ✅ |
| DELETE | `/clients/:id` | حذف عميل | ✅ |
| GET | `/clients/search` | البحث في العملاء | ✅ |

### 📁 إدارة المشاريع (Projects Management)
| الطريقة | المسار | الوصف | المصادقة |
|---------|--------|-------|----------|
| GET | `/projects` | جميع المشاريع | ✅ |
| POST | `/projects` | إنشاء مشروع جديد | ✅ |
| GET | `/projects/:id` | مشروع محدد | ✅ |
| PUT | `/projects/:id` | تحديث مشروع | ✅ |
| DELETE | `/projects/:id` | حذف مشروع | ✅ |
| GET | `/projects/search` | البحث في المشاريع | ✅ |

### 📅 إدارة الاجتماعات (Meetings Management)
| الطريقة | المسار | الوصف | المصادقة |
|---------|--------|-------|----------|
| GET | `/meetings` | جميع الاجتماعات | ✅ |
| POST | `/meetings` | جدولة اجتماع جديد | ✅ |
| GET | `/meetings/:id` | اجتماع محدد | ✅ |
| PUT | `/meetings/:id` | تحديث اجتماع | ✅ |
| DELETE | `/meetings/:id` | إلغاء اجتماع | ✅ |
| GET | `/meetings/today` | اجتماعات اليوم | ✅ |

### 🔔 إدارة الإشعارات (Notifications Management)
| الطريقة | المسار | الوصف | المصادقة |
|---------|--------|-------|----------|
| GET | `/notifications` | جميع الإشعارات | ✅ |
| POST | `/notifications` | إنشاء إشعار جديد | ✅ |
| GET | `/notifications/:id` | إشعار محدد | ✅ |
| PUT | `/notifications/:id/read` | تحديث حالة الإشعار | ✅ |
| DELETE | `/notifications/:id` | حذف إشعار | ✅ |
| GET | `/notifications/unread` | الإشعارات غير المقروءة | ✅ |

### 👨‍💼 إدارة الإدارة (Admin Management)
| الطريقة | المسار | الوصف | المصادقة |
|---------|--------|-------|----------|
| GET | `/admin/stats` | إحصائيات النظام | ✅ |
| GET | `/admin/users` | إدارة المستخدمين | ✅ |
| POST | `/admin/users` | إنشاء مستخدم | ✅ |
| PUT | `/admin/users/:id` | تحديث مستخدم | ✅ |
| DELETE | `/admin/users/:id` | حذف مستخدم | ✅ |
| GET | `/admin/settings` | إعدادات النظام | ✅ |
| PUT | `/admin/settings` | تحديث إعدادات النظام | ✅ |
| GET | `/admin/logs` | سجلات النظام | ✅ |

---

## 🔑 رموز المصادقة

| الرمز | المعنى |
|-------|--------|
| ✅ | مطلوب مصادقة (JWT Token) |
| ❌ | لا يحتاج مصادقة |

---

## 📊 حالات الطلبات

| الحالة | الوصف |
|--------|-------|
| `pending` | في انتظار المراجعة |
| `in-progress` | قيد التنفيذ |
| `completed` | مكتمل |
| `rejected` | مرفوض |

---

## 🎨 أنواع المحتوى

### الخدمات
- `web-design` - تصميم المواقع
- `mobile-app` - تطبيقات الموبايل
- `graphic-design` - التصميم الجرافيكي
- `marketing` - التسويق الرقمي
- `consulting` - الاستشارات

### المشاريع
- `web-design` - تصميم المواقع
- `mobile-app` - تطبيقات الموبايل
- `branding` - الهوية البصرية
- `marketing` - التسويق الرقمي

### الأخبار
- `general` - عام
- `technology` - تقنية
- `business` - أعمال
- `design` - تصميم

---

## 🔧 أمثلة سريعة

### تسجيل الدخول
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### إنشاء طلب جديد
```bash
curl -X POST http://localhost:5000/requests \
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

### عرض الإحصائيات
```bash
curl -X GET http://localhost:5000/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🚨 رموز الأخطاء الشائعة

| الكود | المعنى | الحل |
|-------|--------|------|
| 401 | غير مصرح | تأكد من إرسال JWT Token صحيح |
| 403 | ممنوع | تأكد من الصلاحيات المطلوبة |
| 404 | غير موجود | تأكد من صحة المسار |
| 422 | بيانات غير صالحة | تأكد من صحة البيانات المرسلة |

---

*آخر تحديث: يناير 2024* 
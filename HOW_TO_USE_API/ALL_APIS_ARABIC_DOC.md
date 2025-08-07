# توثيق جميع مسارات الـ API بالتفصيل

هذا الملف يشرح كل مسار في الـ API مع أمثلة للمدخلات والمخرجات (input/output) وأمثلة عملية.

---

## 1. المصادقة (Authentication)

### تسجيل مستخدم جديد
**POST** `/auth/signup`
- **Body:**
```json
{
  "name": "اسم المستخدم",
  "email": "user@email.com",
  "password": "كلمة_المرور"
}
```
- **Response:**
```json
{
  "id": 1,
  "name": "اسم المستخدم",
  "email": "user@email.com"
}
```

### تسجيل الدخول
**POST** `/auth/login`
- **Body:**
```json
{
  "email": "user@email.com",
  "password": "كلمة_المرور"
}
```
- **Response:**
```json
{
  "token": "رمز_الدخول_JWT"
}
```

---

## 2. الخدمات (Services)

### جلب جميع الخدمات
**GET** `/services`
- **Response:**
```json
[
  { "id": 1, "name": "خدمة 1", ... },
  { "id": 2, "name": "خدمة 2", ... }
]
```

---

## 3. البورتفوليو (Portfolio)

### جلب جميع عناصر البورتفوليو
**GET** `/portfolio`
- **Response:**
```json
[
  { "id": 1, "title": "مشروع 1", ... },
  { "id": 2, "title": "مشروع 2", ... }
]
```

---

## 4. الأخبار (News)

### جلب آخر الأخبار
**GET** `/news`
- **Response:**
```json
[
  { "id": 1, "title": "خبر 1", ... },
  { "id": 2, "title": "خبر 2", ... }
]
```

---

## 5. طلبات التواصل (Contact Requests)

### إرسال طلب تواصل
**POST** `/contact-requests`
- **Body:**
```json
{
  "name": "اسمك",
  "email": "بريدك",
  "message": "رسالتك"
}
```
- **Response:**
```json
{
  "id": 1,
  "name": "اسمك",
  "email": "بريدك",
  "message": "رسالتك",
  ...
}
```

---

## 6. الاجتماعات (Meetings)

### جلب أوقات الاجتماعات المتاحة
**GET** `/meetings/slots`
- **Response:**
```json
[
  "2025-08-10T10:00",
  "2025-08-10T11:00"
]
```

### حجز اجتماع
**POST** `/meetings`
- **Body:**
```json
{
  "name": "اسمك",
  "email": "بريدك",
  "subject": "موضوع الاجتماع",
  "preferredDate": "2025-08-10"
}
```
- **Response:**
```json
{
  "id": 1,
  "name": "اسمك",
  "email": "بريدك",
  "subject": "موضوع الاجتماع",
  "preferredDate": "2025-08-10",
  ...
}
```

---

## 7. Briefs

### إرسال Brief جديد
**POST** `/briefs`
- **Body:**
```json
{
  "name": "اسمك",
  "email": "بريدك",
  "projectName": "اسم المشروع",
  "description": "وصف المشروع"
}
```
- **Response:**
```json
{
  "id": 1,
  "name": "اسمك",
  "email": "بريدك",
  "projectName": "اسم المشروع",
  "description": "وصف المشروع",
  ...
}
```

---

## 8. لوحة التحكم (Dashboard)

### جلب بيانات لوحة التحكم
**GET** `/dashboard`
- **Response:**
```json
{
  "totalClients": 10,
  "totalProjects": 5,
  ...
}
```

---

## 9. الطلبات (Requests)

### بدء طلب تواصل
**POST** `/requests/contact`
- **Body:** مثل `/contact-requests`
- **Response:** مثل `/contact-requests`

### بدء طلب اجتماع
**POST** `/requests/meeting`
- **Body:** مثل `/meetings`
- **Response:** مثل `/meetings`

### بدء طلب Brief
**POST** `/requests/brief`
- **Body:** مثل `/briefs`
- **Response:** مثل `/briefs`

---

## 10. العملاء (Clients)

### إضافة عميل جديد
**POST** `/clients`
- **Body:**
```json
{
  "companyName": "اسم الشركة",
  "contactPerson": "الشخص المسؤول",
  "mobileNumber": "رقم الهاتف"
}
```
- **Response:**
```json
{
  "id": 1,
  "companyName": "اسم الشركة",
  "contactPerson": "الشخص المسؤول",
  "mobileNumber": "رقم الهاتف",
  ...
}
```

### جلب جميع العملاء
**GET** `/clients`
- **Response:**
```json
[
  { "id": 1, "companyName": "...", ... },
  { "id": 2, "companyName": "...", ... }
]
```

### جلب عميل محدد
**GET** `/clients/:id`
- **Response:**
```json
{
  "id": 1,
  "companyName": "اسم الشركة",
  ...
}
```

---

## 11. المشاريع (Projects)

### جلب جميع المشاريع
**GET** `/projects`
- **Response:**
```json
[
  { "id": 1, "name": "مشروع 1", ... },
  { "id": 2, "name": "مشروع 2", ... }
]
```

### جلب إحصائيات المشاريع
**GET** `/projects/stats`
- **Response:**
```json
{
  "total": 10,
  "completed": 7,
  ...
}
```

### جلب مشروع محدد
**GET** `/projects/:id`
- **Response:**
```json
{
  "id": 1,
  "name": "مشروع 1",
  ...
}
```

### إنشاء مشروع جديد
**POST** `/projects`
- **Body:**
```json
{
  "name": "اسم المشروع",
  "description": "وصف المشروع"
}
```
- **Response:**
```json
{
  "id": 1,
  "name": "اسم المشروع",
  "description": "وصف المشروع",
  ...
}
```

### تحديث مشروع
**PUT** `/projects/:id`
- **Body:**
```json
{
  "name": "اسم جديد",
  "description": "وصف جديد"
}
```
- **Response:**
```json
{
  "id": 1,
  "name": "اسم جديد",
  "description": "وصف جديد",
  ...
}
```

### حذف مشروع
**DELETE** `/projects/:id`
- **Response:**
```json
{
  "id": 1,
  "name": "اسم المشروع",
  ...
}
```

### تحديث حالة المشروع
**PATCH** `/projects/:id/status`
- **Body:**
```json
{
  "status": "الحالة الجديدة"
}
```
- **Response:**
```json
{
  "id": 1,
  "status": "الحالة الجديدة",
  ...
}
```

---

## 12. فحص صحة النظام (Health)

### فحص صحة النظام
**GET** `/health`
- **Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-08-07T12:00:00Z",
  ...
}
```

---

## 13. معلومات الـ API

### معلومات الـ API
**GET** `/api`
- **Response:**
```json
{
  "message": "API is running",
  "version": "1.0.0",
  ...
}
```

---

## 14. الأخطاء (Error Handling)

- في حالة الخطأ، يكون الرد بهذا الشكل:
```json
{
  "error": "رسالة الخطأ"
}
```

---

لأي استفسار أو تفاصيل إضافية، راجع ملفات التوثيق الأخرى أو تواصل مع فريق التطوير.

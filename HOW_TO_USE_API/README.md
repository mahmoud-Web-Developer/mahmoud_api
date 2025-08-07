# كيفية استخدام واجهة برمجة التطبيقات (API)

هذا الدليل يوضح لك كيفية استخدام الـ API الخاص بمشروع The Flow خطوة بخطوة، مع أمثلة عملية.

---

## 1. المتطلبات الأساسية
- يجب أن يكون لديك رابط الـ API: https://mahmoudapi-production.up.railway.app
- يمكنك استخدام Postman أو cURL أو أي أداة مشابهة لإرسال الطلبات.

---

## 2. المصادقة (Authentication)
بعض المسارات تتطلب تسجيل الدخول والحصول على رمز JWT.

### تسجيل مستخدم جديد
```
POST /auth/signup
```
**الجسم (Body):**
```json
{
  "name": "اسم المستخدم",
  "email": "user@email.com",
  "password": "كلمة_المرور"
}
```

### تسجيل الدخول
```
POST /auth/login
```
**الجسم (Body):**
```json
{
  "email": "user@email.com",
  "password": "كلمة_المرور"
}
```
**الرد:**
```json
{
  "token": "رمز_الدخول_JWT"
}
```
استخدم هذا الرمز في ترويسة الطلبات المحمية:
```
Authorization: Bearer رمز_الدخول_JWT
```

---

## 3. أمثلة على الطلبات

### جلب جميع الخدمات
```
GET /services
```

### إضافة عميل جديد (مثال باستخدام cURL)
```
curl -X POST https://mahmoudapi-production.up.railway.app/clients \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "شركة جديدة",
    "contactPerson": "أحمد",
    "mobileNumber": "01000000000"
  }'
```

### إرسال طلب اجتماع (Postman)
- اختر POST
- الرابط: https://mahmoudapi-production.up.railway.app/requests/meeting
- Body (raw, JSON):
```json
{
  "name": "محمد",
  "email": "mohamed@email.com",
  "subject": "اجتماع عمل",
  "preferredDate": "2025-08-10"
}
```

---

## 4. شكل الردود
- جميع الردود ترجع البيانات فقط (object أو array) بدون message أو success.
- في حالة الخطأ:
```json
{
  "error": "رسالة الخطأ"
}
```

---

## 5. نصائح
- استخدم /health للتأكد أن السيرفر يعمل.
- راجع ملف ALL_APIS.txt أو API_DOCUMENTATION.md لمزيد من التفاصيل عن كل مسار.

---

لأي استفسار أو مشكلة، راجع التوثيق أو تواصل مع فريق التطوير.

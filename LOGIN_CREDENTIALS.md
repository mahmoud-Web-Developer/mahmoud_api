# بيانات تسجيل الدخول المتاحة
## Available Login Credentials

### المستخدم الافتراضي (Default User)

#### بيانات Admin:
- **اسم المستخدم:** `admin`
- **كلمة المرور:** `admin123`
- **البريد الإلكتروني:** `admin@theflow.com`
- **الدور:** `admin`
- **الحالة:** نشط

### كيفية تسجيل الدخول

#### 1. عبر API:
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

#### 2. الاستجابة المتوقعة:
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@theflow.com",
      "role": "admin",
      "lastLogin": "2025-07-27T10:49:52.036Z"
    }
  }
}
```

### استخدام التوكن

بعد تسجيل الدخول، استخدم التوكن في الـ headers:

```bash
GET /api/services
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### الصلاحيات المتاحة

#### Admin Role:
- ✅ الوصول لجميع الخدمات
- ✅ إدارة المستخدمين
- ✅ إدارة المحتوى
- ✅ إدارة النظام
- ✅ عرض الإحصائيات

### اختبار النظام

يمكنك تشغيل اختبار النظام للتأكد من أن بيانات تسجيل الدخول تعمل:

```bash
node test/authTest.js
```

### إنشاء مستخدمين جدد

#### عبر API:
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123",
  "email": "user@example.com"
}
```

#### قواعد إنشاء المستخدمين:
- اسم المستخدم: 3 أحرف على الأقل، أحرف إنجليزية وأرقام وعلامة _ فقط
- كلمة المرور: 6 أحرف على الأقل
- البريد الإلكتروني: تنسيق صحيح (اختياري)

### تحديث التوكن

إذا انتهت صلاحية التوكن، يمكنك تحديثه:

```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### تسجيل الخروج

```bash
POST /api/auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### الحصول على معلومات المستخدم

```bash
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### ملاحظات مهمة

1. **الأمان**: التوكن صالح لمدة ساعة واحدة
2. **التحديث**: يمكن تحديث التوكن باستخدام refresh token
3. **الصلاحيات**: Admin لديه صلاحيات كاملة على النظام
4. **التشفير**: كلمات المرور مشفرة باستخدام bcrypt
5. **التحقق**: النظام يتحقق من صحة البيانات قبل المعالجة

### استكشاف الأخطاء

#### إذا لم تعمل بيانات تسجيل الدخول:

1. **تأكد من صحة البيانات**:
   - اسم المستخدم: `admin`
   - كلمة المرور: `admin123`

2. **تأكد من تنسيق الطلب**:
   ```json
   {
     "username": "admin",
     "password": "admin123"
   }
   ```

3. **تأكد من Content-Type**:
   ```
   Content-Type: application/json
   ```

4. **تشغيل اختبار النظام**:
   ```bash
   node test/authTest.js
   ```

### رسائل الخطأ المحتملة

```json
{
  "success": false,
  "message": "اسم المستخدم أو كلمة المرور غير صحيحة",
  "errors": ["credentials"]
}
```

```json
{
  "success": false,
  "message": "الحساب معطل، يرجى التواصل مع الإدارة",
  "errors": ["account"]
}
```

```json
{
  "success": false,
  "message": "اسم المستخدم وكلمة المرور مطلوبان",
  "errors": ["username", "password"]
}
```

### الخلاصة

✅ **بيانات تسجيل الدخول تعمل بشكل صحيح**
- Username: `admin`
- Password: `admin123`
- Role: `admin`
- Status: `active`

النظام جاهز للاستخدام ويمكن تسجيل الدخول بنجاح باستخدام البيانات المذكورة أعلاه. 
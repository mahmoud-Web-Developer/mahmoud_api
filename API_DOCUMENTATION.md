# The Flow API Documentation

## نظرة عامة (Overview)

هذا الدليل يوضح كيفية استخدام جميع endpoints في The Flow API. جميع الـ responses تأتي بصيغة JSON وتحتوي على حقل `success` لتوضيح نجاح أو فشل العملية.

## Base URL
```
http://localhost:5000
```

## Authentication

### تسجيل مستخدم جديد (Register New User)
```http
POST /auth/signup
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123",
  "email": "test@example.com"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "تم تسجيل المستخدم بنجاح",
  "data": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "بيانات غير صحيحة",
  "errors": [
    "اسم المستخدم يجب أن يكون 3 أحرف على الأقل",
    "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
  ]
}
```

### تسجيل الدخول (Login)
```http
POST /auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com",
      "lastLogin": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### تحديث التوكن (Refresh Token)
```http
POST /auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### تسجيل الخروج (Logout)
```http
POST /auth/logout
Authorization: Bearer <token>
```

### معلومات المستخدم (User Profile)
```http
GET /auth/profile
Authorization: Bearer <token>
```

## Dashboard

### بيانات لوحة التحكم الرئيسية
```http
GET /dashboard
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalServices": 3,
      "totalPortfolio": 2,
      "totalNews": 2,
      "totalContactRequests": 5,
      "totalMeetings": 3,
      "totalBriefs": 2,
      "totalUsers": 10,
      "recentActivity": [...]
    },
    "workStatus": "In Progress",
    "reports": ["Report 1", "Report 2"],
    "workLibrary": ["Doc 1", "Doc 2"]
  }
}
```

### الإحصائيات المفصلة
```http
GET /dashboard/stats?period=month
Authorization: Bearer <token>
```

### النشاطات الأخيرة
```http
GET /dashboard/recent-activity
Authorization: Bearer <token>
```

### التقارير
```http
GET /dashboard/reports?type=requests&period=month
Authorization: Bearer <token>
```

## Admin Management

### إدارة المستخدمين

#### جلب جميع المستخدمين
```http
GET /admin/users?page=1&limit=10&search=test&role=user
Authorization: Bearer <token>
```

#### جلب مستخدم واحد
```http
GET /admin/users/1
Authorization: Bearer <token>
```

#### إنشاء مستخدم جديد
```http
POST /admin/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "user"
}
```

#### تحديث مستخدم
```http
PUT /admin/users/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "updateduser",
  "email": "updated@example.com",
  "role": "moderator",
  "isActive": true
}
```

#### حذف مستخدم
```http
DELETE /admin/users/1
Authorization: Bearer <token>
```

### إدارة الطلبات

#### جلب طلبات التواصل
```http
GET /admin/contact-requests?page=1&limit=10&status=pending
Authorization: Bearer <token>
```

#### تحديث حالة طلب التواصل
```http
PUT /admin/contact-requests/1/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed",
  "notes": "تم التواصل مع العميل بنجاح"
}
```

### إدارة المحتوى

#### جلب جميع الخدمات
```http
GET /admin/services
Authorization: Bearer <token>
```

#### إنشاء خدمة جديدة
```http
POST /admin/services
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "خدمة جديدة",
  "description": "وصف الخدمة الجديدة",
  "isActive": true
}
```

#### تحديث خدمة
```http
PUT /admin/services/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "خدمة محدثة",
  "description": "وصف محدث للخدمة",
  "isActive": false
}
```

#### حذف خدمة
```http
DELETE /admin/services/1
Authorization: Bearer <token>
```

### إحصائيات النظام
```http
GET /admin/system-stats
Authorization: Bearer <token>
```

## Public Services

### الخدمات
```http
GET /services
```

### البورتفوليو
```http
GET /portfolio
```

### الأخبار
```http
GET /news
```

### طلب تواصل
```http
POST /contact-requests
Content-Type: application/json

{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "phone": "+201234567890",
  "message": "أريد التواصل بخصوص مشروع جديد"
}
```

### حجز اجتماع
```http
POST /meetings
Content-Type: application/json

{
  "title": "اجتماع مناقشة المشروع",
  "date": "2024-01-20",
  "time": "14:00",
  "duration": 60,
  "description": "مناقشة تفاصيل المشروع الجديد"
}
```

### إرسال Brief
```http
POST /briefs
Content-Type: application/json

{
  "title": "مشروع موقع إلكتروني",
  "description": "تطوير موقع إلكتروني متكامل",
  "budget": 5000,
  "timeline": 30,
  "requirements": "موقع تفاعلي مع نظام إدارة المحتوى"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "بيانات غير صحيحة",
  "errors": ["خطأ في البيانات المدخلة"]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "لا يوجد token، تم رفض الوصول"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "ليس لديك صلاحية للوصول لهذا القسم"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "المستخدم غير موجود"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "اسم المستخدم موجود بالفعل",
  "errors": ["username"]
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "حدث خطأ في الخادم"
}
```

## Authentication Headers

لجميع الـ protected endpoints، يجب إضافة header التالي:

```http
Authorization: Bearer <your-jwt-token>
```

## Query Parameters

### Pagination
- `page`: رقم الصفحة (default: 1)
- `limit`: عدد العناصر في الصفحة (default: 10, max: 100)

### Filtering
- `search`: البحث في النص
- `status`: تصفية حسب الحالة
- `role`: تصفية حسب الدور
- `period`: الفترة الزمنية (week, month, year)

### Sorting
- `sort`: حقل الترتيب
- `order`: اتجاه الترتيب (asc, desc)

## Rate Limiting

في الإصدارات المستقبلية، سيتم تطبيق rate limiting:
- 100 requests per 15 minutes للـ public endpoints
- 1000 requests per hour للـ authenticated endpoints

## Testing

يمكنك اختبار الـ API باستخدام:

### cURL
```bash
# تسجيل دخول
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# الوصول للـ dashboard
curl -X GET http://localhost:5000/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Postman
1. Import the collection
2. Set the base URL
3. Use the provided examples

### Frontend Integration
```javascript
// تسجيل دخول
const login = async (username, password) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  return response.json();
};

// الوصول للـ dashboard
const getDashboard = async (token) => {
  const response = await fetch('/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
```

## Support

للمساعدة والدعم:
- افتح issue في GitHub
- راجع الـ documentation
- تواصل مع فريق التطوير 
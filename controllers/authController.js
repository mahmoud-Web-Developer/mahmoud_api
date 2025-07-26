const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// مصفوفة لتخزين المستخدمين بشكل مؤقت (بدون قاعدة بيانات)
const users = [];

// دالة تسجيل مستخدم جديد
exports.signup = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  // التحقق من عدم تكرار اسم المستخدم
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }
  // تشفير كلمة المرور
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = { id: users.length + 1, username, password: hashedPassword };
  users.push(user);
  res.status(201).json({ message: 'User registered successfully' });
};

// دالة تسجيل الدخول وإرجاع توكن JWT
exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // مقارنة كلمة المرور المدخلة مع المشفرة
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // إنشاء توكن JWT صالح لمدة ساعة
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}; 
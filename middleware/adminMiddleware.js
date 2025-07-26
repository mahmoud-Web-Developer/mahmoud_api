const jwt = require('jsonwebtoken');

// التحقق من أن المستخدم admin
module.exports = function (req, res, next) {
  try {
    // التحقق من وجود token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'لا يوجد token، تم رفض الوصول' 
      });
    }
    
    // التحقق من صحة token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // التحقق من أن المستخدم admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'ليس لديك صلاحية للوصول لهذا القسم' 
      });
    }
    
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Admin middleware error:', err);
    res.status(401).json({ 
      success: false,
      message: 'Token غير صحيح' 
    });
  }
};

// التحقق من أن المستخدم admin أو user
module.exports.requireAuth = function (req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'لا يوجد token، تم رفض الوصول' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ 
      success: false,
      message: 'Token غير صحيح' 
    });
  }
};

// التحقق من أن المستخدم admin أو moderator
module.exports.requireModerator = function (req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'لا يوجد token، تم رفض الوصول' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    if (decoded.role !== 'admin' && decoded.role !== 'moderator') {
      return res.status(403).json({ 
        success: false,
        message: 'ليس لديك صلاحية للوصول لهذا القسم' 
      });
    }
    
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Moderator middleware error:', err);
    res.status(401).json({ 
      success: false,
      message: 'Token غير صحيح' 
    });
  }
}; 
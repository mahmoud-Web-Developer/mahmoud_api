// مصفوفات فارغة تماماً - لا توجد بيانات وهمية
const services = [];
const portfolio = [];
const news = [];
const contactRequests = [];
const meetings = [];
const briefs = [];
const users = [];
const clients = [];
const projects = []; // مصفوفة جديدة للمشاريع
const requests = [];
const notifications = []; // مصفوفة جديدة للإشعارات

const dashboard = {
  workStatus: 'No Data',
  reports: [],
  workLibrary: []
};

module.exports = {
  services,
  portfolio,
  news,
  contactRequests,
  meetings,
  briefs,
  users,
  clients,
  projects, // تصدير مصفوفة المشاريع
  requests,
  notifications, // تصدير مصفوفة الإشعارات
  dashboard
};

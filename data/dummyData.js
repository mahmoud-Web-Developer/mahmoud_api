// مصفوفات فارغة تماماً - لا توجد بيانات وهمية
const services = [];
const portfolio = [];
const news = [];
const contactRequests = [];
const meetings = [];
const briefs = [];
const users = [];
const clients = [
  {
    id: 1,
    name: "شركة ABC",
    email: "info@abc.com",
    phone: "+966501234567",
    address: "الرياض، المملكة العربية السعودية",
    industry: "التكنولوجيا",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: 2,
    name: "شركة XYZ",
    email: "contact@xyz.com",
    phone: "+966507654321",
    address: "جدة، المملكة العربية السعودية",
    industry: "التجارة الإلكترونية",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
  },
  {
    id: 3,
    name: "شركة DEF",
    email: "hello@def.com",
    phone: "+966509876543",
    address: "الدمام، المملكة العربية السعودية",
    industry: "التسويق",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  }
];
const projects = [
  {
    id: 1,
    title: "تطوير موقع إلكتروني",
    description: "تطوير موقع إلكتروني متكامل لشركة ABC",
    clientId: 1,
    clientName: "شركة ABC",
    assignedTo: "أحمد محمد",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-03-15"),
    budget: 5000,
    priority: "high",
    status: "in-progress",
    progress: 60,
    revenue: 3000,
    completionTime: null,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-02-01")
  },
  {
    id: 2,
    title: "تطوير تطبيق موبايل",
    description: "تطوير تطبيق موبايل للطلبات",
    clientId: 2,
    clientName: "شركة XYZ",
    assignedTo: "سارة أحمد",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-04-01"),
    budget: 8000,
    priority: "medium",
    status: "pending",
    progress: 0,
    revenue: 0,
    completionTime: null,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01")
  },
  {
    id: 3,
    title: "تصميم هوية بصرية",
    description: "تصميم هوية بصرية متكاملة لشركة جديدة",
    clientId: 3,
    clientName: "شركة DEF",
    assignedTo: "محمد علي",
    startDate: new Date("2024-01-20"),
    endDate: new Date("2024-02-20"),
    budget: 3000,
    priority: "low",
    status: "completed",
    progress: 100,
    revenue: 3000,
    completionTime: new Date("2024-02-18"),
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-02-18")
  }
];
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

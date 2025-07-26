// Dummy data for the API

const services = [
  { id: 1, name: 'Web Development', description: 'Build modern web applications.' },
  { id: 2, name: 'UI/UX Design', description: 'Design user-friendly interfaces.' },
  { id: 3, name: 'SEO Optimization', description: 'Improve your site ranking.' },
];

const portfolio = [
  { id: 1, title: 'E-commerce Website', description: 'Online store for electronics.' },
  { id: 2, title: 'Portfolio Site', description: 'Personal branding website.' },
];

const news = [
  { id: 1, title: 'We launched a new service!', date: '2024-07-01' },
  { id: 2, title: 'Our team is growing.', date: '2024-06-15' },
];

const contactRequests = [];
const meetings = [];
const briefs = [];
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@theflow.com',
    role: 'admin',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date()
  }
];

const dashboard = {
  workStatus: 'In Progress',
  reports: ['Report 1', 'Report 2'],
  workLibrary: ['Doc 1', 'Doc 2']
};
const requests = [];

module.exports = {
  services,
  portfolio,
  news,
  contactRequests,
  meetings,
  briefs,
  users,
  dashboard,
  requests
};

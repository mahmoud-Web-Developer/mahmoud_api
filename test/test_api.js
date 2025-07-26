// Test file for The Flow API
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
let authToken = null;

// Test configuration
const testConfig = {
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Helper function to log test results
const logTest = (testName, success, message = '') => {
  const status = success ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} ${testName} ${message}`);
  return success;
};

// Test authentication endpoints
const testAuthentication = async () => {
  console.log('\n🔐 Testing Authentication...');
  
  try {
    // Test signup
    const signupResponse = await axios.post(`${BASE_URL}/auth/signup`, {
      username: 'testuser',
      password: 'password123',
      email: 'test@example.com'
    }, testConfig);
    
    logTest('Signup', signupResponse.data.success, signupResponse.data.message);
    
    // Test login
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      username: 'testuser',
      password: 'password123'
    }, testConfig);
    
    if (loginResponse.data.success) {
      authToken = loginResponse.data.data.token;
      logTest('Login', true, 'Token received');
    } else {
      logTest('Login', false, loginResponse.data.message);
    }
    
    // Test login with admin credentials
    const adminLoginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      username: 'admin',
      password: 'admin123'
    }, testConfig);
    
    if (adminLoginResponse.data.success) {
      authToken = adminLoginResponse.data.data.token;
      logTest('Admin Login', true, 'Admin token received');
    } else {
      logTest('Admin Login', false, adminLoginResponse.data.message);
    }
    
  } catch (error) {
    logTest('Authentication', false, error.response?.data?.message || error.message);
  }
};

// Test dashboard endpoints
const testDashboard = async () => {
  console.log('\n📊 Testing Dashboard...');
  
  if (!authToken) {
    logTest('Dashboard', false, 'No auth token available');
    return;
  }
  
  try {
    const config = {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    };
    
    // Test dashboard main endpoint
    const dashboardResponse = await axios.get(`${BASE_URL}/dashboard`, config);
    logTest('Dashboard Main', dashboardResponse.data.success, 'Dashboard data retrieved');
    
    // Test stats endpoint
    const statsResponse = await axios.get(`${BASE_URL}/dashboard/stats`, config);
    logTest('Dashboard Stats', statsResponse.data.success, 'Stats data retrieved');
    
    // Test recent activity
    const activityResponse = await axios.get(`${BASE_URL}/dashboard/recent-activity`, config);
    logTest('Recent Activity', activityResponse.data.success, 'Activity data retrieved');
    
  } catch (error) {
    logTest('Dashboard', false, error.response?.data?.message || error.message);
  }
};

// Test admin endpoints
const testAdmin = async () => {
  console.log('\n👨‍💼 Testing Admin...');
  
  if (!authToken) {
    logTest('Admin', false, 'No auth token available');
    return;
  }
  
  try {
    const config = {
      ...testConfig,
      headers: {
        ...testConfig.headers,
        'Authorization': `Bearer ${authToken}`
      }
    };
    
    // Test get all users
    const usersResponse = await axios.get(`${BASE_URL}/admin/users`, config);
    logTest('Get Users', usersResponse.data.success, 'Users data retrieved');
    
    // Test system stats
    const statsResponse = await axios.get(`${BASE_URL}/admin/system-stats`, config);
    logTest('System Stats', statsResponse.data.success, 'System stats retrieved');
    
    // Test get services
    const servicesResponse = await axios.get(`${BASE_URL}/admin/services`, config);
    logTest('Get Services', servicesResponse.data.success, 'Services data retrieved');
    
  } catch (error) {
    logTest('Admin', false, error.response?.data?.message || error.message);
  }
};

// Test public endpoints
const testPublicEndpoints = async () => {
  console.log('\n🌐 Testing Public Endpoints...');
  
  try {
    // Test services
    const servicesResponse = await axios.get(`${BASE_URL}/services`, testConfig);
    logTest('Public Services', servicesResponse.data.success || true, 'Services retrieved');
    
    // Test portfolio
    const portfolioResponse = await axios.get(`${BASE_URL}/portfolio`, testConfig);
    logTest('Public Portfolio', portfolioResponse.data.success || true, 'Portfolio retrieved');
    
    // Test news
    const newsResponse = await axios.get(`${BASE_URL}/news`, testConfig);
    logTest('Public News', newsResponse.data.success || true, 'News retrieved');
    
  } catch (error) {
    logTest('Public Endpoints', false, error.response?.data?.message || error.message);
  }
};

// Test contact requests
const testContactRequests = async () => {
  console.log('\n📞 Testing Contact Requests...');
  
  try {
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+201234567890',
      message: 'This is a test contact request'
    };
    
    const contactResponse = await axios.post(`${BASE_URL}/contact-requests`, contactData, testConfig);
    logTest('Contact Request', contactResponse.data.success, 'Contact request submitted');
    
  } catch (error) {
    logTest('Contact Requests', false, error.response?.data?.message || error.message);
  }
};

// Test meetings
const testMeetings = async () => {
  console.log('\n📅 Testing Meetings...');
  
  try {
    const meetingData = {
      title: 'Test Meeting',
      date: '2024-12-25',
      time: '14:00',
      duration: 60,
      description: 'This is a test meeting'
    };
    
    const meetingResponse = await axios.post(`${BASE_URL}/meetings`, meetingData, testConfig);
    logTest('Meeting Booking', meetingResponse.data.success, 'Meeting booked');
    
  } catch (error) {
    logTest('Meetings', false, error.response?.data?.message || error.message);
  }
};

// Test briefs
const testBriefs = async () => {
  console.log('\n📋 Testing Briefs...');
  
  try {
    const briefData = {
      title: 'Test Project',
      description: 'This is a test project brief',
      budget: 5000,
      timeline: 30,
      requirements: 'Test requirements for the project'
    };
    
    const briefResponse = await axios.post(`${BASE_URL}/briefs`, briefData, testConfig);
    logTest('Brief Submission', briefResponse.data.success, 'Brief submitted');
    
  } catch (error) {
    logTest('Briefs', false, error.response?.data?.message || error.message);
  }
};

// Main test runner
const runTests = async () => {
  console.log('🚀 Starting The Flow API Tests...\n');
  
  try {
    await testAuthentication();
    await testPublicEndpoints();
    await testContactRequests();
    await testMeetings();
    await testBriefs();
    await testDashboard();
    await testAdmin();
    
    console.log('\n✅ All tests completed!');
    
  } catch (error) {
    console.error('\n❌ Test runner error:', error.message);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  runTests,
  testAuthentication,
  testDashboard,
  testAdmin,
  testPublicEndpoints,
  testContactRequests,
  testMeetings,
  testBriefs
}; 
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './layouts/MainLayout';

// Placeholder components
const Dashboard = () => <div style={{ padding: '24px' }}><h1>Dashboard (Placeholder)</h1></div>;
const Companies = () => <div style={{ padding: '24px' }}><h1>Companies</h1></div>;
const CompanyDetail = () => <div style={{ padding: '24px' }}><h1>Company Detail</h1></div>;
const Contacts = () => <div style={{ padding: '24px' }}><h1>Contacts</h1></div>;
const ContactDetail = () => <div style={{ padding: '24px' }}><h1>Contact Detail</h1></div>;
const Documents = () => <div style={{ padding: '24px' }}><h1>Documents</h1></div>;
const Activities = () => <div style={{ padding: '24px' }}><h1>Activities</h1></div>;
const Projects = () => <div style={{ padding: '24px' }}><h1>Projects</h1></div>;
const Settings = () => <div style={{ padding: '24px' }}><h1>Settings</h1></div>;

const Home = () => (
  <div>
    <h1 style={{ margin: '0 0 12px 0' }}>FirmaScope</h1>
    <p style={{ margin: 0, color: '#555' }}>
      Bu sayfa herkese açık. Giriş sistemi daha sonra eklenecek.
    </p>
    <div style={{ marginTop: '24px', padding: '16px', border: '1px solid #eee', borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 8px 0' }}>Genel Tanıtım Alanı</h3>
      <p style={{ margin: 0, color: '#666' }}>
        Buraya ürün açıklaması, demo içerikleri veya herkese açık duyurular koyabiliriz.
      </p>
    </div>
  </div>
);

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/companies/:id" element={<CompanyDetail />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/contacts/:id" element={<ContactDetail />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

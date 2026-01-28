import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';

// Placeholder components
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', height: '100vh' }}>
    {children}
  </div>
);
const Dashboard = () => <div style={{ padding: '24px' }}><h1>Dashboard (Placeholder)</h1></div>;
const Companies = () => <div style={{ padding: '24px' }}><h1>Companies</h1></div>;
const CompanyDetail = () => <div style={{ padding: '24px' }}><h1>Company Detail</h1></div>;
const Contacts = () => <div style={{ padding: '24px' }}><h1>Contacts</h1></div>;
const ContactDetail = () => <div style={{ padding: '24px' }}><h1>Contact Detail</h1></div>;
const Documents = () => <div style={{ padding: '24px' }}><h1>Documents</h1></div>;
const Activities = () => <div style={{ padding: '24px' }}><h1>Activities</h1></div>;
const Projects = () => <div style={{ padding: '24px' }}><h1>Projects</h1></div>;
const Settings = () => <div style={{ padding: '24px' }}><h1>Settings</h1></div>;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <Route
            path="/*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
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
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
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

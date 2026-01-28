import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
// Placeholder components
const MainLayout = ({ children }) => _jsx("div", { children: children });
const Dashboard = () => _jsx("div", { className: "p-6", children: _jsx("h1", { children: "Dashboard" }) });
const Companies = () => _jsx("div", { className: "p-6", children: _jsx("h1", { children: "Companies" }) });
const CompanyDetail = () => _jsx("div", { className: "p-6", children: _jsx("h1", { children: "Company Detail" }) });
const Contacts = () => _jsx("div", { className: "p-6", children: _jsx("h1", { children: "Contacts" }) });
const ContactDetail = () => _jsx("div", { className: "p-6", children: _jsx("h1", { children: "Contact Detail" }) });
const Documents = () => _jsx("div", { className: "p-6", children: _jsx("h1", { children: "Documents" }) });
const Activities = () => _jsx("div", { className: "p-6", children: _jsx("h1", { children: "Activities" }) });
const Projects = () => _jsx("div", { className: "p-6", children: _jsx("h1", { children: "Projects" }) });
const Settings = () => _jsx("div", { className: "p-6", children: _jsx("h1", { children: "Settings" }) });
function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? _jsx(_Fragment, { children: children }) : _jsx(Navigate, { to: "/login" });
}
function AppRoutes() {
    const { isAuthenticated } = useAuth();
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), isAuthenticated ? (_jsx(Route, { path: "/*", element: _jsx(MainLayout, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/companies", element: _jsx(Companies, {}) }), _jsx(Route, { path: "/companies/:id", element: _jsx(CompanyDetail, {}) }), _jsx(Route, { path: "/contacts", element: _jsx(Contacts, {}) }), _jsx(Route, { path: "/contacts/:id", element: _jsx(ContactDetail, {}) }), _jsx(Route, { path: "/documents", element: _jsx(Documents, {}) }), _jsx(Route, { path: "/activities", element: _jsx(Activities, {}) }), _jsx(Route, { path: "/projects", element: _jsx(Projects, {}) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) })] }) }) })) : (_jsx(Route, { path: "/*", element: _jsx(Navigate, { to: "/login" }) }))] }) }));
}
function App() {
    return (_jsx(AuthProvider, { children: _jsx(AppRoutes, {}) }));
}
export default App;

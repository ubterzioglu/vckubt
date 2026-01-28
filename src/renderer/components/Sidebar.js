import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Building2, Users, FileText, Settings, Home, Activity, FolderOpen, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export const Sidebar = ({ className }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { logout } = useAuth();
    const navItems = [
        { to: '/', icon: Home, label: 'Dashboard' },
        { to: '/companies', icon: Building2, label: 'Firmalar' },
        { to: '/contacts', icon: Users, label: 'Kişiler' },
        { to: '/projects', icon: FolderOpen, label: 'Projeler' },
        { to: '/activities', icon: Activity, label: 'Aktiviteler' },
        { to: '/documents', icon: FileText, label: 'Dökümanlar' },
        { to: '/settings', icon: Settings, label: 'Ayarlar' },
    ];
    return (_jsxs("aside", { className: cn('h-screen bg-slate-900 text-white flex flex-col transition-all duration-300', collapsed ? 'w-16' : 'w-64', className), children: [_jsxs("div", { className: "p-4 border-b border-slate-700 flex items-center justify-between", children: [!collapsed && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center", children: _jsx(Building2, { className: "w-5 h-5" }) }), _jsx("span", { className: "font-bold text-lg", children: "FirmaScope" })] })), _jsx("button", { onClick: () => setCollapsed(!collapsed), className: "p-1 hover:bg-slate-700 rounded", children: collapsed ? _jsx(ChevronRight, { className: "w-5 h-5" }) : _jsx(ChevronLeft, { className: "w-5 h-5" }) })] }), !collapsed && (_jsx("div", { className: "p-3", children: _jsx("p", { className: "text-xs text-slate-400", children: "Men\u00FC" }) })), _jsx("nav", { className: "flex-1 p-3 space-y-1 overflow-y-auto", children: navItems.map((item) => (_jsxs(NavLink, { to: item.to, className: ({ isActive }) => cn('flex items-center gap-3 px-3 py-2 rounded-lg transition-colors', isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white', collapsed && 'justify-center'), title: collapsed ? item.label : undefined, children: [_jsx(item.icon, { className: "w-5 h-5 flex-shrink-0" }), !collapsed && _jsx("span", { children: item.label })] }, item.to))) }), _jsx("div", { className: "p-3 border-t border-slate-700", children: _jsxs("button", { onClick: () => logout(), className: cn('w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors', 'text-slate-300 hover:bg-slate-800 hover:text-white', collapsed && 'justify-center'), title: collapsed ? 'Çıkış' : undefined, children: [_jsx(LogOut, { className: "w-5 h-5 flex-shrink-0" }), !collapsed && _jsx("span", { children: "\u00C7\u0131k\u0131\u015F Yap" })] }) })] }));
};

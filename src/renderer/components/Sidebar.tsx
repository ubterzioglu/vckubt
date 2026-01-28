import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { 
  Building2, 
  Users, 
  FileText, 
  Settings, 
  Home,
  Activity,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
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

  return (
    <aside 
      className={cn(
        'h-screen bg-slate-900 text-white flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">FirmaScope</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-slate-700 rounded"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-3">
          <p className="text-xs text-slate-400">Menü</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                collapsed && 'justify-center'
              )
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700">
        <button 
          onClick={() => logout()}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
            'text-slate-300 hover:bg-slate-800 hover:text-white',
            collapsed && 'justify-center'
          )}
          title={collapsed ? 'Çıkış' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Çıkış Yap</span>}
        </button>
      </div>
    </aside>
  );
};

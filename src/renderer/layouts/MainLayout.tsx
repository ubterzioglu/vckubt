import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '250px', background: '#f5f5f5', padding: '20px', borderRight: '1px solid #ddd' }}>
        <h2>FirmaScope</h2>
        <nav style={{ marginTop: '20px' }}>
          <a href="#/" style={{ display: 'block', padding: '10px 0', textDecoration: 'none', color: '#333' }}>
            Dashboard
          </a>
          <a href="#/companies" style={{ display: 'block', padding: '10px 0', textDecoration: 'none', color: '#333' }}>
            Companies
          </a>
          <a href="#/contacts" style={{ display: 'block', padding: '10px 0', textDecoration: 'none', color: '#333' }}>
            Contacts
          </a>
          <a href="#/projects" style={{ display: 'block', padding: '10px 0', textDecoration: 'none', color: '#333' }}>
            Projects
          </a>
          <a href="#/activities" style={{ display: 'block', padding: '10px 0', textDecoration: 'none', color: '#333' }}>
            Activities
          </a>
          <a href="#/settings" style={{ display: 'block', padding: '10px 0', textDecoration: 'none', color: '#333' }}>
            Settings
          </a>
        </nav>
      </aside>
      <main style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}

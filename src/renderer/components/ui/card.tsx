import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div 
      className={`card ${className}`}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#fff'
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: CardProps) {
  return <div className={`card-header ${className}`} style={{ marginBottom: '12px' }}>{children}</div>;
}

export function CardTitle({ children, className = '' }: CardProps) {
  return <h2 className={`card-title ${className}`} style={{ fontSize: '18px', fontWeight: '600' }}>{children}</h2>;
}

export function CardDescription({ children, className = '' }: CardProps) {
  return <p className={`card-description ${className}`} style={{ fontSize: '14px', color: '#666' }}>{children}</p>;
}

export function CardContent({ children, className = '' }: CardProps) {
  return <div className={`card-content ${className}`}>{children}</div>;
}

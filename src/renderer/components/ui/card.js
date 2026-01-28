import { jsx as _jsx } from "react/jsx-runtime";
export function Card({ children, className = '' }) {
    return (_jsx("div", { className: `card ${className}`, style: {
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#fff'
        }, children: children }));
}
export function CardHeader({ children, className = '' }) {
    return _jsx("div", { className: `card-header ${className}`, style: { marginBottom: '12px' }, children: children });
}
export function CardTitle({ children, className = '' }) {
    return _jsx("h2", { className: `card-title ${className}`, style: { fontSize: '18px', fontWeight: '600' }, children: children });
}
export function CardDescription({ children, className = '' }) {
    return _jsx("p", { className: `card-description ${className}`, style: { fontSize: '14px', color: '#666' }, children: children });
}
export function CardContent({ children, className = '' }) {
    return _jsx("div", { className: `card-content ${className}`, children: children });
}

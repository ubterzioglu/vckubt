import { jsx as _jsx } from "react/jsx-runtime";
export function Button({ children, className = '', ...props }) {
    return (_jsx("button", { className: `button ${className}`, style: {
            padding: '8px 16px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            ...(props.style || {})
        }, ...props, children: children }));
}

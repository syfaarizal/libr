import { useState, useEffect } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const icons = {
  success: 'fas fa-check-circle',
  error: 'fas fa-exclamation-circle',
  warning: 'fas fa-exclamation-triangle',
  info: 'fas fa-info-circle',
};
const titles = { success: 'Success', error: 'Error', warning: 'Warning', info: 'Info' };
const colors = { success: '#10B981', error: '#EF4444', warning: '#F59E0B', info: 'var(--primary-color)' };

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    // Register global showToast function like original JS
    (window as any).showToast = (message: string, type: string = 'info', duration: number = 5000) => {
      const id = Date.now();
      const toastType = type as Toast['type'];
      setToasts(prev => [...prev, { id, message, type: toastType }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    };
  }, []);

  const remove = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast ${toast.type}`}
          onClick={() => remove(toast.id)}
          role="alert"
          aria-live="assertive"
        >
          <div className="toast-header">
            <i className={icons[toast.type]} style={{ color: colors[toast.type] }}></i>
            <div className="toast-title">{titles[toast.type]}</div>
          </div>
          <div className="toast-body">{toast.message}</div>
        </div>
      ))}
    </div>
  );
}

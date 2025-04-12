import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'default' | 'success' | 'error' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

interface ToastComponentProps extends Toast {
  removeToast: (id: string) => void;
}

// Create Toast Context with default values
const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
  removeToast: () => {}
});

// Toast Provider Component
export function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'default') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const value = { addToast, removeToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

// Toast Container Component
function ToastContainer({ toasts, removeToast }: ToastContainerProps): JSX.Element | null {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} {...toast} removeToast={removeToast} />
      ))}
    </div>
  );
}

// Individual Toast Component
function ToastComponent({ id, message, type, removeToast }: ToastComponentProps): JSX.Element {
  const styles: Record<ToastType, string> = {
    default: 'bg-gray-800 text-white',
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-yellow-500 text-white',
  };

  return (
    <div
      className={`flex items-center justify-between min-w-[300px] p-4 rounded-lg shadow-lg ${styles[type]}`}
    >
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => removeToast(id)}
        className="ml-4 p-1 hover:opacity-80 transition-opacity"
        aria-label="Close toast"
      >
        <XMarkIcon className='size-4' />
      </button>
    </div>
  );
}

// Custom hook to use toast
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Export types for external use
export type { ToastType, Toast, ToastContextType };

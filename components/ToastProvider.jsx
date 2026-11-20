"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

const ToastContext = createContext({ toast: () => {} });

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const toast = useCallback(
    (message, type = "success", duration = 3800) => {
      if (!message) return;
      counter.current += 1;
      const id = `toast_${counter.current}_${Date.now()}`;
      setToasts((current) => [...current.slice(-3), { id, message, type }]);
      window.setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack" role="status" aria-live="polite">
        {toasts.map((entry) => (
          <div key={entry.id} className={`toast toast-${entry.type}`}>
            <span className="toast-icon">
              {entry.type === "error" ? (
                <AlertCircle size={18} />
              ) : entry.type === "info" ? (
                <Info size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
            </span>
            <span className="toast-message">{entry.message}</span>
            <button type="button" className="toast-close" onClick={() => dismiss(entry.id)} aria-label="Dismiss">
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

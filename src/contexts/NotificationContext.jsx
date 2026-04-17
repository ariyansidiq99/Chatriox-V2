import { createContext, useCallback, useContext, useState } from "react";

const NotifContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState([]);

  const addNotification = useCallback(
    ({ message, type = "info", duration = 3500 }) => {
      const id = Date.now();

      setNotification((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setNotification((prev) => prev.filter((n) => n.id !== id));
      }, duration);

      return id;
    },
    []
  );

  const removeNotification = useCallback((id) => {
    setNotification((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = {
    success: (msg) => addNotification({ message: msg, type: "success" }),
    error: (msg) => addNotification({ message: msg, type: "error" }),
    info: (msg) => addNotification({ message: msg, type: "info" }),
    warning: (msg) => addNotification({ message: msg, type: "warning" }),
  };

  return (
    <NotifContext.Provider value={{ notify, notification, removeNotification }}>
      {children}
      <ToastContainer
        notifications={notification}
        onRemove={removeNotification}
      />
    </NotifContext.Provider>
  );
}

function ToastContainer({ notifications, onRemove }) {
  if (!notifications.length) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {notifications.map((n) => (
        <div key={n.id} className={`toast toast--${n.type}`}>
          <span>{n.message}</span>
          <button onClick={() => onRemove(n.id)} aria-label="Dismiss">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export function useNotify() {
  const ctx = useContext(NotifContext);
  if (!ctx) {
    throw new Error("useNotify must be used inside NotificationProvider");
  }
  return ctx.notify;
}
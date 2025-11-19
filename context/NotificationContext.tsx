import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

interface NotificationContextType {
  showNotification: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((type: NotificationType, message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, type, message }]);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {/* Notification Container - Top Right */}
      <div className="fixed top-24 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              layout
              className={`pointer-events-auto flex items-start gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-xl text-white min-w-[320px] max-w-[400px] ${
                n.type === 'success' ? 'bg-green-500/10 border-green-500/20 shadow-green-900/20' :
                n.type === 'error' ? 'bg-red-500/10 border-red-500/20 shadow-red-900/20' :
                'bg-blue-500/10 border-blue-500/20 shadow-blue-900/20'
              }`}
            >
              <div className={`mt-1 ${
                n.type === 'success' ? 'text-green-400' :
                n.type === 'error' ? 'text-red-400' :
                'text-blue-400'
              }`}>
                {n.type === 'success' && <CheckCircle2 size={20} />}
                {n.type === 'error' && <AlertCircle size={20} />}
                {n.type === 'info' && <Info size={20} />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm mb-0.5 capitalize">{n.type}</h4>
                <p className="text-sm text-gray-300 leading-tight">{n.message}</p>
              </div>
              <button 
                onClick={() => removeNotification(n.id)} 
                className="text-white/40 hover:text-white transition-colors mt-0.5"
              >
                <X size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within a NotificationProvider');
  return context;
};

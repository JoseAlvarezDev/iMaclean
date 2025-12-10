import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import './Toast.css';

const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

export function ToastContainer() {
    const { notifications, removeNotification } = useStore();

    return (
        <div className="toast-container">
            <AnimatePresence mode="popLayout">
                {notifications.map((notification) => (
                    <Toast
                        key={notification.id}
                        notification={notification}
                        onClose={() => removeNotification(notification.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}

interface ToastProps {
    notification: {
        id: string;
        type: 'success' | 'warning' | 'error' | 'info';
        title: string;
        message: string;
    };
    onClose: () => void;
}

function Toast({ notification, onClose }: ToastProps) {
    const Icon = icons[notification.type];

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            className={`toast toast--${notification.type}`}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            layout
        >
            <div className="toast-icon">
                <Icon size={20} />
            </div>
            <div className="toast-content">
                <span className="toast-title">{notification.title}</span>
                <span className="toast-message">{notification.message}</span>
            </div>
            <button className="toast-close" onClick={onClose}>
                <X size={16} />
            </button>
        </motion.div>
    );
}

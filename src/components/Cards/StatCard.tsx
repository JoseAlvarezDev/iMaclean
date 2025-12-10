import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import './StatCard.css';

interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
    subtitle?: string;
}

export function StatCard({ title, value, icon: Icon, color, subtitle }: StatCardProps) {
    return (
        <motion.div
            className={`stat-card stat-card--${color}`}
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ duration: 0.2 }}
        >
            <div className="stat-card-icon">
                <Icon size={20} />
            </div>
            <div className="stat-card-content">
                <span className="stat-card-title">{title}</span>
                <span className="stat-card-value">{value}</span>
                {subtitle && <span className="stat-card-subtitle">{subtitle}</span>}
            </div>
        </motion.div>
    );
}

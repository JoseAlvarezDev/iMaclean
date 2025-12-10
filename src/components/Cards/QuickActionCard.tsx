import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { formatBytes } from '../../utils/formatters';
import './QuickActionCard.css';

interface QuickActionCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    size: number;
    itemCount: number;
    color: 'blue' | 'green' | 'orange' | 'red';
    onClick: () => void;
}

export function QuickActionCard({
    title,
    description,
    icon: Icon,
    size,
    itemCount,
    color,
    onClick,
}: QuickActionCardProps) {
    return (
        <motion.button
            className={`quick-action-card quick-action-card--${color}`}
            onClick={onClick}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
        >
            <div className="quick-action-header">
                <div className="quick-action-icon">
                    <Icon size={22} />
                </div>
                <ChevronRight size={18} className="quick-action-arrow" />
            </div>

            <div className="quick-action-content">
                <h3 className="quick-action-title">{title}</h3>
                <p className="quick-action-description">{description}</p>
            </div>

            <div className="quick-action-footer">
                <span className="quick-action-size">{formatBytes(size)}</span>
                <span className="quick-action-count">{itemCount} elementos</span>
            </div>

            <div className="quick-action-bg-icon">
                <Icon size={100} strokeWidth={0.5} />
            </div>
        </motion.button>
    );
}

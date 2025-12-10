import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Trash2, Package, FolderDown, FileText, AppWindow, HardDrive } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { CleaningItem, Frequency } from '../../store/useStore';
import { useTranslation } from 'react-i18next';
import './ScheduleModal.css';

const categoryIcons: Record<CleaningItem['category'], typeof Trash2> = {
    trash: Trash2,
    cache: Package,
    downloads: FolderDown,
    logs: FileText,
    apps: AppWindow,
    large: HardDrive,
};

const categoryLabels: Record<CleaningItem['category'], string> = {
    trash: 'Papelera',
    cache: 'Caché',
    downloads: 'Descargas',
    logs: 'Logs del Sistema',
    apps: 'Apps Residuales',
    large: 'Archivos Grandes',
};

interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingSchedule?: {
        id: string;
        category: CleaningItem['category'];
        frequency: Frequency;
        time: string;
        enabled: boolean;
    };
}

export function ScheduleModal({ isOpen, onClose, editingSchedule }: ScheduleModalProps) {
    const { t } = useTranslation();
    const { addScheduledCleaning, updateScheduledCleaning, removeScheduledCleaning } = useStore();

    const [category, setCategory] = useState<CleaningItem['category']>(
        editingSchedule?.category || 'cache'
    );
    const [frequency, setFrequency] = useState<Frequency>(
        editingSchedule?.frequency || 'weekly'
    );
    const [time, setTime] = useState(editingSchedule?.time || '09:00');
    const [enabled, setEnabled] = useState(editingSchedule?.enabled ?? true);

    const handleSave = () => {
        if (editingSchedule) {
            updateScheduledCleaning(editingSchedule.id, {
                category,
                frequency,
                time,
                enabled,
            });
        } else {
            addScheduledCleaning({
                category,
                frequency,
                time,
                enabled,
            });
        }
        onClose();
    };

    const handleDelete = () => {
        if (editingSchedule) {
            removeScheduledCleaning(editingSchedule.id);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="schedule-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="schedule-modal"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="schedule-modal-close" onClick={onClose}>
                            <X size={18} />
                        </button>

                        <div className="schedule-modal-header">
                            <Calendar size={24} />
                            <h2>{t('schedule.title')}</h2>
                        </div>

                        <div className="schedule-modal-content">
                            {/* Category */}
                            <div className="schedule-field">
                                <label>{t('schedule.category')}</label>
                                <div className="category-grid">
                                    {(Object.keys(categoryIcons) as CleaningItem['category'][]).map((cat) => {
                                        const Icon = categoryIcons[cat];
                                        return (
                                            <button
                                                key={cat}
                                                className={`category-option ${category === cat ? 'active' : ''}`}
                                                onClick={() => setCategory(cat)}
                                            >
                                                <Icon size={18} />
                                                <span>{categoryLabels[cat]}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Frequency */}
                            <div className="schedule-field">
                                <label>{t('schedule.frequency')}</label>
                                <div className="frequency-options">
                                    {(['daily', 'weekly', 'monthly'] as Frequency[]).map((freq) => (
                                        <button
                                            key={freq}
                                            className={`frequency-option ${frequency === freq ? 'active' : ''}`}
                                            onClick={() => setFrequency(freq)}
                                        >
                                            {t(`schedule.${freq}`)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Time */}
                            <div className="schedule-field">
                                <label>{t('schedule.time')}</label>
                                <div className="time-input-wrapper">
                                    <Clock size={18} />
                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="time-input"
                                    />
                                </div>
                            </div>

                            {/* Enabled Toggle */}
                            <div className="schedule-field toggle-field">
                                <label>{t('schedule.enabled')}</label>
                                <button
                                    className={`toggle-button ${enabled ? 'active' : ''}`}
                                    onClick={() => setEnabled(!enabled)}
                                >
                                    <span className="toggle-knob" />
                                </button>
                            </div>
                        </div>

                        <div className="schedule-modal-footer">
                            {editingSchedule && (
                                <button className="schedule-delete-btn" onClick={handleDelete}>
                                    {t('schedule.delete')}
                                </button>
                            )}
                            <div className="schedule-modal-actions">
                                <button className="schedule-cancel-btn" onClick={onClose}>
                                    {t('schedule.cancel')}
                                </button>
                                <button className="schedule-save-btn" onClick={handleSave}>
                                    {t('schedule.save')}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Settings as SettingsIcon,
    Sun,
    Moon,
    Monitor,
    Info,
    Github,
    History,
    Trash2,
    Package,
    FolderDown,
    FileText,
    AppWindow,
    HardDrive,
    Globe,
    Calendar,
    Plus,
    Clock,
    ChevronRight,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Theme, ScheduledCleaning, CleaningItem } from '../../store/useStore';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../i18n';
import { formatBytes, formatDate } from '../../utils/formatters';
import { ScheduleModal } from '../Modals/ScheduleModal';
import './Settings.css';

const categoryIcons: Record<CleaningItem['category'], typeof Trash2> = {
    trash: Trash2,
    cache: Package,
    downloads: FolderDown,
    logs: FileText,
    apps: AppWindow,
    large: HardDrive,
};

export function Settings() {
    const { t, i18n } = useTranslation();
    const {
        theme,
        setTheme,
        history,
        totalSpaceSaved,
        totalItemsCleaned,
        scheduledCleanings,
        toggleScheduleEnabled,
    } = useStore();

    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState<ScheduledCleaning | undefined>();

    const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
        { value: 'light', label: t('settings.light'), icon: Sun },
        { value: 'dark', label: t('settings.dark'), icon: Moon },
        { value: 'system', label: t('settings.system'), icon: Monitor },
    ];

    const languages = [
        { code: 'es', label: 'Español', flag: '🇪🇸' },
        { code: 'en', label: 'English', flag: '🇺🇸' },
    ];

    const handleLanguageChange = (lang: string) => {
        changeLanguage(lang);
    };

    const handleEditSchedule = (schedule: ScheduledCleaning) => {
        setEditingSchedule(schedule);
        setShowScheduleModal(true);
    };

    const handleAddSchedule = () => {
        setEditingSchedule(undefined);
        setShowScheduleModal(true);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const getFrequencyLabel = (freq: string) => {
        const labels: Record<string, string> = {
            daily: t('schedule.daily'),
            weekly: t('schedule.weekly'),
            monthly: t('schedule.monthly'),
        };
        return labels[freq] || freq;
    };

    const getCategoryLabel = (cat: string) => {
        const labels: Record<string, string> = {
            trash: t('nav.trash'),
            cache: t('nav.cache'),
            downloads: t('nav.downloads'),
            logs: t('nav.logs'),
            apps: t('nav.apps'),
            large: t('nav.largeFiles'),
        };
        return labels[cat] || cat;
    };

    return (
        <>
            <motion.div
                className="settings-view"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="settings-header" variants={itemVariants}>
                    <div className="settings-icon">
                        <SettingsIcon size={24} />
                    </div>
                    <div className="settings-header-content">
                        <h1>{t('settings.title')}</h1>
                        <p>{t('settings.subtitle')}</p>
                    </div>
                </motion.div>

                {/* Language */}
                <motion.section className="settings-section" variants={itemVariants}>
                    <h2 className="settings-section-title">{t('settings.language')}</h2>
                    <div className="settings-card">
                        <div className="setting-row">
                            <div className="setting-info">
                                <Globe size={20} className="setting-icon" />
                                <div>
                                    <span className="setting-label">{t('settings.language')}</span>
                                    <span className="setting-description">
                                        {t('settings.languageDescription')}
                                    </span>
                                </div>
                            </div>
                            <div className="language-selector">
                                {languages.map((lang) => (
                                    <motion.button
                                        key={lang.code}
                                        className={`language-option ${i18n.language === lang.code ? 'active' : ''}`}
                                        onClick={() => handleLanguageChange(lang.code)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="language-flag">{lang.flag}</span>
                                        <span>{lang.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Appearance */}
                <motion.section className="settings-section" variants={itemVariants}>
                    <h2 className="settings-section-title">{t('settings.appearance')}</h2>
                    <div className="settings-card">
                        <div className="setting-row">
                            <div className="setting-info">
                                <span className="setting-label">{t('settings.theme')}</span>
                                <span className="setting-description">
                                    {t('settings.themeDescription')}
                                </span>
                            </div>
                            <div className="theme-selector">
                                {themeOptions.map((option) => {
                                    const Icon = option.icon;
                                    return (
                                        <motion.button
                                            key={option.value}
                                            className={`theme-option ${theme === option.value ? 'active' : ''}`}
                                            onClick={() => setTheme(option.value)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Icon size={18} />
                                            <span>{option.label}</span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Scheduled Cleanings */}
                <motion.section className="settings-section" variants={itemVariants}>
                    <h2 className="settings-section-title">{t('settings.scheduledCleanings')}</h2>
                    <div className="settings-card">
                        <div className="schedules-header">
                            <div className="setting-info">
                                <Calendar size={20} className="setting-icon" />
                                <div>
                                    <span className="setting-label">{t('settings.scheduledCleanings')}</span>
                                    <span className="setting-description">
                                        {t('settings.scheduledDescription')}
                                    </span>
                                </div>
                            </div>
                            <motion.button
                                className="add-schedule-btn"
                                onClick={handleAddSchedule}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Plus size={18} />
                                {t('settings.addSchedule')}
                            </motion.button>
                        </div>

                        {scheduledCleanings.length === 0 ? (
                            <div className="empty-schedules">
                                <Calendar size={24} />
                                <span>{t('settings.noSchedules')}</span>
                            </div>
                        ) : (
                            <div className="schedules-list">
                                {scheduledCleanings.map((schedule) => {
                                    const Icon = categoryIcons[schedule.category];
                                    return (
                                        <motion.div
                                            key={schedule.id}
                                            className={`schedule-item ${schedule.enabled ? '' : 'disabled'}`}
                                            whileHover={{ x: 2 }}
                                        >
                                            <div className="schedule-item-icon">
                                                <Icon size={18} />
                                            </div>
                                            <div className="schedule-item-info">
                                                <span className="schedule-item-category">
                                                    {getCategoryLabel(schedule.category)}
                                                </span>
                                                <span className="schedule-item-frequency">
                                                    <Clock size={12} />
                                                    {getFrequencyLabel(schedule.frequency)} • {schedule.time}
                                                </span>
                                            </div>
                                            <button
                                                className={`schedule-toggle ${schedule.enabled ? 'active' : ''}`}
                                                onClick={() => toggleScheduleEnabled(schedule.id)}
                                            >
                                                <span className="toggle-knob" />
                                            </button>
                                            <button
                                                className="schedule-edit-btn"
                                                onClick={() => handleEditSchedule(schedule)}
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* Statistics */}
                <motion.section className="settings-section" variants={itemVariants}>
                    <h2 className="settings-section-title">{t('settings.totalStats')}</h2>
                    <div className="settings-card">
                        <div className="stats-row">
                            <div className="stat-item">
                                <Trash2 size={20} />
                                <div className="stat-content">
                                    <span className="stat-value">{formatBytes(totalSpaceSaved)}</span>
                                    <span className="stat-label">{t('settings.spaceFreed')}</span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <History size={20} />
                                <div className="stat-content">
                                    <span className="stat-value">{totalItemsCleaned.toLocaleString()}</span>
                                    <span className="stat-label">{t('settings.filesCleaned')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* History */}
                <motion.section className="settings-section" variants={itemVariants}>
                    <h2 className="settings-section-title">{t('settings.cleaningHistory')}</h2>
                    <div className="settings-card">
                        {history.length === 0 ? (
                            <div className="empty-history">
                                <History size={24} />
                                <span>{t('settings.noHistory')}</span>
                            </div>
                        ) : (
                            <div className="history-list">
                                {history.slice(0, 10).map((entry) => (
                                    <div key={entry.id} className="history-item">
                                        <div className="history-info">
                                            <span className="history-category">{entry.category}</span>
                                            <span className="history-date">{formatDate(entry.date)}</span>
                                        </div>
                                        <div className="history-stats">
                                            <span className="history-size">{formatBytes(entry.spaceSaved)}</span>
                                            <span className="history-count">
                                                {entry.itemsCleaned} {t('settings.files')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* About */}
                <motion.section className="settings-section" variants={itemVariants}>
                    <h2 className="settings-section-title">{t('settings.about')}</h2>
                    <div className="settings-card">
                        <div className="about-content">
                            <div className="about-logo">
                                <img
                                    src="/icons/logo_light.png"
                                    alt="iMaclean Logo"
                                    className="about-logo-img"
                                />
                                <div className="logo-text">
                                    <span className="logo-name">iMaclean</span>
                                    <span className="logo-version">{t('settings.version')}</span>
                                </div>
                            </div>
                            <p className="about-description">{t('settings.aboutDescription')}</p>
                            <div className="about-links">
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="about-link"
                                >
                                    <Github size={18} />
                                    <span>{t('settings.github')}</span>
                                </a>
                                <button className="about-link" onClick={() => { }}>
                                    <Info size={18} />
                                    <span>{t('settings.moreInfo')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </motion.div>

            <ScheduleModal
                isOpen={showScheduleModal}
                onClose={() => {
                    setShowScheduleModal(false);
                    setEditingSchedule(undefined);
                }}
                editingSchedule={editingSchedule}
            />
        </>
    );
}

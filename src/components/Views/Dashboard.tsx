// Dashboard - iMaclean v2.0.0
import { motion } from 'framer-motion';
import {
    Trash2,
    Package,
    FolderDown,
    FileText,
    Sparkles,
    TrendingUp,
    Clock,
    Zap,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { StorageChart } from '../Charts/StorageChart';
import { StatCard } from '../Cards/StatCard';
import { QuickActionCard } from '../Cards/QuickActionCard';
import { formatBytes } from '../../utils/formatters';
import './Dashboard.css';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};

export function Dashboard() {
    const {
        storageData,
        totalSpaceSaved,
        totalItemsCleaned,
        history,
        cleaningItems,
        setCurrentView,
    } = useStore();

    const trashSize = cleaningItems
        .filter((i) => i.category === 'trash')
        .reduce((acc, i) => acc + i.size, 0);
    const cacheSize = cleaningItems
        .filter((i) => i.category === 'cache')
        .reduce((acc, i) => acc + i.size, 0);
    const downloadsSize = cleaningItems
        .filter((i) => i.category === 'downloads')
        .reduce((acc, i) => acc + i.size, 0);
    const logsSize = cleaningItems
        .filter((i) => i.category === 'logs')
        .reduce((acc, i) => acc + i.size, 0);

    const totalCleanableSize = trashSize + cacheSize + downloadsSize + logsSize;

    return (
        <motion.div
            className="dashboard"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div className="dashboard-header" variants={itemVariants}>
                <div className="dashboard-header-content">
                    <h1 className="dashboard-title">
                        <Sparkles className="dashboard-title-icon" size={28} />
                        Dashboard
                    </h1>
                    <p className="dashboard-subtitle">
                        Mantén tu Mac limpio y optimizado
                    </p>
                </div>
            </motion.div>

            {/* Storage Overview */}
            <motion.section className="dashboard-section" variants={itemVariants}>
                <div className="section-header">
                    <h2 className="section-title">Almacenamiento</h2>
                    <span className="section-subtitle">
                        {formatBytes(storageData.free)} disponibles de {formatBytes(storageData.total)}
                    </span>
                </div>
                <div className="storage-overview">
                    <StorageChart data={storageData} />
                </div>
            </motion.section>

            {/* Stats Grid */}
            <motion.section className="dashboard-section" variants={itemVariants}>
                <div className="section-header">
                    <h2 className="section-title">Estadísticas</h2>
                </div>
                <div className="stats-grid">
                    <StatCard
                        title="Espacio Recuperado"
                        value={formatBytes(totalSpaceSaved)}
                        icon={TrendingUp}
                        color="green"
                        subtitle="Total histórico"
                    />
                    <StatCard
                        title="Archivos Limpiados"
                        value={totalItemsCleaned.toLocaleString()}
                        icon={Sparkles}
                        color="blue"
                        subtitle="Total histórico"
                    />
                    <StatCard
                        title="Limpiezas Realizadas"
                        value={history.length.toString()}
                        icon={Clock}
                        color="purple"
                        subtitle="Historial completo"
                    />
                    <StatCard
                        title="Espacio Recuperable"
                        value={formatBytes(totalCleanableSize)}
                        icon={Zap}
                        color="orange"
                        subtitle="Disponible ahora"
                    />
                </div>
            </motion.section>

            {/* Quick Actions */}
            <motion.section className="dashboard-section" variants={itemVariants}>
                <div className="section-header">
                    <h2 className="section-title">Acciones Rápidas</h2>
                </div>
                <div className="quick-actions-grid">
                    <QuickActionCard
                        title="Papelera"
                        description="Vacía la papelera del sistema"
                        icon={Trash2}
                        size={trashSize}
                        itemCount={cleaningItems.filter((i) => i.category === 'trash').length}
                        color="red"
                        onClick={() => setCurrentView('trash')}
                    />
                    <QuickActionCard
                        title="Caché"
                        description="Limpia archivos temporales"
                        icon={Package}
                        size={cacheSize}
                        itemCount={cleaningItems.filter((i) => i.category === 'cache').length}
                        color="blue"
                        onClick={() => setCurrentView('cache')}
                    />
                    <QuickActionCard
                        title="Descargas"
                        description="Revisa archivos antiguos"
                        icon={FolderDown}
                        size={downloadsSize}
                        itemCount={cleaningItems.filter((i) => i.category === 'downloads').length}
                        color="green"
                        onClick={() => setCurrentView('downloads')}
                    />
                    <QuickActionCard
                        title="Logs"
                        description="Limpia registros del sistema"
                        icon={FileText}
                        size={logsSize}
                        itemCount={cleaningItems.filter((i) => i.category === 'logs').length}
                        color="orange"
                        onClick={() => setCurrentView('logs')}
                    />
                </div>
            </motion.section>
        </motion.div>
    );
}

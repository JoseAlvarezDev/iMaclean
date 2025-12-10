import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
    Trash2,
    Package,
    FolderDown,
    FileText,
    AppWindow,
    HardDrive,
    CheckCircle2,
    Circle,
    File,
    Folder,
    Terminal,
    Copy,
    Check,
    RefreshCw,
    AlertTriangle,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { CleaningItem, View } from '../../store/useStore';
import { formatBytes, formatRelativeTime } from '../../utils/formatters';
import { getCleaningCommands } from '../../utils/mockData';
import './CleaningView.css';

interface CleaningViewConfig {
    id: View;
    title: string;
    description: string;
    icon: LucideIcon;
    color: 'red' | 'blue' | 'green' | 'orange' | 'purple' | 'teal';
    category: CleaningItem['category'];
    warningMessage?: string;
}

const viewConfigs: Record<string, CleaningViewConfig> = {
    trash: {
        id: 'trash',
        title: 'Papelera',
        description: 'Archivos eliminados esperando a ser borrados permanentemente',
        icon: Trash2,
        color: 'red',
        category: 'trash',
    },
    cache: {
        id: 'cache',
        title: 'Caché de Usuario',
        description: 'Archivos temporales de aplicaciones que pueden regenerarse',
        icon: Package,
        color: 'blue',
        category: 'cache',
    },
    downloads: {
        id: 'downloads',
        title: 'Descargas',
        description: 'Archivos descargados que podrían no necesitar',
        icon: FolderDown,
        color: 'green',
        category: 'downloads',
        warningMessage: 'Revisa estos archivos antes de eliminarlos',
    },
    logs: {
        id: 'logs',
        title: 'Logs del Sistema',
        description: 'Archivos de registro y diagnóstico del sistema',
        icon: FileText,
        color: 'orange',
        category: 'logs',
        warningMessage: 'Requiere permisos de administrador',
    },
    apps: {
        id: 'apps',
        title: 'Apps Residuales',
        description: 'Archivos de aplicaciones que ya no están instaladas',
        icon: AppWindow,
        color: 'purple',
        category: 'apps',
    },
    'large-files': {
        id: 'large-files',
        title: 'Archivos Grandes',
        description: 'Archivos que ocupan más espacio en tu disco',
        icon: HardDrive,
        color: 'teal',
        category: 'large',
        warningMessage: 'Revisa cuidadosamente antes de eliminar',
    },
};

interface CleaningViewProps {
    viewId: string;
}

export function CleaningView({ viewId }: CleaningViewProps) {
    const config = viewConfigs[viewId];
    const {
        cleaningItems,
        toggleItemSelection,
        selectAllItems,
        deselectAllItems,
        addNotification,
        addToHistory,
        updateStats,
        setCleaningItems,
    } = useStore();

    const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const items = useMemo(
        () => cleaningItems.filter((item) => item.category === config?.category),
        [cleaningItems, config?.category]
    );

    const selectedItems = items.filter((item) => item.selected);
    const totalSize = items.reduce((acc, item) => acc + item.size, 0);
    const selectedSize = selectedItems.reduce((acc, item) => acc + item.size, 0);
    const allSelected = items.length > 0 && items.every((item) => item.selected);

    const commands = config ? getCleaningCommands(config.category) : [];

    if (!config) {
        return <div className="cleaning-view">Vista no encontrada</div>;
    }

    const Icon = config.icon;

    const handleSelectAll = () => {
        if (allSelected) {
            deselectAllItems(config.category);
        } else {
            selectAllItems(config.category);
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        // Simulate scanning
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsRefreshing(false);
        addNotification({
            type: 'info',
            title: 'Escaneo completado',
            message: `Se encontraron ${items.length} elementos`,
        });
    };

    const handleCopyCommand = async (command: string) => {
        try {
            await navigator.clipboard.writeText(command);
            setCopiedCommand(command);
            setTimeout(() => setCopiedCommand(null), 2000);
        } catch {
            console.error('Error al copiar');
        }
    };

    const handleClean = () => {
        if (selectedItems.length === 0) {
            addNotification({
                type: 'warning',
                title: 'Sin selección',
                message: 'Selecciona los elementos que deseas limpiar',
            });
            return;
        }

        // Remove cleaned items
        const remainingItems = cleaningItems.filter(
            (item) => !selectedItems.some((s) => s.id === item.id)
        );
        setCleaningItems(remainingItems);

        // Update stats
        updateStats(selectedSize, selectedItems.length);
        addToHistory({
            category: config.title,
            itemsCleaned: selectedItems.length,
            spaceSaved: selectedSize,
        });

        addNotification({
            type: 'success',
            title: '¡Limpieza completada!',
            message: `Se liberaron ${formatBytes(selectedSize)}`,
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20, height: 0 },
    };

    return (
        <div className="cleaning-view">
            {/* Header */}
            <div className="cleaning-header">
                <div className={`cleaning-header-icon cleaning-header-icon--${config.color}`}>
                    <Icon size={24} />
                </div>
                <div className="cleaning-header-content">
                    <h1 className="cleaning-title">{config.title}</h1>
                    <p className="cleaning-description">{config.description}</p>
                </div>
                <motion.button
                    className="refresh-button"
                    onClick={handleRefresh}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isRefreshing}
                >
                    <RefreshCw size={18} className={isRefreshing ? 'spinning' : ''} />
                </motion.button>
            </div>

            {/* Warning */}
            {config.warningMessage && (
                <motion.div
                    className="cleaning-warning"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <AlertTriangle size={18} />
                    <span>{config.warningMessage}</span>
                </motion.div>
            )}

            {/* Summary Bar */}
            <div className="cleaning-summary">
                <div className="summary-left">
                    <button className="select-all-button" onClick={handleSelectAll}>
                        {allSelected ? (
                            <CheckCircle2 size={18} className="checked" />
                        ) : (
                            <Circle size={18} />
                        )}
                        <span>{allSelected ? 'Deseleccionar todo' : 'Seleccionar todo'}</span>
                    </button>
                    <span className="summary-count">
                        {selectedItems.length} de {items.length} seleccionados
                    </span>
                </div>
                <div className="summary-right">
                    <span className="summary-size">
                        {formatBytes(selectedSize)} de {formatBytes(totalSize)}
                    </span>
                </div>
            </div>

            {/* Items List */}
            <div className="cleaning-items">
                <AnimatePresence mode="popLayout">
                    {items.length === 0 ? (
                        <motion.div
                            className="empty-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Icon size={48} strokeWidth={1} />
                            <h3>No hay elementos</h3>
                            <p>Tu {config.title.toLowerCase()} está limpia</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="items-list"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className={`cleaning-item ${item.selected ? 'selected' : ''}`}
                                    variants={itemVariants}
                                    layout
                                    onClick={() => toggleItemSelection(item.id)}
                                >
                                    <div className="item-checkbox">
                                        {item.selected ? (
                                            <CheckCircle2 size={20} className="checked" />
                                        ) : (
                                            <Circle size={20} />
                                        )}
                                    </div>
                                    <div className="item-icon">
                                        {item.type === 'folder' ? (
                                            <Folder size={20} />
                                        ) : (
                                            <File size={20} />
                                        )}
                                    </div>
                                    <div className="item-info">
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-path">{item.path}</span>
                                    </div>
                                    <div className="item-meta">
                                        <span className="item-size">{formatBytes(item.size)}</span>
                                        <span className="item-date">
                                            {formatRelativeTime(item.lastModified)}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Commands Section */}
            {commands.length > 0 && (
                <div className="commands-section">
                    <div className="commands-header">
                        <Terminal size={18} />
                        <span>Comandos de Terminal</span>
                    </div>
                    <div className="commands-list">
                        {commands.map((command, index) => (
                            <div key={index} className="command-item">
                                <code>{command}</code>
                                <button
                                    className="copy-button"
                                    onClick={() => handleCopyCommand(command)}
                                >
                                    {copiedCommand === command ? (
                                        <>
                                            <Check size={14} />
                                            Copiado
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={14} />
                                            Copiar
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Bar */}
            <div className="cleaning-actions">
                <motion.button
                    className={`clean-button clean-button--${config.color}`}
                    onClick={handleClean}
                    disabled={selectedItems.length === 0}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Trash2 size={18} />
                    Limpiar seleccionados ({formatBytes(selectedSize)})
                </motion.button>
            </div>
        </div>
    );
}

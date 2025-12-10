import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Trash2,
    Package,
    FolderDown,
    FileText,
    AppWindow,
    HardDrive,
    Settings,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { View } from '../../store/useStore';
import './Sidebar.css';

interface SidebarItem {
    id: View;
    label: string;
    icon: typeof LayoutDashboard;
    badge?: string;
}

const mainItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

const cleaningItems: SidebarItem[] = [
    { id: 'trash', label: 'Papelera', icon: Trash2 },
    { id: 'cache', label: 'Caché', icon: Package },
    { id: 'downloads', label: 'Descargas', icon: FolderDown },
    { id: 'logs', label: 'Logs del Sistema', icon: FileText },
    { id: 'apps', label: 'Apps Residuales', icon: AppWindow },
    { id: 'large-files', label: 'Archivos Grandes', icon: HardDrive },
];

const bottomItems: SidebarItem[] = [
    { id: 'settings', label: 'Ajustes', icon: Settings },
];

export function Sidebar() {
    const { currentView, setCurrentView, cleaningItems: items } = useStore();

    const getCategoryCount = (category: string): number => {
        return items.filter((item) => item.category === category && item.selected).length;
    };

    const renderItem = (item: SidebarItem) => {
        const isActive = currentView === item.id;
        const Icon = item.icon;
        const count = getCategoryCount(item.id);

        return (
            <motion.button
                key={item.id}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentView(item.id)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
            >
                <Icon size={18} className="sidebar-item-icon" />
                <span className="sidebar-item-label">{item.label}</span>
                {count > 0 && <span className="sidebar-item-badge">{count}</span>}
            </motion.button>
        );
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-content">
                <div className="sidebar-section">
                    {mainItems.map(renderItem)}
                </div>

                <div className="sidebar-section">
                    <div className="sidebar-section-title">Limpieza</div>
                    {cleaningItems.map(renderItem)}
                </div>
            </div>

            <div className="sidebar-footer">
                {bottomItems.map(renderItem)}
            </div>
        </aside>
    );
}

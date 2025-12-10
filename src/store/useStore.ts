import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';
export type View = 'dashboard' | 'trash' | 'cache' | 'downloads' | 'logs' | 'apps' | 'large-files' | 'settings';
export type Frequency = 'daily' | 'weekly' | 'monthly';

export interface CleaningItem {
    id: string;
    name: string;
    path: string;
    size: number; // in bytes
    type: 'file' | 'folder';
    category: 'trash' | 'cache' | 'downloads' | 'logs' | 'apps' | 'large';
    lastModified: Date;
    selected: boolean;
}

export interface CleaningHistory {
    id: string;
    date: Date;
    category: string;
    itemsCleaned: number;
    spaceSaved: number; // in bytes
}

export interface StorageBreakdown {
    apps: number;
    documents: number;
    system: number;
    other: number;
    free: number;
    total: number;
}

export interface ScheduledCleaning {
    id: string;
    category: CleaningItem['category'];
    frequency: Frequency;
    time: string; // HH:mm format
    enabled: boolean;
    lastRun?: Date;
    nextRun?: Date;
}

interface AppState {
    // Theme
    theme: Theme;
    setTheme: (theme: Theme) => void;

    // Language
    language: string;
    setLanguage: (lang: string) => void;

    // Navigation
    currentView: View;
    setCurrentView: (view: View) => void;

    // Scanning State
    isScanning: boolean;
    scanProgress: number;
    setIsScanning: (scanning: boolean) => void;
    setScanProgress: (progress: number) => void;

    // Storage Data (simulated)
    storageData: StorageBreakdown;
    setStorageData: (data: StorageBreakdown) => void;

    // Cleaning Items
    cleaningItems: CleaningItem[];
    setCleaningItems: (items: CleaningItem[]) => void;
    toggleItemSelection: (id: string) => void;
    selectAllItems: (category: CleaningItem['category']) => void;
    deselectAllItems: (category: CleaningItem['category']) => void;

    // Cleaning History
    history: CleaningHistory[];
    addToHistory: (entry: Omit<CleaningHistory, 'id' | 'date'>) => void;

    // Statistics
    totalSpaceSaved: number;
    totalItemsCleaned: number;
    updateStats: (space: number, items: number) => void;

    // Modal State
    activeModal: string | null;
    setActiveModal: (modal: string | null) => void;

    // Scheduled Cleanings
    scheduledCleanings: ScheduledCleaning[];
    addScheduledCleaning: (schedule: Omit<ScheduledCleaning, 'id'>) => void;
    updateScheduledCleaning: (id: string, updates: Partial<ScheduledCleaning>) => void;
    removeScheduledCleaning: (id: string) => void;
    toggleScheduleEnabled: (id: string) => void;

    // Notifications
    notifications: Array<{
        id: string;
        type: 'success' | 'warning' | 'error' | 'info';
        title: string;
        message: string;
    }>;
    addNotification: (notification: Omit<AppState['notifications'][0], 'id'>) => void;
    removeNotification: (id: string) => void;
}

// Helper to calculate next run date
const calculateNextRun = (frequency: Frequency, time: string): Date => {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const next = new Date();
    next.setHours(hours, minutes, 0, 0);

    if (next <= now) {
        switch (frequency) {
            case 'daily':
                next.setDate(next.getDate() + 1);
                break;
            case 'weekly':
                next.setDate(next.getDate() + 7);
                break;
            case 'monthly':
                next.setMonth(next.getMonth() + 1);
                break;
        }
    }

    return next;
};

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            // Theme
            theme: 'system',
            setTheme: (theme) => set({ theme }),

            // Language
            language: 'es',
            setLanguage: (language) => set({ language }),

            // Navigation
            currentView: 'dashboard',
            setCurrentView: (view) => set({ currentView: view }),

            // Scanning State
            isScanning: false,
            scanProgress: 0,
            setIsScanning: (scanning) => set({ isScanning: scanning }),
            setScanProgress: (progress) => set({ scanProgress: progress }),

            // Storage Data (simulated realistic values)
            storageData: {
                apps: 45 * 1024 * 1024 * 1024, // 45 GB
                documents: 28 * 1024 * 1024 * 1024, // 28 GB
                system: 15 * 1024 * 1024 * 1024, // 15 GB
                other: 32 * 1024 * 1024 * 1024, // 32 GB
                free: 136 * 1024 * 1024 * 1024, // 136 GB
                total: 256 * 1024 * 1024 * 1024, // 256 GB
            },
            setStorageData: (data) => set({ storageData: data }),

            // Cleaning Items
            cleaningItems: [],
            setCleaningItems: (items) => set({ cleaningItems: items }),
            toggleItemSelection: (id) =>
                set((state) => ({
                    cleaningItems: state.cleaningItems.map((item) =>
                        item.id === id ? { ...item, selected: !item.selected } : item
                    ),
                })),
            selectAllItems: (category) =>
                set((state) => ({
                    cleaningItems: state.cleaningItems.map((item) =>
                        item.category === category ? { ...item, selected: true } : item
                    ),
                })),
            deselectAllItems: (category) =>
                set((state) => ({
                    cleaningItems: state.cleaningItems.map((item) =>
                        item.category === category ? { ...item, selected: false } : item
                    ),
                })),

            // Cleaning History
            history: [],
            addToHistory: (entry) =>
                set((state) => ({
                    history: [
                        {
                            ...entry,
                            id: crypto.randomUUID(),
                            date: new Date(),
                        },
                        ...state.history,
                    ].slice(0, 50), // Keep last 50 entries
                })),

            // Statistics
            totalSpaceSaved: 0,
            totalItemsCleaned: 0,
            updateStats: (space, items) =>
                set((state) => ({
                    totalSpaceSaved: state.totalSpaceSaved + space,
                    totalItemsCleaned: state.totalItemsCleaned + items,
                })),

            // Modal State
            activeModal: 'welcome', // Show welcome modal on first load
            setActiveModal: (modal) => set({ activeModal: modal }),

            // Scheduled Cleanings
            scheduledCleanings: [],
            addScheduledCleaning: (schedule) =>
                set((state) => ({
                    scheduledCleanings: [
                        ...state.scheduledCleanings,
                        {
                            ...schedule,
                            id: crypto.randomUUID(),
                            nextRun: calculateNextRun(schedule.frequency, schedule.time),
                        },
                    ],
                })),
            updateScheduledCleaning: (id, updates) =>
                set((state) => ({
                    scheduledCleanings: state.scheduledCleanings.map((s) =>
                        s.id === id
                            ? {
                                ...s,
                                ...updates,
                                nextRun: updates.frequency || updates.time
                                    ? calculateNextRun(
                                        updates.frequency || s.frequency,
                                        updates.time || s.time
                                    )
                                    : s.nextRun,
                            }
                            : s
                    ),
                })),
            removeScheduledCleaning: (id) =>
                set((state) => ({
                    scheduledCleanings: state.scheduledCleanings.filter((s) => s.id !== id),
                })),
            toggleScheduleEnabled: (id) =>
                set((state) => ({
                    scheduledCleanings: state.scheduledCleanings.map((s) =>
                        s.id === id ? { ...s, enabled: !s.enabled } : s
                    ),
                })),

            // Notifications
            notifications: [],
            addNotification: (notification) =>
                set((state) => ({
                    notifications: [
                        ...state.notifications,
                        { ...notification, id: crypto.randomUUID() },
                    ],
                })),
            removeNotification: (id) =>
                set((state) => ({
                    notifications: state.notifications.filter((n) => n.id !== id),
                })),
        }),
        {
            name: 'imaclean-storage',
            partialize: (state) => ({
                theme: state.theme,
                language: state.language,
                history: state.history,
                totalSpaceSaved: state.totalSpaceSaved,
                totalItemsCleaned: state.totalItemsCleaned,
                scheduledCleanings: state.scheduledCleanings,
            }),
        }
    )
);

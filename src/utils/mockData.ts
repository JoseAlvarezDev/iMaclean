import type { CleaningItem } from '../store/useStore';
import { generateId } from './formatters';

const randomDate = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
    return date;
};

const randomSize = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const generateMockTrashItems = (): CleaningItem[] => [
    {
        id: generateId(),
        name: 'Proyecto antiguo.zip',
        path: '~/.Trash/Proyecto antiguo.zip',
        size: randomSize(50, 500) * 1024 * 1024,
        type: 'file',
        category: 'trash',
        lastModified: randomDate(30),
        selected: false,
    },
    {
        id: generateId(),
        name: 'Screenshots',
        path: '~/.Trash/Screenshots',
        size: randomSize(100, 800) * 1024 * 1024,
        type: 'folder',
        category: 'trash',
        lastModified: randomDate(15),
        selected: false,
    },
    {
        id: generateId(),
        name: 'documento.pdf',
        path: '~/.Trash/documento.pdf',
        size: randomSize(1, 50) * 1024 * 1024,
        type: 'file',
        category: 'trash',
        lastModified: randomDate(7),
        selected: false,
    },
    {
        id: generateId(),
        name: 'video_vacaciones.mov',
        path: '~/.Trash/video_vacaciones.mov',
        size: randomSize(500, 2000) * 1024 * 1024,
        type: 'file',
        category: 'trash',
        lastModified: randomDate(45),
        selected: false,
    },
    {
        id: generateId(),
        name: 'node_modules_backup',
        path: '~/.Trash/node_modules_backup',
        size: randomSize(200, 1000) * 1024 * 1024,
        type: 'folder',
        category: 'trash',
        lastModified: randomDate(10),
        selected: false,
    },
];

export const generateMockCacheItems = (): CleaningItem[] => [
    {
        id: generateId(),
        name: 'com.apple.Safari',
        path: '~/Library/Caches/com.apple.Safari',
        size: randomSize(100, 500) * 1024 * 1024,
        type: 'folder',
        category: 'cache',
        lastModified: randomDate(1),
        selected: false,
    },
    {
        id: generateId(),
        name: 'com.google.Chrome',
        path: '~/Library/Caches/com.google.Chrome',
        size: randomSize(200, 800) * 1024 * 1024,
        type: 'folder',
        category: 'cache',
        lastModified: randomDate(1),
        selected: false,
    },
    {
        id: generateId(),
        name: 'com.spotify.client',
        path: '~/Library/Caches/com.spotify.client',
        size: randomSize(50, 300) * 1024 * 1024,
        type: 'folder',
        category: 'cache',
        lastModified: randomDate(2),
        selected: false,
    },
    {
        id: generateId(),
        name: 'com.apple.dt.Xcode',
        path: '~/Library/Caches/com.apple.dt.Xcode',
        size: randomSize(1000, 5000) * 1024 * 1024,
        type: 'folder',
        category: 'cache',
        lastModified: randomDate(3),
        selected: false,
    },
    {
        id: generateId(),
        name: 'com.microsoft.VSCode',
        path: '~/Library/Caches/com.microsoft.VSCode',
        size: randomSize(100, 400) * 1024 * 1024,
        type: 'folder',
        category: 'cache',
        lastModified: randomDate(1),
        selected: false,
    },
    {
        id: generateId(),
        name: 'com.slack.Slack',
        path: '~/Library/Caches/com.slack.Slack',
        size: randomSize(50, 200) * 1024 * 1024,
        type: 'folder',
        category: 'cache',
        lastModified: randomDate(1),
        selected: false,
    },
    {
        id: generateId(),
        name: 'com.discord',
        path: '~/Library/Caches/com.discord',
        size: randomSize(80, 250) * 1024 * 1024,
        type: 'folder',
        category: 'cache',
        lastModified: randomDate(2),
        selected: false,
    },
];

export const generateMockDownloadsItems = (): CleaningItem[] => [
    {
        id: generateId(),
        name: 'installer.dmg',
        path: '~/Downloads/installer.dmg',
        size: randomSize(100, 500) * 1024 * 1024,
        type: 'file',
        category: 'downloads',
        lastModified: randomDate(60),
        selected: false,
    },
    {
        id: generateId(),
        name: 'random_files',
        path: '~/Downloads/random_files',
        size: randomSize(50, 200) * 1024 * 1024,
        type: 'folder',
        category: 'downloads',
        lastModified: randomDate(90),
        selected: false,
    },
    {
        id: generateId(),
        name: 'backup_2023.zip',
        path: '~/Downloads/backup_2023.zip',
        size: randomSize(500, 2000) * 1024 * 1024,
        type: 'file',
        category: 'downloads',
        lastModified: randomDate(120),
        selected: false,
    },
    {
        id: generateId(),
        name: 'presentation.pptx',
        path: '~/Downloads/presentation.pptx',
        size: randomSize(10, 100) * 1024 * 1024,
        type: 'file',
        category: 'downloads',
        lastModified: randomDate(30),
        selected: false,
    },
    {
        id: generateId(),
        name: 'music_collection',
        path: '~/Downloads/music_collection',
        size: randomSize(300, 800) * 1024 * 1024,
        type: 'folder',
        category: 'downloads',
        lastModified: randomDate(45),
        selected: false,
    },
];

export const generateMockLogsItems = (): CleaningItem[] => [
    {
        id: generateId(),
        name: 'system.log',
        path: '/var/log/system.log',
        size: randomSize(10, 100) * 1024 * 1024,
        type: 'file',
        category: 'logs',
        lastModified: randomDate(1),
        selected: false,
    },
    {
        id: generateId(),
        name: 'install.log',
        path: '/var/log/install.log',
        size: randomSize(5, 50) * 1024 * 1024,
        type: 'file',
        category: 'logs',
        lastModified: randomDate(7),
        selected: false,
    },
    {
        id: generateId(),
        name: 'DiagnosticReports',
        path: '/Library/Logs/DiagnosticReports',
        size: randomSize(50, 300) * 1024 * 1024,
        type: 'folder',
        category: 'logs',
        lastModified: randomDate(14),
        selected: false,
    },
    {
        id: generateId(),
        name: 'com.apple.xpc.launchd',
        path: '/var/log/com.apple.xpc.launchd',
        size: randomSize(20, 80) * 1024 * 1024,
        type: 'folder',
        category: 'logs',
        lastModified: randomDate(3),
        selected: false,
    },
];

export const generateMockAppsItems = (): CleaningItem[] => [
    {
        id: generateId(),
        name: 'OldApp.app (desinstalada)',
        path: '~/Library/Application Support/OldApp',
        size: randomSize(50, 200) * 1024 * 1024,
        type: 'folder',
        category: 'apps',
        lastModified: randomDate(180),
        selected: false,
    },
    {
        id: generateId(),
        name: 'UnusedTool Preferences',
        path: '~/Library/Preferences/com.unusedtool.plist',
        size: randomSize(1, 10) * 1024,
        type: 'file',
        category: 'apps',
        lastModified: randomDate(200),
        selected: false,
    },
    {
        id: generateId(),
        name: 'DeletedGame Data',
        path: '~/Library/Application Support/DeletedGame',
        size: randomSize(100, 500) * 1024 * 1024,
        type: 'folder',
        category: 'apps',
        lastModified: randomDate(90),
        selected: false,
    },
];

export const generateMockLargeFilesItems = (): CleaningItem[] => [
    {
        id: generateId(),
        name: 'Final_Project_v3_FINAL_REAL.psd',
        path: '~/Documents/Design/Final_Project_v3_FINAL_REAL.psd',
        size: randomSize(500, 2000) * 1024 * 1024,
        type: 'file',
        category: 'large',
        lastModified: randomDate(60),
        selected: false,
    },
    {
        id: generateId(),
        name: 'backup_iphone_2022.zip',
        path: '~/Documents/Backups/backup_iphone_2022.zip',
        size: randomSize(5000, 15000) * 1024 * 1024,
        type: 'file',
        category: 'large',
        lastModified: randomDate(365),
        selected: false,
    },
    {
        id: generateId(),
        name: 'virtual_machine.vmdk',
        path: '~/VMs/virtual_machine.vmdk',
        size: randomSize(10000, 50000) * 1024 * 1024,
        type: 'file',
        category: 'large',
        lastModified: randomDate(120),
        selected: false,
    },
    {
        id: generateId(),
        name: 'raw_photos_2023',
        path: '~/Pictures/raw_photos_2023',
        size: randomSize(2000, 8000) * 1024 * 1024,
        type: 'folder',
        category: 'large',
        lastModified: randomDate(30),
        selected: false,
    },
];

export const generateAllMockItems = (): CleaningItem[] => [
    ...generateMockTrashItems(),
    ...generateMockCacheItems(),
    ...generateMockDownloadsItems(),
    ...generateMockLogsItems(),
    ...generateMockAppsItems(),
    ...generateMockLargeFilesItems(),
];

export const getCleaningCommands = (category: CleaningItem['category']): string[] => {
    const commands: Record<string, string[]> = {
        trash: ['rm -rf ~/.Trash/*'],
        cache: ['rm -rf ~/Library/Caches/*'],
        downloads: ['# Revisa manualmente ~/Downloads antes de eliminar'],
        logs: [
            'sudo rm -rf /var/log/*',
            'sudo rm -rf /Library/Logs/DiagnosticReports/*',
        ],
        apps: ['# Los archivos residuales deben eliminarse manualmente'],
        large: ['# Revisa estos archivos antes de eliminarlos'],
    };

    return commands[category] || [];
};

const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    // Navigation from menu
    onNavigate: (callback) => ipcRenderer.on('navigate', (event, view) => callback(view)),

    // Theme changes from system
    onThemeChanged: (callback) => ipcRenderer.on('theme-changed', (event, theme) => callback(theme)),

    // Platform info
    platform: process.platform,

    // Check if running in Electron
    isElectron: true,
});

const { app, BrowserWindow, Menu, shell, nativeTheme } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow;

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 900,
        minHeight: 600,
        titleBarStyle: 'hiddenInset',
        trafficLightPosition: { x: 20, y: 18 },
        backgroundColor: nativeTheme.shouldUseDarkColors ? '#000000' : '#ffffff',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs'),
        },
        icon: path.join(__dirname, '../public/icons/logo_light.png'),
        show: false,
    });

    // Load the app
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Handle external links
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

// Create menu
function createMenu() {
    const template = [
        {
            label: 'iMaclean',
            submenu: [
                { role: 'about', label: 'Acerca de iMaclean' },
                { type: 'separator' },
                {
                    label: 'Preferencias...',
                    accelerator: 'CmdOrCtrl+,',
                    click: () => {
                        mainWindow.webContents.send('navigate', 'settings');
                    },
                },
                { type: 'separator' },
                { role: 'services', label: 'Servicios' },
                { type: 'separator' },
                { role: 'hide', label: 'Ocultar iMaclean' },
                { role: 'hideOthers', label: 'Ocultar otros' },
                { role: 'unhide', label: 'Mostrar todo' },
                { type: 'separator' },
                { role: 'quit', label: 'Salir de iMaclean' },
            ],
        },
        {
            label: 'Edición',
            submenu: [
                { role: 'undo', label: 'Deshacer' },
                { role: 'redo', label: 'Rehacer' },
                { type: 'separator' },
                { role: 'cut', label: 'Cortar' },
                { role: 'copy', label: 'Copiar' },
                { role: 'paste', label: 'Pegar' },
                { role: 'selectAll', label: 'Seleccionar todo' },
            ],
        },
        {
            label: 'Ver',
            submenu: [
                { role: 'reload', label: 'Recargar' },
                { role: 'forceReload', label: 'Forzar recarga' },
                { role: 'toggleDevTools', label: 'Herramientas de desarrollador' },
                { type: 'separator' },
                { role: 'resetZoom', label: 'Tamaño actual' },
                { role: 'zoomIn', label: 'Aumentar' },
                { role: 'zoomOut', label: 'Reducir' },
                { type: 'separator' },
                { role: 'togglefullscreen', label: 'Pantalla completa' },
            ],
        },
        {
            label: 'Ventana',
            submenu: [
                { role: 'minimize', label: 'Minimizar' },
                { role: 'zoom', label: 'Zoom' },
                { type: 'separator' },
                { role: 'front', label: 'Traer todo al frente' },
            ],
        },
        {
            label: 'Ayuda',
            submenu: [
                {
                    label: 'Más información',
                    click: async () => {
                        await shell.openExternal('https://github.com');
                    },
                },
            ],
        },
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Listen for theme changes
nativeTheme.on('updated', () => {
    mainWindow?.webContents.send('theme-changed', nativeTheme.shouldUseDarkColors ? 'dark' : 'light');
});

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
    createWindow();
    createMenu();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

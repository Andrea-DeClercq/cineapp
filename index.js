// Import necessary modules from Electron
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Function to create the main application window
function createWindow() {
    // Create a new browser window
    const win = new BrowserWindow({
        width: 800, // Set the width of the window
        height: 600, // Set the height of the window
        webPreferences: {
            // Enable Node.js integration in the app
            nodeIntegration: true,
            // Disable context isolation for compatibility with older APIs
            contextIsolation: false,
        },
    });

    // Load the React application in the created window
    win.loadURL('http://localhost:3000'); // Ensure your React app is running on this URL
}

// Listen for the 'ready' event to create the application window
app.whenReady().then(createWindow);

// Quit the application when all windows are closed
app.on('window-all-closed', () => {
    // On platforms other than macOS, close the application
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// On macOS, recreate the window when the app icon is clicked and there are no open windows
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

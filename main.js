const { app, BrowserWindow, Menu } = require('electron');

//crée la fenêtre principale
function createWindows() {
    let win = new BrowserWindow({
        width: 1024,
        height: 768,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    })
    //affiche la fenêtre `index.html`
    win.loadFile('app/index/index.html');

    //menu de l'application
    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {label:'Exit', 
                click() { 
                    app.quit() }
                }
            ]
        }
    ])
    Menu.setApplicationMenu(menu); 
}

//quand l'application est prête lance la fonction
app.whenReady().then(createWindows);
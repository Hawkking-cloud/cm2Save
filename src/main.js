const { shell } = require('electron');
const { dialog } = require('electron');
const { exec } = require('child_process');
const electron = require("electron")
const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const ipcMain = electron.ipcMain
const appDataPath = app.getPath('appData');
const dataStorePath = path.join(appDataPath, 'cm2Save');
const savePath = path.join(dataStorePath, 'saves');
const txtPath = path.join(dataStorePath, 'convertedTXTS');
if (!fs.existsSync(dataStorePath)) {
    fs.mkdirSync(dataStorePath);
    fs.mkdirSync(savePath);
    fs.mkdirSync(txtPath);
}
let myWindow;
app.whenReady().then(() => {
    myWindow = new BrowserWindow({
        width:1000,
        height:900,
        autoHideMenuBar: true, 
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(app.getAppPath(), 'preload.js'),
            contentSecurityPolicy: "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
        },
        title:'cm2Save'
    });
    myWindow.loadFile('index.html');
    fs.readdir(savePath, (err,files) => {
        files.forEach(file => {
            const filePath = path.join(savePath, file);
            fs.readFile(filePath, 'utf8', (err,data) =>{
                myWindow.webContents.executeJavaScript(`addSave("${data+'|'+file}")`);
            })
        })
    }) ;
    myWindow.on('closed', () => {
        fs.readdir(txtPath, (err, files) => {
            if (err) return;
    
            files.forEach(file => {
                const filePath = path.join(txtPath, file);
                fs.unlink(filePath, () => {});
            });
        });
    });
}); 
function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
ipcMain.on('write',(event, arg)=>{
    let string = arg.split("|")[0]+'.txt'
    fs.writeFile(savePath+'/'+string, arg, (err)=>{
        return;
    });
    myWindow.webContents.executeJavaScript(`addSave("${arg+"|"+string}")`);
    return;
})
ipcMain.on('edit',(event, arg)=>{
    
    fs.writeFile(savePath+'/'+arg[0], arg[1], (err)=>{
        return;
    });
    return;
})
ipcMain.on('delete',(event, arg)=>{
    fs.unlink(savePath+"/"+arg, (err)=>{
        return;
    });
    return;
})
ipcMain.on('convert',(event, arg)=>{
    fs.readFile(savePath+'/'+arg, 'utf8', (err,data)=>{
        fs.writeFile(txtPath+'/'+arg, data.split('|')[1], (err)=>{
                const filePath = path.join(txtPath, arg);
                shell.openPath(filePath);
            return;
        });
    });
    return;
})
ipcMain.on('wipeCache',()=>{
    fs.readdir(txtPath, (err, files) => {
        if (err) return;

        files.forEach(file => {
            const filePath = path.join(txtPath, file);
            fs.unlink(filePath, () => {});
        });
    });
})
ipcMain.on('openCache',()=>{
    exec(`start "" "${path.resolve(txtPath)}"`);
})
ipcMain.on('openSaves',()=>{
    exec(`start "" "${path.resolve(savePath)}"`);
})
ipcMain.on('rename',(event,arg)=>{
    fs.rename(savePath+"/"+arg[0],savePath+"/"+arg[1]+".txt",()=>{})
})
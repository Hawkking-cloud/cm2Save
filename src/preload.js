const {ipcRenderer, contextBridge} = require('electron');
contextBridge.exposeInMainWorld("api",{
    send: (channel, data) => ipcRenderer.send(channel, data),
    sendSync: (channel, data) => ipcRenderer.sendSync(channel, data),
    recieve: (channel, func) => ipcRenderer.on(
        channel,
        (event, ...args) => func(args)
    )
})
ipcRenderer.on('asynchronous-reply', (_event, arg) => {
    testfuncReturn(arg)
})
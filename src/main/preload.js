const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  email: {
    sendTest() {
      return ipcRenderer.invoke("SendTestEmail").then(result => {
        return result;
      });
    },
    send(path) {
      return ipcRenderer.invoke("SendEmail", path).then(result => {
        return result;
      });
    }
  },
  store: {
    get(val) {
      return ipcRenderer.invoke("electron-store-get", val).then((result) => {
        return result;
      });
    },
    set(property, val) {
      ipcRenderer.send("electron-store-set", property, val);
    },
    // Other method you want to add like has(), reset(), etc.
  },
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});

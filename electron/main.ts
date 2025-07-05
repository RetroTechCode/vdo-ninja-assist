import path from "path";
import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (!app.isPackaged) {
    win.webContents.openDevTools({ mode: "detach" });
  }

  win.webContents.on("did-fail-load", (_event, code, desc) => {
    console.error(`❌ Failed to load: ${code} - ${desc}`);
  });

  if (app.isPackaged) {
    // ✅ Use app.getAppPath() instead of __dirname
    const htmlPath = path.join(app.getAppPath(), "dist", "index.html");
    console.log("Loading index.html from", htmlPath);
    win.loadFile(htmlPath);
  } else {
    console.log("Loading localhost");
    win.loadURL("http://localhost:5173");
  }
}

app.whenReady().then(createWindow);

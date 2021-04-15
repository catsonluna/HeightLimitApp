const {
	app,
	BrowserWindow,
	dialog,
	ipcMain
} = require('electron')

const path = require('path')
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

require("@electron/remote/main").initialize()

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			enableRemoteModule: true,
			preload: path.join(__dirname, 'preload.js')
		}
	})
	win.loadURL('http://localhost:3000')

}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
const homeDirectory = app.getPath('home').replace(/\\/g, "\/");
const paths = {
	"lunar": `${homeDirectory}/.lunarclient/offline/1.8/logs/latest.log`,
	"vanilla": `${homeDirectory}/AppData/Roaming/.minecraft/logs/latest.log`,
	"badlion": `${homeDirectory}/AppData/Roaming/.minecraft/logs/blclient/minecraft/latest.log`
}
ipcMain.on('GetVanilla', () => {
	// fileNames is an array that contains all the selected
	fs.readFile(paths["vanilla"], 'utf-8', (err, data) => {
		if (err) {
			alert("An error ocurred reading the file :" + err.message);
			return;
		}

		// Change how to handle the file content
		console.log("The file content is : " + data);
	});
});

ipcMain.on('GetLunar', () => {
	// fileNames is an array that contains all the selected
	fs.readFile(paths["lunar"], 'utf-8', (err, data) => {
		if (err) {
			alert("An error ocurred reading the file :" + err.message);
			return;
		}

		// Change how to handle the file content
		console.log("The file content is : " + data);
	});
});
ipcMain.on('GetBLC', () => {
	// fileNames is an array that contains all the selected
	fs.readFile(paths["badlion"], 'utf-8', (err, data) => {
		if (err) {
			alert("An error ocurred reading the file :" + err.message);
			return;
		}

		// Change how to handle the file content
		console.log("The file content is : " + data);
	});
});
ipcMain.on('GetCustom', () => {
	dialog.showOpenDialog((fileNames) => {
		if (fileNames === undefined) {
			console.log("No file selected");
			return;
		}

		fs.readFile(filepath, 'utf-8', (err, data) => {
			if (err) {
				alert("An error ocurred reading the file :" + err.message);
				return;
			}

			// Change how to handle the file content
			console.log("The file content is : " + data);
		});
	});
});
const axios = require('axios');
const {
	app,
	BrowserWindow,
	dialog,
	ipcMain
} = require('electron')

const path = require('path')
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

const isDev = require('electron-is-dev')

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
	win.loadURL( isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

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
var firstTime = true;
ipcMain.on('GetVanilla', () => {
	console.log("This Is Getting Called")
	var currentClient = "vanilla";
	var file_fd = fs.openSync(`${paths[currentClient]}`, 'r');
	setInterval(readLogFile, 10);
	function readLogFile() {
		if (!file_fd || currentClient == "NONE") { return; }
		var newSize = fs.fstatSync(file_fd).size;
		if (firstTime) {
			lastSize = newSize;
			firstTime = false;
		} else {
			fs.read(file_fd, Buffer.alloc(2056), 0, 2056, lastSize, (err, bytes, buffer) => {
				lastSize += bytes;
				const lines = buffer.toString('latin1').split(/\r?\n/).slice(0, -1);
				lines.forEach(line => {
				if(line.includes(`[CHAT] {`))
					{	try{
						var obj = JSON.parse(line.split("[CHAT]")[1]);
						axios.get(`https://api.pinkulu.com/HeightLimitMod/BedWars/8team/${obj.map.toLowerCase().replace(" ", "_")}`)
									.then(({data}) => {
									  console.log(data)
									  return JSON.stringify(data)
									})
									.catch(err => {
									  console.error(err);
									});
						console.log(obj.gametype)
					}catch(err){
						console.log(err)
					}
					}
				});
			});
		}
	}
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
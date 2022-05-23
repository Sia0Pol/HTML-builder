const fs = require('fs');
const path = require('path');
const {stdout} = process;

// let readFolder = fs.readdir('secret-folder');
let pathFolder = path.join(__dirname, 'secret-folder');
// {withFileTypes: true} - опция, которая возвращает массив объектов

fs.readdir(pathFolder, {withFileTypes: true} , function(err, data){

	if (err) throw err;					

	data.forEach( function(elem){
		if (elem.isFile()) {

			fs.stat(path.join(pathFolder, elem.name), function (err, stats) {

				if (err) throw err;

				stdout.write(elem.name.slice(0, elem.name.lastIndexOf('.')) + " - " + path.extname(elem.name).slice(1) + " - " + (stats.size / 1024) + "kb" + "\n");

			})

		}
	})
})


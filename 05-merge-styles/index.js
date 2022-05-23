const fs = require('fs');
const path = require('path');


// const pathFilesFolder = path.join(__dirname, 'styles');
// const pathFilesCopyFolder = path.join(__dirname, 'project-dist');

// async function createFile(){
// 	await fs.promises.mkdir(pathFilesCopyFolder+'/bundle.css', { recursive: true });
// }
// createFile();


// fs.readdir(pathFilesFolder, {withFileTypes: true} , function(err, data){
// 	if (err) throw err;

// 	let arr = [];

// 	for (let element of data){
// 		if (element.name.slice(element.name.length-4) == '.css'){
// 			fs.readFile(element.name, "utf8", function(err,data){
// 				if (err) throw err;

// 				arr.push(data);
// 			});
// 		}
// 	};

// 	for (let element of data){
// 		fs.appendFile(pathFilesCopyFolder, element, function(err) {
// 			if (err) throw err;
// 		});
// 	}
// });


const dir1 = path.join(__dirname + '/styles/');
const dir2 = path.join(__dirname, 'project-dist');

fs.writeFile(dir2 + 'bundle.css', '', function (err) {});

fs.readdir(dir1, function (err, files) {
	if (err) {
		return console.log('Unable to scan directory: ' + err);
	}
	files.forEach(function (filename) {
		fs.readFile(dir1 + filename, 'utf-8', function (err, content) {
			if (err) {
				console.log(err);
			} else if (filename.slice(filename.length - 4) == '.css') {
				fs.appendFile(dir2 + 'bundle.css', content, function (err) {
					if (err) {
						console.log(err);
					}
				});
				console.log(filename);
			}
		});
	});
});

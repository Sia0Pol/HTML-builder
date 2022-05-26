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

const promise = require('fs/promises');
const dir1 = path.join(__dirname, 'styles');
const dir2 = path.join(__dirname, 'project-dist', 'bundle.css');
const style = fs.createWriteStream(dir2, 'utf-8');

(async () => {

  const fileFiles = await promise.readdir(dir1, {recursive: true,   force: true, withFileTypes: true});

  for (let elem of fileFiles) {
    if(elem.isFile() && path.extname(elem.name) === '.css') {
      const pathFile = path.join(dir1, elem.name);
      const readFile = await promise.readFile(pathFile, {recursive: true,   force: true});
      style.write(`${readFile}\n\n`);
    } 
  }

})();



const fs = require('fs');
const path = require('path');

// fs.mkdir('files-copy', function(err){
// 	if (err) throw err;
// });
const pathFilesFolder = path.join(__dirname, 'files');
const pathFilesCopyFolder = path.join(__dirname, 'files-copy');

async function createFolder(){
	await fs.promises.mkdir(pathFilesCopyFolder, { recursive: true });
}
createFolder();



fs.readdir(pathFilesFolder, {withFileTypes: true} , function(err, data){
	if (err) throw err;

	for (let element of data){

		if (element.isFile()){
			fs.copyFile(path.join(pathFilesFolder, element.name), path.join(pathFilesCopyFolder, element.name), function(err){
				if (err) throw err;
			});
		};
	};	
});
 
const fs = require('fs');
const path = require('path');

// fs.mkdir('files-copy', function(err){
// 	if (err) throw err;
// });
const pathFilesFolder = path.join(__dirname, 'files');
const pathFilesCopyFolder = path.join(__dirname, 'files-copy');

async function createFolder(){
	await fs.promises.mkdir(pathFilesCopyFolder, { recursive: true });

  fs.readdir(pathFilesCopyFolder,  function(err, data) {

    if (err) throw err;

    for(let element of data) {
      fs.access(path.join(pathFilesFolder, element), function(err){

        if (err) {
          fs.rm(path.join(pathFilesCopyFolder, element), function(err){
            if (err) throw err;
          });
        };
      });
    };
	});
}
createFolder();



fs.readdir(pathFilesFolder, {withFileTypes: true} , function(err, data){
	if (err) throw err;

	for (let element of data){

		if (element.isFile()){
			fs.copyFile(path.join(pathFilesFolder, element.name), path.join(pathFilesCopyFolder, element.name), function(err){
				if (err) throw err;
			});
		} else if(element.isDirectory()) {
			copyDir(path.join(pathFilesFolder, element.name), path.join(pathFilesCopyFolder, element.name));
		}
	};	
});

createFolder(pathFilesFolder, pathFilesCopyFolder);
 
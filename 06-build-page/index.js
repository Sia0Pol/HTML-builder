const fs = require('fs');
const path = require('path');
const promise = require('fs/promises');


const pathProjectDist = path.join(__dirname, 'project-dist');
const pathStyles = path.join(__dirname, 'styles');
const pathTemplate = path.join(__dirname, 'template.html');
const pathComponents = path.join(__dirname, 'components');
const pathFile = path.join(__dirname, 'assets');
const pathFileCopy = path.join(pathProjectDist,  'assets');
const fileStyle = path.join(pathProjectDist, 'style.css');
const fileIndex = path.join(pathProjectDist, 'index.html');

const style = fs.createWriteStream(fileStyle, 'utf-8');
const index = fs.createWriteStream(fileIndex, 'utf-8');


async function createTaskElements() {

  await promise.mkdir(pathProjectDist, {recursive: true, force: true});

  const stylesElements = await promise.readdir(pathStyles, {recursive: true,   force: true, withFileTypes: true});
	const template =  await promise.readFile(pathTemplate, {recursive: true, force: true, withFileTypes: true});

  let str = template.toString(); 
  
  const htmlComponents =  await promise.readdir(pathComponents, {recursive: true, force: true, withFileTypes: true});

  for (let elem of stylesElements) {

    if(elem.isFile() && path.extname(elem.name) === '.css') {

      const pathElem = path.join(pathStyles, elem.name);
      const readElem = await promise.readFile(pathElem, {recursive: true, force: true});
      style.write(`${readElem}\n\n`);
    } 
  }
  
  for (let elem of htmlComponents) {
    const pathElem = path.join(pathComponents, elem.name); 
    const readElem = await promise.readFile(pathElem, {recursive: true, force: true});

    if(elem.isFile() && path.extname(elem.name) === '.html') {

      if (str.includes(`{{${elem.name.split('.')[0]}}}`)){
        str = str.replace(`{{${elem.name.split('.')[0]}}}`, readElem);    
      }
    }
  }

	copyDir(pathFile, pathFileCopy);
  index.write(str);  
   
  
}
createTaskElements();

const copyDir = async function(pathFile, pathFileCopy){
  
  await promise.mkdir(pathFileCopy, {recursive: true, force: true});

  fs.readdir(pathFileCopy,  function(err, data){

    if (err) throw err;

    for(let elem of data) {
      fs.access(path.join(pathFile, elem), function(err){

        if (err) {
          fs.rm(path.join(pathFileCopy, elem), function(err){

            if (err) throw err;
          });
        }
      });
    }
  });
 
  fs.readdir(pathFile, {withFileTypes: true}, function(err, data,){

    if (err) throw err;

    for(let el of data) {

      if(el.isFile()) {
        fs.copyFile(path.join(pathFile, el.name), path.join(pathFileCopy, el.name),   function(err){

          if (err) throw err;
        });
      } 

      else if(el.isDirectory()) {
        copyDir(path.join(pathFile, el.name), path.join(pathFileCopy, el.name));
      }
    }
  });
  
};



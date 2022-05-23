const fs = require('fs');
const path = require('path');
// fs.readFile('text.txt', 'utf-8', function(err, data){
// 	console.log(data)
// }) 

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');


stream.on('data', function(chunk){
	console.log(chunk)
})
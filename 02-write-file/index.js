const fs = require('fs');
const { stdin, stdout } = process;
const path = require('path');

const pathTXT = path.join(__dirname, 'text.txt');



const createTxtFile = fs.createWriteStream(pathTXT);

stdout.write('Введите сообщение:');

stdin.on('data', function(data){
	if (data.toString().trim() == 'exit'){
		stdout.write('Bye!');
		process.exit();
	}
	createTxtFile.write(data);

	process.on('SIGINT', function(){
		console.log('Bye!');
		process.exit();
	});
});


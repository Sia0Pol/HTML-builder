const fs = require('fs');
const { stdin, stdout } = process;

let createTxtFile = fs.createWriteStream('text.txt');

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


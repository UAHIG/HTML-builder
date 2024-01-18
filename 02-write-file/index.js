const fs = require('fs');
const process = require('process');
const { stdin, stdout } = process;
const path = require('path');
let writeText = fs.createWriteStream(path.join(__dirname, 'mynotes.txt'));
console.log('Please write some text: If you want to exit - enter word exit');


stdin.on('data', (data) => {
  if (data.toString().trim() == 'exit') {
    console.log('You are canselled!');
    process.exit();     
  }
  console.log('Please write more text if you want:');
  writeText.write(data);

  
});

process.stdin.resume();

process.on('SIGINT', () => {
  console.log('You are canselled!');gkdh
  process.exit(); 
});
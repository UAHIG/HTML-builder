const fs = require('fs');
const path = require('path');
const way =  path.resolve('01-read-file', 'text.txt');

let readableStream = fs.createReadStream(way, 'utf8');
 
let data = '';


readableStream.on('data', chunk => data+=chunk);
readableStream.on('end', () => console.log(data));
// fs.readFile(way, 'utf8', function (error, chunk) {
    
//   if (error) console.log(error); 
//   console.log(chunk); 
// });
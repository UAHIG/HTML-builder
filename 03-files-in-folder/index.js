const fs = require('fs');
const path = require('path');
const way =  path.resolve('03-files-in-folder', 'secret-folder');

fs.readdir(way, {withFileTypes: true}, function(err, items) {
   
  for (let i=0; i<items.length; i++) {
    if (items[i].isFile() === true) {
      fs.stat(`03-files-in-folder/secret-folder/${items[i].name}`, (error, stats) => {
        console.log(`${items[i].name.split('.').slice(0, -1).join('.')} - ${path.extname(items[i].name)} - ${stats.size} bytes`);
                    
      });
    }                       
  }
         
});
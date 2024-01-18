const fs = require('fs');
const path = require('path');
const way =  path.resolve('04-copy-directory', 'files-copy');
const copyWay =  path.resolve('04-copy-directory', 'files');
const fsPromise = require('fs/promises');



fs.mkdir(way, { recursive: true }, err => {
  if(err) throw err; 
  
});

async function copyFiles(){
  
  try {
    const copies = await fsPromise.readdir('04-copy-directory/files-copy', {withFileTypes: true});
    console.log(copies);
    for (let copy of copies){
      fs.unlink(`04-copy-directory/files-copy/${copy.name}`, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log('file delited');
        }
      });
    }

    const item = await fsPromise.readdir('04-copy-directory/files', {withFileTypes: true});
    for (const items of item) {
      if (items.isFile()){
        fs.copyFile(`04-copy-directory/files/${items.name}`, `04-copy-directory/files-copy/${items.name}`, (err) => {
          if (err) {
            console.log('Error Found:', err);
          }
                
        });
      }
    }
  } catch(err) {
    console.log((err)); 
  }

}

copyFiles();
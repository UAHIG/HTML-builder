const fs = require('fs');
const path = require('path');
const outputFile = path.resolve(__dirname + '/project-dist/bundle.css');

fs.writeFile(outputFile, '', (err) => {
  if (err) throw err;
});

fs.readdir('05-merge-styles/styles', { withFileTypes: true }, function (err, files) {
  let contentArray = [];
  
  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile() === true && path.extname(files[i].name) === '.css') {
      fs.readFile(`05-merge-styles/styles/${files[i].name}`, 'utf-8', (error, data) => {
        if (error) throw error;
        
        contentArray.push(data);

        fs.appendFile(
          outputFile,
          data,
          err => {
            if (err) throw err;
          }
        );
      });
    }
  }
});

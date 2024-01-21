const fs = require('fs');
const path = require('path');
let fileDirection = path.resolve(__dirname + '/project-dist/bundle.css');

fs.writeFile(
  fileDirection,
  '',
  (err) => {
    if (err) throw err;
  });

fs.readdir('05-merge-styles/styles', {withFileTypes: true}, function(err, items) {
  let res = [];
  for (let i = 0; i<items.length; i++) {
    if (items[i].isFile() === true && path.extname(items[i].name) == '.css') {
      fs.readFile(`05-merge-styles/styles/${items[i].name}`, 'utf-8', (error, data) => {
        
        res.push(data);

        fs.appendFile(
          fileDirection,
          data,
          err => {
            if (err) throw err;
          });
        
      });
    }
    
  }
  
});
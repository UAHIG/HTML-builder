const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');
const { createBrotliCompress } = require('zlib');
let dirDirection = path.resolve(__dirname + '/project-dist');
let assetsDirection = path.resolve(__dirname + '/project-dist/assets');
let htmlDirection = path.resolve(__dirname + '/project-dist/index.html');
let csslDirection = path.resolve(__dirname + '/project-dist/style.css');


fs.mkdir(dirDirection, { recursive: true }, err => {
  if(err) throw err; 
});

fs.mkdir(assetsDirection, { recursive: true }, err => {
  if(err) throw err; 
});


fs.writeFile(
  htmlDirection,
  '',
  (err) => {
    if (err) throw err;
  });

fs.writeFile(
  csslDirection,
  '',
  (err) => {
    if (err) throw err;
  });

async function copyDirectory () {
  try {
    const readDir = await fsPromise.readdir('06-build-page/assets', {withFileTypes: true});
    for (const dir of readDir) {
      let copies = await fsPromise.readdir(`06-build-page/assets/${dir.name}`, {withFileTypes: true});
      console.log(dir.name);
      fs.mkdir(`06-build-page/project-dist/assets/${dir.name}`, { recursive: true }, err => {
        if(err) throw err; 
      });
      let readyCopy = await fsPromise.readdir(`06-build-page/project-dist/assets/${dir.name}`, {withFileTypes: true});
      for (const file of readyCopy) {
        fs.unlink(`06-build-page/project-dist/assets/${dir.name}/${file.name}`, function(err){
          if (err) {
            console.log(err);
          } 
        });
      }
      for (const copy of copies) {
        // console.log(`06-build-page/assets/${readDir[i].name}/${copy.name}`)
        fs.copyFile(`06-build-page/assets/${dir.name}/${copy.name}`, `06-build-page/project-dist/assets/${dir.name}/${copy.name}`, (err) => {
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

copyDirectory();

async function createHtml() {
  try {
    let templateHtml = await fsPromise.readFile(__dirname + '/' + 'template.html');
    let htmlComponents = await fsPromise.readdir(__dirname + '/' + 'components', {withFileTypes: true});
    let htmlTxt = templateHtml.toString();
    let currentPart = '';
    for (const component of htmlComponents) {
      if (component.isFile() && path.extname(component.name) === '.html'){
        currentPart = await fsPromise.readFile(__dirname + '/components/' + `${component.name}`);
        htmlTxt = htmlTxt.replace(`{{${component.name.slice(0, -5)}}}`, currentPart.toString());

      }
    }
    fsPromise.writeFile(__dirname + '/project-dist/index.html', htmlTxt);

  }  catch(err) {
    console.log((err)); 
  }
}

createHtml();


async function copyStyles() {
  try {

    let stylesComponents = await fsPromise.readdir(__dirname + '/' + 'styles', {withFileTypes: true});
    for (const styles of stylesComponents) {
      if (styles.isFile() === true && path.extname(styles.name) == '.css') {
        let currentCss = await fsPromise.readFile(__dirname + `/styles/${styles.name}`, 'utf-8');
        fs.appendFile(
          (__dirname + '/project-dist/style.css'),
          currentCss,
          err => {
            if (err) throw err;
          });
      }
    }
  } catch(err) {
    console.log((err)); 
  }
}

copyStyles();
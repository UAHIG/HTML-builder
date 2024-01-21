const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');
const { createBrotliCompress } = require('zlib');
let outputDir = path.resolve(__dirname + '/project-dist');
let assetsDir = path.resolve(__dirname + '/project-dist/assets');
let htmlFile = path.resolve(__dirname + '/project-dist/index.html');
let cssFile = path.resolve(__dirname + '/project-dist/style.css');

fs.mkdir(outputDir, { recursive: true }, err => {
  if (err) throw err;
});

fs.mkdir(assetsDir, { recursive: true }, err => {
  if (err) throw err;
});

fs.writeFile(htmlFile, '', (err) => {
  if (err) throw err;
});

fs.writeFile(cssFile, '', (err) => {
  if (err) throw err;
});

async function copyDirectory() {
  try {
    const assetDirs = await fsPromise.readdir('06-build-page/assets', { withFileTypes: true });
    for (const assetDir of assetDirs) {
      let copies = await fsPromise.readdir(`06-build-page/assets/${assetDir.name}`, { withFileTypes: true });
      console.log(assetDir.name);
      fs.mkdir(`06-build-page/project-dist/assets/${assetDir.name}`, { recursive: true }, err => {
        if (err) throw err;
      });
      let readyCopy = await fsPromise.readdir(`06-build-page/project-dist/assets/${assetDir.name}`, { withFileTypes: true });
      for (const file of readyCopy) {
        fs.unlink(`06-build-page/project-dist/assets/${assetDir.name}/${file.name}`, function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
      for (const copy of copies) {
        fs.copyFile(
          `06-build-page/assets/${assetDir.name}/${copy.name}`,
          `06-build-page/project-dist/assets/${assetDir.name}/${copy.name}`,
          (err) => {
            if (err) {
              console.log('Error Found:', err);
            }
          }
        );
      }
    }

  } catch (err) {
    console.log(err);
  }
}

copyDirectory();

async function createHtml() {
  try {
    let templateHtml = await fsPromise.readFile(__dirname + '/' + 'template.html');
    let htmlComponents = await fsPromise.readdir(__dirname + '/' + 'components', { withFileTypes: true });
    let htmlTxt = templateHtml.toString();
    let currentPart = '';
    for (const component of htmlComponents) {
      if (component.isFile() && path.extname(component.name) === '.html') {
        currentPart = await fsPromise.readFile(__dirname + '/components/' + `${component.name}`);
        htmlTxt = htmlTxt.replace(`{{${component.name.slice(0, -5)}}}`, currentPart.toString());

      }
    }
    fsPromise.writeFile(htmlFile, htmlTxt);

  } catch (err) {
    console.log(err);
  }
}

createHtml();

async function copyStyles() {
  try {

    let stylesComponents = await fsPromise.readdir(__dirname + '/' + 'styles', { withFileTypes: true });
    for (const styles of stylesComponents) {
      if (styles.isFile() === true && path.extname(styles.name) == '.css') {
        let currentCss = await fsPromise.readFile(__dirname + `/styles/${styles.name}`, 'utf-8');
        fs.appendFile(
          cssFile,
          currentCss,
          err => {
            if (err) throw err;
          });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

copyStyles();

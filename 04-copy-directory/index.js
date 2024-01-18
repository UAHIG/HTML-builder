const fs = require('fs');
const path = require('path');
const sourceDirectory = path.resolve('04-copy-directory', 'files-copy');
const destinationDirectory = path.resolve('04-copy-directory', 'files');
const fsPromise = require('fs/promises');

fs.mkdir(sourceDirectory, { recursive: true }, err => {
  if (err) throw err;
});

async function copyFiles() {
  try {
    // Read files in the source directory
    const sourceFiles = await fsPromise.readdir(sourceDirectory, { withFileTypes: true });
    console.log(sourceFiles);

    // Delete existing files in the source directory
    for (const sourceFile of sourceFiles) {
      fs.unlink(path.join(sourceDirectory, sourceFile.name), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('File deleted');
        }
      });
    }

    // Copy files from the destination directory to the source directory
    const destinationFiles = await fsPromise.readdir(destinationDirectory, { withFileTypes: true });
    for (const destinationFile of destinationFiles) {
      if (destinationFile.isFile()) {
        fs.copyFile(
          path.join(destinationDirectory, destinationFile.name),
          path.join(sourceDirectory, destinationFile.name),
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

copyFiles();

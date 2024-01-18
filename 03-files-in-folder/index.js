
const fs = require('fs');
const path = require('path');
const folderPath = path.resolve('03-files-in-folder', 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, function (err, items) {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  for (let i = 0; i < items.length; i++) {
    const currentItem = items[i];

    if (currentItem.isFile()) {
      const filePath = path.join(folderPath, currentItem.name);

      fs.stat(filePath, (error, stats) => {
        if (error) {
          console.error(`Error getting file stats for ${currentItem.name}:`, error);
          return;
        }

        const fileNameWithoutExtension = path.parse(currentItem.name).name;
        const fileExtension = path.extname(currentItem.name);
        const fileSize = stats.size;

        console.log(`${fileNameWithoutExtension} - ${fileExtension} - ${fileSize} bytes`);
      });
    }
  }
});

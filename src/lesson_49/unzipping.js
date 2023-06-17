const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGunzip();

const readStream = fs.createReadStream('book.txt.gz');
const writeStream = fs.createWriteStream('book2.txt');

readStream.pipe(gzip).pipe(writeStream);

writeStream.on('finish', () => {
  console.log('Файл book.txt.gz розархівовано до файлу book2.txt.');
});

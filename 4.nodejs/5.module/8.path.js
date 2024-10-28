const path = require('path');

const filePath = path.join('C:/MyFolder/Sesac', 'project1/dir1', 'hello/world', 'file1.jpg');
console.log("파일경로: ", filePath);

const extName = path.extname(filePath);
console.log("파일의 확장자: ", extName);

const dirName = path.dirname(filePath);
console.log("디렉토리명: ", dirName);

const fileName = path.basename(filePath);
console.log("파일명: ", fileName);

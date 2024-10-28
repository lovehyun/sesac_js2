// import readline from 'readline'; // NEW 한 방법 (ES6) type:module

var readline = require('linebyline'); // OLD 한 방식, 
var rl = readline('./example.txt');

rl.on('line', function (line, lineCount, byteCount) {
    console.log(line, lineCount, byteCount)
}).on('error', function (e) {
    // something went wrong
    console.log("어.. 뭔가 오류 발생...", e.message);
});

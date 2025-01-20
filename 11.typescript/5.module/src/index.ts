// CommonJS 스타일, ESModule 스타일
// require 했던게 commonjs 스타일..

import { add, sub } from './math';
import { toUpperCase, toLowerCase } from './string';

console.log(`Add: ${add(10,5)}`);
console.log(`Sub: ${sub(10,5)}`);

console.log(`Upper: ${toUpperCase("HeLloooo")}`);
console.log(`Lower: ${toLowerCase("HeLloooo")}`);

var username = 'John';
console.log("Username: ".concat(username));
var age = 30;
console.log("Age ".concat(age));
var isAdmin = true;
isAdmin = false;
console.log("\uAD00\uB9AC\uC790\uB0D0: ".concat(isAdmin));
var unknownValue = "아무거나";
unknownValue = 5;
unknownValue = true;
console.log("\uC544\uBB34\uD0C0\uC785: ".concat(unknownValue));
var undefinedValue = undefined;
// undefinedValue = 1;
console.log("Undefined value: ".concat(undefinedValue));
var nullValue = null;
// nullValue = undefined;
console.log("Null Value: ".concat(nullValue));
// 타입 지정을 안하면?? 최초 지정시 자동 할당
var notype = 1;
// notype = 'a';

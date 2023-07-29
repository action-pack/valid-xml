import { validate } from "./index.js";

console.log("----- test set default");
console.log(await validate("/", undefined));

console.log("----- test directory name without slashes");
console.log(await validate("test", undefined));

console.log("----- test directory name with leading slash");
console.log(await validate("/test", undefined));

console.log("----- test directory name surrounded by slash");
console.log(await validate("/test/", undefined));

console.log("----- test path with slash");
console.log(await validate("test/", undefined));

console.log("----- test undefined path");
console.log(await validate(undefined, undefined));

console.log("----- test empty path");
console.log(await validate("", undefined));

console.log("----- test default file endings");
console.log(await validate(undefined, ".xml"));

console.log("----- test multiple file endings without space");
console.log(await validate(undefined, ".xml,valid"));

console.log("----- test multiple file endings with space");
console.log(await validate(undefined, " .xml,  valid   "));

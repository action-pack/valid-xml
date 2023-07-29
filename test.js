import { validate } from "./index.js";

console.log("starting test 1");
console.log(await validate("/", ".xml, valid"));
console.log("-----------------");
console.log("starting test 2");
console.log(await validate("test", ".xml,valid"));
console.log("-----------------");
console.log("starting test 3");
console.log(await validate("/test", ".xml,valid"));
console.log("-----------------");
console.log("starting test 4");
console.log(await validate("/test/", ".xml,valid"));
console.log("-----------------");
console.log("starting test 5");
console.log(await validate("test/", ".xml,valid"));

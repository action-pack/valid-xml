import { validate } from "./validator.js";

const path = "/";
const extensionsStr = ".xml, valid";

console.log("starting test");
const result = await validate(path, extensionsStr);

console.log(result);

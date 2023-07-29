import { XMLValidator } from "fast-xml-parser";
import * as fs from "fs";
import * as path from "path";

async function walk(dir) {
  let files = fs.readdirSync(dir, { withFileTypes: true });
  files = await Promise.all(
    files.map(async (dirEnt) => {
      const filePath = path.join(dirEnt.path, dirEnt.name);
      if (dirEnt.isDirectory()) return walk(filePath);
      else if (dirEnt.isFile()) return filePath;
    })
  );
  return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

export async function validate(path, extensionsStr) {
  const extensionsArray = (extensionsStr || ".xml")
    .split(",")
    .map((str) => str.trim().toLocaleUpperCase());

  let fileCount = 0;
  let outErrorStr = "";

  await walk("." + (path || "/")).then((files) =>
    files
      .filter((entry) => {
        const filenameCaps = entry.toLocaleUpperCase();
        const isMatch = extensionsArray.some((extension, index, array) =>
          filenameCaps.endsWith(extension)
        );
        return isMatch;
      })
      .every((file) => {
        const xmlData = fs.readFileSync(file, "utf8");

        const result = XMLValidator.validate(xmlData, {
          allowBooleanAttributes: false,
        });
        if (result !== true) {
          outErrorStr = `file '${file}', colum ${result.err.col}, line ${result.err.line}: ${result.err.code} - ${result.err.msg}`;
          return false;
        }
        ++fileCount;
        console.log("validated " + file);
        return true;
      })
  );
  return { fileCount, outErrorStr };
}

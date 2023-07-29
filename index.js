import { getInput, setOutput, setFailed, info } from "@actions/core";
import { XMLValidator } from "fast-xml-parser";
import * as fs from "fs";
import * as paths from "path";

async function walk(dir) {
  let files = fs.readdirSync(dir, { withFileTypes: true });
  info("directory: " + dir + ", files: " + JSON.stringify(files));
  files = await Promise.all(
    files.map(async (dirEnt) => {
      const filePath = paths.join(dir, dirEnt.name); // dirEnt.path does not yet exist in nodejs 16.16.0
      info("filePath: " + filePath);
      if (dirEnt.isDirectory()) {
        info("found directory: " + filePath);
        return walk(filePath);
      } else {
        if (dirEnt.isFile()) {
          info("found file: " + filePath);
          return filePath;
        }
      }
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

  if (path && path.charAt(0) === "/") {
    path = path.substring(1);
  }

  await walk("./" + (path || "/")).then((files) =>
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
        info("validated " + file);
        return true;
      })
  );
  return { fileCount, outErrorStr };
}

// execute action
try {
  const path = getInput("path");
  const fileEndingsStr = getInput("file-endings");
  info(
    "Running nodeJS " +
      process.version +
      ". path=" +
      path +
      ", file-endings=" +
      fileEndingsStr
  );

  const result = await validate(path, fileEndingsStr);

  if (result.outErrorStr != "") {
    setOutput("result", result.outErrorStr);
    setFailed(result.outErrorStr);
  } else {
    setOutput("result", `Successfully validated ${fileCount} files.`);
  }
} catch (error) {
  setFailed(error.message);
}

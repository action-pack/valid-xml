import { getInput, setOutput, setFailed } from "@actions/core";
import { validate } from "./validator";

try {
  const path = getInput("path");
  const fileEndingsStr = getInput("file-endings");

  const result = await validate(path, fileEndingsStr);

  if (outErrorStr != "") {
    setOutput("result", result.outErrorStr);
    setFailed(result.outErrorStr);
  } else {
    setOutput("result", `Successfully validated ${fileCount} files.`);
  }
} catch (error) {
  setFailed(error.message);
}

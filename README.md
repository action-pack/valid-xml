# Verify XML Action

This action scans a directory and its subdirectories for files with a specified file name ending and parses the file as XML. If it fails, the error message is output.

## Inputs

### `path`

The path that is scanned. This includes subdirectories. Default `"/"`.

### `file-endings`

A String containing the file endings that are verified to be XML. Entries need to be separated by "," and whitespaces are trimmed.
Capitalization is ignored, so ".xml" will end up scanning "myDocument.XML".

## Outputs

### `result`

A String containing either an error message of the first file that could not be parsed or a success message with the amount of successfully scanned files.

## Example usage

```yaml
uses: actions/verify-xml-action@v1
with:
  path: "src/xml/"
  file-endings: ".xml, .docx, myfile"
```

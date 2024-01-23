<h1 align="center">Valid XML<br />
<div align="center">
  
  [![Build](https://github.com/action-pack/valid-xml/actions/workflows/build.yml/badge.svg)](https://github.com/action-pack/valid-xml/)
  [![Version](https://img.shields.io/github/v/tag/action-pack/valid-xml?label=version&sort=semver&color=066da5)](https://github.com/marketplace/actions/valid-xml)
  [![Size](https://img.shields.io/github/size/action-pack/valid-xml/dist/index.js?branch=release/v1.02&label=size&color=066da5)](https://github.com/action-pack/valid-xml/)
  
</div></h1>

Action to validate the syntax of XML files.

## Usage

```yaml
uses: action-pack/valid-xml@v1
with:
  path: "src/xml/"
  file-endings: ".xml, .docx, myfile"
```

## Inputs

### `path`

The path that is scanned. This includes subdirectories. Default `"/"`.

### `file-endings`

A string containing the file endings that are verified to be XML.

Entries need to be separated by "," and whitespaces are trimmed. Capitalization is ignored, so ".xml" will end up scanning "myDocument.XML".

## Outputs

### `result`

A string containing either an error message of the first file that could not be parsed or a success message with the amount of successfully scanned files.

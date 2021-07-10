# shelljs-plugin-help

[![Actions Status](https://github.com/JessieFrance/shelljs-plugin-help/workflows/Build%20and%20Test/badge.svg)](https://github.com/JessieFrance/shelljs-plugin-help/actions)
[![shelljs-plugin](https://img.shields.io/badge/shelljs-plugin-brightgreen.svg?style=flat-square)](https://github.com/shelljs/shelljs/wiki/Using-ShellJS-Plugins)

> A [ShellJS](https://github.com/shelljs/shelljs) help documentation plugin for getting quick documentation on ShellJS commands.

## Installation

    npm i shelljs
    npm i shelljs-plugin-help

## Usage

- Get information on a ShellJS command: `help(COMMAND)`

`COMMAND` is an optional string representing a ShellJS command.

- See available ShellJS documentation entries with no arguments passed: `help()`

## Examples

To get more information on the ShellJS 'sed' command, you can do the following:

```javascript
const shell = require('shelljs');
require('shelljs-plugin-help');

const sedDocs = shell.help('sed');
shell.echo(sedDocs.stdout);
```

To see a list of available shelljs-plugin-help documentation entries, you can call `help` without any arguments:

```javascript
const shell = require('shelljs');
require('shelljs-plugin-help');

const availableDocs = shell.help();
shell.echo(sedDocs.stdout);
```

## License

MIT

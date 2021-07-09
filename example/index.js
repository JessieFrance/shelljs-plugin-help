const shell = require('shelljs');
require('../src');

// See information on available help commands.
shell.echo(shell.help());

// See ShellJS documentation on the 'grep' command
shell.echo(shell.help('grep'));

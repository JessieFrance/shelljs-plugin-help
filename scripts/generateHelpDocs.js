/* eslint-disable no-console */
const fs = require('fs');
const shell = require('shelljs');

// Load ShellJS commands.
const commands = require('shelljs/commands');

// Initialize the help documentation.
const helpDocs = {};

// Parse ShellJS documentation to build help plugin.
commands.forEach((command) => {
  const filePath = require.resolve(`shelljs/src/${command}.js`);
  // Strip out '###' headings so that documentation can be standardized.
  const commandDoc = shell
    .grep('^//@', filePath)
    .stdout.replace(/\/\/@/g, '')
    .replace(/###/g, '');
  if (!command) {
    throw new Error('ShellJS documentation format changed!');
  }
  helpDocs[command] = commandDoc;
});

// Write the help documentation to a file.
try {
  fs.writeFileSync('./src/help.json', JSON.stringify(helpDocs, null, 4));
  console.log('Help documentation has been updated!');
} catch (error) {
  console.error(error);
}

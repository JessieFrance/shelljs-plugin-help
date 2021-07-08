/* eslint-disable no-console */
const fs = require('fs');
const shell = require('shelljs');

const commands = require('shelljs/commands');

const helpDocs = {};

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

try {
  fs.writeFileSync('./src/help.json', JSON.stringify(helpDocs, null, 4));
  console.log('Help documentation has been updated!');
} catch (error) {
  console.error(error);
}

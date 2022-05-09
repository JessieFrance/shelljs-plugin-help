const plugin = require('shelljs/plugin');
const Help = require('./help');

/**
 * Returns the ShellJS help documentation for a user query
 * @param {any} options - Unused first argument required for creating plugin
 * @param {string} helpQuery - The command to lookup in the help documentation
 * @return {string} - The help documentation
 */
const help = (options, helpQuery = null) => {
  const HelpDocs = new Help({ helpQuery });
  return HelpDocs.help();
};

// Register new help() command with ShellJS.
// Since there are no available options for help(),
// cmdOptions will be empty object.
plugin.register('help', help, {
  cmdOptions: {},
});

// Exports
exports.help = help;

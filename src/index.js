const plugin = require('shelljs/plugin');
const Help = require('./help');

const help = (options, helpQuery = null) => {
  const HelpDocs = new Help({ helpQuery });
  return HelpDocs.help();
};

plugin.register('help', help, {
  cmdOptions: {},
});

exports.help = help;

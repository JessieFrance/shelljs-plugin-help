const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const { getJSON, getMarkdown } = require('./utils');

marked.setOptions({
  renderer: new TerminalRenderer(),
});

class Help {
  constructor({ helpQuery }) {
    this.helpQuery = helpQuery;
    this.shellJSdocs = './help.json';
    this.pluginDocs = '../README.md';
    this.helpDocs = this.getHelpDocs();
  }

  getCommands() {
    return Object.keys(this.helpDocs).sort();
  }

  getAvailableDocs() {
    return 'Available Documentation:\n'.concat(
      this.getCommands(this.helpDocs)
        .map((key) => `* ${key}`)
        .join('\n'),
    );
  }

  getHelpDocs() {
    const shelljsDocs = getJSON(this.shellJSdocs);
    shelljsDocs.help = getMarkdown(this.pluginDocs, '##', [
      'Usage',
      'Examples',
    ]);
    return shelljsDocs;
  }

  help() {
    if (!this.helpQuery) {
      const availableDocs = this.getAvailableDocs();
      const question =
        '# What ShellJS command do you want to learn more about?';
      const moreInfo = 'Run help(COMMAND) to get documentation on a command.';
      return marked(`${question}\n${availableDocs}\n\n${moreInfo}`);
    }

    const docEntry = this.helpDocs[this.helpQuery];
    if (!docEntry) {
      return 'No help documentation available for that command.';
    }
    return marked(`# ${this.helpQuery}\n${docEntry}`);
  }
}

module.exports = Help;

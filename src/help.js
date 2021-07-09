const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const { getJSON, getMarkdown } = require('./utils');

marked.setOptions({
  renderer: new TerminalRenderer(),
});

class Help {
  constructor({ helpQuery }) {
    this.helpQuery = helpQuery;
    this.shellJSdocs = './src/help.json';
    this.pluginDocs = 'README.md';
    this.helpDocs = this.getHelpDocs();
  }

  getCommands() {
    return Object.keys(this.helpDocs).sort();
  }

  getAvailableDocs() {
    return '# Available Documentation:\n'.concat(
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
      const availableDocs = marked(this.getAvailableDocs());
      return `What ShellJS command do you want to learn more about?\n${availableDocs}\nRun help(COMMAND) to get documentation on a command.`;
    }

    const docEntry = this.helpDocs[this.helpQuery];
    if (!docEntry) {
      return 'No help documentation available for that command.';
    }
    return marked(docEntry);
  }
}

module.exports = Help;

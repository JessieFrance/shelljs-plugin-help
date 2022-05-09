const { marked } = require('marked');
const TerminalRenderer = require('marked-terminal');
const { getJSON, getMarkdown } = require('./utils');

// Connect the marked functionality with the terminal.
marked.setOptions({
  renderer: new TerminalRenderer(),
});

/** Class representing help documentation generator. */
class Help {
  /**
   * Loads the help documentation and sets a user query to lookup
   * @param {{helpQuery: string}} Command to lookup in help documentation
   * @return {void}
   */
  constructor({ helpQuery }) {
    this.helpQuery = helpQuery;
    this.shellJSdocs = './help.json';
    this.pluginDocs = '../README.md';
    this.helpDocs = this.getHelpDocs();
  }

  /**
   * Gives a list of available documented commands
   * @return {Array<string>} - List of ShellJS with available documentation
   */
  getCommands() {
    return Object.keys(this.helpDocs).sort();
  }

  /**
   * Gives a formatted list of available documented commands as a single string
   * @return {string} - List of ShellJS with available documentation
   */
  getAvailableDocs() {
    return 'Available Documentation:\n'.concat(
      this.getCommands(this.helpDocs)
        .map((key) => `* ${key}`)
        .join('\n'),
    );
  }

  /**
   * Get, parse, and return the shelljs-plugin-help documentation
   * @return {string} - The parsed help documentation
   */
  getHelpDocs() {
    const shelljsDocs = getJSON(this.shellJSdocs);
    shelljsDocs.help = getMarkdown(this.pluginDocs, '##', [
      'Usage',
      'Examples',
    ]);
    return shelljsDocs;
  }

  /**
   * Returns available ShellJS documentation for a user query,
   * or a formatted list of commands if no query
   *
   * @return {string} - The parsed help documentation
   */
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

// Exports
module.exports = Help;

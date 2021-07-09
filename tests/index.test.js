/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const shell = require('shelljs');
// eslint-disable-next-line no-unused-vars
const help = require('../src');
const Help = require('../src/help');

describe('integration with ShellJS', () => {
  it('help gets added as a function to ShellJS', () => {
    expect(shell.help).to.be.a('function');
  });
  it('does not interfere with existing ShellJS commands', () => {
    expect(shell.ls).to.be.a('function');
    expect(shell.pwd).to.be.a('function');
    expect(shell.ln).to.be.a('function');
  });
});

describe('help plugin outputs', () => {
  it('tells user when a command is not found', () => {
    const res = shell.help('notACommand').stdout;
    expect(res).to.be.a('string');
    expect(res).to.equal('No help documentation available for that command.');
  });
  it('provides ShellJS documentation for existing ShellJS command', () => {
    const res = shell.help('pwd').stdout;
    expect(res).to.be.a('string');
  });
  it('integrates documentation from this plugin into help command', () => {
    const res = shell.help('help').stdout;
    expect(res).to.be.a('string');
  });
  it('lists documentation entries when user does not pass an argument', () => {
    const output = shell.help().stdout;
    expect(output.includes('sed')).to.be.true;
    expect(output.includes('help')).to.be.true;
    expect(output.includes('pwd')).to.be.true;
  });
  it('does not contain empty documentation', () => {
    const helpInstance = new Help({ helpQuery: null });
    const commands = helpInstance.getCommands();
    commands.forEach((command) => {
      const res = shell.help(command);
      expect(res).to.be.a('string');
      expect(res.length).to.be.gt(5);
    });
  });
});

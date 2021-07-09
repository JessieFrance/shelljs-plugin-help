/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { getJSON } = require('../src/utils');

describe('utility function tests', () => {
  it('throws an error if it cannot read docs file', () => {
    let throws = 0;
    try {
      getJSON('helpDocsWereDeleted.json');
    } catch (err) {
      throws += 1;
      const result = err.message.startsWith(
        'Error loading shelljs-plugin-help documentation',
      );
      expect(result).to.be.true;
    }
    expect(throws).to.equal(1);
  });
});

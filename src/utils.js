const fs = require('fs');
const path = require('path');

/**
 * Loads the shelljs-plugin-help documentation
 * @param {string} filename - The file to load that contains documentation
 * @return {string} - The help documentation
 */
const loadFile = (filename) => {
  try {
    return fs.readFileSync(path.resolve(__dirname, filename), 'utf8');
  } catch (error) {
    throw new Error(
      `Error loading shelljs-plugin-help documentation: ${error.message}`,
    );
  }
};

/**
 * Loads the shelljs-plugin-help documentation and parses JSON
 * @param {string} filename - The file to load that contains documentation
 * @return {string} - The parsed help documentation
 */
const getJSON = (filename) => {
  return JSON.parse(loadFile(filename));
};

/**
 * Parses markdown data
 * @param {string} data - Unparsed markdown data
 * @param {string} separator - The separator to split the markdown at
 * @param {Array<string>} mdHeaders - List of headers to extract from markdown
 * @return {string} - The parsed help documentation
 */
const parseMarkdown = (data, separator, mdHeaders) => {
  return data
    .split(separator)
    .filter((section) => {
      const trimmed = section.trim();
      return mdHeaders.some((header) => trimmed.startsWith(header));
    })
    .join('\n');
};

/**
 * Loads and parses the markdown documentation data
 * @param {string} filename - The file to load that contains documentation
 * @param {string} separator - The separator to split the markdown at
 * @param {Array<string>} mdHeaders - List of headers to extract from markdown
 * @return {string} - The parsed help documentation
 */
const getMarkdown = (filename, separator, mdHeaders) => {
  const data = loadFile(filename);
  return parseMarkdown(data, separator, mdHeaders);
};

// Exports
exports.getMarkdown = getMarkdown;
exports.getJSON = getJSON;

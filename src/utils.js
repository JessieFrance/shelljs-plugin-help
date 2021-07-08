const fs = require('fs');

const loadFile = (filename) => {
  try {
    return fs.readFileSync(filename, 'utf8');
  } catch (error) {
    throw new Error(
      `Error loading shelljs-plugin-help documentation: ${error.message}`,
    );
  }
};

const getJSON = (filename) => {
  return JSON.parse(loadFile(filename));
};

const parseMarkdown = (data, separator, mdHeaders) => {
  return data
    .split(separator)
    .filter((section) => {
      const trimmed = section.trim();
      return mdHeaders.some((header) => trimmed.startsWith(header));
    })
    .join('\n');
};

const getMarkdown = (filename, separator, mdHeaders) => {
  const data = loadFile(filename);
  return parseMarkdown(data, separator, mdHeaders);
};

exports.getMarkdown = getMarkdown;
exports.getJSON = getJSON;

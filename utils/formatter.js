const formatter = {
  bold: (text) => `*${text}*`,
  italic: (text) => `_${text}_`,
  code: (text) => `\`${text}\``,
  codeBlock: (text) => `\`\`\`\n${text}\n\`\`\``,
  link: (text, url) => `[${text}](${url})`
};

module.exports = formatter;
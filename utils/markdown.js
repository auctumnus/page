const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttributes = require('markdown-it-attrs');
const markdownItBracketedSpans = require('markdown-it-bracketed-spans');
const markdownItFootnote = require('markdown-it-footnote')

//const markdownItContainer = require('markdown-it-container')

const markdown = markdownIt({
  html: true,
})
  .use(markdownItBracketedSpans)
  .use(markdownItAttributes)
  .use(markdownItAnchor)
  .use(markdownItFootnote)

module.exports = markdown;

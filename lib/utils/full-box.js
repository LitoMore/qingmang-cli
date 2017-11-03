'use strict'

const boxen = require('boxen')
const termSize = require('term-size')

const box = (content) => {
  let spaceline = ' '
  for (let i = 0; i < termSize().columns - 3; i++) spaceline += ' '
  content = `${content}\n${spaceline}`
  const lines = content.match(/\n/g).length + 1
  const padding = Math.floor((termSize().rows - 2 - lines) / 2)
  const actualLines = padding * 2 + lines
  const expectedLines = termSize().rows - 2
  if (expectedLines - actualLines > 0) {
    let emptyLine = ''
    for (let i = 0; i < expectedLines - actualLines; i++) {
      emptyLine += '\n'
    }
    content = emptyLine + content
  }
  return boxen(content, {dimBorder: true, align: 'center', padding: {top: padding, bottom: padding}})
}

module.exports = box

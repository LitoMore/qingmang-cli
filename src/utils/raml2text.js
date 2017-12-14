'use strict'

function raml2text (content) {
  let text = ''
  for (let i = 0; i < content.length; i++) {
    if (content[i].type === 0) {
      text += content[i].text.text + '\n\n'
    }
  }
  return text
}

module.exports = raml2text

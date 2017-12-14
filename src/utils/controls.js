'use strict'

const keypress = require('keypress')
const {EventEmitter} = require('events')

const controls = new EventEmitter()

// Keyboard
keypress(process.stdin)
process.stdin.on('keypress', (ch, key) => {
  if (key) {
    switch (key.name) {
      case 'up':
      case 'down':
      case 'left':
      case 'right':
      case 'enter':
      case 'delete':
      case 'esc':
      default:
        controls.emit(process.QINGMANG_CLI.pageName, key)
        break
    }

    if (key.ctrl && key.name === 'c') {
      process.stdin.pause()
    }
  }
})
process.stdin.setRawMode(true)
process.stdin.resume()

module.exports = controls

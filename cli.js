#!/usr/bin/env node
'use strict'

const meow = require('meow')
const Jetty = require('jetty')
const keypress = require('keypress')
const cliCursor = require('cli-cursor')
const qm = require('./lib/qm')

process.jetty = new Jetty(process.stdout)

const cli = meow(`
  Usage:
    $ qingmang-cli [command]

  Examples:
    $ qingmang-cli
    $ qingmang-cli config
    $ qingmang-cli colors
`)

if (cli.input.length === 0) {
  cliCursor.hide()
  keypress(process.stdin)
  process.stdin.on('keypress', function (ch, key) {
    if (key && key.shift && key.name === 'q') qm.exit()
    // else if (key && key.shift && key.name === 'h') qm.home()
    else if (key && key.shift && key.name === 'c') qm.categoryList()
    // else qm.home()
  })
  process.stdin.setRawMode(true)
  process.stdin.resume()
  qm.welcome()
} else if (cli.input.length === 1) {
  switch (cli.input[0]) {
    case 'config':
      qm.config()
      break
    case 'colors':
      qm.colors()
      break
    default:
      break
  }
} else {
  console.log('Invalid input')
}

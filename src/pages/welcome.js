'use strict'

const chalk = require('chalk')

const fullBox = require('../utils/full-box')

const display = () => {
  const {jetty} = process.QINGMANG_CLI
  const content = `\n\n轻芒\nQINGMANG\n\n${chalk.dim('(Press Any Key)')}`
  jetty.moveTo([0, 0])
  jetty.text(fullBox(content))
}

module.exports = {
  display
}

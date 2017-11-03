'use strict'

const chalk = require('chalk')
const fullBox = require('../utils/full-box')

module.exports = () => {
  const content = `\n\n轻芒\nQINGMANG\n\n${chalk.dim('(Press Any Key)')}`
  process.jetty.moveTo([0, 0])
  process.jetty.text(fullBox(content))
}

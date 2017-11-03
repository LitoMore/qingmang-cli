'use strict'

const chalk = require('chalk')
const pangu = require('pangu')
const Table = require('cli-table2')
const Q = require('../utils/qingmang-api')
const fullBox = require('../utils/full-box')

module.exports = async () => {
  const pg = text => pangu.spacing(text)
  const q = new Q()

  const table = new Table({
    head: [chalk.reset.dim('Type'), chalk.reset.dim('Name'), chalk.reset.dim('Description')],
    chars: {
      'mid': '',
      'left-mid': '',
      'mid-mid': '',
      'right-mid': ''
    }
  })

  const list = await q.get('category.list')
  for (let i = 0; i < list.categories.length; i++) {
    const item = list.categories[i]
    const line = [item.type.toUpperCase(), pg(item.name), pg(item.description)]
    table.push(line)
  }
  process.jetty.moveTo([0, 0])
  process.jetty.text(fullBox(table.toString()))
}

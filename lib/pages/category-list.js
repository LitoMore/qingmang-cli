'use strict'

const chalk = require('chalk')
const pangu = require('pangu')
const Table = require('cli-table2')
const Q = require('../utils/qingmang-api')
const fullBox = require('../utils/full-box')

let select = 0

async function display () {
  const {jetty} = process.QINGMANG_CLI
  const pg = text => pangu.spacing(text)
  const q = new Q()
  const dimReset = chalk.reset.dim

  const table = new Table({
    head: [dimReset('#'), dimReset('Type'), dimReset('Name'), dimReset('Description')],
    chars: {
      'mid': '',
      'left-mid': '',
      'mid-mid': '',
      'right-mid': ''
    }
  })

  const list = await q.get('category.list')
  for (let i = 0; i < list.categories.length; i++) {
    let selected = select === i
    const item = list.categories[i]
    const line = [selected ? chalk.green('❯') : '', item.type.toUpperCase(), pg(item.name), pg(item.description)]
    table.push(line)
  }
  jetty.moveTo([0, 0])
  jetty.text(fullBox(table.toString()))
}

module.exports = {
  display
}

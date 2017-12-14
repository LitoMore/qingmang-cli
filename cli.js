#!/usr/bin/env node
'use strict'

const meow = require('meow')
const Conf = require('conf')
const chalk = require('chalk')
const Jetty = require('jetty')
const pangu = require('pangu')
const Table = require('cli-table2')
const cliCursor = require('cli-cursor')
const chalkPipe = require('chalk-pipe')
const Q = require('./lib/utils/qingmang-api')
const fullBox = require('./lib/utils/full-box')
const controls = require('./lib/utils/controls')

const jetty = new Jetty(process.stdout)
const config = new Conf()
const q = new Q()
process.QINGMANG_CLI = {}

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
  welcomePage()
} else if (cli.input.length === 1) {
  switch (cli.input[0]) {
    case 'config':
      break
    case 'colors':
      break
    default:
      break
  }
} else {
  console.log('Invalid input')
}

process.QINGMANG_CLI.cSelect = -1
process.QINGMANG_CLI.aSelect = -1
process.QINGMANG_CLI.cList = null
process.QINGMANG_CLI.aList = null

// Welcome Page
function welcomePage () {
  process.QINGMANG_CLI.pageName = 'welcome'
  const content = `\n\n轻芒\nQINGMANG\n\n${chalk.dim('(Press Any Key)')}`
  jetty.moveTo([0, 0])
  jetty.text(fullBox(content))
}

// Category List Page
async function categoryListPage () {
  process.QINGMANG_CLI.pageName = 'category-list'
  const pg = text => pangu.spacing(text)
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
  if (process.QINGMANG_CLI.cSelect === -1) {
    process.QINGMANG_CLI.cSelect++
    process.QINGMANG_CLI.cList = await q.get('category.list')
  }
  for (let i = 0; i < process.QINGMANG_CLI.cList.categories.length; i++) {
    let selected = process.QINGMANG_CLI.cSelect === i
    const item = process.QINGMANG_CLI.cList.categories[i]
    const color = selected ? chalkPipe(config.get('highlightColor')) : chalk.reset
    const line = [selected ? chalk.green('❯') : '', color(item.type.toUpperCase()), color(pg(item.name)), color(pg(item.description))]
    table.push(line)
  }
  jetty.moveTo([0, 0])
  jetty.text(fullBox(table.toString()))
}

async function articleListPage () {
  process.QINGMANG_CLI.pageName = 'article-list'
  const pg = text => pangu.spacing(text)
  const dimReset = chalk.reset.dim
  const table = new Table({
    head: [dimReset('#'), dimReset('Title'), dimReset('Author')],
    chars: {
      'mid': '',
      'left-mid': '',
      'mid-mid': '',
      'right-mid': ''
    }
  })
  if (process.QINGMANG_CLI.aSelect === -1) {
    process.QINGMANG_CLI.aSelect++
    const {categoryId} = process.QINGMANG_CLI.cList.categories[process.QINGMANG_CLI.cSelect]
    process.QINGMANG_CLI.aList = await q.get('article.list', {category_id: categoryId})
  }
  for (let i = 0; i < process.QINGMANG_CLI.aList.articles.length; i++) {
    let selected = process.QINGMANG_CLI.aSelect === i
    const item = process.QINGMANG_CLI.aList.articles[i]
    const color = selected ? chalkPipe(config.get('highlightColor')) : chalk.reset
    const line = [selected ? chalk.green('❯') : '', color(pg(item.title)), color(pg(item.author || ''))]
    table.push(line)
  }

  jetty.moveTo([0, 0])
  jetty.text(fullBox(table.toString()))
}

async function articlePage () {
  const article = await q.get('article.get', {id: process.QINGMANG_CLI.aList.articles[process.QINGMANG_CLI.aSelect].articleId, format: 'raml'})

  jetty.moveTo([0, 0])
  jetty.text(fullBox(JSON.stringify(article)))
}

controls.on('welcome', () => {
  categoryListPage(process.QINGMANG_CLI.cSelect)
})

controls.on('category-list', key => {
  switch (key.name) {
    case 'up':
      if (process.QINGMANG_CLI.cSelect > 0) {
        process.QINGMANG_CLI.cSelect--
        categoryListPage(process.QINGMANG_CLI.cSelect)
      }
      break
    case 'down':
      if (process.QINGMANG_CLI.cList && process.QINGMANG_CLI.cSelect < process.QINGMANG_CLI.cList.categories.length - 1) {
        process.QINGMANG_CLI.cSelect++
        categoryListPage(process.QINGMANG_CLI.cSelect)
      }
      break
    case 'enter':
    case 'return':
      articleListPage()
      break
    case 'escape':
      welcomePage()
      break
    default:
      break
  }
})

controls.on('article-list', key => {
  switch (key.name) {
    case 'up':
      if (process.QINGMANG_CLI.aSelect > 0) {
        process.QINGMANG_CLI.aSelect--
        articleListPage(process.QINGMANG_CLI.aSelect)
      }
      break
    case 'down':
      if (process.QINGMANG_CLI.aList && process.QINGMANG_CLI.aSelect < process.QINGMANG_CLI.aList.articles.length - 1) {
        process.QINGMANG_CLI.aSelect++
        articleListPage(process.QINGMANG_CLI.aSelect)
      }
      break
    case 'enter':
    case 'return':
      articlePage()
      break
    case 'escape':
      welcomePage()
      break
    default:
      break
  }
})

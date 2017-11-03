'use strict'

const inquirer = require('inquirer')
const Conf = require('conf')

inquirer.registerPrompt('chalk-pipe', require('inquirer-chalk-pipe'))

module.exports = () => {
  const config = new Conf()

  const promptList = [
    {
      type: 'chalk-pipe',
      name: 'highlightColor',
      message: 'Highlight color',
      default: config.get('highlightColor') || 'orange.bold'
    },
    {
      type: 'chalk-pipe',
      name: 'linkColor',
      message: 'Link color',
      default: config.get('linkColor') || 'cyan.underline'
    }
  ]

  inquirer.prompt(promptList).then(settings => {
    config.set('highlightColor', settings.highlightColor)
    config.set('linkColor', settings.linkColor)
  })
}

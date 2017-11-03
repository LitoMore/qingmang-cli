'use strict'

const inquirer = require('inquirer')
const Conf = require('conf')

module.exports = () => {
  const config = new Conf()

  const promptList = [
    {
      type: 'text',
      name: 'token',
      message: 'Your token',
      default: config.get('token') || ''
    }
  ]

  inquirer.prompt(promptList).then(settings => {
    config.set('token', settings.token)
  })
}

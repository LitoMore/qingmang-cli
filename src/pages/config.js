'use strict'

const inquirer = require('inquirer')
const Conf = require('conf')

const display = () => {
  const config = new Conf()

  const promptList = [
    {
      type: 'text',
      name: 'appid',
      message: 'Your AppID',
      default: config.get('appid') || ''
    },
    {
      type: 'text',
      name: 'token',
      message: 'Your token',
      default: config.get('token') || ''
    }
  ]

  inquirer.prompt(promptList).then(settings => {
    config.set('appid', settings.appid)
    config.set('token', settings.token)
  })
}

module.exports = {
  display
}

'use strict'

const fullBox = require('../utils/full-box')
const Q = require('../utils/qingmang-api')

const display = async () => {
  // Display app name
  const {jetty} = process.QINGMANG_CLI
  const q = new Q()
  const auth = await q.get('app.get')
  jetty.moveTo([0, 0])
  jetty.text(fullBox(JSON.stringify(auth)))
}

module.exports = {
  display
}

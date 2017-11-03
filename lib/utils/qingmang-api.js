'use strict'

const got = require('got')
const Conf = require('conf')

const config = new Conf()

class Qingmang {
  constructor () {
    this.token = config.get('token')
    this.api = 'https://api.qingmang.me/v2/'
  }

  async get (uri, query) {
    query = query || {}
    query.token = this.token
    const {body} = await got(this.api + uri, {query, json: true})
    return body
  }
}

module.exports = Qingmang

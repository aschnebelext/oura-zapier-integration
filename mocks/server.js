const { setupServer } = require('msw/node')
const { authHandlers } = require('./auth.handler')
const { personalInfoHandlers } = require('./personalInto.handler')
const { sleepHandlers } = require('./sleep/sleep.handler')

const handlers = [...authHandlers, ...personalInfoHandlers, ...sleepHandlers]

const server = setupServer(...handlers)

module.exports = {
  server,
}

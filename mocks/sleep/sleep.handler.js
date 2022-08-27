const { rest } = require('msw')
const { sleepNoResult } = require("./sleep.mock");

const sleepResolver = (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json(sleepNoResult)
    )
}

const sleepHandlers = [
    // Mocks Get Request to access personal data
    rest.get('https://api.ouraring.com/v2/usercollection/sleep', sleepResolver)
]

module.exports = {
    sleepHandlers
}

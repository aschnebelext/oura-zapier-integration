const { rest } = require('msw')

const personalInfoHandlers = [
  // Mocks Get Request to access personal data
  rest.get('https://api.ouraring.com/v2/usercollection/personal_info', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        email: 'hello@example.com',
      })
    )
  }),
]

module.exports = {
  personalInfoHandlers,
}

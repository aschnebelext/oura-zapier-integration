const { rest } = require('msw')

const authHandlers = [
    // Mocks Authorize Request
    rest.get('https://api.ouraring.com/authorize', (req, res, ctx) => {
        const code = 'ran0mCode'
        const { redirect_uri, state, scope } = req.params
        return res((res) => {
            res.status = 301
            res.headers.set('Location', redirect_uri)
            res.params = {code, scope, state}
            return res
        })
    }),
    // Mocks Access Token Request
    rest.post('https://api.ouraring.com/oauth/token', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                access_token: 'ran0mAccessT0ken',
                token_type: 'bearer',
                expires_in: 86400,
                refresh_token: 'rand0mRefreshT0ken'
            })
        )
    }),
    // Mocks Get Request to access personal data
    rest.get('https://api.ouraring.com/v2/usercollection/personal_info', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                email: 'hello@example.com'
            })
        )
    })
]

module.exports = {
    authHandlers
}

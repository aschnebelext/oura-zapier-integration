# (Inofficial) [Oura Ring](https://ouraring.com/) Zapier Integration

## Description
This Repository uses the [Oura API](https://cloud.ouraring.com/docs/) V2 to sync Oura Ring data to Zapier.

## Disclaimer
We are currently in contact with Oura to make this Integration publicly available. We can't make any promises, if and when it becomes publicly available.

Until further notice, there are two options to use the Oura Ring Zapier Integration:
1. **Invite:** Create an Issue and leave your Email which is registered in Zapier. We will invite you.
2. **Custom App:** Follow the instructions below and create your own Oura Ring Zapier integration.

## Contribution Guidelines
The contribution guidelines are as per the guide [HERE](https://github.com/aschnebelext/oura-zapier-integration/blob/main/CONTRIBUTING.md).

## Additional tools to help you get Started using the Zapier CLI

- [Getting Started With Zapier Platform CLI](https://platform.zapier.com/cli_tutorials/getting-started)
- [Zapier Platform Example App GitHub](https://github.com/zapier/zapier-platform-example-app-github)

# Prerequisite

If you like to create your own Zapier Integration follow the instructions below:

### Create Oura OAuth Client

1. Create your own Application at the [Oura Developer Portal](https://cloud.ouraring.com/oauth/applications)
2. Make sure to check `Allow server-side authentication (grant-type code)`
3. Allow-list the Redirect URI: `https://zapier.com/dashboard/auth/oauth/return/<appID>/ `
4. You should get the appID when you register your application (see: `.zapierapprc`)
5. Write down the Client ID & Client Secret (you will need them later)

## Setup

**Note:** Make sure that all prerequisites are met.

```bash
# Install Zapier CLI globally
npm install -g zapier-platform-cli

# Install dependencies, setup husky (pre-commit hook)
npm run setup

# Run tests
zapier test

# Register the integration on Zapier if you haven't
zapier register "App Title"

# Or you can link to an existing integration on Zapier
zapier link

# Set Client ID & Client Secret
zapier env:set <package.json version (1.0.0)> CLIENT_ID=<value>
zapier env:set <package.json version (1.0.0)> CLIENT_SECRET=<value>

# Push it to Zapier
zapier push
```

## Supported Integrations

Below is a list of all currently available Integrations.

### Triggers

| key          | sleep                                                    |
|:-------------|:---------------------------------------------------------|
| label        | Create Night Sleep Record.                               |
| description  | Triggers when a sleep entry from last night is processed |
| inputFields  | none                                                     |

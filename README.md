# Aurionbot

## Description

Bot discord for Mineaurion.

## Install

### Bot Token

You need a bot token, follow the discord.js to have one and the add the bot to your server : https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot

### Install dependencies

```bash
npm ci --production
```

### Configuration

```bash
cp .env.example .env
```

Replace the configuration with your configuration

## Start

```
npm run build
npm run serve
```

And you are good to go, the bot will start and serve an api and the bot itself on your discord

## Development

For the development, you need to have prettier and eslint extension to have better integration. For better usage, create a bot token and add the bot into a "dev server", so you can freely dev without "breaking" your main discord.

```
npm ci
npm run start
```

## Pterodactyl

You can use this bot in pterodactyl, you need to install the file egg-aurion-bot.json in order to do that. And take inspiration on the github workflow in order to update the docker container.


## Wiki

Wiki is [here](https://github.com/Mineaurion/AurionBot/wiki)
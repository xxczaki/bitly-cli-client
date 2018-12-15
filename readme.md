# Bitly CLI Client 🔪

> Shorten links with Bitly in your terminal!

[![Build Status](https://travis-ci.org/xxczaki/bitly-cli-client.svg?branch=master)](https://travis-ci.org/xxczaki/bitly-cli-client) 
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo) 

![Animated SVG](https://rawcdn.githack.com/xxczaki/bitly-cli-client/master/bitly.svg)

---

## Install
```bash
npm install --global bitly-cli-client
```

<a href="https://www.patreon.com/akepinski">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## Usage

```
	Usage
		$ bitly <options>
	Options
		--url -u   			Shorten a link
		--qr -q				Generate a QR Code
		--list -l  			List all shortened links
		--purge -p   		Purge the list of saved URLs
		--reset -r          Reset Generic Access Token
	Examples
		$ bitly --url --qr kepinski.me
		$ bitly -l
		$ bitly --reset
```

### License

MIT

#!/usr/bin/env node

'use strict';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const meow = require('meow');
const prompts = require('prompts');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const normalizeUrl = require('normalize-url');
const isUrl = require('is-url-superb');
const {BitlyClient} = require('bitly');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Bitly Client
const bitly = new BitlyClient('', {});

// Set database defaults
db.defaults({urls: []}).write();

// CLI configuration
const cli = meow(`
	Usage
		$ bitly <options>
	Options
		--url -u   			Shorten a link
		--list -l  			List all shortened links
		--purge -p   		Purge the list of saved URLs
	Examples
		$ bitly --url kepinski.me
		$ bitly -l
`, {
	flags: {
		url: {
			type: 'string',
			alias: 'u'
		},
		list: {
			type: 'boolean',
			alias: 'l'
		},
		purge: {
			type: 'boolean',
			alias: 'p'
		}
	}
});

if (cli.flags.url) {
	(async () => {
		// Normalize URL
		const link = normalizeUrl(cli.flags.url);

		// If a string is a valid URL, make it shorter!
		if (isUrl(link) === true) {
			try {
				const result = await bitly.shorten(link);

				const long = result.long_url;
				const short = result.url;

				// Save long & short link to database
				db.get('urls')
					.push({long, short})
					.write();
				clipboardy.write(short);
				console.log(`${chalk.bold.green('Success!')} Here is your Bitly URL: ${chalk.cyan(short)} ${chalk.dim.gray('[copied to clipboard]')}`);
			} catch (error) {
				console.log(chalk.red(error));
				process.exit(1);
			}
		} else {
			console.log(chalk.red('Please provide a valid URL!'));
			process.exit(1);
		}
	})();
}

if (cli.flags.list) {
	// List all saved URLs
	const data = db.get('urls').value();
	const list = data.map(v => chalk.yellow(v.long) + ' => ' + chalk.green(v.short) + '\n').toString().replace(/,/g, '');

	if (list === '') {
		console.log(chalk.red('No URLs found!'));
		process.exit(1);
	} else {
		console.log('Listing saved urls:\n');
		console.log(list);
	}
}

if (cli.flags.purge) {
	(async () => {
		// Confirm prompt
		const response = await prompts({
			type: 'confirm',
			name: 'delete',
			message: 'Are you sure you want to delete all saved URLs?'
		});

		if (response.delete === true) {
			try {
				// Delete all saved URLs
				db.unset('urls').write();
				console.log(chalk.green('Successfully deleted all saved URLs!'));
			} catch (error) {
				console.log(chalk.red('Error deleting saved URLs! Are you sure there are any?'));
				process.exit(1);
			}
		} else {
			process.exit(1);
		}
	})();
}

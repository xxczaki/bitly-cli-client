import test from 'ava';
import execa from 'execa';

// Note: Before running `npm test` make sure to reset the API key and delete the db.json file (or just run `bitly --purge`)

test('Test --help output', async t => {
	const ret = await execa.shell('node ./cli.js --help');
	t.regex(ret.stdout, /Usage/);
});

test('--version', async t => {
	const {stdout} = await execa.shell('node ./cli.js --version');
	t.true(typeof stdout.length === 'number');
});

test('--list', async t => {
	const error = await t.throws(execa.shell('node ./cli.js --list'));
	t.regex(error.message, /found/);
});

test('Invalid URL', async t => {
	const error = await t.throws(execa.shell('node ./cli.js --url foo'));
	t.regex(error.message, /URL/);
});

test('Invalid token', async t => {
	const error = await t.throws(execa.shell('node ./cli.js --url google.com'));
	t.regex(error.message, /node-bitly/);
});

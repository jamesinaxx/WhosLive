const dayjs = require('dayjs'); // TODO Custom time formatting

function time() {
	return '[' + dayjs().format('HH:mm:ss') + ']';
}

function print(...data) {
	console.log(time(), ...data);
}

function printError(...data) {
	console.error(time(), ...data);
}

function printDebug(...data) {
	console.debug(time(), ...data);
}

function printInfo(...data) {
	console.info(time(), ...data);
}

module.exports = { print, printError, printDebug, printInfo };

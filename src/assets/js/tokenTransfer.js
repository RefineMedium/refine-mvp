var eth = require('./ethereum.js');

async function tokenTransfer() {
	console.log("Sending Token...");
	await eth.sendToken();
	console.log("Token Sent");
}
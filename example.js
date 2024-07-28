const fs = require('fs');

const IMGEDITOR = require('./ImageEditor');

IMGEDITOR.addTextBandToImage('./test1.png', "This is testing", ".title {fill: white; font-size: 15px;}.blackband {fill: black;}", outFile=>console.log(outFile));

const inputBase64 = fs.readFileSync("test.txt", "utf8");
IMGEDITOR.addTextBandToBase64(inputBase64, "This is testing", ".title {fill: white; font-size: 15px;}", function(outFile) {
	console.log(outFile);
});
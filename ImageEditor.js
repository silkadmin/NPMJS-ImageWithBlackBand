//Image Editor for altering various attributes of image
// Here it adds a black band with text at the bottom

const fs = require('fs');
const sharp = require('sharp');

const tempFolder = "tmp/";

module.exports = {
	addTextBandToImage: async function(imageFile, text, style, callback) {
	  	const metadata = await sharp(imageFile).metadata();
	  	// console.log("metadata", metadata);

	  	const outFile = tempFolder+`output_${generateRandom()}.${metadata.format}`;

	  	const width = metadata.width;
	  	const height = metadata.height;

	  	const rectHeight = 30;
	  	const rectPostY = height-rectHeight;

	  	const textPosY = height-rectHeight+20;

	  	const svgText = `
		  <svg width="${width}" height="${height}">
		    <style>${style}</style>
			<rect x="0%" y="${rectPostY}" width="100%" height="${rectHeight}px" class="blackband" />
			<text x="10px" y="${textPosY}" class="title">${text}</text>
		  </svg>`

		const svgBuffer = Buffer.from(svgText);

		sharp (imageFile)
			.composite([{input: svgBuffer, left: 0, top: 0}])
			  	.toFile(outFile)
			  		.then(a=>{
			  			callback(outFile, a)
			  		});
	},

	addTextBandToBase64: async function(base64Image, text, style, callback) {
		var base64Arr = base64Image.split("base64,");
		
		var base64Data = base64Arr[1];
		var fileMime = base64Arr[0].split("/")[1].replace(";","").toLowerCase();

		const tempImageFile = tempFolder+`temp_${generateRandom()}.${fileMime}`;
		await fs.writeFileSync(tempImageFile, base64Data, 'base64');

		//var outFile = await this.
		this.addTextBandToImage(tempImageFile, text, style, outFile=> {
			fs.unlinkSync(tempImageFile);
			callback(outFile);
		})

		// fs.unlinkSync(tempImageFile);

		// return outFile;
	}
}

function generateRandom() {
	return Math.ceil(Math.random()*1000000000);
}
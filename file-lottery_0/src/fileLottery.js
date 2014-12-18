var fs = require('fs');

function readFiles(path) {
	if (fs.lstatSync(path).isDirectory()) {
		filesName = fs.readdirSync(path);
	}else if(fs.lstatSync(path).isFile()){
		filesName =  path.split('/');
		filesName = filesName[filesName.length-1];
	}
	return filesName;
}

var fileLottery = function( path ) {
	this.filesName;
 	this.index;
	this.readFiles(path);
	console.log(filesName);

}

fileLottery.prototype = {
	next: function() {
		if (this.index == undefined) {
			this.reset();
			console.log(this.filesName);
			this.shuffle();
		}
		console.log(this.filesName);
		return this.filesName[this.index++];
	},
	hasNext: function() {
		return this.index <= this.items.length;
	},
	reset: function() {
		this.index = 0;
	},
	each: function(callback) {
		for (var item = this.first(); this.hasNext(); item = this.next()) {
			callback(item);
		}
	},
	shuffle: function() {
		for (var j, x, i = this.filesName.length; i; j = Math.floor(Math.random() * i), x = this.filesName[--i], this.filesName[i] = this.filesName[j], this.filesName[j] = x);
	}
}

module.exports.fileLottery = fileLottery;

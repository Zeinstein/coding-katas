var fileSystem = require('fs');

var FileLottery = function(path) {
	this.path = path;
	this.fileLottery = function() {
		var dirContents = this.getContentsOfDirectory(this.path);
		if (dirContents.length == 0)
			return "";
			var randomIndex = this.getRandomIndex(dirContents);
			return dirContents[randomIndex];
		};

		this.getContentsOfDirectory = function() {
			return fileSystem.readdirSync(this.path);
		};

		this.getRandomIndex = function(array) {
			return Math.floor(Math.random()*array.length);
		};

		this.createIterator = function() {
			return new Iterator(this);
		}
};


var Iterator = function(lottery) {
	this.lottery = lottery;
	this.hasNext = function() {
		var dirContents = this.lottery.getContentsOfDirectory(this.lottery.path);
		if (dirContents.length == 0) {
			return false;
		}
		return true;
	};

	this.next = function() {
		return null;
	};
};


module.exports.FileLottery = FileLottery;
module.exports.Iterator = Iterator;

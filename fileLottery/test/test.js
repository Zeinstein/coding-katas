'use strict';

var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var FileLottery = require('../src/fileLottery.js').FileLottery;
var Iterator = require('../src/fileLottery.js').Iterator;

suite('fileLottery', function() {

	test( 'Return empty string for empty directory', function() {
		var lottery = new FileLottery('/testfiles');
		lottery.getContentsOfDirectory = sinon.stub();
		lottery.getContentsOfDirectory.withArgs('/testfiles').returns([]);

		expect(lottery.fileLottery('/testfiles')).to.equal('');
	});

	test('Return filename string for directory with one file', function() {
		var lottery = new FileLottery('/testfiles');
		lottery.getContentsOfDirectory = sinon.stub();
		lottery.getContentsOfDirectory.withArgs('/testfiles').returns(['test.txt']);

		expect(lottery.fileLottery('/testfiles')).to.equal('test.txt');
	});

	test('Return random filename for directory with more than one files', function() {
		var lottery = new FileLottery('/testfiles');
		lottery.getContentsOfDirectory = sinon.stub();
		lottery.getContentsOfDirectory.withArgs('/testfiles').returns(['1.txt', '2.txt', '4.txt']);

		lottery.getRandomIndex = sinon.stub();
		lottery.getRandomIndex.returns(0);

		expect(lottery.fileLottery('/testfiles')).to.equal('1.txt');
	});
});

suite('getContentsOfDirectory', function() {
	test('Return the content of the directory as an array of strings', function(){
		var lottery = new FileLottery('var/files');
		expect(lottery.getContentsOfDirectory('var/files')).to.deep.equal(['1.txt', '2.txt', '4.txt']);
	});
});

suite('getRandomIndex', function() {
	test('Return 0 for one-element array', function(){
		var lottery = new FileLottery('/testfiles');
		expect(lottery.getRandomIndex([0])).to.equal(0);
	});

	test('Return random index from array', function(){
		var lottery = new FileLottery();
		expect(0 <= lottery.getRandomIndex([0, 1, 2, 3, 4]) && lottery.getRandomIndex([0, 1, 2, 3, 4]) <= 4).to.be.true;
	});
});

suite('Iterator.hasNext', function() {
	test('Return true if collection hasnt been exhausted', function(){
		var lottery = new FileLottery('/testfiles');
		lottery.getContentsOfDirectory = sinon.stub();
		lottery.getContentsOfDirectory.withArgs().returns(['1.txt', '2.txt', '4.txt']);

		var iterator = lottery.createIterator();

		expect(iterator.hasNext()).to.be.true;
	});

	test('Return false if collection has only one member', function(){
		var lottery = new FileLottery('/testfiles');
		lottery.getContentsOfDirectory = sinon.stub();
		lottery.getContentsOfDirectory.withArgs().returns([]);

		var iterator = lottery.createIterator();

		expect(iterator.hasNext()).to.be.false;
	});

	// test('Return false if collection has been exhausted', function(){
	//   var lottery = new FileLottery('/testfiles');
	//   var dirContents = ['1.txt', '2.txt', '4.txt'];
	//   lottery.fileLottery.contentsOfDirectory = sinon.stub();
	//   lottery.fileLottery.contentsOfDirectory.returns(dirContents);
	//
	//   var iterator = lottery.createIterator();
	//
	//   var randomElement1 = iterator.next();
	//   var randomElement2 = iterator.next();
	//   var randomElement3 = iterator.next();
	//
	//   expect(iterator.hasNext()).to.be.false;
	// });
});

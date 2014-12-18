'use strict';

var assert = require('assert');
var sinon = require('sinon');
var path = require('path');
var fs = require('fs');

var fileLottery = require('../src/fileLottery.js').fileLottery;

suite('fileLottery', function() {
  // 
  // test('fileLottery is reading files', function() {
  //     assert.equal("",fileLottery('./test/TestFiles'));
  // });
  // test('path is a file', function() {
  //     assert.equal("1.txt",fileLottery('./test/TestFiles2/1.txt'));
  // });
  test('randomness', function() {
      var filesName = fs.readdirSync('./test/TestFiles3/');
      var lotteryFilesName = [];
      var fl = new fileLottery('./test/TestFiles3/');
      for(var i = 0 ; i < filesName.length ; i++) {
          lotteryFilesName.push(fl.next());
      }
      var diff = (filesName[0] !== lotteryFilesName[0]) || (filesName[1] !== lotteryFilesName[1]) || (filesName[2] !== lotteryFilesName[2]);
      assert.equal(true, diff);
  });

});

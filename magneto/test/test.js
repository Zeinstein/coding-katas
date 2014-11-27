'use strict';

var assert = require('assert');

var magnetoEffect = require('../src/magneto.js').magnetoEffect;

var equalsPoint = function ( a, b) {
	return a.x == b.x && a.y == b.y;
}
var assertEqualsPoint = function ( a, b) {
	assert.equal(true, equalsPoint(a, b));
}

suite('magnetoEffect', function() {

  test( 'example1', function() {
  	var result = magnetoEffect.pointWithMagnetoEffect([{x: 50, y: 50}], 5, {x: 49, y: 50});
  	assertEqualsPoint(result, {x: 50, y: 50});
  });

  test( 'example2', function() {
  	var result = magnetoEffect.pointWithMagnetoEffect([{x: 50, y: 50}], 5, {x: 0, y: 0});
  	assertEqualsPoint(result, {x: 0, y: 0});
  });

  test( 'example3', function() {
  	var result = magnetoEffect.pointWithMagnetoEffect([{x: 50, y: 50}, {x: 100, y: 50}], 5, {x: 101, y: 48});
  	assertEqualsPoint(result, {x: 100, y: 50});
  });

  test( 'example4', function() {
  	var result = magnetoEffect.pointWithMagnetoEffect([{x: 50, y: 50}, {x: 51, y: 51}], 5, {x: 51, y: 52});
  	assertEqualsPoint(result, {x: 51, y: 51});
  });

  test( 'example5', function() {
  	var result = magnetoEffect.pointWithMagnetoEffect([], 5, {x: 51, y: 52});
  	assertEqualsPoint(result, {x: 51, y: 52});
  });

  test( 'example6', function() {
  	var result = magnetoEffect.pointWithMagnetoEffect([{x: 51, y: 52}, {x: 51, y: 152}, {x: 151, y: 52}, {x: 151, y: 152}],5, {x: 51, y: 51});
  	assertEqualsPoint(result, {x: 51, y: 52});
  });

  test( 'example7', function() {
  	var result = magnetoEffect.pointWithMagnetoEffect([{x: 51, y: 52}, {x: 51, y: 52}, {x: 151, y: 52}, {x: 151, y: 152}],5, {x: 51, y: 51});
  	assertEqualsPoint(result, {x: 51, y: 52});
  });

});

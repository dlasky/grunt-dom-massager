'use strict';

var grunt = require('grunt');

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

exports.dom_massager = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},
	read_test: function(test) {
		test.expect(2);

		// var actual = grunt.file.read('tmp/default_options');
		// var expected = grunt.file.read('test/expected/default_options');
		// test.equal(actual, expected, 'should describe what the default behavior is.');

		console.log("classy:"+grunt.config("dom.read.classy"));
		console.log("idface:"+grunt.config("dom.read.idface"));


		test.equal( grunt.config.get("dom.read.classy"), "<span>i'm classy</span>");
		test.equal( grunt.config.get("dom.read.idface"), "i have an id");

		test.done();
	},
	write_test: function(test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/test.html');
		var expected = grunt.file.read('test/expected/test.html');
		test.equal(actual, expected, 'should match manipulated nodes');

		test.done();
	},
};
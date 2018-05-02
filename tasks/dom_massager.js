/*
 * grunt-dom-massager
 * https://github.com/dlasky/grunt-dom-massager
 *
 * Copyright (c) 2013 Dan Lasky
 * Licensed under the MIT license.
 */

'use strict';

var cheerio = require('cheerio');
var path = require('path');
var util = require('util');

module.exports = function(grunt) {

	grunt.registerMultiTask('dom_massager', 'Manipulate the dom using cheerio via grunt task', function() {

		var options = this.options({
			writeDom: false,
			xmlMode: false,
			normalizeWhitespace: false,
			decodeEntities: true,
			selectors: {},
			cheerioHook: null
		});

		this.files.forEach(function(f) {

			var src = f.src.filter(function(filepath) {

				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}

			}).map(function(filepath) {
				var fls = null;
				if (typeof f.src !== "string") {
					fls = f.src.map(function(f) { return path.basename(f); });
				}
				return {
					html: grunt.file.read(filepath),
					file: fls || path.basename(f.src),
				};
			});

			src.map(function(obj) {
				var i,
					opts,
					output,
					$ = cheerio.load(obj.html, {
						xmlMode: options.xmlMode,
						normalizeWhitespace: options.normalizeWhitespace,
						decodeEntities: options.decodeEntities
					});

				for(i in options.selectors) {

					opts = options.selectors[i];

					if (opts && opts.action) {

						var c = $(i);
						output = c[opts.action].apply(c, opts.input);

						if (opts.output) {
							grunt.config.set(opts.output, output);
						}

					} else {
						grunt.log.warn('Could not find an action for selector:' + i);
					}
				}

				if (options.cheerioHook) {
					options.cheerioHook($, obj.html, grunt);
				}

				if (options.writeDom) {
					grunt.file.write(f.dest + obj.file, $.html());
					grunt.log.writeln("Wrote file:" + f.dest + obj.file);
				}

			},this);

		});
	});

};

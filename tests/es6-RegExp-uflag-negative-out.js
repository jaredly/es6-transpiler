;applyPolyfills$0();(RegExp["__polyfill__"]||function(obj1, obj2){var arr=RegExp["__polyfill__"];if(!arr)arr=RegExp["__polyfill__"]=[];arr.push([obj1,obj2])})({"N[^1]N":"N(?:[^1]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF])N","N[^1-9]N":"N(?:[^1-9]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF])N","N[^\\s1-9]N":"N(?:[^\\s1-9]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF])N","N[^\\S\\t\\r]N":"N[^\\S\\t\\r]N","N[^\\da-z]N":"N(?:[^\\da-z]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF])N","N[^\\D1-3]N":"N[^\\D1-3]N","N[^\\w-]N":"N(?:[^\\w-]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF])N","N[^\\Wa]N":"N[^\\Wa]N","N[^\\s\\uD800\\uDC00-\\uD800\\uDCAA1-9]N":"N(?:[^\\s1-9]|(?:\\uD800[\\uDCAB-\\uDFFF]|[\\uD801-\\uDBFF][\\uDC00-\\uDFFF]))N","N[^\\S\\uD800\\uDC00-\\uD800\\uDCAA\\t\\r]N":"N[^\\S\\t\\r]N","N[^\\d\\uD800\\uDC00-\\uD800\\uDCAAa-z]N":"N(?:[^\\da-z]|(?:\\uD800[\\uDCAB-\\uDFFF]|[\\uD801-\\uDBFF][\\uDC00-\\uDFFF]))N","N[^\\D\\uD800\\uDC00-\\uD800\\uDCAA1-3]N":"N[^\\D1-3]N","N[^\\w\\uD800\\uDC00-\\uD800\\uDCAA-]N":"N(?:[^\\w-]|(?:\\uD800[\\uDCAB-\\uDFFF]|[\\uD801-\\uDBFF][\\uDC00-\\uDFFF]))N","N[^\\W\\uD800\\uDC00-\\uD800\\uDCAAa-]N":"N[^\\Wa-]N","C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C":"C(?:[^a-z]|(?:[\\uD800\\uD8FF][\\uDCAB-\\uDFFF]|[\\uD801-\\uD80E\\uD900-\\uDA9F\\uDAF1-\\uDBFF][\\uDC00-\\uDFFF]|\\uD80F[\\uDC00-\\uDCA9]|\\uDAA0[\\uDC00-\\uDFFE]))C","N[^\\uD83D\\uDCA9-\\uD83D\\uDCAB]N":"N(?:[^]|(?:[\\uD800-\\uD83C\\uD83E-\\uDBFF][\\uDC00-\\uDFFF]|\\uD83D[\\uDC00-\\uDCA8\\uDCAC-\\uDFFF]))N"}, {"!65536|65706":"(?:\\uD800[\\uDCAB-\\uDFFF]|[\\uD801-\\uDBFF][\\uDC00-\\uDFFF])","!65536|65706!81066|326826!754687|836607":"(?:[\\uD800\\uD8FF][\\uDCAB-\\uDFFF]|[\\uD801-\\uD80E\\uD900-\\uDA9F\\uDAF1-\\uDBFF][\\uDC00-\\uDFFF]|\\uD80F[\\uDC00-\\uDCA9]|\\uDAA0[\\uDC00-\\uDFFE])","!128169|128171":"(?:[\\uD800-\\uD83C\\uD83E-\\uDBFF][\\uDC00-\\uDFFF]|\\uD83D[\\uDC00-\\uDCA8\\uDCAC-\\uDFFF])"});/*es6-transpiler includePolyfills:true */

// @see http://mathiasbynens.be/notes/javascript-unicode#astral-ranges
// @see https://github.com/google/traceur-compiler/issues/370

{// ranges without astral symbols and CharacterClassEscape
	console.log(
		(new RegExp("N[^1]N", "u")).test('N\uD83D\uDCA9N')    //N(?:[^1]|[\uD800-\uDBFF][\uDC00-\uDFFF])N
		, (new RegExp("N[^1]N", "u")).test('N9N')
		, (new RegExp("N[^1]N", "u")).test('N1N') === false
	);
	console.log(
		(new RegExp("N[^1-9]N", "u")).test('N\uD83D\uDCA9N')    //N(?:[^1-9]|[\uD800-\uDBFF][\uDC00-\uDFFF])N
		, (new RegExp("N[^1-9]N", "u")).test('NAN')
		, (new RegExp("N[^1-9]N", "u")).test('N1N') === false
	);
}

{// ranges without astral symbols and with CharacterClassEscape
	console.log(
		(new RegExp("N[^\\s1-9]N", "u")).test('N\uD83D\uDCA9N')    //N(?:[^\s1-9]|[\uD800-\uDBFF][\uDC00-\uDFFF])N
		, (new RegExp("N[^\\s1-9]N", "u")).test('N9N') === false
		, (new RegExp("N[^\\s1-9]N", "u")).test('N N') === false
		, (new RegExp("N[^\\S\\t\\r]N", "u")).test('N\uD83D\uDCA9N') === false //N[^\S\t\r]N
		, (new RegExp("N[^\\S\\t\\r]N", "u")).test('N\tN') === false
		, (new RegExp("N[^\\S\\t\\r]N", "u")).test('N\rN') === false
		, (new RegExp("N[^\\S\\t\\r]N", "u")).test('N N')
	);
	console.log(
		(new RegExp("N[^\\da-z]N", "u")).test('N\uD83D\uDCA9N')  //N(?:[^\da-z]|[\uD800-\uDBFF][\uDC00-\uDFFF])N
		, (new RegExp("N[^\\da-z]N", "u")).test('N9N') === false
		, (new RegExp("N[^\\da-z]N", "u")).test('NaN') === false
		, (new RegExp("N[^\\D1-3]N", "u")).test('N\uD83D\uDCA9N') === false//N[^\D1-3]N
		, (new RegExp("N[^\\D1-3]N", "u")).test('N9N')
		, (new RegExp("N[^\\D1-3]N", "u")).test('N3N') === false
	);
	console.log(
		(new RegExp("N[^\\w-]N", "u")).test('N\uD83D\uDCA9N')    //N(?:[^\w-]|[\uD800-\uDBFF][\uDC00-\uDFFF])N
		, (new RegExp("N[^\\w-]N", "u")).test('N-N') === false
		, (new RegExp("N[^\\w-]N", "u")).test('NaN') === false
		, (new RegExp("N[^\\Wa]N", "u")).test('N\uD83D\uDCA9N') === false //N[^\Wa]N
		, (new RegExp("N[^\\Wa]N", "u")).test('NbN')
		, (new RegExp("N[^\\Wa]N", "u")).test('NaN') === false
	);
}

{// ranges with astral symbols and CharacterClassEscape
	// /N[^\s\uD800\uDC00-\uD800\uDCAA1-9]N/u
	// regenerate().addRange(0xFFFF+1, 0x10FFFF).removeRange('\uD800\uDC00', '\uD800\uDCAA')
	// //N(?:[^\s1-9]|\uD800[\uDCAB-\uDFFF]|[\uD801-\uDBFF][\uDC00-\uDFFF])N

	console.log(
		(new RegExp("N[^\\s\\uD800\\uDC00-\\uD800\\uDCAA1-9]N", "u")).test('N\uD83D\uDCA9N') //N(?:[^\s1-9]|\uD800[\uDCAB-\uDFFF]|[\uD801-\uDBFF][\uDC00-\uDFFF])N
		, (new RegExp("N[^\\s\\uD800\\uDC00-\\uD800\\uDCAA1-9]N", "u")).test('N\uD800\uDC01N') === false
		, (new RegExp("N[^\\s\\uD800\\uDC00-\\uD800\\uDCAA1-9]N", "u")).test('N9N') === false
		, (new RegExp("N[^\\s\\uD800\\uDC00-\\uD800\\uDCAA1-9]N", "u")).test('N N') === false
		, (new RegExp("N[^\\S\\uD800\\uDC00-\\uD800\\uDCAA\\t\\r]N", "u")).test('N\uD83D\uDCA9N') === false //N[^\S\t\r]N
		, (new RegExp("N[^\\S\\uD800\\uDC00-\\uD800\\uDCAA\\t\\r]N", "u")).test('N\tN') === false
		, (new RegExp("N[^\\S\\uD800\\uDC00-\\uD800\\uDCAA\\t\\r]N", "u")).test('N\rN') === false
		, (new RegExp("N[^\\S\\uD800\\uDC00-\\uD800\\uDCAA\\t\\r]N", "u")).test('N N')
	);
	console.log(
		(new RegExp("N[^\\d\\uD800\\uDC00-\\uD800\\uDCAAa-z]N", "u")).test('N\uD83D\uDCA9N')  //N(?:[^\da-z]|\uD800[\uDCAB-\uDFFF]|[\uD801-\uDBFF][\uDC00-\uDFFF])N
		, (new RegExp("N[^\\d\\uD800\\uDC00-\\uD800\\uDCAAa-z]N", "u")).test('N\uD800\uDC01N') === false
		, (new RegExp("N[^\\d\\uD800\\uDC00-\\uD800\\uDCAAa-z]N", "u")).test('N9N') === false
		, (new RegExp("N[^\\d\\uD800\\uDC00-\\uD800\\uDCAAa-z]N", "u")).test('NaN') === false
		, (new RegExp("N[^\\D\\uD800\\uDC00-\\uD800\\uDCAA1-3]N", "u")).test('N\uD83D\uDCA9N') === false//N[^\D1-3]N
		, (new RegExp("N[^\\D\\uD800\\uDC00-\\uD800\\uDCAA1-3]N", "u")).test('N9N')
		, (new RegExp("N[^\\D\\uD800\\uDC00-\\uD800\\uDCAA1-3]N", "u")).test('N3N') === false
	);
	console.log(
		(new RegExp("N[^\\w\\uD800\\uDC00-\\uD800\\uDCAA-]N", "u")).test('N\uD83D\uDCA9N')    //N(?:[^\w-]|\uD800[\uDCAB-\uDFFF]|[\uD801-\uDBFF][\uDC00-\uDFFF])N
		, (new RegExp("N[^\\w\\uD800\\uDC00-\\uD800\\uDCAA-]N", "u")).test('N\uD800\uDC01N') === false
		, (new RegExp("N[^\\w\\uD800\\uDC00-\\uD800\\uDCAA-]N", "u")).test('N-N') === false
		, (new RegExp("N[^\\w\\uD800\\uDC00-\\uD800\\uDCAA-]N", "u")).test('NaN') === false
		, (new RegExp("N[^\\W\\uD800\\uDC00-\\uD800\\uDCAAa-]N", "u")).test('N\uD83D\uDCA9N') === false //N[^\Wa]N
		, (new RegExp("N[^\\W\\uD800\\uDC00-\\uD800\\uDCAAa-]N", "u")).test('NbN')
		, (new RegExp("N[^\\W\\uD800\\uDC00-\\uD800\\uDCAAa-]N", "u")).test('NaN') === false
	);
}

{// complex
	console.log(
		(new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('CfC') === false

		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uD800\uDC00C') === false//first
		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uD800\uDC0AC') === false//middle
		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uD800\uDCAAC') === false//last
		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uFFFFC')       //first - 1
		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uD800\uDCABC') //last + 1

		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uD80F\uDCAAC') === false//first
		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uD8F0\uDCAAC') === false//middle
		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uD8FF\uDCAAC') === false//last
		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uD80F\uDCA9C') //first - 1
		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uD8FF\uDCABC') //last + 1

		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uDAA0\uDFFFC') === false//first
		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uDAE0\uDC00C') === false//middle
		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uDAF0\uDFFFC') === false//last
		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uDAA0\uDFFEC') //first - 1
		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uDAF2\uDC00C') //last + 1

		, (new RegExp("C[^\\uD800\\uDC00-\\uD800\\uDCAA\\uD80F\\uDCAA-\\uD8FF\\uDCAA\\uDAA0\\uDFFF-\\uDAF0\\uDFFFa-z]C", "u")).test('C\uDAFC\uDFFFC')
	);
}

{// negative
	{
		var re = (new RegExp("N[^\\uD83D\\uDCA9-\\uD83D\\uDCAB]N", "u"));
		console.log(
			re.test('N\uD83D\uDCA9N') === false
			, re.test('NCN')
		);
	}
//	{// TODO:: and or
//		let re = /N([^\uD800\uDC00-\uD800\uDCAA]|[\uD83D\uDCA9-\uD83D\uDCAB])+N/u;
//		console.log(
//			re.test('N\uD83D\uDCA9\uD800\uDC01abcN') === false
//			, re.test('NCN')
//		);
//	}
}

/* <[tests es6-transpiler test file EOF ]> */

function applyPolyfills$0(){"use strict";
//(function(){"use strict";

var regExp_flag_u_support = false
	, regExp_flag_y_support = false
;

try {
	(new RegExp("1", "u")).test("1");
	regExp_flag_u_support = true;
}
catch(e){}

try {
	(new RegExp("1", "y")).test("1");
	regExp_flag_y_support = true;
}
catch(e){}

var getES6unicodeRangeConverter = function () {
	/*! This converter is based on http://mths.be/regenerate v0.5.4 by @mathias | MIT license */

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var append = function(object, key, value) {
		if (hasOwnProperty.call(object, key)) {
			object[key].push(value);
		} else {
			object[key] = [value];
		}
	};

	var sortUniqueNumbers = function(array) {
		// Sort numerically in ascending order
		array = array.sort(function(a, b) {
			return a - b;
		});
		// Remove duplicates
		var previous;
		var result = [];
		array.forEach(function(item, index) {
			if (previous != item) {
				result.push(item);
				previous = item;
			}
		});
		return result;
	};

	// This assumes that `number` is a positive integer that `toString()`s nicely
	// (which is the case for all code point values).
	var zeroes = '0000';
	var pad = function(number, totalCharacters) {
		var string = String(number);
		return string.length < totalCharacters
			? (zeroes + string).slice(-totalCharacters)
			: string;
	};

	/*--------------------------------------------------------------------------*/

	var range = function(start, stop) {
		// inclusive, e.g. `range(1, 3)` → `[1, 2, 3]`
		if (stop < start) {
			throw Error('A range\u2019s `stop` value must be greater than or equal ' +
				'to the `start` value.');
		}
		for (var result = []; start <= stop; result.push(start++));
		return result;
	};

	/*--------------------------------------------------------------------------*/

	// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	var floor = Math.floor;
	var stringFromCharCode = String.fromCharCode;
	var codePointToString = function(codePoint) {
		var string;
		if (
			(codePoint >= 0x41 && codePoint <= 0x5A) ||
				(codePoint >= 0x61 && codePoint <= 0x7A) ||
				(codePoint >= 0x30 && codePoint <= 0x39)
			) {
			// [a-zA-Z0-9]
			string = stringFromCharCode(codePoint);
		} else if (codePoint <= 0xFF) {
			// http://mathiasbynens.be/notes/javascript-escapes#hexadecimal
			string = '\\x' + pad(Number(codePoint).toString(16).toUpperCase(), 2);
		} else { // if (codePoint <= 0xFFFF)
			// http://mathiasbynens.be/notes/javascript-escapes#unicode
			string = '\\u' + pad(Number(codePoint).toString(16).toUpperCase(), 4);
		}

		// There’s no need to account for astral symbols / surrogate pairs here,
		// since `codePointToString` is private and only used for BMP code points.
		// But if that’s what you need, just add an `else` block with this code:
		//
		//     string = '\\u' + pad(hex(highSurrogate(codePoint)), 4)
		//     	+ '\\u' + pad(hex(lowSurrogate(codePoint)), 4);

		return string;
	};

	var createBMPCharacterClasses = function(codePoints) {
		var tmp = '';
		var start = codePoints[0];
		var end = start;
		var predict = start + 1;

		codePoints = codePoints.slice(1);

		var counter = 0;
		codePoints.forEach(function(code) {
			if (predict == code) {
				end = code;
				predict = code + 1;
				return;
			}
			if (start == end) {
				tmp += codePointToString(start);
				counter += 1;
			} else if (end == start + 1) {
				tmp += codePointToString(start) + codePointToString(end);
				counter += 2;
			} else {
				tmp += codePointToString(start) + '-' + codePointToString(end);
				counter += 2;
			}
			start = code;
			end = code;
			predict = code + 1;
		});

		if (start == end) {
			tmp += codePointToString(start);
			counter += 1;
		} else if (end == start + 1) {
			tmp += codePointToString(start) + codePointToString(end);
			counter += 2;
		} else {
			tmp += codePointToString(start) + '-' + codePointToString(end);
			counter += 2;
		}

		if (counter == 1) {
			return tmp;
		} else {
			return '[' + tmp + ']';
		}
	};

	// In Regenerate output, `\0` will never be preceded by `\` because we sort
	// by code point value, so let’s keep this regular expression simple:
	var regexNull = /\\x00([^0123456789]|$)/g;
	var createCharacterClasses = function(codePoints) {
		// At this point, it’s safe to assume `codePoints` is a sorted array of
		// numeric code point values.
		var bmp = [];
		var astralMap = {};
		var surrogates = [];
		var hasAstral = false;

		codePoints.forEach(function(codePoint) {
			if (codePoint >= 0xD800 && codePoint <= 0xDBFF) {
				// If a high surrogate is followed by a low surrogate, the two code
				// units should be matched together, so that the regex always matches a
				// full code point. For this reason, separate code points that are
				// (unmatched) high surrogates are tracked separately, so they can be
				// moved to the end if astral symbols are to be matched as well.
				surrogates.push(codePoint);
			} else if (codePoint >= 0x0000 && codePoint <= 0xFFFF) {
				// non-surrogate BMP code point
				bmp.push(codePoint);
			} else if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				// astral code point
				hasAstral = true;
				append(
					astralMap,
					parseInt(floor((codePoint - 0x10000) / 0x400) + 0xD800, 10),//high surrogate value
					parseInt((codePoint - 0x10000) % 0x400 + 0xDC00, 10)//low surrogate value
				);
			} else {
				throw RangeError('Invalid code point value. Code points range from ' +
					'U+000000 to U+10FFFF.');
			}
		});

		var astralMapByLowRanges = {};

		for (var highSurrogateValue in astralMap) if (hasOwnProperty.call(astralMap, highSurrogateValue)) {
			append(astralMapByLowRanges, createBMPCharacterClasses(astralMap[highSurrogateValue]), +highSurrogateValue);
		}

		var tmp = [];
		// If we’re not dealing with any astral symbols, there’s no need to move
		// individual code points that are high surrogates to the end of the regex.
		if (!hasAstral && surrogates.length) {
			bmp = sortUniqueNumbers(bmp.concat(surrogates));
		}
		if (bmp.length) {
			tmp.push(createBMPCharacterClasses(bmp));
		}
		for (var lowSurrogateValue in astralMapByLowRanges) if (hasOwnProperty.call(astralMapByLowRanges, lowSurrogateValue)) {
			tmp.push(createBMPCharacterClasses(astralMapByLowRanges[lowSurrogateValue]) + lowSurrogateValue);
		}
		// Individual code points that are high surrogates must go at the end
		// if astral symbols are to be matched as well.
		if (hasAstral && surrogates.length) {
			tmp.push(createBMPCharacterClasses(surrogates));
		}
		return tmp
			.join('|')
			// Use `\0` instead of `\x00` where possible
			.replace(regexNull, '\\0$1');
	};



	return function fromCodePointRange(start, end) {
		return createCharacterClasses(range(start, end));
	};
}

if( !regExp_flag_u_support || !regExp_flag_y_support ) {
	var $RegExp = RegExp
		, global = (new Function("return this"))()
		, convertUnicodeSequenceToES5Compatible
		, convertUnicodeSequenceToES5Compatible_failed
		, convertUnicodeSequenceToES5Compatible_Map
		, codePointsToES5Range_Map
		, has__getter__support = (function(){
			try {
				var random = Math.random();
				var propName = "sentinel";
				var obj = Object.defineProperty({}, propName, {"get": function(){ return random }});
				return obj[propName] == random;
			}
			catch (e){
				return false;
			}
		})()
		, updateGlobalRegExpProperties
		, globalString_prototype = global["String"].prototype
		, $string_replace = globalString_prototype.replace
		, unescapeUnicode
	;

	var beforeRegExpCreate = function(pattern, has_u_flag, has_y_flag) {
		if( has_u_flag ) {
			var newPattern = convertUnicodeSequenceToES5Compatible_Map[pattern];
			if ( newPattern === void 0 ) {
				newPattern = convertUnicodeSequenceToES5Compatible(pattern);
				if ( convertUnicodeSequenceToES5Compatible_failed === true ) {
					convertUnicodeSequenceToES5Compatible_Map[pattern] = false;
				}
				else {
					pattern = convertUnicodeSequenceToES5Compatible_Map[pattern] = newPattern;

					convertUnicodeSequenceToES5Compatible_Map[newPattern] = true;
				}
			}
			else if ( newPattern === true || newPattern === false ) {
				// true - nothing to convert
				// false - can't convert
			}
			else {
				pattern = newPattern;
			}
		}

		if( has_y_flag ) {
			var lineStartIndex = pattern.indexOf("^");
			if( lineStartIndex === -1 || (pattern[lineStartIndex - 1] === "\\") ) {
				pattern = "^" + pattern;
			}
		}

		return pattern;
	};

	var afterRegExpCreate = function(re, originalPattern, has_u_flag, has_y_flag) {
		if( originalPattern !== void 0 ) {
			Object.defineProperty(re, "__pattern__", {"value": originalPattern});
		}

		if( !regExp_flag_u_support ) {
			Object.defineProperty(re, "unicode", {"value": has_u_flag, "configurable": true});
		}

		if( !regExp_flag_y_support ) {
			Object.defineProperty(re, "sticky", {"value": has_y_flag, "configurable": true});
		}
	};

	var extendedRegExp = function RegExp(pattern, flags) {
		var has_u_flag = false, originalPattern;
		var has_y_flag = false;

		if( flags ) {
			pattern = String(pattern);

			originalPattern = pattern;

			flags = String(flags);
			has_u_flag = !regExp_flag_u_support && flags.indexOf("u") !== -1;
			has_y_flag = !regExp_flag_y_support && flags.indexOf("y") !== -1;

			convertUnicodeSequenceToES5Compatible_failed = false;
			pattern = beforeRegExpCreate(pattern, has_u_flag, has_y_flag);

			if ( convertUnicodeSequenceToES5Compatible_failed === true ) {
				// something goes wrong and we were not able to modify the es6 Unicode sequence -> do not touch patten and flags
				flags = $string_replace.call(flags, "y", "");
				pattern = originalPattern;
			}
			else {
				flags = $string_replace.call($string_replace.call(flags, "u", ""), "y", "");
			}

			if ( pattern == originalPattern ) {
				originalPattern = void 0;
			}
		}

		var re = new $RegExp(pattern, flags);// new RegExp object

		if( has_u_flag || has_y_flag ) {
			afterRegExpCreate(re, originalPattern, has_u_flag, has_y_flag);
		}

		return re;
	};
	extendedRegExp.prototype = $RegExp.prototype;
	global["RegExp"] = extendedRegExp;

	var $compile = extendedRegExp.prototype["compile"];
	if ( typeof $compile === 'function' ) {
		extendedRegExp.prototype["compile"] = function(pattern, flags) {
			var has_u_flag = false, originalPattern;
			var has_y_flag = false;

			if( flags ) {
				flags = String(flags);
				originalPattern = pattern = String(pattern)
				has_u_flag = !regExp_flag_u_support && flags.indexOf("u") !== -1;
				has_y_flag = !regExp_flag_y_support && flags.indexOf("y") !== -1;

				convertUnicodeSequenceToES5Compatible_failed = false;
				pattern = beforeRegExpCreate(pattern, has_u_flag, has_y_flag);

				if ( convertUnicodeSequenceToES5Compatible_failed === true ) {
					// something goes wrong and we were not able to modify the es6 Unicode sequence -> do not touch patten
					pattern = originalPattern;
				}

				flags = $string_replace.call($string_replace.call(flags, "u", ""), "y", "");

				if ( pattern == originalPattern ) {
					originalPattern = void 0;
				}
			}

			var re = $compile.apply(this, arguments);

			if( flags ) {
				afterRegExpCreate(re, originalPattern, has_u_flag, has_y_flag);
			}
		};
	}

	if ( !regExp_flag_u_support ) {
		// TODO:: require('lib/unescapeUnicode')
		unescapeUnicode = function(escapedString) {
			return escapedString.replace(/\\u(\w{4})/g, function(found, charCode, offset, string)  {
				var prev1 = string[offset - 1],  prev2 = string[offset - 2];
				if ( prev1 === '\\' && prev2 !== '\\' ) {
					return found;
				}

				return String.fromCharCode(parseInt(charCode, 16));
			});
		};

		extendedRegExp["__polyfill__"] = function(convertUnicodeSequence_Map, codePointsRange_Map) {
			if ( convertUnicodeSequence_Map && typeof convertUnicodeSequence_Map === 'object' ) {
				if ( !convertUnicodeSequenceToES5Compatible_Map ) {
					convertUnicodeSequenceToES5Compatible_Map = {};
				}

				for( var key in convertUnicodeSequence_Map ) if ( convertUnicodeSequence_Map.hasOwnProperty(key) ) {
					var newPattern = convertUnicodeSequenceToES5Compatible_Map[key] = convertUnicodeSequence_Map[key];
					var unescapedKey = unescapeUnicode(key);
					if ( key !== unescapedKey ) {
						convertUnicodeSequenceToES5Compatible_Map[unescapedKey] = newPattern;
					}
					if ( typeof newPattern === 'string' ) {
						convertUnicodeSequenceToES5Compatible_Map[newPattern] = true;
					}
				}
			}

			if ( codePointsRange_Map && typeof codePointsRange_Map === 'object' ) {
				if ( !codePointsToES5Range_Map ) {
					codePointsToES5Range_Map = codePointsRange_Map;
				}
				else {
					for( var key$0 in codePointsToES5Range_Map ) if ( codePointsToES5Range_Map.hasOwnProperty(key$0) ) {
						convertUnicodeSequenceToES5Compatible_Map[key$0] = codePointsToES5Range_Map[key$0];
					}
				}
			}
		};

		if ( "__polyfill__" in $RegExp ) {
			var initialData = $RegExp["__polyfill__"];
			delete $RegExp["__polyfill__"];

			if ( Array.isArray(initialData) ) {
				var data;
				while ( data = initialData.shift() ) {
					if ( Array.isArray(data) ) {
						extendedRegExp["__polyfill__"](data[0], data[1]);
					}
				}
			}
		}
	}

	if( has__getter__support ) {
		Object.keys($RegExp).forEach(function(key) {
			var desc = Object.getOwnPropertyDescriptor($RegExp, key);

			if( "value" in desc ) {
				delete desc["value"];
				delete desc["writable"];
			}
			if( key === "leftContext" ) {
				desc["get"] = function() {
					var $leftContext = this["__leftContext__"];
					return $leftContext === void 0 ? $RegExp["leftContext"] : $leftContext;
				};
			}
			else {
				desc["get"] = function() {
					return $RegExp[key];
				};
			}
			desc["set"] = function(value) {
				$RegExp[key] = value;
				return value;
			};

			Object.defineProperty(extendedRegExp, key, desc);
		});

	}
	else {
		var $RegExp_keys = Object.keys($RegExp ).filter(function(key){ return key !== "leftContext"});
		var len = $RegExp_keys.length;
		updateGlobalRegExpProperties = function() {
			for( var i = 0 ; i < len ; i++ ) {
				var key = $RegExp_keys[i];
				extendedRegExp[key] = $RegExp[key];
			}
			var $leftContext = extendedRegExp["__leftContext__"];
			extendedRegExp["leftContext"] = $leftContext === void 0 ? $RegExp["leftContext"] : $leftContext;
		};
		updateGlobalRegExpProperties();
	}
	if ( !regExp_flag_y_support )Object.defineProperty(extendedRegExp, "sticky", {"value": false, "enumerable": true});
	if ( !regExp_flag_u_support )Object.defineProperty(extendedRegExp, "unicode", {"value": false, "enumerable": true});

	{
		var $toString = extendedRegExp.prototype.toString;
		var newToString = function toString() {
			var result = $toString.apply(this, arguments);

			if( !regExp_flag_y_support || !regExp_flag_u_support ) {
				var originalPattern = this["__pattern__"];

				if( originalPattern !== void 0 ) {
					result = "/" + originalPattern + "/"
						+ (this.global ? "g" : "") + (this.ignoreCase ? "i" : "") + (this.multiline ? "m" : "") + (this["sticky"] ? "y" : "") + (this["unicode"] ? "u" : "")
					;
				}
				else {
					if( this["sticky"] ) {
						result += "y";
					}
					if( this["unicode"] ) {
						result += "u";
					}
				}
			}

			return result;
		};

		var newProps = {
			"sticky": {"value": false, "configurable": true, "writable": true}
			, "unicode": {"value": false, "configurable": true, "writable": true}
			, "toString": {"value": newToString, "configurable": true, "writable": true}
		};

		if( regExp_flag_y_support ) {
			delete newProps["sticky"];
		}

		if( regExp_flag_u_support ) {
			delete newProps["unicode"];
		}
		else {
			var zeroCodePoint = function(string) {
				var size = string.length;
				var first = string.charCodeAt(0);
				var second;
				if (first >= 0xD800 && first <= 0xDBFF && size > 1) {
					second = string.charCodeAt(1);
					if (second >= 0xDC00 && second <= 0xDFFF) {
						return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
					}
				}
				if ( size > 1 ) {
//					throw new Error('Invalid unicode range');
					return false;//not supported
				}
				return first;
			};
			var es6unicodeRangeConverter = getES6unicodeRangeConverter();
			getES6unicodeRangeConverter = void 0;

			var unicodeRange = function(str, code11, code12, char1, code21, code22, char2) {
				// TODO:: [\x01-\uD7FF\uDC00-\uFFFF], [a-b-c-e] support
				if ( code11 ) {
					code11 = parseInt(code11, 16);
					if ( code12 ) {
						char1 = String.fromCharCode(code11, parseInt(code12, 16));
					}
					else {
						char1 = String.fromCharCode(code11);
					}
				}
				var codePoint1 = zeroCodePoint(char1);
				if ( codePoint1 === false ) {
					convertUnicodeSequenceToES5Compatible_failed = true;
					return str;//not supported
				}

				if ( code21 ) {
					code21 = parseInt(code21, 16);
					if ( code22 ) {
						char2 = String.fromCharCode(code21, parseInt(code22, 16));
					}
					else {
						char2 = String.fromCharCode(code21);
					}
				}
				var codePoint2 = zeroCodePoint(char2);
				if ( codePoint2 === false ) {
					convertUnicodeSequenceToES5Compatible_failed = true;
					return str;//not supported
				}

				var key = codePoint1 + '|' + codePoint2;
				var result = codePointsToES5Range_Map[key];

				if ( result === void 0 ) {
					result = es6unicodeRangeConverter(codePoint1, codePoint2);

					if ( result.indexOf("|") !== -1 ) {
						result = "(?:" + result + ")";
					}

					codePointsToES5Range_Map[key] = result;
				}

				return result;
			};

			var findCodePoint_RE = new RegExp('\\[' +
				'(?:' +
					'(?:(?:\\\\u(\\w{4}))(?:\\\\u(\\w{4}))?)' +
//					'|((?:[\\0-\\u005A\\u005C\\u005F-\\uD7FF\\uDC00-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF])+?)' +
					'|((?:[\\0-\\uD7FF\\uDC00-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF])+?)' +
				')' +
				'\\-' +
				'(?:' +
					'(?:(?:\\\\u(\\w{4}))(?:\\\\u(\\w{4}))?)' +
//					'|((?:[\\0-\\u005A\\u005C\\u005F-\\uD7FF\\uDC00-\\uFFFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF]|[\\uD800-\\uDBFF])+?)' +
					'|((?:[\\0-\\uD7FF\\uDC00-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF])+?)' +
				')' +
			'\\]', 'g');

			convertUnicodeSequenceToES5Compatible = function(pattern) {
				// TODO:: /foo.bar/u -> /foo(?:\s|[\0-\uD7FF\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF])bar/u
				// TODO:: /foo\Sbar/u -> /foo(?:[\0-\uD7FF\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF])bar/u
				// TODO:: /foo[\s\S]bar/u -> /foo[\s]|(?:[\0-\uD7FF\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF])bar/u

				return $string_replace.call(pattern, findCodePoint_RE, unicodeRange);
			};
			if ( !convertUnicodeSequenceToES5Compatible_Map ) {
				convertUnicodeSequenceToES5Compatible_Map = {};
			}
			if ( !codePointsToES5Range_Map ) {
				codePointsToES5Range_Map = {};
			}
		}

		Object.defineProperties(extendedRegExp.prototype, newProps);
	}

	if( !regExp_flag_y_support ) {
		var $exec = extendedRegExp.prototype.exec;
		extendedRegExp.prototype.exec = function(string) {
			extendedRegExp["__leftContext__"] = void 0;

			var sticky = this["sticky"]
				, _global
				, lastIndex
				, leftContext
			;

			if( sticky ) {
				lastIndex = this.lastIndex;
				_global = this["global"];

				if( lastIndex != 0 ) {
					if( _global ) {
						this.lastIndex = 0;
					}

					leftContext = string.substring(0, lastIndex);
					arguments[0] = String(string).substr(lastIndex);
				}
			}

			var result = $exec.apply(this, arguments);

			if( sticky ) {
				this.lastIndex = result == null ? 0 : lastIndex + (_global ? this.lastIndex : result[0].length);
				extendedRegExp["__leftContext__"] = leftContext !== void 0 && result != null ? leftContext : void 0;
			}

			if ( updateGlobalRegExpProperties !== void 0 )updateGlobalRegExpProperties();

			return result;
		}
		var $test = extendedRegExp.prototype.test;
		extendedRegExp.prototype.test = function(string) {
			extendedRegExp["__leftContext__"] = void 0;

			var sticky = this["sticky"]
				, result
			;

			if( sticky ) {
				var lastIndex = this.lastIndex
					, _global = this["global"]
					, leftContext
				;

				if( lastIndex != 0 ) {
					if( _global ) {
						this.lastIndex = 0;
					}

					leftContext = string.substring(0, lastIndex);
					arguments[0] = String(string).substr(lastIndex);
				}

				result = $exec.apply(this, arguments);

				this.lastIndex = result ? lastIndex + (_global ? this.lastIndex : result[0].length) : 0;
				extendedRegExp["__leftContext__"] = leftContext !== void 0 && result != null ? leftContext : void 0;

				result = result != null;
			}
			else {
				result = $test.apply(this, arguments);
			}

			if ( updateGlobalRegExpProperties !== void 0 )updateGlobalRegExpProperties();

			return result;
		}

		{
			globalString_prototype.replace = function(pattern, replacer) {
				var result;
				var patternIsRegExpWithStickyAndGlobalFlag = pattern && typeof pattern === 'object' && pattern instanceof $RegExp && pattern["sticky"] && pattern.global;

				if( patternIsRegExpWithStickyAndGlobalFlag ) {
					// String.match and String.replace now reset RegExp.lastIndex
					// [https://bugzilla.mozilla.org/show_bug.cgi?id=501739](Bug 501739 � String match and replace methods do not update global regexp lastIndex per ES3&5)
					// The String.match and String.replace methods have been refactored to resolve a spec conformance issue on RegExp.lastIndex. When those methods are called with a global regular expression, the lastIndex, if specified, will be reset to 0.
					pattern.lastIndex = 0;

					var isFunction = typeof replacer === 'function';
					if ( !isFunction ) {
						replacer = String(replacer);
					}

					var str = this + "", execRes
						, parts = [], lastIndex = 0
					;
					while( execRes = pattern.exec(str) ) {
						var found = execRes[0]
							, args = execRes
							, end = pattern.lastIndex
						;

//						parts.push(str.substring(lastIndex, start));

						if ( isFunction ) {
							args.push(lastIndex, str);
							parts.push(replacer.apply(void 0, args));
						}
						else {
							// "12345678987654321".replace(/4/g, "($&)") + " - " + "12345678987654321".replace(/4/g, "($`)") + " - " + "12345678987654321".replace(/4/g, "($')") + " - " + "12345678987654321".replace(/(4)/g, "($1)")
							// "123(4)567898765(4)321 - 123(123)567898765(1234567898765)321 - 123(5678987654321)567898765(321)321 - 123(4)567898765(4)321"
//							"$1$$1($')($`)($&)($12)".replace(/\$(?:(')|(`)|(\&)|(\d(?:\d)?))/g, function(str, $1, $2, $3, $nn, offset, string){
//								console.log(string[offset - 1], str, $1, $2, $3, $nn)
//							})
							parts.push(replacer.replace(/\$(?:(&)|(`)|(')|(\d(?:\d)?))/g, function(pattern, $1, $2, $3, $nn, offset, string) {
								if ( string[offset - 1] !== '$' ) {
									if ( $1 ) {// $& - Inserts the matched substring.
										return found;
									}
									if ( $2 ) {// $` - Inserts the portion of the string that precedes the matched substring.
										return str.substring(0, lastIndex);
									}
									if ( $3 ) {// $' - Inserts the portion of the string that follows the matched substring.
										return str.substring(end);
									}
									if ( $nn ) {// $n or $nn - Where n or nn are decimal digits, inserts the nth parenthesized submatch string, provided the first argument was a RegExp object.
										$nn = +$nn;
										if ( $nn !== 0 && $nn < args.length ) {
											return args[$nn];
										}
									}
								}
								else {
									pattern = pattern.substring(1);
								}
								return pattern;
							}));
						}

						lastIndex = end;
					}

					parts.push(str.substring(lastIndex));

					result = parts.join("");
					parts = void 0;
				}
				else {
					result = $string_replace.apply(this, arguments);
				}

				if ( updateGlobalRegExpProperties !== void 0 )updateGlobalRegExpProperties();

				return result;
			};
			var $match = globalString_prototype.match;
			globalString_prototype.match = function(pattern) {
				var result;
				var patternIsRegExpWithStickyFlag = pattern && typeof pattern === 'object' && pattern instanceof $RegExp && pattern["sticky"];

				if( patternIsRegExpWithStickyFlag ) {
					if( pattern.global ) {
						result = [];
						var execRes;
						while( execRes = pattern.exec(this) ) {
							result.push(execRes[0]);
						}
					}
					else {
						result = pattern.exec(this);
					}
				}
				else {
					result = $match.apply(this, arguments);
				}

				if ( updateGlobalRegExpProperties !== void 0 )updateGlobalRegExpProperties();

				return result;
			};
		}
	}
}

//})();

}

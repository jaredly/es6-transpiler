"use strict";

const assert = require("assert");
const error = require("./../lib/error");
const core = require("./core");
const destructuring = require("./destructuring");



function isObjectPattern(node) {
	return node && node.type == 'ObjectPattern';
}

function isArrayPattern(node) {
	return node && node.type == 'ArrayPattern';
}

function isFunction(node) {
	let type;
	return node && (type = node.type)
		&& type === "FunctionDeclaration" || type === "FunctionExpression" || type === "ArrowFunctionExpression";
}

function isBlock(node) {
	let type;
	return node && (type = node.type)
		&& (type === "BlockStatement");
}

function isIf(node) {
	let type;
	return node && (type = node.type)
		&& (type === "IfStatement");
}

function isLoop(node) {
	let type;
	return node && ((type = node.type) === "ForStatement" || type === "ForInStatement" || type === "ForOfStatement" || type === "WhileStatement" || type === "DoWhileStatement");
}

function isEmptyBody(node) {
	let bodyNode = node && node.body;

	return bodyNode && !(!isBlock(bodyNode) || bodyNode.body.length);
}

const SymbolIteratorBody = "typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator'";
const SymbolPolyfillMarkBody = "typeof Symbol!=='undefined'&&Symbol&&Symbol[\"__setObjectSetter__\"]";
const getIteratorBody =
	"(v){" +
		"if(v){" +
			"if(Array.isArray(v))return 0;" +
			"var f;" +
			"if(${Symbol_mark})${Symbol_mark}(v);" +
			"if(typeof v==='object'&&typeof (f=v[${Symbol_iterator}])==='function'){if(${Symbol_mark})${Symbol_mark}(void 0);return f.call(v);}" +
			"if(${Symbol_mark})${Symbol_mark}(void 0);" +
			"if((v+'')==='[object Generator]')return v;" +
		"}" +
		"throw new Error(v+' is not iterable')"+
	"};"
;

var plugin = module.exports = {
	reset: function() {

	}

	, setup: function(alter, ast, options) {
		if( !this.__isInit ) {
			this.reset();
			this.__isInit = true;
		}

		this.alter = alter;
		this.options = options;
	}

	, ':: ForOfStatement': function replaceForOf(node) {
		const hasBlock = (node.body.type === "BlockStatement");

		const nodeStartsFrom = node.body.range[0];

		const insertHeadPosition = (hasBlock
			? nodeStartsFrom + 1// just after body {
			: nodeStartsFrom)	// just before existing expression
		;

		const replacementObj = this.createForOfReplacement(node, node.body, {cleanup: true});

		let previousBlockNode = node, parent = node.$parentNode;
		while ( (previousBlockNode = previousBlockNode.$previousElementSibling) && previousBlockNode != parent ) {
			if ( isFunction(previousBlockNode) || isLoop(previousBlockNode) || isIf(previousBlockNode) ) {
				break;
			}
		}
		if ( isFunction(previousBlockNode) || isLoop(previousBlockNode) ) {
			previousBlockNode = previousBlockNode.body;
		}
		else if ( isIf(previousBlockNode) ) {
			previousBlockNode = previousBlockNode.consequent;
		}
		else {
			previousBlockNode = void 0;
		}

		if ( previousBlockNode && !isBlock(previousBlockNode) && !previousBlockNode.$isBlock ) {
			previousBlockNode.$isBlock = true;
			this.alter.insertBefore(previousBlockNode.range[0], '{');
			this.alter.insert(previousBlockNode.range[1], '}');
		}

		if ( !hasBlock ) {
			node.body.$isBlock = true;
		}
		this.alter.insert(//before for of
			node.range[0]
			, replacementObj.before
			, {applyChanges: true, "__newTransitionalSubLogic":true}
		);

		let from = node.left.range[1] + 1
			, to = insertHeadPosition - (hasBlock ? 1 : 0)//just before {
		;
		let lineBreaks = !hasBlock && this.alter.getRange(from, to).match(/[\r\n]/g) || [];

		//instead for of declaration body: for(var a of b) -> for(var a <forOfString>)
		this.alter.remove(from, to);
		if ( to < insertHeadPosition) {
			this.alter.insertAfter(to, ";" + replacementObj.check + ";)" + lineBreaks.join(""));
		}
		else {
			this.alter.insertBefore(to, ";" + replacementObj.check + ";)" + lineBreaks.join(""));
		}


		this.alter.insertBefore(//after for of body begin, but before any other insert (loop closure function start, for example)
			insertHeadPosition
			, (hasBlock ? "" : "{") + replacementObj.inner
		);
		this.alter.insert(//after for of
			node.body.range[1]
			, (hasBlock ? "" : "}") + replacementObj.after
		);

		// TODO:: StringAlter has a bug with {applyChanges: true, "__newTransitionalSubLogic":true}: the remove below does affect the result of alter.get
		this.alter.setState("replaceForOf");//TODO:: remove setState
		if( replacementObj.remove ) {
			// remove 'var {des, truc, turing}' from for(var {des, truc, turing} of something){  }
			this.alter.remove(
				replacementObj.remove[0]
				, replacementObj.remove[1]
			);
		}
		this.alter.restoreState();//TODO:: remove restoreState
	}

	, createForOfReplacement: function(node, bodyNode, options) {
		options = options || {};

		let scopeOptions = core.getScopeOptions(node.$scope, node);
		const needIteratorSupport = scopeOptions['has-iterators'] !== false || scopeOptions['has-generators'] !== false;
		let needTemporaryVariableCleaning = options.cleanup;
		let implicitDeclaration = options.implicitDeclaration;

		let getIteratorFunctionName;
		if ( needIteratorSupport ) {
			let Symbol_iterator = core.bubbledVariableDeclaration(node.$scope, "S_ITER", SymbolIteratorBody);
			let Symbol_mark = core.bubbledVariableDeclaration(node.$scope, "S_MARK", SymbolPolyfillMarkBody);
			getIteratorFunctionName = core.bubbledVariableDeclaration(
				node.$scope
				, "GET_ITER"
				, getIteratorBody
					.replace("${Symbol_iterator}", Symbol_iterator)
					.replace(/\$\{Symbol_mark\}/g, Symbol_mark)
				, true
			);
		}
		else {
			getIteratorFunctionName = "";
		}

		const variableBlock = node.left;
		const isDeclaration = variableBlock.type === "VariableDeclaration";

		const declarations = isDeclaration ? variableBlock.declarations : null
			, declaration = isDeclaration ? declarations[0] : null
		;

		if( isDeclaration ) {
			assert(declarations.length === 1);
		}

		const variableId = isDeclaration ? declaration.id : variableBlock
			, variableIdIsDestructuring = isObjectPattern(variableId) || isArrayPattern(variableId)
			, variableInit = node.right
			, variableInitIsIdentifier = variableInit.type === "Identifier"

			, tempVars = [
				core.getScopeTempVar(bodyNode, node.$scope)// index or iterator
				, core.getScopeTempVar(bodyNode, node.$scope)	// length or current value
			]
		;

		assert(
			isDeclaration
			|| variableBlock.type === "Identifier"
			|| variableIdIsDestructuring
			, variableBlock.type + " is a wrong type for forOf left part");

		if ( needIteratorSupport ) {
			tempVars.push(
				core.getScopeTempVar(bodyNode, node.$scope)// isArray
			)
		}

		if( !variableInitIsIdentifier ) {
			tempVars.push(
				core.getScopeTempVar(bodyNode, node.$scope)// empty string or variable name
			);
		}

		let variableInitString;
		let beforeBeginString = "";//Init string


		if( variableInitIsIdentifier ) {
			variableInitString = variableInit.name;
		}
		else {
			beforeBeginString += (tempVars[tempVars.length - 1] + " = (" + this.alter.get(variableInit.range[0], variableInit.range[1]) + ");");
			variableInitString = tempVars[tempVars.length - 1];
		}

		let innerString
			, forOfString
			, initString
			, afterString = (needTemporaryVariableCleaning ? (tempVars.join(" = ") + " = void 0;") : "")//cleanup string
			, varsDeclaration = ''
		;

		if ( needIteratorSupport ) {
			beforeBeginString +=
				tempVars[0]
					+ " = " + getIteratorFunctionName + "(" + variableInitString + ");"
					+ tempVars[2] + " = " + tempVars[0] + " === 0;"
					+ tempVars[1] + " = (" + tempVars[2] + " ? " + variableInitString + ".length : void 0);"
			;

			forOfString =
				tempVars[2] + " ? (" + tempVars[0] + " < " + tempVars[1] + ") : !(" + tempVars[1] + " = " + tempVars[0] + "[\"next\"]())[\"done\"]";

			initString =
				"(" + tempVars[2] + " ? " + variableInitString + "[" + tempVars[0] + "++] : " + tempVars[1] + "[\"value\"])";
		}
		else {
			beforeBeginString +=
				tempVars[0] + " = 0;"
				+ tempVars[1] + " = " + variableInitString + ".length;"
			;

			forOfString =
				tempVars[0] + " < " + tempVars[1];

			initString =
				"(" + variableInitString + "[" + tempVars[0] + "++])";
		}

		if( variableIdIsDestructuring ) {
			variableInit["$raw"] = initString;
			let newDefinitions = [];
			innerString = (
				destructuring.unwrapDestructuring("var", variableId, variableInit, null, newDefinitions) + ";"
			).substr(4);//remove "var "

			assert(newDefinitions.length);

			let varInit = variableBlock.kind == 'let' ? '=void 0' : '';
			let varsDecls = newDefinitions.map(function(a){ return a.id.name + varInit });

			if ( implicitDeclaration ) {
				varsDeclaration += ('var ' + newDefinitions.map(function(a){ return a.id.name }).join(', ') + ';');

				if ( varInit ) {
					beforeBeginString = varsDecls.join(';') + ';' + beforeBeginString;
				}
			}
			else {
				beforeBeginString = 'var ' + varsDecls.join(', ') + ';' + beforeBeginString;
			}

			if ( varInit ) {
				afterString += (varsDecls.join(';') + ';');
			}

			delete variableInit["$raw"];
		}
		else {
			innerString = variableId.name + " = " + initString + ";";
		}

		while(tempVars.length) {
			core.setScopeTempVar(tempVars.shift(), bodyNode, node.$scope);
		}

		return {
			before: beforeBeginString
			, check: forOfString
			, inner: innerString// + ',' + (isEmptyBody(node) ? 'null' : '')
			, after: afterString ? ';' + afterString : ''
			, remove: variableIdIsDestructuring ? variableBlock.range : void 0
			, declarations: varsDeclaration
		}
	}
};

for(let i in plugin) if( plugin.hasOwnProperty(i) && typeof plugin[i] === "function" ) {
	plugin[i] = plugin[i].bind(plugin);
}

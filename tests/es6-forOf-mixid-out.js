function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(typeof v==='object'&&typeof v['@@iterator']==='function'){i=v['@@iterator'](),r=[];while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;if(typeof v==='object'&&typeof v['@@iterator']==='function')return v['@@iterator']();}throw new Error(v+' is not iterable')};var $D$0;var $D$1;var $D$2;var $D$3;
{
	var test;
}

{// destructuring & function expression
	var output = [];
	var test$0;$D$3 = (( function(x) {return [{test: x + 1}, {test: x + 2}, {test: x + 3}]})(2));$D$0 = GET_ITER$0($D$3);$D$1 = $D$0 === 0;$D$2 = ($D$1 ? $D$3.length : void 0);for( ; $D$1 ? ($D$0 < $D$2) : !($D$2 = $D$0["next"]())["done"]; ){;test$0 = ($D$1 ? $D$3[$D$0++] : $D$2["value"]).test;
		output.push(test$0)
	};$D$0 = $D$1 = $D$2 = $D$3 = void 0;
	console.log(output.join("|") === [3, 4, 5].join("|"))
}

{
	var a, b, c;
}

{// function expression & shorthand property & destructuring & spread
	function retArr(a, b, c){return [
		{test: a + 1, a: a}    //{test: 3, a: 2}
		, {test: b + 2, b: b}    //{test: 3, b: 1}
		, {test: c + 3, c: c}    //{test: 3, c: 0}
	]}
	var output$0 = [];
	var arr = [].concat([2], [1, 0])
	var test$1, a$0, b$0, c$0;$D$3 = (retArr.apply(null, ITER$0(arr)));$D$0 = GET_ITER$0($D$3);$D$1 = $D$0 === 0;$D$2 = ($D$1 ? $D$3.length : void 0);for( ; $D$1 ? ($D$0 < $D$2) : !($D$2 = $D$0["next"]())["done"]; ){;test$1 = (c$0 = ($D$1 ? $D$3[$D$0++] : $D$2["value"])).test, a$0 = ((a$0 = c$0.a) === void 0 ? 1 : a$0), b$0 = ((b$0 = c$0.b) === void 0 ? 2 : b$0), c$0 = ((c$0 = c$0.c) === void 0 ? 3 : c$0);
		output$0.push(test$1 + (a$0 + b$0 + c$0))
	};$D$0 = $D$1 = $D$2 = $D$3 = void 0;
	console.log(output$0.join("|") === [10, 8, 6].join("|"))

	{
		var output$1 = [];
		var arr$0 = [].concat([2], [1, 0]);
		var test$2, a$1, b$1, c$1;$D$3 = ((function(a, b, c) {return [
			{test: a + 1, a: a}    //{test: 3, a: 2}
			, {test: b + 2, b: b}    //{test: 3, b: 1}
			, {test: c + 3, c: c}    //{test: 3, c: 0}
		]}).apply(null, ITER$0(arr$0)));$D$0 = GET_ITER$0($D$3);$D$1 = $D$0 === 0;$D$2 = ($D$1 ? $D$3.length : void 0);for( ; $D$1 ? ($D$0 < $D$2) : !($D$2 = $D$0["next"]())["done"]; ){;test$2 = (c$1 = ($D$1 ? $D$3[$D$0++] : $D$2["value"])).test, a$1 = ((a$1 = c$1.a) === void 0 ? 1 : a$1), b$1 = ((b$1 = c$1.b) === void 0 ? 2 : b$1), c$1 = ((c$1 = c$1.c) === void 0 ? 3 : c$1);
			output$1.push(test$2 + (a$1 + b$1 + c$1))
		};$D$0 = $D$1 = $D$2 = $D$3 = void 0;
		console.log(output$1.join("|") === [10, 8, 6].join("|"))
	}
}

{
	var a$2, b$2, c$2;
}
//TODO::
//{// destructuring & arrow function
//    let output = [];let arr = [8, 9];
//    for(let [value, index] of ( arr.push(10), arr.map((value, index)=>[value, index]) ) ) {
//        output.push(value)
//    }
//    console.log(output.join("|") === [8, 9, 10].join("|"))
//}
//
//{// destructuring & arrow function & rest
//    let output = [];let arr = [8, 9];
//    for(let [value, index] of ( arr.push(10), arr.map((...r)=>r) ) ) {
//        output.push(value)
//    }
//    console.log(output.join("|") === [8, 9, 10].join("|"))
//}

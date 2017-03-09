// assert 模块提供了一组简单的断言测试集合，用于测试不变量。 该模块是供 Node.js 内部使用的，但可以通过 require('assert') 在代码中使用。 assert 不是一个测试框架，也无意成为通用的断言库。
// assert 模块的 API 是锁定的。 这意味着将不会新增或更改任何由该模块实现与公开的方法

const assert = require('assert');

assert(true);
//pass
assert(1);
//pass
// assert(false);
// throw ERROR  AssertionError: false == true
// assert(0);

// assert(false, 'its false');
// AssertionError: its false

const obj1 = {
	a: {
		b: 1
	}
};

const obj2 = {
	a: {
		b:2
	}
}

// assert.deepEqual(obj1,obj2  //error
// 
// 
// http://nodejs.cn/api/assert.html
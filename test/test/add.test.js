var add = require('./add.js');
var expect = require('chai').expect;

describe('加法函数的测试用例...', function(){
  it('add.js文件的测试用例开始...', function(){
   expect(add(1,1)).to.be.equal(2);
   expect(add(4,5)).to.be.equal(9);
   expect(add(5,5)).to.be.not.equal(11);
  })
})

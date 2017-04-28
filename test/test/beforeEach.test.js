var expect = require('chai').expect;

describe('beforeEach测试',function(){
  var foo = false;
  beforeEach(function(){
   foo = true;
  });
  it('修改全局变量foo为真',function(){
    expect(foo).to.be.equal(true);
  })
})

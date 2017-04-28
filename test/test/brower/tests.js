var expect=chai.expect;
describe('加法函数的测试',function(){
  it('1+1就是应该等于2',function(){
    expect(add(1,1)).to.be.equal(2)
  });
  it('任何数字加上0等于自身',function(){
    expect(add(3,0)).to.be.equal(3);
  })
})

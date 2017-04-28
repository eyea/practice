var expect = require('chai').expect;
var fetch = require('node-fetch');

describe('Mocha内置对Promise支持', function(){
  it('异步应该返回一个对象', function(){
    return fetch('https://api.github.com')
          .then(function(res){
	     return res.json();
	   }).then(function(json){
	     expect(json).to.be.an('object')
	   })
  })

})

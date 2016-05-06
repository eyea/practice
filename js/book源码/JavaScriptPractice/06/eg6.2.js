function book(){
	this.name = "JavaScript实例大全"
}
var mybook = new book();
alert(mybook.name);//JavaScript实例大全

function book(){
	if (!(this instanceof book)) { return new book() };
	this.name = "JavaScript实例大全"
}

/////////////////////////////
function z3fBook(){}
z3fBook.prototype.author ={
	name:'张三封'
	,QQ:'10590916'
	,web:'z3f.me'
} 
function book(){
	if (!(this instanceof book)) { return new book() };
	var bookname = "JavaScript实例大全"
	this.name = function(){
		return bookname;
	}

}
book.prototype = new z3fBook();
book.material = "纸质";
book.getSize = function(type){
	switch(type){
		case 16:
			return "16K"
		case 32:
			return "32K"
		default:
			return "16K"
	}
};
book.prototype.pages = 460;
book.prototype.randomInfo = function(){
	var l = ["JavaScript基础应用"
		,"JavaScript与HTML5表单应用"
		,"JavaScript与HTML5高级应用"
		,"JavaScript与jQuery综合应用"
		,"JavaScript与Node.js综合应用"];
	return l[(Math.random()*l.length)>>0]
};
var yourBook = book();
alert(yourBook.author.name);//张三封
alert(yourBook.author.QQ);//10590916
alert(yourBook.pages);//460
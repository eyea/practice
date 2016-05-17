var items = [{title: "文章1" },{title: "文章2" }];
exports.index = function(req, res){
    res.render('index', {title: '文章列表',items:items })
};
exports.form = function(req,res){
    res.render('form', { title: '发表新文章' })
};
exports.create = function(req, res){
    console.log(req.body.text);
    res.redirect('/');
};
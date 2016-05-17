var path=require('path');
//指定相对目录路径
console.log("path.dirname('./foo/bar/baz/asdf/quux')=");
console.log(path.dirname('./foo/bar/baz/asdf/quux'));
//指定相对文件路径
console.log("path.dirname('./foo/bar/baz/asdf/quux.txt')=");
console.log(path.dirname('./foo/bar/baz/asdf/quux.txt'));
//指定绝对目录路径
console.log("path.dirname('/foo/bar/baz/asdf/quux')=");
console.log(path.dirname('/foo/bar/baz/asdf/quux'));
//指定绝对目录路径
console.log("path.dirname('c:\\foo\\bar\\baz\\asdf\\quux')=");
console.log(path.dirname('c:\\foo\\bar\\baz\\asdf\\quux'));
//指定绝对文件路径
console.log("path.dirname('/foo/bar/baz/asdf/quux.txt')=");
console.log(path.dirname('/foo/bar/baz/asdf/quux.txt'));
//指定绝对文件路径
console.log("path.dirname('c:\\foo\\bar\\baz\\asdf\\quux.txt')=");
console.log(path.dirname('c:\\foo\\bar\\baz\\asdf\\quux.txt'));













// 在 ECMAScript 2015 (ES6) 引入 TypedArray 之前，JavaScript 语言没有读取或操作二进制数据流的机制。 Buffer 类被引入作为 Node.js API 的一部分，使其可以在 TCP 流和文件系统操作等场景中处理二进制数据流。

// 现在 TypedArray 已经被添加进 ES6 中，Buffer 类以一种更优与更适合 Node.js 用例的方式实现了 Uint8Array API。

// Buffer 类的实例类似于整数数组，除了其是大小固定的、且在 V8 堆外分配物理内存。 Buffer 的大小在其创建时就已确定，且不能调整大小。

// Buffer 类在 Node.js 中是一个全局变量，因此无需 require('buffer').Buffer。

// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 ASCII 字节数组 [0x74, 0x65, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('test');

// 创建一个包含 UTF-8 字节数组 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'utf8');

console.log(buf1);
console.log(buf2);
console.log(buf3);
console.log(buf4);
console.log(buf5);
console.log(buf6);

// 在 Node.js v6 之前的版本中，Buffer 实例是通过 Buffer 构造函数创建的，它根据提供的参数返回不同的 Buffer：

// 传一个数值作为第一个参数给 Buffer()（如 new Buffer(10)），则分配一个指定大小的新建的 Buffer 对象。 分配给这种 Buffer 实例的内存是没有初始化的，且可能包含敏感数据。 这种 Buffer 实例必须手动地被初始化，可以使用 buf.fill(0) 或写满这个 Buffer。 虽然这种行为是为了提高性能而有意为之的，但开发经验表明，创建一个快速但未初始化的 Buffer 与创建一个慢点但更安全的 Buffer 之间需要有更明确的区分。
// 传一个字符串、数组、或 Buffer 作为第一个参数，则将所传对象的数据拷贝到 Buffer 中。
// 传入一个 ArrayBuffer，则返回一个与给定的 ArrayBuffer 共享所分配内存的 Buffer。
// 因为 new Buffer() 的行为会根据所传入的第一个参数的值的数据类型而明显地改变，所以如果应用程序没有正确地校验传给 new Buffer() 的参数、或未能正确地初始化新分配的 Buffer 的内容，就有可能在无意中为他们的代码引入安全性与可靠性问题。

// 为了使 Buffer 实例的创建更可靠、更不容易出错，各种 new Buffer() 构造函数已被 废弃，并由 Buffer.from()、Buffer.alloc()、和 Buffer.allocUnsafe() 方法替代。

// 开发者们应当把所有正在使用的 new Buffer() 构造函数迁移到这些新的 API 上。

const buf7 = Buffer.from([1,2,3]);
for(var b of buf7){
	console.log(b);
}

// Node.js 插件是用 C 或 C++ 编写的动态链接共享对象，可以使用 require() 函数加载到 Node.js 中，且像普通的 Node.js 模块一样被使用。 它们主要用于为运行于 Node.js 的 JavaScript 和 C/C++ 库之间提供接口。

// 目前用于实现插件的方法相当复杂，涉及多个组件和 API 的知识：

// V8：Node.js 当前用于提供 JavaScript 实现的 C++ 库。 V8 提供了用于创建对象、调用函数等机制。 V8 的 API 文档主要在 v8.h 头文件中（Node.js 源代码中的 deps/v8/include/v8.h），也可以在查看 V8 在线文档。

// libuv：实现了 Node.js 的事件循环、工作线程、与平台所有的的异步操作的 C 库。 它也是一个跨平台的抽象库，使所有主流操作系统中可以像 POSIX 一样访问常用的系统任务，比如与文件系统、socket、定时器和系统事件的交互。 libuv 还提供了一个类似 POSIX 多线程的线程抽象，可被用于强化更复杂的需要超越标准事件循环的异步插件。 鼓励插件开发者多思考如何通过在 libuv 的非阻塞系统操作、工作线程、或自定义的 libuv 线程中降低工作负载来避免在 I/O 或其他时间密集型任务中阻塞事件循环。

// 内置的 Node.js 库。Node.js 自身开放了一些插件可以使用的 C/C++ API。 其中最重要的是 node::ObjectWrap 类。

// Node.js 包含一些其他的静态链接库，如 OpenSSL。 这些库位于 Node.js 源代码中的 deps/ 目录。 只有 V8 和 OpenSSL 符号是被 Node.js 有目的地再导出，并且通过插件被用于不同的场景。 更多信息请查看链接到 Node.js 自身的依赖。












// http://nodejs.cn/api/buffer.html
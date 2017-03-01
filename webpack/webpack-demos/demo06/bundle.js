/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Plugin 19 specified in \"/Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-preset-es2015/index.js\" provided an invalid property of \"__esModule\"\n    at Plugin.init (/Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-core/lib/transformation/plugin.js:124:13)\n    at Function.normalisePlugin (/Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-core/lib/transformation/file/options/option-manager.js:155:12)\n    at /Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-core/lib/transformation/file/options/option-manager.js:184:30\n    at Array.map (native)\n    at Function.normalisePlugins (/Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-core/lib/transformation/file/options/option-manager.js:161:20)\n    at OptionManager.mergeOptions (/Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-core/lib/transformation/file/options/option-manager.js:254:36)\n    at OptionManager.mergePresets (/Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-core/lib/transformation/file/options/option-manager.js:308:16)\n    at OptionManager.mergeOptions (/Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-core/lib/transformation/file/options/option-manager.js:270:12)\n    at OptionManager.init (/Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-core/lib/transformation/file/options/option-manager.js:396:10)\n    at File.initOptions (/Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-core/lib/transformation/file/index.js:191:75)\n    at new File (/Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-core/lib/transformation/file/index.js:122:22)\n    at Pipeline.transform (/Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-core/lib/transformation/pipeline.js:42:16)\n    at transpile (/Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-loader/index.js:12:22)\n    at Object.module.exports (/Users/eyea/work/github/practice/webpack/webpack-demos/node_modules/babel-loader/index.js:69:12)");

/***/ })
/******/ ]);
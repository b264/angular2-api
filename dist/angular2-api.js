(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular2/core"), require("angular2/http"), require("rxjs/add/operator/map"));
	else if(typeof define === 'function' && define.amd)
		define(["angular2/core", "angular2/http", "rxjs/add/operator/map"], factory);
	else if(typeof exports === 'object')
		exports["angular2-api"] = factory(require("angular2/core"), require("angular2/http"), require("rxjs/add/operator/map"));
	else
		root["angular2-api"] = factory(root["angular2/core"], root["angular2/http"], root["rxjs/add/operator/map"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var ApiService_1 = __webpack_require__(1);
	exports.ApiService = ApiService_1.ApiService;
	var ApiConfig_1 = __webpack_require__(4);
	exports.ApiConfig = ApiConfig_1.ApiConfig;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = undefined && undefined.__param || function (paramIndex, decorator) {
	    return function (target, key) {
	        decorator(target, key, paramIndex);
	    };
	};
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(3);
	var ApiConfig_1 = __webpack_require__(4);
	__webpack_require__(5);
	var removeSlashes = function removeSlashes(url) {
	    if (url.startsWith('/')) url = url.slice(1, url.length);
	    if (url.endsWith('/')) url = url.slice(0, url.length - 1);
	    return url;
	};
	var toJSON = function toJSON(data) {
	    try {
	        return JSON.stringify(data);
	    } catch (e) {
	        return data;
	    }
	};
	var serializeParams = function serializeParams() {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    if (!params.headers) params.headers = new http_1.Headers({ 'Content-Type': 'applications/json' });
	    return params;
	};
	var deserializeResponse = function deserializeResponse(resp) {
	    var contentType = resp && resp.headers && (resp.headers.get('content-type') || resp.headers.get('Content-Type'));
	    if (!contentType) return resp;
	    if (/json/.test(contentType)) return resp.json();else if (/text/.test(contentType)) return resp.text();else if (/blob/.test(contentType)) return resp.blob();else return resp;
	};
	var resourceDeserialize = function resourceDeserialize(resource) {
	    return function (data) {
	        return typeof resource.deserialize === 'function' ? resource.deserialize(data) : data;
	    };
	};
	var ApiService = function () {
	    function ApiService(_http) {
	        var _config = arguments.length <= 1 || arguments[1] === undefined ? new ApiConfig_1.ApiConfig({ basePath: '/api' }) : arguments[1];

	        _classCallCheck(this, ApiService);

	        this._http = _http;
	        this._config = _config;
	    }

	    _createClass(ApiService, [{
	        key: "createUrl",
	        value: function createUrl(resource, url) {
	            var qUrl = String(Array.isArray(url) ? url.join('/') : url);
	            return removeSlashes(this._config.basePath) + "/" + removeSlashes(resource.endpoint) + "/" + removeSlashes(qUrl);
	        }
	    }, {
	        key: "get",
	        value: function get(resource, url, params) {
	            var _this = this;

	            return this._http.get(this.createUrl(resource, url), this._serializeParams(params)).map(function (data) {
	                return _this._deserialize(data);
	            }).map(resourceDeserialize(resource));
	        }
	    }, {
	        key: "put",
	        value: function put(resource, url, data, params) {
	            var _this2 = this;

	            return this._http.put(this.createUrl(resource, url), this._serialize(resource, data), params).map(function (data) {
	                return _this2._deserialize(data);
	            }).map(resourceDeserialize(resource));
	        }
	    }, {
	        key: "patch",
	        value: function patch(resource, url, data, params) {
	            var _this3 = this;

	            return this._http.patch(this.createUrl(resource, url), this._serialize(resource, data), params).map(function (data) {
	                return _this3._deserialize(data);
	            }).map(resourceDeserialize(resource));
	        }
	    }, {
	        key: "post",
	        value: function post(resource, url, data, params) {
	            var _this4 = this;

	            return this._http.post(this.createUrl(resource, url), this._serialize(resource, data), params).map(function (data) {
	                return _this4._deserialize(data);
	            }).map(resourceDeserialize(resource));
	        }
	    }, {
	        key: "delete",
	        value: function _delete(resource, url, params) {
	            var _this5 = this;

	            return this._http.get(this.createUrl(resource, url), this._serializeParams(params)).map(function (data) {
	                return _this5._deserialize(data);
	            }).map(resourceDeserialize(resource));
	        }
	    }, {
	        key: "find",
	        value: function find(resource, id, params) {
	            if (!id) throw new Error('You must provide an id');
	            return this.get(resource, id, params);
	        }
	    }, {
	        key: "findAll",
	        value: function findAll(resource, params) {
	            return this.get(resource, '', params);
	        }
	    }, {
	        key: "create",
	        value: function create(resource, data, params) {
	            return this.post(resource, '', data, params);
	        }
	    }, {
	        key: "update",
	        value: function update(resource, data, params) {
	            var id = data[resource.idAttribute],
	                url = id ? id : '';
	            return this.put(resource, url, data, params);
	        }
	    }, {
	        key: "destroy",
	        value: function destroy(resource, id, params) {
	            if ((typeof id === "undefined" ? "undefined" : _typeof(id)) === 'object') {
	                params = id;
	                id = null;
	            }
	            return this.delete(resource, id ? id : '', params);
	        }
	    }, {
	        key: "_serialize",
	        value: function _serialize(resource, data) {
	            var nData = resource.serialize ? resource.serialize(nData) : nData;
	            return toJSON(this._config.serialize(nData));
	        }
	    }, {
	        key: "_deserialize",
	        value: function _deserialize(data) {
	            return this._config.deserialize(deserializeResponse(data));
	        }
	    }, {
	        key: "_serializeParams",
	        value: function _serializeParams(params) {
	            return this._config.serializeParams(serializeParams(params));
	        }
	    }]);

	    return ApiService;
	}();
	ApiService = __decorate([core_1.Injectable(), __param(1, core_1.Optional()), __metadata('design:paramtypes', [http_1.Http, ApiConfig_1.ApiConfig])], ApiService);
	exports.ApiService = ApiService;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = undefined && undefined.__param || function (paramIndex, decorator) {
	    return function (target, key) {
	        decorator(target, key, paramIndex);
	    };
	};
	var core_1 = __webpack_require__(2);
	var AbstractApiConfig = function AbstractApiConfig() {
	    _classCallCheck(this, AbstractApiConfig);
	};
	AbstractApiConfig = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], AbstractApiConfig);
	exports.AbstractApiConfig = AbstractApiConfig;
	var ApiConfig = function () {
	    function ApiConfig(_ref) {
	        var basePath = _ref.basePath;
	        var deserialize = _ref.deserialize;
	        var serialize = _ref.serialize;
	        var serializeParams = _ref.serializeParams;

	        _classCallCheck(this, ApiConfig);

	        this.basePath = basePath;
	        this.deserialize = deserialize;
	        this.serialize = serialize;
	        this.serializeParams = serializeParams;
	    }

	    _createClass(ApiConfig, [{
	        key: "deserialize",
	        value: function deserialize(data) {
	            return data;
	        }
	    }, {
	        key: "serialize",
	        value: function serialize(data) {
	            return data;
	        }
	    }, {
	        key: "serializeParams",
	        value: function serializeParams(params) {
	            return params;
	        }
	    }]);

	    return ApiConfig;
	}();
	ApiConfig = __decorate([core_1.Injectable(), __param(0, core_1.Optional()), __metadata('design:paramtypes', [Object])], ApiConfig);
	exports.ApiConfig = ApiConfig;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});
;
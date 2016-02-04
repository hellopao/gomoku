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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _chessboard = __webpack_require__(1);

	var _chessboard2 = _interopRequireDefault(_chessboard);

	var _chessman = __webpack_require__(3);

	var _chessman2 = _interopRequireDefault(_chessman);

	var _chessplayer = __webpack_require__(4);

	var _chessplayer2 = _interopRequireDefault(_chessplayer);

	var _constants = __webpack_require__(2);

	var ChessConfig = _interopRequireWildcard(_constants);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChessBoxWidth = ChessConfig.ChessBoxWidth;
	var ChessBoxCount = ChessConfig.ChessBoxCount;
	var ChessStatus = ChessConfig.ChessStatus;
	var ChessManTypes = ChessConfig.ChessManTypes;

	/**
	 * 五子棋类
	 */

	var Gomoku = function () {
	    function Gomoku(el) {
	        var opts = arguments.length <= 1 || arguments[1] === undefined ? { aiMode: true } : arguments[1];

	        _classCallCheck(this, Gomoku);

	        this.el = el;
	        this._initChessInfo(opts);
	        this._render();
	    }

	    _createClass(Gomoku, [{
	        key: "_initChessInfo",
	        value: function _initChessInfo(opts) {
	            this.chessTurn = ChessManTypes.WHITE.value;
	            this.chessPlayers = [];
	            this.chessStatus = ChessStatus.LOCKED;
	            this.chessmanMap = new Map(); //棋盘上已落棋子集合
	        }
	    }, {
	        key: "_render",
	        value: function _render() {
	            this.canvas = document.createElement('canvas');
	            this.canvas.width = this.canvas.height = (ChessBoxCount + 2) * ChessBoxWidth;
	            this.canvas.style.cursor = "pointer";

	            this.el.appendChild(this.canvas);

	            this.ctx = this.canvas.getContext('2d');

	            this._createChessBoard();
	            this._bindEvents();
	        }
	    }, {
	        key: "_createChessBoard",
	        value: function _createChessBoard() {
	            this.chessBoard = new _chessboard2.default(this.ctx);
	            this.chessBoard.draw();
	        }
	    }, {
	        key: "_resetChessBoard",
	        value: function _resetChessBoard() {
	            this.chessBoard.clear();
	        }
	    }, {
	        key: "_bindEvents",
	        value: function _bindEvents() {
	            var _this = this;

	            this.canvas.addEventListener('click', function (e) {
	                if (_this.chessStatus === ChessStatus.LOCKED) return;
	                if (_this.chessStatus === ChessStatus.FINISH) return;

	                var eventCoord = _this._getEventCoord(e.clientX, e.clientY);

	                //点击区在棋盘之外
	                if (eventCoord.x < 0 || eventCoord.x > ChessBoxWidth * ChessBoxCount || eventCoord.y < 0 || eventCoord.y > ChessBoxWidth * ChessBoxCount) return;

	                var _getChessmanCoord2 = _this._getChessmanCoord(eventCoord.x, eventCoord.y);

	                var x = _getChessmanCoord2.x;
	                var y = _getChessmanCoord2.y;

	                //该落子区已有棋子

	                if (_this.chessmanMap.has(x + "," + y)) return;

	                _this._putChessMan(x, y);
	            }, false);
	        }

	        /**
	         * 落子
	         */

	    }, {
	        key: "_putChessMan",
	        value: function _putChessMan(x, y) {
	            var chessmanType = this.chessTurn ? ChessManTypes.WHITE : ChessManTypes.BLACK;

	            var chessman = new _chessman2.default(this.ctx, chessmanType);

	            chessman.put(x, y);

	            //添加落子区到棋子集合
	            this.chessmanMap.set(x + "," + y, chessman.type);

	            var isVictory = this._checkVitory(x, y, chessman.type);

	            if (!isVictory) {
	                this._switchTurn();
	            } else {
	                this.chessStatus = ChessStatus.FINISH;
	                alert(chessmanType.name + " win!!! game over!!");
	            }
	        }

	        /**
	         * 根据鼠标所点坐标计算其在棋盘上的坐标
	         */

	    }, {
	        key: "_getEventCoord",
	        value: function _getEventCoord(x, y) {
	            //(0,0)实际对应canvas上(ChessBoxWidth,ChessBoxWidth)
	            return {
	                x: x - this.canvas.offsetTop - ChessBoxWidth,
	                y: y - this.canvas.offsetLeft - ChessBoxWidth
	            };
	        }

	        /**
	         * 根据棋盘上坐标计算离该点最近的落子点
	         */

	    }, {
	        key: "_getChessmanCoord",
	        value: function _getChessmanCoord(x, y) {
	            //点击在棋盘格子内，棋子要落在最近的可落子点
	            return {
	                x: Math.round(x / ChessBoxWidth) * ChessBoxWidth + ChessBoxWidth,
	                y: Math.round(y / ChessBoxWidth) * ChessBoxWidth + ChessBoxWidth
	            };
	        }

	        /**
	         * 检查落子后是否已分胜负
	         */

	    }, {
	        key: "_checkVitory",
	        value: function _checkVitory(x, y, chess) {
	            //从当前落子点向横/竖/撇/捺四条线上延伸
	            //每条线上最多九个点，最少五个
	            //有相邻五个为同一种棋子则已分胜负
	            var directionMap = {
	                "horizontal": {
	                    x: { "positive": ChessBoxWidth, "negtive": -1 * ChessBoxWidth },
	                    y: { "positive": 0, "negtive": 0 }
	                },
	                "vertical": {
	                    x: { "positive": 0, "negtive": 0 },
	                    y: { "positive": ChessBoxWidth, "negtive": -1 * ChessBoxWidth }
	                },
	                "leftDiagonal": {
	                    x: { "positive": -1 * ChessBoxWidth, "negtive": ChessBoxWidth },
	                    y: { "positive": ChessBoxWidth, "negtive": -1 * ChessBoxWidth }
	                },
	                "rightDiagonal": {
	                    x: { "positive": ChessBoxWidth, "negtive": -1 * ChessBoxWidth },
	                    y: { "positive": ChessBoxWidth, "negtive": -1 * ChessBoxWidth }
	                }
	            };

	            var directions = Object.keys(directionMap);

	            for (var i = 0; i < directions.length; i++) {
	                var direction = directions[i];
	                var step = directionMap[direction];

	                var chessmanCount = 1;

	                for (var j = 0; j < 4; j++) {
	                    var coord = {
	                        x: x + step.x.positive * (j + 1),
	                        y: y + step.y.positive * (j + 1)
	                    };

	                    //超出边界
	                    if (coord.x > ChessBoxWidth * ChessBoxCount || coord.y > ChessBoxWidth * ChessBoxCount) break;

	                    if (this.chessmanMap.has(coord.x + "," + coord.y)) {
	                        var chessType = this.chessmanMap.get(coord.x + "," + coord.y);

	                        if (chessType !== chess) break;
	                        chessmanCount++;
	                    }
	                }

	                if (chessmanCount === 5) {
	                    return true;
	                }

	                for (var k = 0; k < 4; k++) {
	                    var coord = {
	                        x: x + step.x.negtive * (k + 1),
	                        y: y + step.y.negtive * (k + 1)
	                    };

	                    //超出边界
	                    if (coord.x < 0 || coord.y < 0) break;

	                    if (this.chessmanMap.has(coord.x + "," + coord.y)) {
	                        var chessType = this.chessmanMap.get(coord.x + "," + coord.y);

	                        if (chessType !== chess) break;
	                        chessmanCount++;
	                    }
	                }

	                if (chessmanCount === 5) {
	                    return true;
	                }
	            }

	            return false;
	        }
	    }, {
	        key: "_switchTurn",
	        value: function _switchTurn() {
	            this.chessTurn = this.chessTurn ^ 1;
	        }
	    }, {
	        key: "addPlayer",
	        value: function addPlayer(player) {
	            this.chessPlayers.push(player);

	            if (this.chessPlayers.length === 2) {
	                return;
	            }
	        }
	    }, {
	        key: "start",
	        value: function start() {
	            this.chessStatus = ChessStatus.PLAYING;
	        }
	    }, {
	        key: "restart",
	        value: function restart() {
	            this.chessStatus = ChessStatus.PLAYING;
	            this._resetChessBoard();
	        }
	    }]);

	    return Gomoku;
	}();

	exports.default = Gomoku;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _constants = __webpack_require__(2);

	var ChessConfig = _interopRequireWildcard(_constants);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChessBoxWidth = ChessConfig.ChessBoxWidth;
	var ChessBoxCount = ChessConfig.ChessBoxCount;

	/**
	 * 棋盘上格子类
	 */

	var ChessBox = function () {
	    function ChessBox(ctx) {
	        _classCallCheck(this, ChessBox);

	        this.ctx = ctx;
	    }

	    /**
	     * 画棋盘格子
	     */

	    _createClass(ChessBox, [{
	        key: "draw",
	        value: function draw(x, y) {
	            this.ctx.strokeRect(x, y, ChessBoxWidth, ChessBoxWidth);
	        }
	    }]);

	    return ChessBox;
	}();

	/**
	 * 棋盘类
	 */

	var ChessBoard = function () {
	    function ChessBoard(ctx) {
	        _classCallCheck(this, ChessBoard);

	        this.ctx = ctx;
	    }

	    /**
	     * 画棋盘
	     */

	    _createClass(ChessBoard, [{
	        key: "draw",
	        value: function draw() {
	            for (var i = 0; i < ChessBoxCount; i++) {
	                for (var j = 0; j < ChessBoxCount; j++) {
	                    var chessBox = new ChessBox(this.ctx);
	                    chessBox.draw((i + 1) * ChessBoxWidth, (j + 1) * ChessBoxWidth);
	                }
	            }
	        }

	        /**
	         * 重置棋盘
	         */

	    }, {
	        key: "clear",
	        value: function clear() {
	            this.ctx.clearRect(ChessBoxWidth, ChessBoxWidth, ChessBoxCount * ChessBoxWidth, ChessBoxCount * ChessBoxWidth);
	            this.draw();
	        }
	    }]);

	    return ChessBoard;
	}();

	exports.default = ChessBoard;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ChessBoxCount = exports.ChessBoxCount = 14; //棋盘每一行格子数量
	var ChessBoxWidth = exports.ChessBoxWidth = 40; //棋盘每个格子宽度
	var ChessManRadius = exports.ChessManRadius = ChessBoxWidth / 2; //棋子的半径 （格子宽度的一半）

	var ChessStatus = exports.ChessStatus = {
	    "LOCKED": 0,
	    "PLAYING": 1,
	    "FINISHED": 2
	};

	var ChessManTypes = exports.ChessManTypes = {
	    "WHITE": {
	        name: "白棋",
	        value: 0,
	        color: "rgb(255,255,255)"
	    },
	    "BLACK": {
	        name: "黑棋",
	        value: 1,
	        color: "rgb(0,0,0)"
	    }
	};

	var ChessMode = exports.ChessMode = {
	    "AI": 0,
	    "BATTLE": 1
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _constants = __webpack_require__(2);

	var ChessConfig = _interopRequireWildcard(_constants);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * 棋子类
	 */

	var ChessMan = function () {
	    function ChessMan(ctx, type) {
	        _classCallCheck(this, ChessMan);

	        this.ctx = ctx;
	        this.type = type;
	    }

	    _createClass(ChessMan, [{
	        key: "put",
	        value: function put(x, y) {
	            this.ctx.beginPath();
	            this.ctx.arc(x, y, ChessConfig.ChessManRadius, 0, Math.PI * 2, true);
	            this.ctx.strokeStyle = "rgb(0,0,0)";
	            this.ctx.stroke();
	            this.ctx.closePath();
	            this.ctx.fillStyle = this.type.color;
	            this.ctx.fill();
	        }
	    }]);

	    return ChessMan;
	}();

	exports.default = ChessMan;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 玩家类
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChessPlayer = function () {
	    function ChessPlayer() {
	        _classCallCheck(this, ChessPlayer);
	    }

	    _createClass(ChessPlayer, [{
	        key: "quit",
	        value: function quit() {}
	    }, {
	        key: "regret",
	        value: function regret() {}
	    }]);

	    return ChessPlayer;
	}();

/***/ }
/******/ ]);
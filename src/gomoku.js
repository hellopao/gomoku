"use strict";

import ChessBoard from "./lib/chessboard";
import ChessMan from "./lib/chessman";
import ChessPlayer from "./lib/chessplayer";
import * as ChessConfig from "./config/constants";

const {ChessBoxWidth, ChessBoxCount, ChessStatus, ChessManTypes} = ChessConfig;

/**
 * 五子棋类
 */
export default class Gomoku {

    constructor(el, opts = { aiMode: true }) {
        this.el = el;
        this._initChessInfo(opts);
        this._render();
    }

    _initChessInfo(opts) {
        this.chessTurn = ChessManTypes.WHITE.value;
        this.chessPlayers = [];
        this.chessStatus = ChessStatus.LOCKED;
        this.chessmanMap = new Map();               //棋盘上已落棋子集合
    }

    _render() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvas.height = (ChessBoxCount + 2) * ChessBoxWidth;
        this.canvas.style.cursor = "pointer";

        this.el.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        this._createChessBoard();
        this._bindEvents();
    }

    _createChessBoard() {
        this.chessBoard = new ChessBoard(this.ctx);
        this.chessBoard.draw();
    }

    _resetChessBoard() {
        this.chessBoard.clear();
    }

    _bindEvents() {
        this.canvas.addEventListener('click', (e) => {
            if (this.chessStatus === ChessStatus.LOCKED) return;
            if (this.chessStatus === ChessStatus.FINISH) return;

            let eventCoord = this._getEventCoord(e.clientX, e.clientY);
           
            //点击区在棋盘之外
            if (eventCoord.x < 0 || eventCoord.x > ChessBoxWidth * ChessBoxCount
                || eventCoord.y < 0 || eventCoord.y > ChessBoxWidth * ChessBoxCount)
                return;

            const {x, y} = this._getChessmanCoord(eventCoord.x, eventCoord.y);
         
            //该落子区已有棋子
            if (this.chessmanMap.has(`${x},${y}`)) return;

            this._putChessMan(x, y);
        }, false);
    }
    
    /**
     * 落子
     */
    _putChessMan(x, y) {
        const chessmanType = this.chessTurn ? ChessManTypes.WHITE : ChessManTypes.BLACK;

        const chessman = new ChessMan(this.ctx,chessmanType);

        chessman.put(x, y);
        
        //添加落子区到棋子集合
        this.chessmanMap.set(`${x},${y}`, chessman.type);

        const isVictory = this._checkVitory(x, y, chessman.type);

        if (!isVictory) {
            this._switchTurn();
        } else {
            this.chessStatus = ChessStatus.FINISH;
            alert(`${chessmanType.name} win!!! game over!!`)
        }
    }
    
    /**
     * 根据鼠标所点坐标计算其在棋盘上的坐标
     */
    _getEventCoord(x, y) {
        //(0,0)实际对应canvas上(ChessBoxWidth,ChessBoxWidth)
        return {
            x: x - this.canvas.offsetTop - ChessBoxWidth,
            y: y - this.canvas.offsetLeft - ChessBoxWidth
        }
    }
    
    /**
     * 根据棋盘上坐标计算离该点最近的落子点
     */
    _getChessmanCoord(x, y) {
        //点击在棋盘格子内，棋子要落在最近的可落子点
        return {
            x: Math.round(x / ChessBoxWidth) * ChessBoxWidth + ChessBoxWidth,
            y: Math.round(y / ChessBoxWidth) * ChessBoxWidth + ChessBoxWidth
        }
    }
    
    /**
     * 检查落子后是否已分胜负
     */
    _checkVitory(x, y, chess) {
        //从当前落子点向横/竖/撇/捺四条线上延伸
        //每条线上最多九个点，最少五个
        //有相邻五个为同一种棋子则已分胜负
        const directionMap = {
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
        }

        const directions = Object.keys(directionMap);

        for (var i = 0; i < directions.length; i++) {
            const direction = directions[i];
            const step = directionMap[direction];

            var chessmanCount = 1;

            for (let j = 0; j < 4; j++) {
                let coord = {
                    x: x + step.x.positive * (j + 1),
                    y: y + step.y.positive * (j + 1)
                };  
                
                //超出边界
                if (coord.x > ChessBoxWidth * ChessBoxCount || coord.y > ChessBoxWidth * ChessBoxCount) break;

                if (this.chessmanMap.has(`${coord.x},${coord.y}`)) {
                    const chessType = this.chessmanMap.get(`${coord.x},${coord.y}`);

                    if (chessType !== chess) break;
                    chessmanCount++;
                }
            }

            if (chessmanCount === 5) {
                return true;
            }

            for (let k = 0; k < 4; k++) {
                let coord = {
                    x: x + step.x.negtive * (k + 1),
                    y: y + step.y.negtive * (k + 1)
                };  
                
                //超出边界
                if (coord.x < 0 || coord.y < 0) break;

                if (this.chessmanMap.has(`${coord.x},${coord.y}`)) {
                    const chessType = this.chessmanMap.get(`${coord.x},${coord.y}`);

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

    _switchTurn() {
        this.chessTurn = this.chessTurn ^ 1;
    }

    addPlayer(player) {
        this.chessPlayers.push(player);
        
        if (this.chessPlayers.length === 2) {
            return;
        }
    }

    start() {
        this.chessStatus = ChessStatus.PLAYING;
    }

    restart() {
        this.chessStatus = ChessStatus.PLAYING;
        this._resetChessBoard();
    }
}

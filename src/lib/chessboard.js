"use strict";

import * as ChessConfig from "../config/constants";

const {ChessBoxWidth, ChessBoxCount} = ChessConfig;

/**
 * 棋盘上格子类
 */
class ChessBox {

    constructor(ctx) {
        this.ctx = ctx;
    }

    /**
     * 画棋盘格子
     */
    draw(x, y) {
        this.ctx.strokeRect(x, y, ChessBoxWidth, ChessBoxWidth);
    }

}

/**
 * 棋盘类
 */
class ChessBoard {

    constructor(ctx) {
        this.ctx = ctx;
    }

    /**
     * 画棋盘
     */
    draw() {
        for (let i = 0; i < ChessBoxCount; i++) {
            for (let j = 0; j < ChessBoxCount; j++) {
                const chessBox = new ChessBox(this.ctx);
                chessBox.draw((i + 1) * ChessBoxWidth, (j + 1) * ChessBoxWidth);
            }
        }
    }

    /**
     * 重置棋盘
     */
    clear() {
        this.ctx.clearRect(ChessBoxWidth, ChessBoxWidth, ChessBoxCount * ChessBoxWidth, ChessBoxCount * ChessBoxWidth);
        this.draw();
    }

}

export default ChessBoard;
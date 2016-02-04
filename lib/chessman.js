"use strict";

import * as ChessConfig from "../config/constants";

/**
 * 棋子类
 */
class ChessMan {

    constructor(ctx,type) {
        this.ctx = ctx;
        this.type = type;
    }

    put(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, ChessConfig.ChessManRadius, 0, Math.PI * 2, true);
        this.ctx.strokeStyle = "rgb(0,0,0)";
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fillStyle = this.type.color;
        this.ctx.fill();
    }

}

export default ChessMan;
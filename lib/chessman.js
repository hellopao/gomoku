"use strict";
import * as ChessConfig from "./constants";

class ChessMan {

    constructor(ctx) {
        this.ctx = ctx;
    }

    put(x, y , color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, ChessConfig.ChessManRadius, 0, Math.PI * 2, true);
        this.ctx.strokeStyle = "rgb(0,0,0)";
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

}

export default ChessMan;
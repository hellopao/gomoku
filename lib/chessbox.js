"use strict";
import * as ChessConfig from "./constants";

class ChessBox {
    
    constructor (ctx,x,y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.render();
    }
    
    render () {
        this.ctx.strokeRect(this.x,this.y,ChessConfig.ChessBoxWidth,ChessConfig.ChessBoxWidth);
    }
    
}

export default ChessBox;